# will-api

Web API gateway adapter for moleculer

## Installation

    npm install will-api

### Configuration

This module require configuration ([config](https://www.npmjs.com/package/config)) setting by config/default.json under project and [will-sql](https://www.npmjs.com/package/will-sql), [will-db](https://www.npmjs.com/package/will-db), [moleculer](https://www.npmjs.com/package/moleculer), [moleculer-web](https://www.npmjs.com/package/moleculer-web)

    npm install config
    npm install moleculer
    npm install moleculer-web
    npm install will-sql
    npm install will-db

#### KnAPI
KnAPI handle for default setting web api gateway 

#### Usage

```typescript
import { ServiceBroker } from "moleculer";
import { APIError, JSONReply } from "will-api";
import KnAPI from "will-api";

const broker = new ServiceBroker({
    logLevel: "debug"
});

broker.createService({
    name: "test",
    actions: {
        hello() {
            return "Hello API Gateway!"
        },
        hi(context:any) {
            return "Hi, "+context.params.name;
        },
        err() {
            //this error on server but client result {}
            //throw new Error("My Exception");
            //this is no error but result {}
            //return new Error("My Exception");
            //this notify onError
            return Promise.reject("My Exception");
        },
        error() {
            return Promise.reject(new APIError("API Error",-20010));
        },
        rs() {
            return {rows: { affectedRows: 0 }, columns: null };
        },
        reply() {
            let ans = new JSONReply();
            ans.head.composeNoError();
            ans.head.modeling("api","test.reply");
            ans.body = { data: "API Gateway" };
            return ans;
        }
    }
});

broker.createService({
    name: "api",
    mixins: [KnAPI],
});

broker.start()
.then(() => broker.call("test.hi",{name: "tester" }))
.then(res => console.log("response",res) )
```

#### API Request

API gateway can request by http method GET and POST with form submit or json data format

ex.   
curl http://localhost:8080/api/test/hello  
curl http://localhost:8080/api/test/hi?name=test

curl -X POST http://localhost:8080/api/test/hi -d name=testing  
curl -X POST -H "Content-Type: application/json" http://localhost:8080/api/test/hi -d "{\\"name\\":\\"testing\\"}"

and support CORS  
curl -X POST -H "Origin: https://example.com/" http://localhost:8080/api/test/hi?name=test

#### API Response

`JSONReply` response as result always compose in format with head and body

```typescript
{
    "head": {
        //this is service name or alias name
        "model":"api", 
        //this is action name or method call
        "method":"test.hi",
        //this is error code default 0 with no error
        "errorcode":"0",
        //this is error flag (N = No error, Y = error)
        "errorflag":"N",
        //this is error message
        "errordesc":""
    },
    "body":{
        //this is body attributes depending on object values
        //if result from action call is plain text then it is in data attribute
        "data":"Hi, tester"
    }
}
```

Result from action call can be `JSONReply` object to response out directly.


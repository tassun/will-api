import { ServiceBroker } from "moleculer";
import KnAPI from "../api/KnAPI";
import { APIError } from "../api/APIError";
import { JSONReply } from "../api/JSONReply";

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

//curl http://localhost:8080/api/test/hello
//curl -v http://localhost:8080/api/test/hi?name=test
//curl -v -X POST "http://localhost:8080/api/test/hi" -d name=testing
//curl -v -X POST -H "Content-Type: application/json" http://localhost:8080/api/test/hi -d "{\"name\":\"testing\"}"
//curl -v -X POST -H "Origin: https://example.com/" http://localhost:8080/api/test/hi?name=test

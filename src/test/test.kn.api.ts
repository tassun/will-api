import { ServiceBroker } from "moleculer";
import helloService from "./hello.service";
import KnAPI from "../api/KnAPI";

const broker = new ServiceBroker({
    logLevel: "debug"
});

broker.createService(helloService);
//broker.createService(KnAPI);

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
//curl http://localhost:8080/api/test/plain
//curl http://localhost:8080/api/test/html

import { ServiceBroker } from "moleculer";
import helloService from "./hello.service";
import KnAPI from "../index";

const broker = new ServiceBroker({
    logLevel: "debug"
});

broker.createService(helloService);

broker.createService({
    name: "api",
    mixins: [KnAPI],
});

broker.start()

.then(() => broker.call("test.hi",{name: "tester" }))
.then(res => console.log("response",res) )

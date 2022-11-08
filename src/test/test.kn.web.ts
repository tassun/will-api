import { ServiceBroker } from "moleculer";
import KnService from "will-db";
import MyHandler from "./MyHandler";
import KnAPI from "../api/KnAPI";

let dbschema = "MYSQL";
let args = process.argv.splice(2);
if(args.length>0) dbschema = args[0];
console.log("db schema",dbschema);

const broker = new ServiceBroker({
    logLevel: "debug"
});
broker.createService({
    name: "service",
    mixins: [KnAPI, KnService],
    handler: new MyHandler(), 
    model: {
        name: "testdbx",
        alias: { privateAlias: dbschema },
    },
    settings: {
        routes: [
            {
                aliases: {
                    "GET service/findby/:sharecode": "service.findby"
                }
            }
        ]
    },
});

broker.start()

.then(() => broker.call("service.retrieve").then((result) => { 
    console.log("service.retrieve",result);
}))

.then(() => broker.call("service.list").then((result) => { 
    console.log("service.list",result);
}))

//curl http://localhost:3000/api/service/list
//curl http://localhost:3000/api/service/collect?sharecode=BBL
//curl http://localhost:3000/api/service/findby/BBL

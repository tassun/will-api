import { ServiceBroker } from "moleculer";
import KnService from "will-db";
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
    model: {
        name: "testdbx",
        alias: { privateAlias: dbschema },
    },
});

broker.start()

.then(() => broker.call("service.list").then((result) => { 
    console.log("service.list",result);
}))

//curl -v http://localhost:8080/api/service/list

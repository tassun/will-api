import { Context, ServiceSchema } from "moleculer";
import { APIError } from "../api/APIError";
import { JSONReply } from "../api/JSONReply";
const HelloService : ServiceSchema = {
    name: "test",
    actions: {
        hello() {
            return "Hello API Gateway!"
        },
        hi(context:Context<any>) {
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
        },
        plain(ctx: any) {
            ctx.meta.$responseType = "text/plain";
            return "Hello API";
        },
        html(ctx: any) {
            ctx.meta.$responseType = "text/html; charset=utf-8";
            return "<html><head><title>test</title></head><body>world</body></html>";
        }
    }
};

export = HelloService;

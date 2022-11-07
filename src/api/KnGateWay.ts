import ApiGatewayService from "moleculer-web";
import { ServiceSchema, ServiceSettingSchema } from "moleculer";
import { JSONReply } from "./JSONReply";

export class KnGateWay implements ServiceSchema {
    public name : string = "api";
    
    public mixins: Array<Partial<ServiceSchema>> = [ApiGatewayService];

    public settings?: ServiceSettingSchema = {
        port: process.env.GATEWAY_PORT || 8080,
        path: "/api",
        mappingPolicy: "all",
        cors: true,

        routes: [{ 
            bodyParsers: {
                json: true,
                urlencoded: { extended: true }
            },
            onBeforeCall: (ctx: any, route: any, req: any, res: any, alias: any) => {
                ctx.meta.userAgent = req.headers["user-agent"];
                ctx.meta.session = req.session;
                ctx.meta.headers = req.headers;
                let logger = req.$service.logger;
                logger.debug("headers",req.headers);
            },
            onAfterCall: (ctx: any, route: any, req: any, res: any, data: any) => {
                let responseType : string | null = null;
                if (req.$action && req.$action.responseType) {
                    responseType = req.$action.responseType;
                }
                if (ctx.meta.$responseType) {
                    responseType = ctx.meta.$responseType;
                }
                if(responseType) {
                    responseType = responseType.toLowerCase();
                    let idx = responseType.indexOf("text/plain");
                    if(idx>=0) return data;
                    idx = responseType.indexOf("text/html");
                    if(idx>=0) return data;
                }
                if(data instanceof JSONReply) {
                    return data;
                } else {
                    let reply : JSONReply = new JSONReply();
                    reply.head.modeling(req.$service.name, req.$action.name);
                    reply.head.composeNoError();
                    if(typeof data === "string") {
                        reply.body = { data: data };
                    } else {
                        reply.body = { ...data };
                    }
                    return reply;
                }
            }
        }], 
        
        onError(req: any, res: any, err: any) {
            let metname = req.$action?.name;
            if(!metname) metname = err.data?.name;
            let errcode = err.code?err.code:500;
            let errno = err.errno?err.errno:errcode;
            if(errcode <= 0 || errcode >= 1024) errcode = 406; //not acceptable
            let reply : JSONReply = new JSONReply();
            reply.head.modeling(req.$service?.name, metname);
            reply.head.composeError(String(errno), err.message);
            reply.head.details = err;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.writeHead(Number(errcode));
            res.end(JSON.stringify(reply));
        },

    }
    
    constructor(name?: string) {
        if(name) this.name = name;
    }

}

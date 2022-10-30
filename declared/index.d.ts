export declare class APIError extends Error {
    /**
     * this should be HTTP status code
     */
    readonly code: number;
    /**
     * this is priviate error number
     */
    readonly errno: number | undefined;
    /**
     * this is error type or category
     */
    readonly type?: string;
    constructor(message: string, code: number, errno?: number, type?: string);
}

export declare class HTTP {
    static readonly BAD_REQUEST = 400;
    static readonly UNAUTHORIZED = 401;
    static readonly PAYMENT_REQUIRED = 402;
    static readonly FORBIDDEN = 403;
    static readonly NOT_FOUND = 404;
    static readonly NOT_ALLOWED = 405;
    static readonly NOT_ACCEPTABLE = 406;
    static readonly REGISTER_REQUIRED = 407;
    static readonly REQUEST_TIMEOUT = 408;
    static readonly CONFLICT = 409;
    static readonly GONE = 410;
    static readonly INTERNAL_SERVER_ERROR = 500;
    static readonly NOT_IMPLEMENTED = 501;
    static readonly BAD_GATEWAY = 502;
    static readonly SERVICE_UNAVAILABLE = 503;
    static readonly GATEWAY_TIMEOUT = 504;
    static readonly DISCONNECTED = 505;
}

declare class JSONHeader {
    /**
     * this is model or service name
     */
    model: string;
    /**
     * this is method or action name
     */
    method: string;
    /**
     * this is error code
     */
    errorcode: string;
    /**
     * this is error flag (N=No error, Y=Error) default N
     */
    errorflag: string;
    /**
     * this is error description
     */
    errordesc: string;
    /**
     * this is error detail from what delegate
     */
    details?: Object;
    protected composeFailure(errorflag: string, errorcode: string, errordesc: string): void;
    composeError(errorcode: string, errordesc: string): void;
    composeNoError(): void;
    modeling(model: string, method: string): void;
}
declare class JSONReply {
    head: JSONHeader;
    body: Object;
}
export { JSONHeader, JSONReply };

export declare class KnGateWay implements ServiceSchema {
    name: string;
    logger: LoggerInterface;
    mixins: Array<Partial<ServiceSchema>>;
    settings?: ServiceSettingSchema;
    constructor(name?: string);
    created(): void;
}

declare class KnAPI extends KnGateWay {
}
declare const _default: KnAPI;
export = _default;

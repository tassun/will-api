export declare class APIError extends Error {
    readonly code: number;
    readonly errno: number | undefined;
    constructor(message: string, code: number, errno?: number);
}

declare class JSONHeader {
    model: string;
    method: string;
    errorcode: string;
    errorflag: string;
    errordesc: string;
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

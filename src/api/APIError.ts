export class APIError extends Error {
    /**
     * this should be HTTP status code
     */
    public readonly code : number;
    /**
     * this is priviate error number
     */
    public readonly errno : number | undefined;
    /**
     * this is error type or category
     */
    public readonly type? : string;
    constructor(message: string, code: number, errno?: number, type?: string) {
        super(message);
        this.code = code;
        this.errno = errno;
        this.type = type;
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

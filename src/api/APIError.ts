export class APIError extends Error {
    public readonly code : number;
    public readonly errno : number | undefined;
    constructor(message: string, code: number, errno?: number) {
        super(message);
        this.code = code;
        this.errno = errno;
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

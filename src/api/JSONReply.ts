
class JSONHeader {
    /**
     * this is model or service name
     */
	public model: string = '';
    /**
     * this is method or action name
     */
	public method: string = '';
    /**
     * this is error code
     */
	public errorcode: string = '';
    /**
     * this is error flag (N=No error, Y=Error) default N
     */
	public errorflag: string = 'N';
    /**
     * this is error description
     */
	public errordesc: string = '';
    /**
     * this is error detail from what delegate
     */
    public details? : Object;    
    protected composeFailure(errorflag: string, errorcode: string, errordesc: string) : void {
        this.errorflag = errorflag;
        this.errorcode = errorcode;
        this.errordesc = errordesc;
    }
    public composeError(errorcode: string, errordesc: string) : void {
		this.composeFailure("Y",errorcode,errordesc);
	}
    public composeNoError() : void {
		this.composeFailure("N", "0", "");
	}
    public modeling(model: string, method: string) : void {
        this.model = model;
        this.method = method;
    }
}

class JSONReply {
    public head: JSONHeader = new JSONHeader();
    public body: Object = { };
}

export {
    JSONHeader,
    JSONReply
}

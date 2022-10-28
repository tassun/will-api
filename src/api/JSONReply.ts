
class JSONHeader {
	public model: string = '';
	public method: string = '';
	public errorcode: string = '';
	public errorflag: string = 'N';
	public errordesc: string = '';
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

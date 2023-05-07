export class RequestIdHandler{
    static requestId: number = 0
    static generateRequestId():number{
        this.requestId++; //new requestId Incremented
        return this.requestId;
    }
}
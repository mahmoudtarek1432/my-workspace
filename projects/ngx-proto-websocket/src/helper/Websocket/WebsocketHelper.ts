

/**
 * handles websocket lifecycle processes
 */
export class websocketHelper {

    public static websocketPort:WebSocket;

    constructor(){

    }

    /**
     * handle websocket instance creation as a singleton
     * 
     * @param websocketUrl - websocket Url in the form: wss//localhost:port
     * @returns a websocket connection
     */
    public static getInstance(port:string=""):WebSocket{

        if(this.websocketPort)
            return this.websocketPort;

            
        let socket = new window.WebSocket(port) 
        this.websocketPort = socket;
        socket.onopen = ev => {
            console.log(ev)
        }
        
        return this.websocketPort;
    }

        /**
     * Process the incoming on message Events
     * @param message - callback function that handles incoming websocket messages
     */
    static ReciveWebsocketMessage<T>(message:(event:MessageEvent<any>)=>any){
        websocketHelper.getInstance();
        var first = true;
        return websocketHelper.websocketPort.onmessage = (ev)=>{
            return message(ev);
        }
    }

    /**
     * 
     * @param data send data in the form of string|Blob|ArrayBufferLike
     */
    static SendWebsocketMessage(data:string|Blob|ArrayBufferLike|ArrayBuffer){
        websocketHelper.getInstance();
        if(this.websocketPort.readyState == 0){
            new Promise(r =>{
                setTimeout(r, 2000);
                this.websocketPort.send(data);
            })
        }
        else{
            this.websocketPort.send(data);
        }
    }
}
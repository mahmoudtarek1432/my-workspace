import { EndpointReciever } from "../../helper/Endpoint Managment/EndpointReciever";
import { IResponse } from "../../helper/Endpoint Managment/model/IResponse";
import { ProtoRootProvider } from "../../helper/Protobuf/ProtoRootProvider";
import { ProtoWrapper } from "../../helper/Protobuf/protowrapper";
import { websocketHelper } from "../../helper/Websocket/WebsocketHelper";
import { MessageActionFactory } from '../../helper/Websocket/MessageAction/MessageActionFactory';
import { Injectable, Injector, inject } from '@angular/core';
import { NgxProtoWebsocketModule } from '../../lib/ngx-proto-websocket.module';


export class ProtobufWebsocket{

    protoInstance: ProtoRootProvider
    constructor(){
        this.protoInstance = NgxProtoWebsocketModule.injectorInstance.get(ProtoRootProvider)
    }

    //handle incoming message responses
    public OpenWebsocketWithMessage(message:(event:MessageEvent<any>)=>any){
        websocketHelper.getInstance();
        let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
        websocketHelper.websocketPort.onmessage = (ev)=>{
            let uint8 = new Uint8Array(ev.data);
            let decodedEndpointResponse = wrapper.Decode<{[k:string]: IResponse[]}>(uint8);
            EndpointReciever.handle(decodedEndpointResponse);
            return message(ev);
        }
    }

    public OpenWebsocket(port:string =""){
        websocketHelper.getInstance(port);
        let wrapper = new ProtoWrapper(this.protoInstance.ResponseType);
        websocketHelper.websocketPort.onmessage = async (ev:MessageEvent)=>{
            var incomingType = Object.getPrototypeOf(ev.data).constructor.name;
            var MessageAction = MessageActionFactory.buildAction(incomingType,[wrapper,this.protoInstance])
            MessageAction!.fireAction(ev.data)
        }
    }
    
}
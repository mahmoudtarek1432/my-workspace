import { Injectable } from "@angular/core";
import { websocketHelper } from "../../helper/Websocket/WebsocketHelper";

import { RequestIdHandler } from '../../helper/Subject/RequestIdHandler';
import { ProtoRootProvider } from "../../helper/Protobuf/ProtoRootProvider";
import { IRequest } from "../../helper/Endpoint Managment/model/IRequest";
import { ProtoWrapper } from "../../helper/Protobuf/protowrapper";
import { EndpointFeeder } from "../../helper/Endpoint Managment/EndpointFeeder";


@Injectable({
    providedIn: 'root'
  })
  export class WebSocketBroadcast{
    constructor(private ProtoInstance: ProtoRootProvider){
    }
    Subscribe(payload: IRequest){ //tba
      let requestId = RequestIdHandler.generateRequestId();
      payload.request_id = requestId;
        //let RequestEndpoint = new Requestend();
        EndpointFeeder.FeedRequestEndpoint (payload,{});
        let ProtoBufWrapper = new ProtoWrapper(this.ProtoInstance.RequestType);
        let protoEncodedMessage = ProtoBufWrapper.EncodeMessage(payload);
        websocketHelper.SendWebsocketMessage(protoEncodedMessage); //not tested

    }
}
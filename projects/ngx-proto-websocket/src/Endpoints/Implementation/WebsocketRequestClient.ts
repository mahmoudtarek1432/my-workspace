import { Injectable } from "@angular/core";
import { websocketHelper } from "../../helper/Websocket/WebsocketHelper";
import { RequestIdHandler } from "../../helper/Subject/RequestIdHandler";
import { ProtoRootProvider } from "../../helper/Protobuf/ProtoRootProvider";
import { EndpointsSubjects } from "../../helper/Subject/Endpoints-Subjects";
import { IResponse } from "../../helper/Endpoint Managment/model/IResponse";
import { IRequest } from "../../helper/Endpoint Managment/model/IRequest";
import { EndpointFeeder } from "../../helper/Endpoint Managment/EndpointFeeder";
import { ProtoWrapper } from "../../helper/Protobuf/protowrapper";


@Injectable({
    providedIn: 'root'
  })
  export class WebsocketRequestClient{
    constructor(private subject: EndpointsSubjects, private ProtoInstance: ProtoRootProvider){
    }
    request<Res extends IResponse>(payload: IRequest){ //tba
        let requestId = RequestIdHandler.generateRequestId();
        this.subject.createNewsubject(requestId,null);
        let requestSubject = this.subject.getSubjectObservable<Res>(requestId);
        //build an endpoint
        console.log(payload)
        let endpoint = EndpointFeeder.FeedRequestEndpoint(payload,{});
        //send
        let ProtoBufWrapper = new ProtoWrapper(this.ProtoInstance.RequestType);
        let protoEncodedMessage = ProtoBufWrapper.EncodeMessage(endpoint);
        try{
          websocketHelper.SendWebsocketMessage(protoEncodedMessage)//not tested
          return requestSubject;
        }catch{
          throw new Error("WebSocket Is not instantiated yet.");
        }
    }
}
import { Observable, Subject } from "rxjs";
import { SubjectHandler } from "../../helper/Subject/Subject-helper";
import { IResponse } from "../../helper/Endpoint Managment/model/IResponse";
import { RequestIdHandler } from "../../helper/Subject/RequestIdHandler";
import { WebSocketBroadcast } from "../Implementation/WebSocketBroadcast";
import { EndpointsSubjects } from "../../helper/Subject/Endpoints-Subjects";
import { EndpointsMap } from "../../helper/Endpoint Managment/EnpointMap";
import { IRequest } from "../../helper/Endpoint Managment/model/IRequest";
import { NgxProtoWebsocketModule } from '../../lib/ngx-proto-websocket.module';


export abstract class IEndpoint<R extends IResponse>{
    private subject!: EndpointsSubjects;
    private WebsocketBroadcast!: WebSocketBroadcast
    

    constructor(responseType: {new():R}){
        this.subject = NgxProtoWebsocketModule.injectorInstance.get(EndpointsSubjects);
        this.WebsocketBroadcast = NgxProtoWebsocketModule.injectorInstance.get(WebSocketBroadcast);

        let className = this.constructor.name;
        EndpointsMap.CreateEndpoint(responseType,Object.getPrototypeOf(this).constructor);
        this.subject.createNewsubject<R>(className, new responseType());
    }

    protected ProcessData<R>(ResponseObject: R):any{
        return ResponseObject;
    }

    handle<R>(responseObj: R): void {
        let obj = this.ProcessData(responseObj);
        obj.constructor;
        this.subject.updateSubject<typeof obj.constructor>(this.constructor.name, obj);
    }

    //Subscribes localy
    SubscribeToBroadcast<requestType extends IRequest>(request: requestType ):Observable<R>{
        request.is_subscribe = true;
        this.WebsocketBroadcast.Subscribe(request);
        return this.subject.getSubjectObservable<R>(this.constructor.name);
    }
}

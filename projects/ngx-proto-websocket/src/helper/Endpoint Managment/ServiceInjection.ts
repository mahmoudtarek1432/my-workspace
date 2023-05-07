import { IEndpoint } from "../../Endpoints/Interface/IResponseEndpoint";
import { IResponse } from "./model/IResponse";
import { EndpointsSubjects } from "../Subject/Endpoints-Subjects";
import { NgxProtoWebsocketModule } from '../../lib/ngx-proto-websocket.module';



/**
 * Injects The dependencies in the constructor for Endpoint Services
 */
export class ServiceInjection{
    static Create<T extends IEndpoint<IResponse>>(Type:{new(subscriptions:EndpointsSubjects):T}): T{
        let endpoint = NgxProtoWebsocketModule.injectorInstance.get(Type,new Error("endpoint not found")); //depricated
        if(endpoint === "endpoint not found")
            throw endpoint;
        return endpoint;
    }
}
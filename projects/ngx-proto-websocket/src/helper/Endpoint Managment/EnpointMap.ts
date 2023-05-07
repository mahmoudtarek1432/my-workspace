
import { IEndpoint } from "../../Endpoints/Interface/IResponseEndpoint";
import { EndpointsSubjects } from "../Subject/Endpoints-Subjects";
import { IResponse } from "./model/IResponse";

/**
 * handles the Response - ResponseEndpoint Mapping, mainly used for broadcasting
 * Classes that extends IResponseEndpoint shall use CreateEndpoint to Register The response and the appropriate Endpoint
 */
export abstract class EndpointsMap{
    static Map:{[k:string]: {new():IEndpoint<IResponse>}} = { } // key value pair pool 

    static CreateEndpoint<R extends IResponse,S extends IEndpoint<R>>(response :{new():R}, endpoint :{new():S}){
        let responseName = response.name;
        if(EndpointsMap.Map[responseName] == undefined)
            EndpointsMap.Map[responseName] = endpoint;
    }

    static resolveEndpoint(responseName :string): {new(subscriptions:EndpointsSubjects):IEndpoint<IResponse>}{
        let responseEndpoint = EndpointsMap.Map[responseName];
        if(responseEndpoint == undefined)
            throw new Error("endpoint not configured for this response, Map it using CreateEndpoint function");
        return responseEndpoint
    }
}
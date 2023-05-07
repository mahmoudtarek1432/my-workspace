import { IEndpoint } from "../../Endpoints/Interface/IResponseEndpoint";
import { EndpointsMap } from "./EnpointMap";
import { ServiceInjection } from "./ServiceInjection";
import { IResponse } from "./model/IResponse";


export class ServiceInstancefactory{
    /**
    * Uses @class EndpointMap to fetch The incoming response's mapped Service
    * @param responseType - takes a class instance that extends IResponse
    * @returns an object that extends IResponseEndpoint,     
    */
    static createInstance<R extends IResponse>(reponseType: { new ():R}): IEndpoint<IResponse>{
        let serviceType = EndpointsMap.resolveEndpoint(reponseType.name);
        return ServiceInjection.Create(serviceType);
    }
}
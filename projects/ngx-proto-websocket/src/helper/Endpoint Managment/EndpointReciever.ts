import { RequestEndpointResolver } from "../../Endpoints/Implementation/RequestEndpointResolver"
import { ResultCode} from './model/result-code'
import { IResponse } from "./model/IResponse"
import { ServiceInjection } from "./ServiceInjection"
import { ServiceInstancefactory } from "./ServiceInstancefactory"


/**
 * calls a handler, used for handling incoming endpointResponses
 */
export class EndpointReciever{
    static handle(endpointRersponses: any){
            let properties = Object.getOwnPropertyNames(endpointRersponses);         //casts Object Properties into an array of strings
            properties.forEach((propertyName) =>{                                      
              let propertyKey = propertyName as keyof typeof endpointRersponses;       // typeof returns a class name as a string, further keyof assigns the propertyname string
              let responseContainer = endpointRersponses[propertyKey] as Array<IResponse>
              
              responseContainer?.map((Response) => {                            // as a property of endpointResponse Class --- potential danger
                //tb - check status for broadcast or request based event
                let responseClassType = Object.getPrototypeOf(Response).constructor;
                if(Response.result_code == ResultCode["Subscribed"]){
                  ServiceInstancefactory.createInstance(responseClassType).handle(Response);
                }
                else{                                                               //returns an endpoint according to the passed response's prototype
                  ServiceInjection.Create(RequestEndpointResolver).handle(Response);  //request response endpoint
                }
              })
            })
        }
    }

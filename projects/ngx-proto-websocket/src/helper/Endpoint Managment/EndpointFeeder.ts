import { IRequest } from './model/IRequest';

export class EndpointFeeder{
    static FeedRequestEndpoint<obj extends IRequest>(property: obj, endpoint: any): any{
        let name = Object.getPrototypeOf(property).constructor.name
        if(endpoint[name] == undefined || endpoint[name] == null){
            endpoint[name] = new Array<obj>()
        }
        endpoint[name].push(property)
        return endpoint
    }

    /*static FeedRequestEndpoint<obj extends IRequest>(property: obj, endpoint: any): RequestEndpoints{
        let propertyNames =  Object.getOwnPropertyNames(endpoint);
        propertyNames.forEach((n) => {
            let key = n as keyof typeof endpoint;
            if(typeof property == typeof endpoint[key]){
                endpoint[key]?.push(property);
            }
        })
        return endpoint;
    }*/
}
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
}
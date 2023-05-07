import * as protobuf from "protobufjs";


export class ProtoRootProvider{
     RequestType!: protobuf.Type;
     ResponseType!: protobuf.Type;

    instantiateRequestType(requestRoot: protobuf.Root){
        this.RequestType = requestRoot.lookupType("ProtobufWebsocket.Model.RequestEndpoint");
        
    }
    instantiateResponseType(responseRoot: protobuf.Root){
        this.ResponseType = responseRoot.lookupType("ProtobufWebsocket.Model.ResponseEndpoint");
    }
}
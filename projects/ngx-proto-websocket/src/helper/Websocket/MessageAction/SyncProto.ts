import { ProtoRootProvider } from "../../Protobuf/ProtoRootProvider";
import { ProtoRootRemoteBuilder } from "../../Protobuf/ProtoRootRemoteBuilder";
import { IMessageAction } from "./MessageAction";

export class SyncProto implements IMessageAction{
    constructor(private protoRootProvider: ProtoRootProvider){

    }

    fireAction(message: string | Blob): void {
        var ProtoString = message as string
        var request = ProtoString.includes("RequestEndpoint")
        var response = ProtoString.includes("ResponseEndpoint")
        

        if(request){
            var protoRoot = ProtoRootRemoteBuilder.builResquestProtoType(ProtoString)
            this.protoRootProvider.instantiateRequestType(protoRoot);
        }
        else if(response){
            var protoRoot = ProtoRootRemoteBuilder.buildResponseProtoType(ProtoString)
            this.protoRootProvider.instantiateResponseType(protoRoot)
        }
    }

}
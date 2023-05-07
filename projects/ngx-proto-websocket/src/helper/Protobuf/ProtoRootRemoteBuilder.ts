import * as protobuf from "protobufjs";
import { ProtoRootInstance } from "./IProtoRootInstance";

export class ProtoRootRemoteBuilder {


    static buildResponseProtoType(ResponseFile:string){
        let protoroot = new protobuf.Root();
        protobuf.parse(ResponseFile, protoroot, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
        protoroot.resolveAll();
        return protoroot;
    }   

    static builResquestProtoType(RequestFile:string){
        let protoroot = new protobuf.Root();
        protobuf.parse(RequestFile, protoroot, { keepCase: true, alternateCommentMode: false, preferTrailingComment: false });
        protoroot.resolveAll();
        return protoroot;
    } 

}
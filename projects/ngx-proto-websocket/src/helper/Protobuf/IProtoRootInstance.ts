export abstract class ProtoRootInstance{
    RequestType!: protobuf.Type;
    ResponseType!: protobuf.Type;
    abstract instantiate():void;
    abstract buildResponseProtoType():void;  
    abstract builResquestProtoType():void;
}
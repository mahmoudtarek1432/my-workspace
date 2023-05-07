import * as protobuf from 'protobufjs';
import { ProtobufType } from './ProtoBufType';
import { ProtoRootComposer } from './ProtoRootComposer';

/**A wrapper built on top of protobuf.js to ease implementation*/
export class ProtoWrapper{

    prototype: protobuf.Type
    constructor(protobufType: protobuf.Type){ 
        this.prototype = protobufType;
    }

    /**function handels accessing the .proto file containing the package and its message types
    callback function handels the protobuf.js library toolset such as encoding/decoding/create/verify */


    verify(payload:{k : [string]}){
        var errmsg = this.prototype!.verify(payload);
        if(errmsg)
            throw Error(errmsg);
    }

    /**
     * @param payload - The payload to be sent inside the message
     * Avoid naming the key using the protobuf naming convention as it will return an empty protomessage
     * (_)
     */
    create(payload: any):protobuf.Message<{}>{
        var errmsg = this.prototype!.verify(payload);
        if(errmsg)
            throw Error(errmsg);
        console.log(payload)
        return this.prototype!.create(payload);
        
    }
    
     /**
     * Use to encode an already created protoMessage
     * @param protobufMessage - The protomessage to be encoded
     * @param writer - The encoding writer
     * 
      */
    EncodeProto(protobufMessage:protobuf.Message<{}>,writer?:protobuf.Writer): Uint8Array{
        return this.prototype!.encode(protobufMessage,writer).finish();
    }

    /**
     * Use to encode a an object of type protoMessage
     * @param payload 
     * @returns 
     */
     EncodeMessage(payload: any):Uint8Array{
        var errmsg = this.prototype!.verify(payload);
        if(errmsg)
            throw Error(errmsg);
        //create a protoMessage wrapped arrount the protoType Object
        let protoMessage = this.prototype!.create(payload);
        //encodes proto message to uint8array 
        return this.prototype!.encode(protoMessage).finish();
    }

    /**
     * 
     * @param encodedMessage - Decodes Encoded Messages using Uint8Array
     * @param Length 
     * @returns A promise protoMessage, use toObject To access the type members
     */
    Decode<T>(encodedMessage:Uint8Array):T{
        let decoded = this.prototype!.decode(encodedMessage)as unknown;
        return decoded as T;
    }
}


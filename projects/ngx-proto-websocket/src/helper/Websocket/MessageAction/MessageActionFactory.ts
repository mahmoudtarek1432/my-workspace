import { ExcuteRequest } from "./ExcuteRequest";
import { IMessageAction } from "./MessageAction";
import { SyncProto } from "./SyncProto";

export class MessageActionFactory{
    static buildAction(MessageProtoType:any, parms:any[]): IMessageAction | undefined{
        switch(MessageProtoType){
            case "Uint8Array":
                return new ExcuteRequest(parms[0]);
                break;
            case "String":
                return new SyncProto(parms[1]);
                break;
        }
        return undefined;
    }
}
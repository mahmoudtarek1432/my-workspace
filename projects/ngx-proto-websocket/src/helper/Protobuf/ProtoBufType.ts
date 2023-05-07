
/**
 * An abstract class for assigning protobuf models 
 * ** @param filePath and @param ObjectLookupType should be instantiated in the constructor's Super
 */
export class ProtobufType{
    /**Access string for protoObject used as an argument in the protobuf.load function*/
    filename!: string

    /**String passed will act as the proto message type
     * covention: "PackageName.MessageType"
    */
    packageName!: string
    className!: string
    /** 
     * @param filePath - Access string for protoObject used as an argument in the protobuf.load function
     * 
     * @param packageName - tring passed will act as the proto message type covention: "PackageName.MessageType"
     * */ 
    
    constructor(filePath:string, packageName: string, className: string){
        this.filename = filePath;
        this.packageName = packageName;
        this.className = className;
    }

    protobufTypeAccess():ProtobufType{
        return this;
    }
}
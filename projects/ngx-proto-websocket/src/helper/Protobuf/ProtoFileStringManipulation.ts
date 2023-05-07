export class ProtoFileStringManipulation{

    public static ConvertProtofile(protoFile: string, type: EndpointType){
        let lastNumber = ProtoFileStringManipulation.ExtractLastMemberNumber(protoFile);
         //get the file without last bracket
        let lastBracket = protoFile.lastIndexOf("}");
        protoFile = protoFile.slice(0,lastBracket);
        
        switch (type){
            case 1:
                protoFile = protoFile + this.RequestMessageAdditions(lastNumber);
                break;
            case 2:
                protoFile = protoFile + this.ResponseMessageAdditions(lastNumber);
                break;
        }

        protoFile = protoFile + "}";
        return protoFile;
    }

    //gets a substring from the file containing the message name to be processed
    public static ExtractMessageName(protoFile:string):string{
        let messageName = "";
        let firstChar = protoFile.indexOf("message")+ "message".length;
        let MessageNamefirstChar = firstChar;

        //eliminate spaces
        while(protoFile[MessageNamefirstChar] == " "){
            MessageNamefirstChar++;
        }

        //extract message name
        for (let i = MessageNamefirstChar; i < protoFile.length; i++){
            if(protoFile[i] == " " || protoFile[i] == "{"){ //first encountered after message name
                break;
            }
            messageName = messageName + protoFile[i];
        }
        return messageName;
    }

    // returns the last number associated with a member in a message to further append members dynamicaly
    private static ExtractLastMemberNumber(protoFile:string){
        //itrates from the end to find the last number in file
        let index = protoFile.length-1;
        let found = false;
        let lastNumber = "";
        while(index> 0){
            if(found == true){
                if(48 <= protoFile[index].charCodeAt(0) &&  protoFile[index].charCodeAt(0) <= 57){ //if the char is a number between 0 and 9
                    lastNumber = lastNumber + protoFile[index]; //appends the located number
                }
                else if(lastNumber != "" && protoFile[index] == " "){ //found a space that isnt before the number
                    break;
                }
                index++;
            }
            else{
                if(protoFile[index] == "="){
                    found = true;
                }
                index--;
            }
        }
        return lastNumber
    }

    //inserts the Response constants
    private static ResponseMessageAdditions(lastNumber: string): string{
        let lastnumberParsed = parseInt(lastNumber);
        const ResponseDecorators = `int32 requestId = ${lastnumberParsed + 1};\
                                    int32 resultCode = ${lastnumberParsed + 2};\
                                    repeated error errors = ${lastnumberParsed+ 3};\ `;
        
        return ResponseDecorators;
    }

    //inserts the request constants
    private static RequestMessageAdditions(lastNumber: string): string{
        let lastnumberParsed = parseInt(lastNumber);
        const ResponseDecorators = `int32 request_id = ${lastnumberParsed + 1};\
                                    bool is_subscribe = ${lastnumberParsed + 2};\
                                    int32 method_type = ${lastnumberParsed+ 3};\ `;

        return ResponseDecorators;
    }

    
    //converts messageName into memberName by ignoring first letter and inserting an _ before capital letters asuming the name is in js nameing conventions
    public static configureMessageName(messageName: string){
        let newString = ''

        //let eng. shady look at it
        for(let i = 1; i < messageName.length; i++){
            if(65 <= messageName[i].charCodeAt(0) &&  messageName[i].charCodeAt(0) <= 90){ // 65 is for A and 90 is for Z
                let righthand = messageName.slice(0,i);
                let lefthand = messageName.slice(i,messageName.length);
                newString = righthand + "_" + lefthand;

            }
         }
        return newString.toLowerCase();
    }
}
export enum EndpointType{
    request = 1,
    response = 2
}
import { ResultCode } from "./result-code";
import { Error } from "./error";

export abstract class IResponse {
    request_id!: number;
    result_code!: ResultCode;
    errors = new Array<Error>();
}
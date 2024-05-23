import { FieldsErrors } from "./validate-fields-interface"

export class EntityValidateError extends Error{
    constructor(public error: FieldsErrors, message= "Validation error"){
        super(message)
    }

    count(){
        return Object.keys(this.error).length
    }
}
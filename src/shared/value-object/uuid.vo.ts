import { ValueObject } from "../value-object";
import {v4 as uuidv4, validate} from "uuid" 
export class Uuid extends ValueObject {
    readonly id: string;
    constructor(id?: string) {
        super();
        this.id = id || uuidv4();
        this.validate()

    }
    private validate(){
        const isValid = validate(this.id)
        if(!isValid){
            throw new InvalidUuid()
        }
    }
}

export class InvalidUuid extends Error {
    constructor(message?: string) {
        super(message || "id must be a valid UUID")
        this.name = "InvalidUuid"
    }
}
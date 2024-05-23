import { ClassValidatorFields } from "../../class-validator-fields";
import { FieldsErrors } from "../../validate-fields-interface";
import { EntityValidateError } from "../../validation.error";


type Expected = | {
    validator: ClassValidatorFields<any>
    data: any
} | 
    (()=>any)

expect.extend({
    containsErrorMessage(expected: Expected, received: FieldsErrors){
        if (typeof expected === "function"){
            try{
                expected()
                return isValid()
            }catch(e){
                const error = e as EntityValidateError
                return assertContainsErrorsMessages(error.error, received)
            }
        }else{
            const {validator, data} = expected
            const validated = validator.validate(data)

            if(validated){
                return isValid()
            }

            return assertContainsErrorsMessages(validator.errors, received)

        }

    }
})

function isValid(){
    return {
        message: ()=> "",
        pass: true
    }
}

function assertContainsErrorsMessages(
      expected: FieldsErrors,
      received: FieldsErrors
    ) {
      const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
    
      return isMatch
        ? isValid()
        : {
            pass: false,
            message: () =>
              `The validation errors not contains ${JSON.stringify(
                received
              )}. Current: ${JSON.stringify(expected)}`,
          };
    }
    

    
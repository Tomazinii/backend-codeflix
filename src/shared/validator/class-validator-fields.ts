import { validateSync } from "class-validator";
import { FieldsErrors, IValidatorFields } from "./validate-fields-interface";

export abstract class ClassValidatorFields<PropsValidated> implements IValidatorFields<PropsValidated>{
    errors: FieldsErrors | null = null;
    validatedData: PropsValidated | null = null;


    validate(data: any): boolean {
        const erros: any = validateSync(data)
        if (erros.length){
            this.errors = {}
            for (const error of erros) {
                const field = error.property
                this.errors[field] = Object.values(error.constraints!)
            }

        }else{
            this.validatedData = data
        }

        return !erros.length

    }
    
}
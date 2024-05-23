import { MaxLength, IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";
import { isString } from "lodash";
import { Category } from "./category.entity";
import { ClassValidatorFields } from "../../shared/validator/class-validator-fields";


class CategoryRules{
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;

    constructor({name, description, is_active}: Category){

        Object.assign(this,{name, description, is_active    })
    }
     
}


export class CategoryValidator extends ClassValidatorFields<CategoryRules>{
    validate(entity: Category){
        return super.validate(new CategoryRules(entity))
    }
}

export class CategoryValidatorFactory {
    static create(){
        return new CategoryValidator()
    }
}
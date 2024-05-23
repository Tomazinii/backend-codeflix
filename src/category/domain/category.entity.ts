import { Entity } from "../../shared/validator/entity"
import { EntityValidateError } from "../../shared/validator/validation.error"
import { ValueObject } from "../../shared/value-object"
import { Uuid } from "../../shared/value-object/uuid.vo"
import { CategoryValidatorFactory } from "./category.validate"

export type CategoryConstructProps = {
    category_id?: Uuid
    name: string
    description?:string | null
    is_active?: boolean
    created_at?: Date
}
export type CategoryCreateCommand = {
    name: string
    description?:string | null
    is_active?: boolean
}

export class Category extends Entity{
    category_id: Uuid
    name: string
    description:string | null
    is_active: boolean
    created_at: Date

    constructor(props:CategoryConstructProps){
        super()
        this.category_id = props.category_id ?? new Uuid()
        this.created_at = props.created_at ?? new Date()
        this.description = props.description ?? null
        this.is_active = props.is_active ?? true
        this.name = props.name
    }

    static create(props: CategoryCreateCommand): Category {
        const category = new Category(props)
        Category.validator(category)
        return category 
    }

    changeName(name: string): void {
        this.name = name
        Category.validator(this)
    }

    get entity_id(): ValueObject {
        return this.category_id
    }

    changeDescription(description: string): void {
        this.description = description
        Category.validator(this)
    }

    active(){
        this.is_active = true
    }
    
    deactive(){
        this.is_active = false
    }
    static validator(entity: Category){
        const validator = CategoryValidatorFactory.create()
        const isValid = validator.validate(entity)
        if(!isValid){
            throw new EntityValidateError(validator.errors)
        }
    }

    toJSON(){
        return {
            category_id: this.category_id.id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at
        }
    }

    }
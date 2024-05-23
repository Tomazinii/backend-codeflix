import { EntityValidateError } from "../../shared/validator/validation.error";
import { Uuid } from "../../shared/value-object/uuid.vo";
import { Category } from "./category.entity";

describe("Category unit Tests", ()=>{

    let validateSpy: any

    beforeEach(()=>{
        validateSpy = jest.spyOn(Category, "validator")
    })
    test("should change name", ()=>{
        let category = new Category({
            name: "Movie",
        });
        category.changeName("Movie name modified")

        expect(category.name).toBe("Movie name modified");
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test("should change description", ()=>{
        let category =  Category.create({
            name: "Movie",
            description: "description"
        });
        category.changeDescription("description modified")

        expect(category.description).toBe("description modified");
        expect(validateSpy).toHaveBeenCalledTimes(2)
    })


    test("should active category", ()=>{
        let category = new Category({
            name: "Movie",
            description: "description"
        });
        category.active()

        expect(category.is_active).toBe(true);

    })

    test("should deactive category", ()=>{
        let category = new Category({
            name: "Movie",
            description: "description"
        });
        category.deactive()

        expect(category.is_active).toBe(false);

    })

    describe('Create command', ()=>{

        test("constructor 1", ()=>{
            
        
        let category = new Category({
            name: "Movie",
        });

        expect(category.name).toBe("Movie");
        expect(category.is_active).toBe(true);
        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.description).toBeNull()
        expect(category.created_at).toBeInstanceOf(Date)
    })

    
    test("constructor 2", ()=>{
        let category = new Category({
            name: "Movie",
            description: "Description test"
        });

        expect(category.name).toBe("Movie");
        expect(category.is_active).toBe(true);
        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.description).toBe("Description test")
        expect(category.created_at).toBeInstanceOf(Date)
    })
})
})

describe("Category validator",()=>{
    describe("create command", ()=>{
      test("should an invalid category ",()=>{
        expect(()=>{
          Category.create({name: ""})
        }).toThrow(new EntityValidateError({
            name: ["name is required"]
  
        }))
      })    
    })
})
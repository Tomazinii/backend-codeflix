import { Uuid } from "./uuid.vo"


describe("Uuid unit tests", ()=>{

    const validateSpy = jest.spyOn(Uuid.prototype as any, "validate")

    test("should throw error when id is invalid", ()=>{
        expect(()=>{
            const invalid_id = new Uuid("invalid id")

        }).toThrowError("id must be a valid UUID")
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    test("should create valid id", ()=>{
        const invalid_id = new Uuid("3f5b8d5b-329a-48f7-8d97-df3a17f8a6da")
        expect(invalid_id).toBeInstanceOf(Uuid)
    })
})
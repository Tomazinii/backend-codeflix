import { ValueObject } from "./value-object"


class StringValueObject extends ValueObject {
    constructor(readonly props1: string, props2: number) {
        super()
    }
}

describe("value object unit tests", ()=>{
    test("should be equals", ()=>{
        const Object1 = new StringValueObject("test",1)
        const Object2 = new StringValueObject("test",1)

        expect(Object1.equals(Object2)).toBe(true)
    })

    test("should be not equal", () => {
        const object1 = new StringValueObject("teste", 1)
        const object2 = new StringValueObject("testes", 2)
        expect(object1.equals(object2)).toBe(false)
        expect(object1.equals(null as any)).toBe(false)

    })
})
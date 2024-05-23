import { FieldsErrors } from "../../validate-fields-interface";


declare global {
    namespace jest {
        interface Matchers<R> {
            containsErrorMessage(expected: FieldsErrors): R;
        }
    }
}
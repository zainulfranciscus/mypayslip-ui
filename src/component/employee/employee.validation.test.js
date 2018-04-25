import EmployeeValidation from './employee.validation';

let employeeValidation;

describe("Employee Validation unit tests ",() => {

    beforeEach(() => {
        employeeValidation = new EmployeeValidation();
    });

    it("should return false when salary is an empty string", () => {
        expect(employeeValidation.withSalary("").validateSalary()).toBeFalsy();
    });

    it("should return false when salary is not a number", () => {
        expect(employeeValidation.withSalary("not a number").validateSalary()).toBeFalsy();
    });

    it("should return true when salary is a round number", () => {
        expect(employeeValidation.withSalary("15000").validateSalary()).toBeTruthy();
    });

    it("should return false when salary is a number with fractions", () => {
        expect(employeeValidation.withSalary("15000.756").validateSalary()).toBeFalsy();
    });

    it("should return false when first name is an empty string", () => {
        expect(employeeValidation.withFirstName("").validateFirstName()).toBeFalsy();
    });

    it("should return false when first name is a space", () => {
        expect(employeeValidation.withFirstName(" ").validateFirstName()).toBeFalsy();
    });

    it("should return false when first name is a number", () => {
        expect(employeeValidation.withFirstName("45").validateFirstName()).toBeFalsy();
    });

    it("should return false when last name is an empty string", () => {
        expect(employeeValidation.withLastName("").validateLastName()).toBeFalsy();
    });

    it("should return false when last name is a space", () => {
        expect(employeeValidation.withLastName(" ").validateLastName()).toBeFalsy();
    });

    it("should return false when last name is a number", () => {
        expect(employeeValidation.withLastName("45").validateLastName()).toBeFalsy();
    });


    it("should return false when super  is an empty string", () => {
        expect(employeeValidation.withSuper("").validateSuper()).toBeFalsy();
    });

    it("should return false when super  is not a number", () => {
        expect(employeeValidation.withSuper("not a number").validateSuper()).toBeFalsy();
    });

    it("should return true when super is a round number", () => {
        expect(employeeValidation.withSuper("15000").validateSuper()).toBeTruthy();
    });

    it("should return true when super is a number with fractions", () => {
        expect(employeeValidation.withSuper("15000.756").validateSuper()).toBeTruthy();
    });

    it("should return true when all empllyee data is valid", () => {
        expect(employeeValidation.withFirstName("Joe")
            .withLastName("Doe")
            .withSalary("25000")
            .withSuper("9")
            .validate()
            .isEmployeeDataValid()).toBeTruthy();
    });
});
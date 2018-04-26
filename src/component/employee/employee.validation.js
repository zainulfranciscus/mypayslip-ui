export default class EmployeeValidation {

    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.superRate = "";
        this.salary = "";
    }

    isNumeric(number) {
        return !isNaN(number);
    }

    isRoundNumber(number) {

        return this.isNumeric(number) && number % 1 === 0;
    }

    isEmpty(str) {
        str = str.trim();
        return (!str || 0 === str.length);
    }

    withSalary(salary) {
        this.salary = salary;
        return this;
    }

    withFirstName(firstName) {
        this.firstName = firstName;
        return this;
    }

    withLastName(lastName) {
        this.lastName = lastName;
        return this;
    }

    withSuper(superRate) {
        this.superRate = superRate;
        return this;
    }

    validateSalary() {
        return !this.isEmpty(this.salary) && this.isRoundNumber(this.salary) && parseFloat(this.salary) >= 0;
    }

    validateFirstName() {
        return (!this.isEmpty(this.firstName) && !this.isNumeric(this.firstName));
    }

    validateLastName() {
        return (!this.isEmpty(this.lastName) && !this.isNumeric(this.lastName));
    }

    validateSuper() {
        return !this.isEmpty(this.superRate) && this.isNumeric(this.superRate) && parseFloat(this.superRate) >= 0;
    }

    validate() {

        let firstNameValidationResult = this.validateFirstName();
        let lastNameValidationResult = this.validateLastName();
        let salaryValidationResult = this.validateSalary();
        let superValidationResult = this.validateSuper();

        return {
            firstNameValidation: firstNameValidationResult,
            lastNameValidation: lastNameValidationResult,
            salaryValidation: salaryValidationResult,
            superValidation: superValidationResult,
            isEmployeeDataValid: () => {
                let isValid = (firstNameValidationResult &&
                    lastNameValidationResult &&
                    salaryValidationResult &&
                    superValidationResult);

                return isValid;
            }
        };

    }
}
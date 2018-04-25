import jsonValidator from "./json.validator";
export default function payslipDecorator(payslipJson) {

    const validator = jsonValidator(payslipJson);

    const decorator = {
        fullName: () => {

        	let firstName = validator.data().employeeFirstName;
        	let lastName = validator.data().employeeLastName;

        	if(typeof firstName !== 'undefined' && firstName !== null){
        		firstName = firstName.trim();
        	}

        	if(typeof lastName !== 'undefined' && lastName !== null){
        		lastName = lastName.trim();
        	}
            return firstName + " " + lastName;
        }
    };



    const decoratorWithValidatorFunctions = Object.assign(decorator,validator);

    return decoratorWithValidatorFunctions;

}
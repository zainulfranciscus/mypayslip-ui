import moment from "moment";

const firstName = 'random-employee-name' + moment().format();
const lastName  = 'random-employee-name' + moment().format();
export const firstNameID = '#firstName';
export const lastNameID = '#lastName';
export const salaryID = '#salary';
export const superRateID = '#superRate';
export const salary =  '60050';
export default function fillEmployeeForm(t){
	return t.typeText(firstNameID, firstName)
        .typeText(lastNameID, lastName)
        .typeText(salaryID, salary)
        .typeText(superRateID, '9');
}
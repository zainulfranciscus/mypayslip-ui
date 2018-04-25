import {
    ID_OF_ANNUAL_SALARY_TEXT_FIELD,
    ID_OF_SUPER_RATE_TEXT_FIELD,
    ID_OF_FIRST_NAME_TEXT_FIELD,
    ID_OF_LAST_NAME_TEXT_FIELD
} from '../employee/employee.form';
import taxDecorator from '../../data/tax.decorator';

export const NUMBER_OF_MONTHS_IN_A_YEAR = 12;

export default class PayslipCalculator {

    fullName(){

        let firstName = this.firstName();
        let lastName = this.lastName();

        if(typeof firstName !== 'undefined' && firstName !== null){
            firstName = firstName.trim();
        }

        if(typeof lastName !== 'undefined' && lastName !== null){
            lastName = lastName.trim();
        }

        return firstName + " " + lastName;
    }

    firstName(){
        return this.employeeFormValues[ID_OF_FIRST_NAME_TEXT_FIELD];
    }

    lastName(){
        return this.employeeFormValues[ID_OF_LAST_NAME_TEXT_FIELD];
    }

    annualSalary() {
        return parseFloat(this.employeeFormValues[ID_OF_ANNUAL_SALARY_TEXT_FIELD]);
    }

    superRate() {
        return parseFloat(this.employeeFormValues[ID_OF_SUPER_RATE_TEXT_FIELD]) / 100;
    }

    setEmployee(employee) {
        this.employeeFormValues = employee;
    }

    setTax(taxJson) {
        this.tax = taxDecorator(taxJson);
    }

    roundUpAboveZeroPoint5(aNumber) {
        return Math.round(aNumber, -1);
    }

    getGrossIncome() {
        const annualSalary = this.annualSalary();
        return this.roundUpAboveZeroPoint5(divide(annualSalary).by(NUMBER_OF_MONTHS_IN_A_YEAR));
    }

    getIncomeTax() {
        const yearlyTax = this.getYearlyTax();
        return this.roundUpAboveZeroPoint5(divide(yearlyTax).by(NUMBER_OF_MONTHS_IN_A_YEAR));
    }

    getNetIncome() {
        return this.getGrossIncome() - this.getIncomeTax();
    }

    getSuper() {
        const amountOfSuper = this.superRate();
        const grossIncome = this.getGrossIncome();

        return this.roundUpAboveZeroPoint5(grossIncome * amountOfSuper);
    }

    getPay() {
        return this.getNetIncome() - this.getSuper();
    }

    getTaxableIncome() {
        const taxPerDollarOver = this.tax.getTaxPerDollarOver();
        return this.annualSalary() - taxPerDollarOver;
    }

    getTaxForEachTaxableDollar() {
        const taxPerDollar = this.tax.getTaxPerDollarInCents();
        return this.getTaxableIncome() * taxPerDollar;
    }

    getYearlyTax() {
        const baseTax = this.tax.getBaseTax();
        return (baseTax + this.getTaxForEachTaxableDollar());
    }

}


export function divide(aNumber) {
    return {
        by: (divisor) => {
            return aNumber / divisor;
        }
    }
}
import PayslipCalculator, {
    NUMBER_OF_MONTHS_IN_A_YEAR,
    divide
} from "./payslip.calculator";

import {ID_OF_ANNUAL_SALARY_TEXT_FIELD, ID_OF_SUPER_RATE_TEXT_FIELD, ID_OF_FIRST_NAME_TEXT_FIELD,
    ID_OF_LAST_NAME_TEXT_FIELD} from '../employee/employee.form';
import taxDecorator from '../../data/tax.decorator';

const mockTaxJson = {
    "status": 200,
    "message": "Success",
    "responseObject": {
        "primaryKey": {"minTaxableIncome": 37001, "maxTaxableIncome": 80000},
        "baseTax": 3572,
        "taxPerDollarInCents": 32.5,
        "taxPerDollarOver": 37000,
        "maxTaxableIncome": 80000,
        "minTaxableIncome": 37001
    }
};


describe("unit tests for Payslip Calculator", () => {

    const annualSalary = 65000;
    const superRate = 9;
    const firstName = "John";
    const lastName = "Doe";
    const payslipCalc = new PayslipCalculator();

    let employeeFormValues = {};
   
    beforeEach(() => {
       
        employeeFormValues[ID_OF_ANNUAL_SALARY_TEXT_FIELD] = annualSalary;
        employeeFormValues[ID_OF_SUPER_RATE_TEXT_FIELD] = superRate;
        employeeFormValues[ID_OF_FIRST_NAME_TEXT_FIELD] = firstName;
        employeeFormValues[ID_OF_LAST_NAME_TEXT_FIELD] = lastName;

        payslipCalc.setEmployee(employeeFormValues);
        payslipCalc.setTax(mockTaxJson);
    });


    it("Gross Income should be equal to annual salary / 12",() => {
        expect(payslipCalc.getGrossIncome()).toBe(Math.round(divide(annualSalary).by(NUMBER_OF_MONTHS_IN_A_YEAR),-1));
    });

    it("Taxable income should be annual salary minus tax per dollar over ", () =>{
        const tax = taxDecorator(mockTaxJson);
        expect(payslipCalc.getTaxableIncome()).toBe(annualSalary - tax.getTaxPerDollarOver());
    });

    it("Amount of tax for each taxable income is taxPerDollarInCents multiply by taxable income", () => {
        const tax = taxDecorator(mockTaxJson);
        expect(payslipCalc.getTaxForEachTaxableDollar()).toBe(payslipCalc.getTaxableIncome() * tax.getTaxPerDollarInCents());
    });

    it("Yearly income tax should be base tax for a tax bracket plus taxForEachTaxableDollar", () => {
        const tax = taxDecorator(mockTaxJson);
        expect(payslipCalc.getYearlyTax()).toBe(tax.getBaseTax() + payslipCalc.getTaxForEachTaxableDollar())

    });
    
    it("getIncome tax should be yearly income tax divided by 12 months",() =>{
        const monthlyIncomeTax = divide(payslipCalc.getYearlyTax()).by(NUMBER_OF_MONTHS_IN_A_YEAR);
        expect(payslipCalc.getIncomeTax()).toBe(payslipCalc.roundUpAboveZeroPoint5(monthlyIncomeTax));
    });

    it("Net income should be gross income minus income tax", () => {
        expect(payslipCalc.getNetIncome()).toBe(payslipCalc.getGrossIncome() - payslipCalc.getIncomeTax());

    });

    it("super shold be gross income times super rate", () => {
        expect(payslipCalc.getSuper()).toBe(payslipCalc.roundUpAboveZeroPoint5(payslipCalc.getGrossIncome() * (superRate/100)));

    });

    it("pay should be net income minus super",() => {
        expect(payslipCalc.getPay()).toBe(payslipCalc.getNetIncome() - payslipCalc.getSuper());
    });

    it("should round up when decimals are more than 0.5",()=>{
        const expectedNumber = 3;
        expect(payslipCalc.roundUpAboveZeroPoint5(2.5)).toBe(expectedNumber);
        expect(payslipCalc.roundUpAboveZeroPoint5(2.999999999999)).toBe(expectedNumber);
    });

    it("should round up when decimals are less than or equal to 0.5",()=>{
        const expectedNumber = 2;
        expect(payslipCalc.roundUpAboveZeroPoint5(2.411111111111)).toBe(expectedNumber);
        expect(payslipCalc.roundUpAboveZeroPoint5(2.0999999999999)).toBe(expectedNumber);
    });

    it("fullName() should be equal to firstName + ' ' + lastName", () => {
         expect(payslipCalc.fullName()).toBe(firstName + ' ' + lastName);
    });

    it("Given that firstName and last name are null then fullName() should be equal to null null", () => {

        employeeFormValues[ID_OF_FIRST_NAME_TEXT_FIELD] = null;
        employeeFormValues[ID_OF_LAST_NAME_TEXT_FIELD] = null;

        payslipCalc.setEmployee(employeeFormValues);

        expect(payslipCalc.fullName()).toBe(null + ' ' + null);
    })


});
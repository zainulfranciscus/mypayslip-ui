import taxDecorator,{PERCENTAGE_DIVISOR,isTaxValid} from "./tax.decorator";
import {GOOD_HTTP_RESPONSE} from "./json.validator";
let taxJson;

const badResponse = {
    "status":400,
    "message":"Salary cannot be less than 0 \n",
    "responseObject":null
};

const NON_NUMERIC_VALUE = "xxx";

describe("Unit tests for taxDecorator", () => {
    let tax;
    beforeEach(() => {

        taxJson = {
            "status": GOOD_HTTP_RESPONSE,
            "message": "Success",
            "responseObject": {
                "baseTax": "540.00",
                "taxPerDollarInCents": "32.50",
                "taxPerDollarOver": "3752.00",
                "maxTaxableIncome": "18200.00",
                "minTaxableIncome": "10.00"
            }
        };

        tax = taxDecorator(taxJson);


    });
    it('Given a tax json, then the taxDecorator should return OK when status is 200', () => {
        expect(tax.ok()).toBeTruthy();
    });

    it('Give an a tax json with bad response, then ok() should return false', () => {
        const  taxWithBadResponse = taxDecorator(badResponse);
        expect(taxWithBadResponse.ok()).toBeFalsy();
    });

    it('getMinTaxableIncome() should return minTaxable in responseObject', () => {
        expect(tax.getMinTaxableIncome()).toBe(parseFloat(taxJson.responseObject.minTaxableIncome));
    });

    it('getBaseTax() should return baseTax in responseObject', () => {
        expect(tax.getBaseTax()).toBe(parseFloat(taxJson.responseObject.baseTax));
    });

    it('getTaxPerDollarOver() should return taxPerDollarOver in responseObject', () => {
        expect(tax.getTaxPerDollarOver()).toBe(parseFloat(taxJson.responseObject.taxPerDollarOver));
    });

    it('taxPerDollarInCents should return taxPerDollarInCents in responseObject', () => {
        expect(tax.getTaxPerDollarInCents()).toBe(parseFloat(taxJson.responseObject.taxPerDollarInCents)/PERCENTAGE_DIVISOR);
    });

    it('Given an empty tax object, then taxValidator should return false',()=>{
        expect(isTaxValid({})).toBeFalsy();
    });

    it('Given an tax object with a non numerical minTaxableIncome, then validator should return false',()=>{
        taxJson.responseObject["minTaxableIncome"] = NON_NUMERIC_VALUE;
        expect(isTaxValid( taxJson.responseObject)).toBeFalsy();
    });

    it('Given an tax object with a non numerical baseTax, then validator should return false',()=>{
        taxJson.responseObject["baseTax"] = NON_NUMERIC_VALUE;
        expect(isTaxValid( taxJson.responseObject)).toBeFalsy();
    });

    it('Given an tax object with a non numerical taxPerDollarInCents, then validator should return false',()=>{
        taxJson.responseObject["taxPerDollarInCents"] = NON_NUMERIC_VALUE;
        expect(isTaxValid( taxJson.responseObject)).toBeFalsy();
    });

    it('Given an tax object with a non numerical taxPerDollarOver, then validator should return false',()=>{
        taxJson.responseObject["taxPerDollarOver"] = NON_NUMERIC_VALUE;
        expect(isTaxValid( taxJson.responseObject)).toBeFalsy();
    });

    it('Given a complete tax object, then validator should return true',()=>{
        expect(isTaxValid(taxJson.responseObject)).toBeTruthy();
    })


});

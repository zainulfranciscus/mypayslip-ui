import jsonValidator from "./json.validator";

export const PERCENTAGE_DIVISOR = 100;

export default function taxDecorator(taxJson){

    const validator = jsonValidator(taxJson);

    const decorator =  {
        getMinTaxableIncome:() => {
            const minTaxableIncome = validator.data().minTaxableIncome;
            return parseFloat(minTaxableIncome);
        },
        getTaxPerDollarInCents:() => {
            const taxPerDollar = validator.data().taxPerDollarInCents;
            return parseFloat(taxPerDollar/PERCENTAGE_DIVISOR);
        },
        getBaseTax:() => {
            const baseTax = validator.data().baseTax;
            return parseFloat(baseTax);
        },
        getTaxPerDollarOver:() => {
          const taxPerDollarOver = validator.data().taxPerDollarOver;
          return parseFloat(taxPerDollarOver);
        },
        hasValidTaxData: ()=>{
            return validator.jsonExist() && validator.dataExist() && isTaxValid(validator.data());
        }

    }



    const decoratorWithValidatorFunctions = Object.assign(decorator,validator);

    return decoratorWithValidatorFunctions;
}

const isPropertyExist = (obj) =>{
    return typeof obj !== 'undefined' && obj !== null;
};

export function isTaxValid(tax) {

    if(!isPropertyExist(tax)) {
        return false;
    }

    const hasMinTaxableIncome = isPropertyExist(tax.minTaxableIncome) && !isNaN(tax.minTaxableIncome);
    const hasTaxPerDollarInCents = isPropertyExist(tax.taxPerDollarInCents) && !isNaN(tax.taxPerDollarInCents);
    const hasBaseTax = isPropertyExist(tax.baseTax) && !isNaN(tax.baseTax);
    const hasTaxPerDollarOver = isPropertyExist(tax.taxPerDollarOver) && !isNaN(tax.taxPerDollarOver);

    return hasMinTaxableIncome && hasTaxPerDollarInCents && hasBaseTax && hasTaxPerDollarOver;

}
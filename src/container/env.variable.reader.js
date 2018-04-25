export const QUESTION_MARK = '?';
const EQUAL_SIGN = '=';

export default class EnvironmentVariablesReader {


    taxAPIEndPoint() {
        return process.env.REACT_APP_REST_END_POINT_FOR_TAX;
    }

    payslipAPIEndPoint() {
        return process.env.REACT_APP_REST_END_POINT_FOR_PAYSLIP;
    }

    getSalaryEnvVar() {
        return process.env.REACT_APP_SALARY_REQUEST_PARAM;
    }

    salaryRequestParam(salary) {
        const salaryEnvVariable = this.getSalaryEnvVar();
        return this.createRequestParameter(salaryEnvVariable).withValue(salary);
    }

    getTaxURL(salary) {
        return this.addRequestParameter(this.salaryRequestParam(salary)).to(this.taxAPIEndPoint());
    }

    getPayslipURL(payslipRequestParameters) {

        const salaryRequestParameter = this.getSalaryEnvVar();
        const grossIncomeRequestParameter = process.env.REACT_APP_GROSS_INCOME_PARAM;
        const netIncomeRequestParameter = process.env.REACT_APP_NET_INCOME_PARAM;
        const superRateRequestParameter = process.env.REACT_APP_SUPER_RATE_PARAM;
        const payRequestParameter = process.env.REACT_APP_PAY_PARAM;
        const firstNameRequestParameter = process.env.REACT_APP_FIRST_NAME_PARAM;
        const lastNameRequestParameter = process.env.REACT_APP_LAST_NAME_PARAM;
        const incomeTaxRequestParameter = process.env.REACT_APP_INCOME_TAX_PARAM;

        const requestParameterList = [];
        requestParameterList.push(this.createRequestParameter(salaryRequestParameter).withValue(payslipRequestParameters.annualSalary));
        requestParameterList.push(this.createRequestParameter(grossIncomeRequestParameter).withValue(payslipRequestParameters.grossIncome));
        requestParameterList.push(this.createRequestParameter(netIncomeRequestParameter).withValue(payslipRequestParameters.netIncome));
        requestParameterList.push(this.createRequestParameter(superRateRequestParameter).withValue(payslipRequestParameters.superRate));
        requestParameterList.push(this.createRequestParameter(payRequestParameter).withValue(payslipRequestParameters.pay));
        requestParameterList.push(this.createRequestParameter(firstNameRequestParameter).withValue(payslipRequestParameters.firstName));
        requestParameterList.push(this.createRequestParameter(lastNameRequestParameter).withValue(payslipRequestParameters.lastName));
        requestParameterList.push(this.createRequestParameter(incomeTaxRequestParameter).withValue(payslipRequestParameters.incomeTax));

        const requestParametersForSavingPayslip = this.joinRequestParams(requestParameterList);
        return this.addRequestParameter(requestParametersForSavingPayslip).to(this.payslipAPIEndPoint());
    }

    joinRequestParams(requestParamsList){
        return requestParamsList.join("&");
    }

    addRequestParameter(requestParams){
        return {
            to: (apiEndPointUrl)=>{
                return apiEndPointUrl + QUESTION_MARK + requestParams;
            }
        }
    }
    createRequestParameter(requestParameter) {
        return {
            withValue: (requestParameterValue) => {
                return requestParameter + EQUAL_SIGN + requestParameterValue;

            }
        }
    }




}
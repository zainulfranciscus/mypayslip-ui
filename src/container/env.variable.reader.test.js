import EnvironmentVariablesReader, {QUESTION_MARK} from "./env.variable.reader";

describe("unit tests for env variable reader ", () => {

    const TAX_API_END_POINT = 'http://localhost:8080/payslip/tax';
    const PAYSLIP_API_END_POINT = 'http://localhost:8080/payslip/savePayslip';
    const environmentVariableReader = new EnvironmentVariablesReader();
    const salary = 18200;

    let salaryRequestParameter;
    let grossIncomeRequestParameter;
    let netIncomeRequestParameter;
    let superRateRequestParameter;
    let payRequestParameter;
    let firstNameRequestParameter;
    let lastNameRequestParameter;
    let incomeTaxRequestParameter;

    beforeEach(() => {
        process.env.REACT_APP_REST_END_POINT_FOR_TAX = TAX_API_END_POINT;
        process.env.REACT_APP_REST_END_POINT_FOR_PAYSLIP = PAYSLIP_API_END_POINT;
        process.env.REACT_APP_SALARY_REQUEST_PARAM = "annualSalary";
        process.env.REACT_APP_GROSS_INCOME_PARAM = "grossIncome";
        process.env.REACT_APP_NET_INCOME_PARAM = "netIncome";
        process.env.REACT_APP_SUPER_RATE_PARAM = "superRate";
        process.env.REACT_APP_PAY_PARAM = "pay";
        process.env.REACT_APP_FIRST_NAME_PARAM = "firstName";
        process.env.REACT_APP_LAST_NAME_PARAM = "lastName";
        process.env.REACT_APP_INCOME_TAX_PARAM = "incomeTax";

        salaryRequestParameter = environmentVariableReader.getSalaryEnvVar();
        grossIncomeRequestParameter = process.env.REACT_APP_GROSS_INCOME_PARAM;
        netIncomeRequestParameter = process.env.REACT_APP_NET_INCOME_PARAM;
        superRateRequestParameter = process.env.REACT_APP_SUPER_RATE_PARAM;
        payRequestParameter = process.env.REACT_APP_PAY_PARAM;
        firstNameRequestParameter = process.env.REACT_APP_FIRST_NAME_PARAM;
        lastNameRequestParameter = process.env.REACT_APP_LAST_NAME_PARAM;
        incomeTaxRequestParameter = process.env.REACT_APP_INCOME_TAX_PARAM;
        
    });

    it("TAX API END POINT should be equal to process.env.REACT_APP_REST_END_POINT_FOR_TAX", () => {
        expect(environmentVariableReader.taxAPIEndPoint()).toBe(TAX_API_END_POINT);
    });

    it("PAYSLIP API END POINT should be equal to process.env.REACT_APP_REST_END_POINT_FOR_PAYSLIP", () => {
        expect(environmentVariableReader.payslipAPIEndPoint()).toBe(PAYSLIP_API_END_POINT);
    });

    it("URL for fetching  Tax should be TAX_API_END_POINT with annualSalary as a request parameter", () => {
        expect(environmentVariableReader.getTaxURL(salary)).toBe(TAX_API_END_POINT + QUESTION_MARK + environmentVariableReader.salaryRequestParam(salary));
    });


    it("URL for fetching Payslip should be PAYSLIP_API_END_POINT with these request parameters", () => {
        const payslipRequestParameters = {
            annualSalary: 18200,
            grossIncome:2000,
            netIncome: 2500,
            superRate:9,
            pay:1400,
            firstName:"John",
            lastName:"McPhee",
            incomeTax: 2500
        };

        const requestParameterList = [];

        requestParameterList.push(
            environmentVariableReader.createRequestParameter(salaryRequestParameter)
            .withValue(payslipRequestParameters.annualSalary));
        requestParameterList.push(
            environmentVariableReader.createRequestParameter(grossIncomeRequestParameter)
            .withValue(payslipRequestParameters.grossIncome));
        requestParameterList.push(
            environmentVariableReader.createRequestParameter(netIncomeRequestParameter)
            .withValue(payslipRequestParameters.netIncome));
        requestParameterList.push(
            environmentVariableReader.createRequestParameter(superRateRequestParameter)
            .withValue(payslipRequestParameters.superRate));
        requestParameterList.push(
            environmentVariableReader.createRequestParameter(payRequestParameter)
            .withValue(payslipRequestParameters.pay));
        requestParameterList.push(
            environmentVariableReader.createRequestParameter(firstNameRequestParameter)
            .withValue(payslipRequestParameters.firstName));
        requestParameterList.push(
            environmentVariableReader.createRequestParameter(lastNameRequestParameter)
            .withValue(payslipRequestParameters.lastName));
        requestParameterList.push(
            environmentVariableReader.createRequestParameter(incomeTaxRequestParameter)
            .withValue(payslipRequestParameters.incomeTax));

        const requestParametersForSavingPayslip = environmentVariableReader.joinRequestParams(requestParameterList);

        expect(environmentVariableReader.getPayslipURL(payslipRequestParameters))
            .toBe(environmentVariableReader.addRequestParameter(requestParametersForSavingPayslip)
            .to(environmentVariableReader.payslipAPIEndPoint()));

    });

});
import React, {Component} from 'react';
import moment from "moment";
import payslipDecorator from "../../data/payslip.decorator";

const ID_FOR_PAYDATE_DIV = "Paydate_ID";
const ID_FOR_PAYDATE_LABEL = "Paydate_Label";
const PAYDATE_LABEL = "Pay Date";

const ID_FOR_PAY_FREQUENCY = "PayFrequency_ID";
const ID_FOR_PAY_FREQUENCY_LABEL = "PayFrequency_Label";
const FREQUENCY_LABEL = "Pay Frequency";
const PAY_FREQUENCY_VALUE = "Monthly";

const ID_FOR_ANNUAL_INCOME = "AnnualIncome_ID";
const ID_FOR_ANNUAL_INCOME_LABEL = "AnnualIncome_Label";
const ANNUAL_INCOME_LABEL = "Annual Income";

const ID_FOR_GROSS_INCOME = "GrossIncome_ID";
const ID_FOR_GROSS_INCOME_LABEL = "GrossIncome_Label";
const GROSS_INCOME_LABEL = "Gross Income";


const ID_FOR_INCOME_TAX = "IncomeTax_ID";
const ID_FOR_INCOME_TAX_LABEL = "IncomeTax_Label";
const INCOME_TAX_LABEL = "Income Tax";

const ID_FOR_NET_INCOME = "NetIncome_ID";
const ID_FOR_NET_INCOME_LABEL = "NetIncome_Label";
const NET_INCOME_LABEL = "Net Income";

const ID_FOR_SUPER = "Super_ID";
const ID_FOR_SUPER_LABEL = "Super_Label";
const SUPER_LABEL = "Super";

const ID_FOR_PAY = "Pay_ID";
const ID_FOR_PAY_LABEL = "Pay_Label";
const PAY_LABEL = "Pay";


export const ID_FOR_PAYSLIP_CONTAINER = "Payslip_Container";

export const DATE_FORMAT = 'DD MMM YYYY';


export default class Payslip extends Component {

    postPayslipToServer() {

        const calculator = this.props.calculator;

        const payslipRequestParameters = {
            annualSalary: calculator.annualSalary(),
            grossIncome:calculator.getGrossIncome(),
            netIncome: calculator.getNetIncome(),
            superRate: calculator.getSuper(),
            pay:calculator.getPay(),
            firstName:calculator.firstName(),
            lastName:calculator.lastName(),
            incomeTax: calculator.getIncomeTax()
        };

        this.props.savePayslip(payslipRequestParameters);
    }

    payslipHasBeenSaved() {
        const responseFromServer = this.props.payslipResponseFromServer;
        let decoratedPayslipResponse = payslipDecorator(responseFromServer);

        if (!decoratedPayslipResponse.jsonExist() || !decoratedPayslipResponse.ok()) {
            return null;
        }

        if(this.props.calculator.fullName() !== decoratedPayslipResponse.fullName()) {
            return null;
        }

        const calculator = this.props.calculator;
        const msg = "Payslip for " + calculator.fullName() + " has been saved";

        return (
            <div className="row payslip-saved">
                <div className="col-12">
                   {msg}
                </div>
            </div>
        );

    }

    render() {
        
        const payslipHasBeenSaved = this.payslipHasBeenSaved();

        if(typeof payslipHasBeenSaved !== 'undefined' && payslipHasBeenSaved !== null){
            return payslipHasBeenSaved;
        }

        return (
            <div id={ID_FOR_PAYSLIP_CONTAINER}>

                <h1>Payslip</h1>

                <p>{this.props.calculator.fullName()}</p>
                
                <div className="row grey-row">
                    <div className="col-6">
                        <div id={ID_FOR_PAYDATE_LABEL}><strong>{PAYDATE_LABEL}</strong></div>
                    </div>
                    <div className="col-6">
                        <div id={ID_FOR_PAYDATE_DIV}>{moment().format(DATE_FORMAT)}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div id={ID_FOR_PAY_FREQUENCY_LABEL}><strong>{FREQUENCY_LABEL}</strong></div>
                    </div>
                    <div className="col-6">
                        <div id={ID_FOR_PAY_FREQUENCY}>{PAY_FREQUENCY_VALUE}</div>
                    </div>
                </div>

                <div className="row grey-row">
                    <div className="col-6">
                        <div id={ID_FOR_ANNUAL_INCOME_LABEL}><strong>{ANNUAL_INCOME_LABEL}</strong></div>
                    </div>
                    <div className="col-6">
                        <div id={ID_FOR_ANNUAL_INCOME}>{this.props.calculator.annualSalary()}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div id={ID_FOR_GROSS_INCOME_LABEL}><strong>{GROSS_INCOME_LABEL}</strong></div>
                    </div>
                    <div className="col-6">
                        <div id={ID_FOR_GROSS_INCOME}>{this.props.calculator.getGrossIncome()}</div>
                    </div>
                </div>

                <div className="row grey-row">
                    <div className="col-6">
                        <div id={ID_FOR_INCOME_TAX_LABEL}><strong>{INCOME_TAX_LABEL}</strong></div>
                    </div>
                    <div className="col-6">
                        <div id={ID_FOR_INCOME_TAX}>{this.props.calculator.getIncomeTax()}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div id={ID_FOR_NET_INCOME_LABEL}><strong>{NET_INCOME_LABEL}</strong></div>
                    </div>
                    <div className="col-6">
                        <div id={ID_FOR_NET_INCOME}>{this.props.calculator.getNetIncome()}</div>
                    </div>
                </div>

                <div className="row grey-row">
                    <div className="col-6">
                        <div id={ID_FOR_SUPER_LABEL}><strong>{SUPER_LABEL}</strong></div>
                    </div>
                    <div className="col-6">
                        <div id={ID_FOR_SUPER}>{this.props.calculator.getSuper()}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div id={ID_FOR_PAY_LABEL}><strong>{PAY_LABEL}</strong></div>
                    </div>
                    <div className="col-6">
                        <div id={ID_FOR_PAY}>{this.props.calculator.getPay()}</div>
                    </div>
                </div>


                <div className="row justify-content-end">
                    <div className="col-6">
                        <button id="payButton" onClick={this.postPayslipToServer.bind(this)} className="btn btn-primary pay-btn">Pay
                        </button>
                    </div>
                </div>
                              
            </div>
        );
    }
}
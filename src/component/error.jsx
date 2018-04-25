import React, {Component} from 'react';
import taxDecorator from "../data/tax.decorator";
import payslipDecorator from "../data/payslip.decorator";

export const ERROR_MESSAGE_ID = "errorMessage";
export const SERVER_IS_UNAVAILABLE = "Server is unavailable to generate payslip";
export const SERVER_RETURNED_NO_TAX_DATA = "Server is unable to find a tax bracket for this employee. Payslip will not be generated";
export const SERVER_RETURNED_INVALID_TAX_DATA = "Tax bracket returned by the server is missing the minimum information to calculate a payslip.";
export default class Error extends Component {

    exist(aProp) {
        return (typeof aProp !== 'undefined');
    }

    isPostPayslipThrewAnError() {
        const wasErrorThrown = this.props.postPayslipError;
        return this.exist(wasErrorThrown) && this.props.postPayslipError;

    }

    isFetchTaxThrewAnError() {
        const wasErrorThrown = this.props.fetchTaxError;
        return this.exist(wasErrorThrown) && this.props.fetchTaxError;

    }

    errorDiv(message) {
        return (
            <div id={ERROR_MESSAGE_ID} className="row error-container">
                <div className="col-12">
                    {message}
                </div>
            </div>
        );
    }

    render() {


        const taxResponseJSON = taxDecorator(this.props.taxResponseJSON);
        const payslipResponseJSON = payslipDecorator(this.props.payslipResponseJSON);

        if (this.isFetchTaxThrewAnError() || this.isPostPayslipThrewAnError()) {
            return this.errorDiv(SERVER_IS_UNAVAILABLE);
        }


        if (taxResponseJSON.jsonExist() && !taxResponseJSON.ok()) {
            return this.errorDiv(taxResponseJSON.message());
        }

        if (taxResponseJSON.jsonExist() && !taxResponseJSON.hasValidTaxData()) {
            return this.errorDiv(SERVER_RETURNED_INVALID_TAX_DATA);
        }

        if (payslipResponseJSON.jsonExist() && !payslipResponseJSON.ok() && payslipResponseJSON.hasMessage()) {
            return this.errorDiv(payslipResponseJSON.message());
        }

        return null;
    }
}
import React, {Component} from 'react';

export const GETTING_TAX = "Please wait while I fetch tax information for this employee";
export const SAVING_PAYSLIP = "Please wait while I save this employee's payslip";
export const ID_OF_LOADER = "loader";

export default class Loading extends Component {

    getLoadingDiv(message){
        return (
            <div className="row loading-component" id={ID_OF_LOADER}>
                <div className="col-6">
                    {message}
                </div>
            </div>
        )
    }
    render() {
        const isLoadingTax = this.props.loadingTax;
        const isSavingPayslip = this.props.isSavingPayslip;


        if(this.props.hasError){
            return null;
        }

        if (isLoadingTax) {
            return this.getLoadingDiv(GETTING_TAX);
        }

        if (isSavingPayslip) {
            return this.getLoadingDiv(SAVING_PAYSLIP);
        }

        return null;
    }
}

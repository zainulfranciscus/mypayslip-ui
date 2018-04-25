import {combineReducers} from 'redux';
import { items, errorWhenGettingTax, loadingTax} from './tax.reducer';
import {postingPayslipHasErrored, isSavingPayslip, payslip} from './payslip.reducer';

export default combineReducers({
    items,
    errorWhenGettingTax,
    loadingTax,
    postingPayslipHasErrored,
    isSavingPayslip,
    payslip
});
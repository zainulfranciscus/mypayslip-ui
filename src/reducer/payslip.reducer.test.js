import {POST_PAYSLIP_RESULTED_IN_ERROR, PAYSLIP_IS_SAVED, SAVING_POST} from "../actions/payslip.actions";
import {postingPayslipHasErrored, isSavingPayslip, payslip} from "./payslip.reducer";

describe("unit test for payslip reducer ", () => {
    it("postingPayslipHasErrored reducer is called when the payslip UI send a POST request to a REST API. Given hasErrored is true, then " +
        "the state should has a matching hasErrored", () => {
        const payload = {
            type: POST_PAYSLIP_RESULTED_IN_ERROR,
            hasErrored: true
        };

        const state = postingPayslipHasErrored(false, payload);

        expect(state).toBe(payload.hasErrored);
    });

    it("isSavingPayslip reducer is called when the UI is waiting for a response from a REST API." +
        "isSavingPayslip reducer should return a matching isSaving state", () => {
        const payload = {
            type: SAVING_POST,
            isSaving: true
        };

        const state = isSavingPayslip(false, payload);

        expect(state).toBe(payload.isSaving);
    });

    it("payslip reducer return a matching state", () => {
        const payload = {
            type: PAYSLIP_IS_SAVED,
            payslip: {netIncome: 200}
        };

        const state = payslip(false, payload);

        expect(state).toBe(payload.payslip);
    })
});
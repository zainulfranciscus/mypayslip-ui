import {FETCH_TAX_RESULTS_IN_ERROR, LOADING_TAX, FETCHING_TAX_IS_SUCCESSFUL} from "../actions/tax.actions";
import {items, errorWhenGettingTax, loadingTax} from "./tax.reducer";

describe("tax.reducer unit tests ", () => {




    it("loadingTax reducer should return boolean equal to isLoading", () => {

        const payload = {
            type: LOADING_TAX,
            isLoading: true
        };

        const state = loadingTax(false, payload);

        expect(state).toBe(payload.isLoading);
    });

    it("items reducer should return an equivalent state", () => {

        const payload = {
            type: FETCHING_TAX_IS_SUCCESSFUL,
            items: {minIncome: 2000}
        };

        const state = items(false, payload);

        expect(state.minIncome).toBe(payload.items.minIncome);
    });

    it("errorWhenGettingTax reducer should return boolean equal to hasErrored", () => {
        const payload = {
            type: FETCH_TAX_RESULTS_IN_ERROR,
            hasErrored: true
        };
        const state = errorWhenGettingTax(false, payload);
        expect(state).toBe(payload.hasErrored);
    });


});
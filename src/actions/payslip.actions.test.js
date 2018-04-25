import {postPayslip,isPostingPayslip,savingPayslipIsSuccessful,erroredWhenPostingPayslip} from "./payslip.actions";
import fetchMock from "fetch-mock";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("payslip action unit tests", () => {

    const url = "url";
    const mockPayslip = {};
    let store;

    beforeEach(() => {
        fetchMock.reset();
        store = mockStore({});
    });

    afterEach(() => {
        fetchMock.restore()
    });

    it("Given that server responded OK, then the expected actions are isPostingPayslip and savingPayslipIsSuccessful ", () => {

        fetchMock.postOnce(url,{body:mockPayslip});
        const expectedActions = [isPostingPayslip(true),isPostingPayslip(false),savingPayslipIsSuccessful(mockPayslip)];
        return store.dispatch(postPayslip(url)).then(() => {
            const actions = store.getActions;
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("Given that server responded with HTTP Response 400, then the expected actions are isPostingPayslip and erroredWhenPostingPayslip", () => {

        fetchMock.mock(url,400,{method: 'POST'});
        const expectedActions = [isPostingPayslip(true),erroredWhenPostingPayslip(true)];
        return store.dispatch(postPayslip(url)).then(() => {
            const actions = store.getActions;
            expect(store.getActions()).toEqual(expectedActions);
        });
    });


});
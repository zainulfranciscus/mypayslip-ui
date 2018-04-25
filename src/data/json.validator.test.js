import jsonValidator, {GOOD_HTTP_RESPONSE} from "./json.validator";

describe("unit test for json.validator.", ()=>{

    const msg = 'success';

    it("given an empty object, then jsonExist should return true", ()=>{
        expect(jsonValidator({}).jsonExist()).toBeTruthy();
    });

    it("given a null object, then jsonExist should return false", ()=>{
        expect(jsonValidator(null).jsonExist()).toBeFalsy();
    });

    it("given status of other than 200, then ok should return false", () => {
        expect(jsonValidator({status:400}).ok()).toBeFalsy();
    });

    it("given status of other than 200, then ok should return false", () => {
        expect(jsonValidator({status:GOOD_HTTP_RESPONSE}).ok()).toBeTruthy();
    });

    it("given a json without message, then hasMessage should return false", () => {
        expect(jsonValidator({}).hasMessage()).toBeFalsy();
    });

    it("given a json with a message, then hasMessage should return false", () => {
        expect(jsonValidator({message:msg}).hasMessage()).toBeTruthy();
    });

    it("given a json with a message, then message should return a matching message", () => {
        expect(jsonValidator({message:msg}).message()).toBe(msg);
    });

    it("given an empty object, then dataExist should return false", ()=>{
        expect(jsonValidator({}).dataExist()).toBeFalsy();
    });

    it("given a responseObject, then data should return a matching object", ()=>{
        const json = {
            responseObject:{
                minIncome:200
            }
        };
        expect(jsonValidator(json).data()).toEqual(json.responseObject);
    });

    it("given a null , then dataExist should return false", ()=>{
        expect(jsonValidator({responseObject: null}).dataExist()).toBeFalsy();
    });
});
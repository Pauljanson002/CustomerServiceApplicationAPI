const job_posting_queries = require('../../../resolvers/queries/user_queries')
const models = require("../../../models");
import mockAxios from "axios";
const searchServiceProviderbyProfessioninProvince= require('../../../resolvers/queries/user_queries');
describe("Given user queries",()=>{
    describe("when called searchServiceProviderbyProfessioninProvince function",  ()=>{
        it("should find all service providers of a profession if city and province is not given", async ()=> {
            
        });

        it("should find service providers of a profession in the province, if province is given", function() {
            
        });

        it("should find service providers of a profession in the city, if city is given", function() {
            
        });
    });

  
    describe("when called getUserbyId function",  ()=>{
        it("should find the user with id", async ()=> {
            
        });

    });


});
const job_posting_mutations = require("../../../../resolvers/mutations/job_posting_mutations")

describe("Given create job posting mutation",()=>{
  describe("when called with arguments",()=>{
    it("should create function with all the arguments", async function() {
      const args = {
        heading:"Heading",
        province:"Province",
        city:"city",
        town:"town",
        category:"category",
        skills:"skills",
        description:"description",
        lowerLimit:"lowerlimit",
        upperLimit:"upperlimit",
        payMethod:"paymethod"
      }
      const mockfn = jest.fn()
      const user = {
        id:1
      }
      const models = {
        JobPosting:{
          create:mockfn
        },
        User:{
          findById:(id)=>{
            return {
              _id:id
            }
          }
        }
      }
      await job_posting_mutations.createJobPosting({},args,{models,user})
      expect(mockfn).toBeCalledWith({"budgetRange": {"lowerLimit": "lowerlimit", "upperLimit": "upperlimit"}, "category": "category", "description": "description", "heading": "Heading", "location": {"city": "city", "province": "Province", "town": "town"}, "payMethod": "paymethod", "postedBy": 1, "skills": "skills"})
    });
  })
})
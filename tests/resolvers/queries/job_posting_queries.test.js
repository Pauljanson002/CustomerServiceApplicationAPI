const job_posting_queries = require('../../../resolvers/queries/job_posting_queries')
const models = require("../../../models")
describe("Given Job posting queries",()=>{
  describe("when called jobs function",()=>{
    it("should call the find function of job postings", function() {
      const mock = jest.fn()
      const models = {
        JobPosting:{
          find:mock
        }
      }
      job_posting_queries.jobs({},{},{models}).then((data)=>{
        expect(mock).toHaveBeenCalled();
      })
    });
  })
  describe("when called job posting feed function",()=>{
    it("should throw authentication error if no user given",async ()=>{
      const models = {}
      await expect(job_posting_queries.jobPostingFeed({},{},{})).rejects.toThrow("Please login to continue")
    })
  })
})

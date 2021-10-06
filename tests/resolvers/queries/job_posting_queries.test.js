const job_posting_queries = require('../../../resolvers/queries/job_posting_queries')
describe("Job posting queries",()=>{
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
})
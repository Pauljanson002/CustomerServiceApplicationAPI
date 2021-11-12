const job_posting_queries = require('../../../../resolvers/queries/job_posting_queries')
const models = require("../../../../models")
jest.mock("../../../../resolvers/util",()=>{
  return {
    checkPermission:jest.fn().mockResolvedValue({
      _id:1
    })
  }
})

describe("Given jobs function",()=>{
  describe("when called",()=>{
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

describe("Given jobposting feed function",()=>{
  describe("when called without user",()=>{
    it("should throw authentication error", async function() {
      const models = {}
      await expect(job_posting_queries.jobPostingFeed({},{},{})).rejects.toThrow("Please login to continue")
    });
  })
  describe("when called with user with service_provider role",()=>{
    it("should call the find function with correct query", async function() {
      const args = {
        province:"Province",
        city:"City",
        town:"Town",
        category:"Category"
      }
      const mock = jest.fn().mockReturnValue({
        sort:()=>{
          return {
            limit:()=>{
              return 1
            }
          }
        }
      })
      const user = {
        id:1
      }
      const models = {
        User:{
          findById:(id)=>{
            return {
              roles:["service_provider"],
              _id:id
            }
          }
        },
        JobPosting:{
          find:mock
        }
      }
      const query = {location:{province:"Province",city:"City",town:"Town"},category:"Category"}
      await job_posting_queries.jobPostingFeed({},args,{models,user}).then((data)=>{
        console.log(data)
      })
      expect(mock).toBeCalledWith({"category": "Category", "location": {"city": "City", "province": "Province", "town": "Town"},"state":"open", "postedBy":  {
       "$ne": 1,
        }})

    });
  })
})

describe("Given jobPosting function",()=>{
  describe("when called id as argument",()=>{
    it("should call the findById of the database with id as argument", function() {
      const mockfn = jest.fn().mockReturnValue({
        sort:()=>{
          return {
            limit:()=>{
              return 1
            }
          }
        }
      })
      const models ={
        JobPosting:{
          findById:mockfn
    }
      }
      job_posting_queries.jobPosting({},{id:1},{models}).then((data)=>{
        console.log(data)
      })
      expect(mockfn).toBeCalledWith(1)
    });
  })
})



describe("Give getMyJobPosting function",()=>{
  // describe("when called without user",()=>{
  //
  //   it("should throw authentication error",async ()=>{
  //     const mockfn = jest.fn().mockReturnValue({
  //       sort:()=>{
  //         return {
  //           limit:()=>{
  //             return 1
  //           }
  //         }
  //       }
  //     })
  //     const models ={
  //       JobPosting: {
  //         find: mockfn
  //       }}
  //     await expect(job_posting_queries.getMyJobPostings({},{},{models})).rejects.toThrow("You are not logged in")
  //   })
  // })
  describe("when called with user with service requester role and state",()=>{
    it("should call find function with correct arguments", async function() {
      const args = {state:"state"}
      const mockfn = jest.fn()
      const models = {
        JobPosting:{
          find:mockfn.mockReturnValue({
            sort:()=>true
          })
        }
      }
      const user = {
        id:1
      }
      await job_posting_queries.getMyJobPostings({},args,{models,user})
      expect(mockfn).toBeCalledWith({"postedBy": 1, "state": "state"})
    });
  })

})

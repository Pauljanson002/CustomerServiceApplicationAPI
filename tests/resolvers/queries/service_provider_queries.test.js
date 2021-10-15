const service_provider_queries = require('../../../resolvers/queries/service_provider_queries');

describe("Service Provider queries",()=>{
    describe("when called pendingServiceRequestsForMe function",()=>{
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequest:{
            find:mock
          }
        }
        service_provider_queries.pendingServiceRequestsForMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled();
        })
      });
    })
    describe("when called pendingServiceRequestsForMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_provider_queries.pendingServiceRequestsForMe({},{},{})).rejects.toThrow("Please login to continue")
      });
    })


    describe("when called acceptedServiceRequestsForMe function",()=>{
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequest:{
            find:mock
          }
        }
        service_provider_queries.acceptedServiceRequestsForMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled();
        })
      });
    })
    describe("when called acceptedServiceRequestsForMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_provider_queries.acceptedServiceRequestsForMe({},{},{})).rejects.toThrow("Please login to continue")
      });
    })

    describe("when called startedServiceRequestsForMe function",()=>{
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequest:{
            find:mock
          }
        }
        service_provider_queries.startedServiceRequestsForMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled();
        })
      });
    })
    describe("when called completedServiceRequestsForMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_provider_queries.completedServiceRequestsForMe({},{},{})).rejects.toThrow("Please login to continue")
      });
    })

    describe("when called startedServiceRequestsForMe function",()=>{
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequest:{
            find:mock
          }
        }
        service_provider_queries.startedServiceRequestsForMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled();
        })
      });
    })
    describe("when called completedServiceRequestsForMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_provider_queries.completedServiceRequestsForMe({},{},{})).rejects.toThrow("Please login to continue")
      });
    })

    describe("when called canceledServiceRequestsForMe function",()=>{
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequest:{
            find:mock
          }
        }
        service_provider_queries.canceledServiceRequestsForMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled();
        })
      });
    })
    describe("when called canceledServiceRequestsForMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_provider_queries.canceledServiceRequestsForMe({},{},{})).rejects.toThrow("Please login to continue")
      });
    })
 

  })
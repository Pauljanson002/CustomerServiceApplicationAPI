const service_requester_queries = require('../../../../resolvers/queries/service_requester_queries');

describe("Service Requester queries",()=>{
    describe("when called pendingServiceRequestsbyMe function",()=>{
      it("should call the find function with correct parameters", function() {
        const args={}
        const mock = jest.fn()
        const models = {
          ServiceRequests:{
            find:mock.mockReturnValue({
              limit:()=>{ return 100}
            })
          }
        }

        const user={
          id:1
        }
        service_requester_queries.pendingServiceRequestsbyMe({},{},{models,user})
        expect(mock).toHaveBeenCalledWith({"state":"Pending", "requester_id":1})
          
        
      });
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequests:{
            find:mock
          }
        }
        service_requester_queries.pendingServiceRequestsbyMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled( {limit:()=>{
          
            return 100
          }});
        })
      });

      
    })
    describe("when called pendingServiceRequestsbyMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_requester_queries.pendingServiceRequestsbyMe({},{},{})).rejects.toThrow('You are not a registered user').catch(e=>console.log(e))
      });
    })


    describe("when called acceptedServiceRequestsbyMe function",()=>{
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequests:{
            find:mock
          }
        }
        service_requester_queries.acceptedServiceRequestsbyMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled();
        })
      });

      it("should call the find function with correct parameters", function() {
        const args={}
        const mock = jest.fn()
        const models = {
          ServiceRequests:{
            find:mock.mockReturnValue({
              limit:()=>{ return 100}
            })
          }
        }

        const user={
          id:1
        }
        service_requester_queries.acceptedServiceRequestsbyMe({},{},{models,user})
        expect(mock).toHaveBeenCalledWith({"state":"Accepted", "requester_id":1})
          
        
      });
    })
    describe("when called acceptedServiceRequestsbyMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_requester_queries.acceptedServiceRequestsbyMe({},{},{})).rejects.toThrow("You are not a registered user")
      });
    })

    describe("when called startedServiceRequestsbyMe function",()=>{
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequests:{
            find:mock
          }
        }
        service_requester_queries.startedServiceRequestsbyMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled();
        })
      });

      it("should call the find function with correct parameters", function() {
        const args={}
        const mock = jest.fn()
        const models = {
          ServiceRequests:{
            find:mock.mockReturnValue({
              limit:()=>{ return 100}
            })
          }
        }

        const user={
          id:1
        }
        service_requester_queries.startedServiceRequestsbyMe({},{},{models,user})
        expect(mock).toHaveBeenCalledWith({"state":"Started", "requester_id":1})
          
        
      });
    })
    describe("when called completedServiceRequestsbyMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_requester_queries.completedServiceRequestsbyMe({},{},{})).rejects.toThrow("You are not a registered user")
      });
    })

   
    describe("when called canceledServiceRequestsbyMe function",()=>{
      it("should call the find function of Service Requests", function() {
        const mock = jest.fn()
        const models = {
          ServiceRequests:{
            find:mock
          }
        }
        service_requester_queries.canceledServiceRequestsbyMe({},{},{models}).then((data)=>{
          const user = {}
          expect(mock).toHaveBeenCalled();
        })
      });

      it("should call the find function with correct parameters", function() {
        const args={}
        const mock = jest.fn()
        const models = {
          ServiceRequests:{
            find:mock.mockReturnValue({
              limit:()=>{ return 100}
            })
          }
        }

        const user={
          id:1
        }
        service_requester_queries.canceledServiceRequestsbyMe({},{},{models,user})
        expect(mock).toHaveBeenCalledWith({"state":"Canceled", "requester_id":1})
          
        
      });
    })
    describe("when called canceledServiceRequestsbyMe function",()=>{
      it("should throw authentication error if no user given",async ()=>{
        const models = {}
        await expect(service_requester_queries.canceledServiceRequestsbyMe({},{},{})).rejects.toThrow("You are not a registered user")
      });
    })
 

  })
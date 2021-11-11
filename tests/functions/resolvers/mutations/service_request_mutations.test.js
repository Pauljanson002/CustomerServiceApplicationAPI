const service_request_mutations = require("../../../../resolvers/mutations/service_request_mutations")
describe("Given  Service Request Mutation ", ()=>{
    describe("When the rescheduleServiceRequest function is called",()=>{
        it("should update function with all the arguments", async function (){
            const args={
               id:1,
               date:"date",
               time:"time",
               

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                User:{
                    findById:(id)=>{
                      return {
                        roles:["service_requester"],
                        _id:id
                      }
                    }
                  },
                ServiceRequests:{
                    findOneAndUpdate:mock
                },
               
            }

            await service_request_mutations.rescheduleServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"_id":1},{"$set":{"date":"date","time":"time"}},{"new":false})
        });
    });


    describe("When the editServiceRequest function is called",()=>{
        it("should update function with all the arguments", async function (){
            const args={
               id:1,
               task:"task",
              
               

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                User:{
                    findById:(id)=>{
                      return {
                        roles:["service_requester"],
                        _id:id
                      }
                    }
                  },
                ServiceRequests:{
                    findOneAndUpdate:mock
                },
               
            }

            await service_request_mutations.editServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"_id":1},{"$set":{"task":"task"}},{"new":false})
        });

    });

    describe("When the feedbackServiceRequest function is called",()=>{
        it("should update function with all the arguments", async function (){
            const args={
               id:1,
               requestRating:"requestRating",
               requestReview:"requestReview",

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                User:{
                    findById:(id)=>{
                      return {
                        roles:["service_requester"],
                        _id:id
                      }
                    }
                  },
                ServiceRequests:{
                    findOneAndUpdate:mock
                },
               
            }

            await service_request_mutations.feedbackServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"_id":1},{"$set":{"requestRating":"requestRating","requestReview":"requestReview","state":"Reviewed"}},{"new":false})
        });
        
    });

    describe("When the customerfeedbackServiceRequest function is called",()=>{
        it("should update function with all the arguments", async function (){
            const args={
               id:1,
               customerRating:"customerRating",
               customerReview:"customerReview",

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                User:{
                    findById:(id)=>{
                      return {
                        roles:["service_provider"],
                        _id:id
                      }
                    }
                  },
                ServiceRequests:{
                    findOneAndUpdate:mock
                },
               
            }

            await service_request_mutations.customerfeedbackServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"_id":1},{"$set":{"customerRating":"customerRating","customerReview":"customerReview"}},{"new":false})
        });
        
    });

    describe("When the cancelServiceRequest function is called",()=>{
        it("should update function with all the arguments", async function (){
            const args={
               id:1,
               

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                User:{
                    findById:(id)=>{
                      return {
                        roles:["service_requester"],
                        _id:id
                      }
                    }
                  },
                ServiceRequests:{
                    findOneAndUpdate:mock
                },
               
            }

            await service_request_mutations.cancelServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"_id":1},{"$set":{"state":"Canceled"}},{"new":false})
        });
        
    });

    describe("When the rejectServiceRequest function is called",()=>{
        it("should update function with all the arguments", async function (){
            const args={
               id:1,
               

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                User:{
                    findById:(id)=>{
                      return {
                        roles:["service_provider"],
                        _id:id
                      }
                    }
                  },
                ServiceRequests:{
                    findOneAndUpdate:mock
                },
               
            }

            await service_request_mutations.rejectServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"_id":1},{"$set":{"state":"Rejected"}},{"new":false})
        });
        
    });

    describe("When the startServiceRequest function is called",()=>{
        it("should update function with all the arguments", async function (){
            const args={
               id:1,
               

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                User:{
                    findById:(id)=>{
                      return {
                        roles:["service_provider"],
                        _id:id
                      }
                    }
                  },
                ServiceRequests:{
                    findOneAndUpdate:mock
                },
               
            }

            await service_request_mutations.startServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"_id":1},{"$set":{"state":"Started"}},{"new":false})
        });
        
    });

    describe("When the completeServiceRequest function is called",()=>{
        it("should update function with all the arguments", async function (){
            const args={
               id:1,
               

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                User:{
                    findById:(id)=>{
                      return {
                        roles:["service_provider"],
                        _id:id
                      }
                    }
                  },
                ServiceRequests:{
                    findOneAndUpdate:mock
                },
               
            }

            await service_request_mutations.completeServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"_id":1},{"$set":{"state":"Completed"}},{"new":false})
        });

        describe("When the confirmCashPayment function is called",()=>{
            it("should update function with all the arguments", async function (){
                const args={
                   id:1,
                   
    
                }
    
                const mock=jest.fn()
                const user={
                    id:1
                }
                const models={
                    User:{
                        findById:(id)=>{
                          return {
                            roles:["service_provider"],
                            _id:id
                          }
                        }
                      },
                    ServiceRequests:{
                        findOneAndUpdate:mock
                    },
                   
                }
    
                await service_request_mutations.confirmCashPayment({},args,{models,user})
                expect(mock).toBeCalledWith({"_id":1},{"$set":{"hasPaid":true}},{"new":false})
            });
        });

            describe("When the acceptServiceRequest function is called",()=>{
                it("should update function with all the arguments", async function (){
                    const args={
                       id:1,
                       
        
                    }
        
                    const mock=jest.fn()
                    const user={
                        id:1
                    }
                    const models={
                        User:{
                            findById:(id)=>{
                              return {
                                roles:["service_provider"],
                                _id:id
                              }
                            }
                          },
                        ServiceRequests:{
                            findOneAndUpdate:mock
                        },
                       
                    }
        
                    await service_request_mutations.acceptServiceRequest({},args,{models,user})
                    expect(mock).toBeCalledWith({"_id":1},{"$set":{"state":"Accepted"}},{"new":false})
                });

            });
        
    });
})
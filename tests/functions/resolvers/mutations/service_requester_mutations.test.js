const service_requester_mutations = require("../../../../resolvers/mutations/service_requester_mutations")

describe("Given Create Service Request Mutation ", ()=>{
    describe("When the function is called",()=>{
        it("should create function with all the arguments", async function (){
            const args={
               provider_id:2,
               date:"date",
               time:"time",
               payMethod:"0",
               task:"task",
               min_price:"min",
               max_price:"max",
               location:"location",
               image1:"img1",
               image2:"img2",
               image3:"img3"

            }

            const mock=jest.fn()
            const user={
                id:1
            }
            const models={
                ServiceRequests:{
                    create:mock
                },
                User:{
                    findById:(id)=>{
                        return {
                            _id:id,
                            roles:["service_provider"]
                        }
                    }
                }
            }

            await service_requester_mutations.createServiceRequest({},args,{models,user})
            expect(mock).toBeCalledWith({"requester_id":1,"provider_id":2,"date":"date","time":"time","payMethod":"0","task":"task","min_price":"min","max_price":"max","location":"location","image1":"img1","image2":"img2","image3":"img3"})
        });
    })
})
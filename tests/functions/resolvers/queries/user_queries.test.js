const user_queries = require('../../../../resolvers/queries/user_queries');

describe('User queries', () => {
  describe('when called searchServiceProviderbyProfessioninProvince', () => {
    it('should call the function of searchServiceProviderbyProfessioninProvince', function() {
      const mock = jest.fn();
      const models = {
        User: {
          find: mock
        }
      };
      user_queries
        .searchServiceProviderbyProfessioninProvince(
          {},
          { profession: 'Plumber', province: 'Western' },
          { models }
        )
        .then(data => {
          expect(mock).toHaveBeenCalled();
        });
    });

    it('should throw authentication error when called without user', async function() {
      const mock = jest.fn();
      const models = {
        User: {
          find: mock
        }
      };
      const user = {_id:null};
      await expect(
        user_queries.searchServiceProviderbyProfessioninProvince(
          {},
          {},
          { models, user }
        )
      ).rejects.toThrow('You are not registered');
    });

    it('should call the find function with correct query', async function() {
      const args = {
        profession: 'Plumber',
        profile_state: 'approved'
      };

      const mock = jest.fn().mockRejectedValue({
        sort: () => {
          return {
            limit: () => {
              return 1;
            }
          };
        }
      });
      const user = {
        id: 1
      };

      const models = {
        User: {
          find: mock
        }
      };

      await user_queries
        .searchServiceProviderbyProfessioninProvince({}, args, { models, user })
        .then(data => {
          console.log(data);
        });
      expect(mock).toBeCalledWith({
        profession: 'Plumber',
        profile_state: 'approved'
      });
    });

    it('should call the ind function with correct query', async function() {
      const args = {
        profession: 'Plumber',
        profile_state: 'approved'
      };

      const mock = jest.fn().mockRejectedValue({
        sort: () => {
          return {
            limit: () => {
              return 1;
            }
          };
        }
      });
      const user = {
        id: 1
      };

      const models = {
        User: {
          find: mock
        }
      };

      await user_queries
        .searchServiceProviderbyProfessioninProvince({}, args, { models, user })
        .then(data => {
          console.log(data);
        });
      expect(mock).toBeCalledWith({
        profession: 'Plumber',
        profile_state: 'approved'
      });
    });

    it('should be called with correct parameters (Only profession)', async function() {
      const args = {
        profession: 'profession',
        province: '',
        city: '',
        rating: ''
      };
      const mockfn = jest.fn();
      const models = {
        User: {
          find: mockfn.mockReturnValue({
            sort: () => true
          })
        }
      };
      const user = {
        id: 1
      };

      await user_queries.searchServiceProviderbyProfessioninProvince({},args,{models,user})
      expect(mockfn).toBeCalledWith({"profession": "profession", "profile_state": "approved"})


    });

    it('should be called with correct parameters (only profession and province)', async function() {
        const args = {
          profession: 'profession',
          province: 'province',
          city: '',
          rating: ''
        };
        const mockfn = jest.fn();
        const models = {
          User: {
            find: mockfn.mockReturnValue({
              sort: () => true
            })
          }
        };
        const user = {
          id: 1
        };
  
        await user_queries.searchServiceProviderbyProfessioninProvince({},args,{models,user})
        expect(mockfn).toBeCalledWith({"profession": "profession", "profile_state": "approved","province": 'province'})
  
  
      });

      it('should be called with correct parameters (only profession and province, city)', async function() {
        const args = {
          profession: 'profession',
          province: 'province',
          city: 'city',
          rating: ''
        };
        const mockfn = jest.fn();
        const models = {
          User: {
            find: mockfn.mockReturnValue({
              sort: () => true
            })
          }
        };
        const user = {
          id: 1
        };
  
        await user_queries.searchServiceProviderbyProfessioninProvince({},args,{models,user})
        expect(mockfn).toBeCalledWith({"profession": "profession", "profile_state": "approved","province": 'province', "city":"city"})
  
  
      });

      it('should be called with correct parameters (only profession and city)', async function() {
        const args = {
          profession: 'profession',
          province: '',
          city: 'city',
          rating: ''
        };
        const mockfn = jest.fn();
        const models = {
          User: {
            find: mockfn.mockReturnValue({
              sort: () => true
            })
          }
        };
        const user = {
          id: 1
        };
  
        await user_queries.searchServiceProviderbyProfessioninProvince({},args,{models,user})
        expect(mockfn).toBeCalledWith({"profession": "profession", "profile_state": "approved","city": 'city'})
  
  
      });
      it('should be called with correct parameters (only profession and rating)', async function() {
        const args = {
          profession: 'profession',
          province: '',
          city: '',
          rating: '0'
        };
        const mockfn = jest.fn();
        const models = {
          User: {
            find: mockfn.mockReturnValue({
              sort: () => true
            })
          }
        };
        const user = {
          id: 1
        };
  
        await user_queries.searchServiceProviderbyProfessioninProvince({},args,{models,user})
        expect(mockfn).toBeCalledWith({"profession": "profession", "profile_state": "approved"})
  
  
      });
  });

  describe('when called getUserbyId', () => {
    it("should call the find function with correct query", async function() {
      const args={
        id:"id"
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
            findById:mock
        }
      }

      await user_queries.getUserbyId({},args,{models,user}).then((data)=>{
        console.log(data)
      })
      expect(mock).toBeCalledWith("id");

  });
});

  describe('when called getReviewedRequestsofUser', () => {
    it("should call the find function with correct query", async function() {
      const args={
        id:"id"
      }
      const mock = jest.fn().mockReturnValue({
        limit:()=>{
          
              return 100
            }
          
        
      })
      const user = {
        id:1
      }

      const models = {
      
        
        ServiceRequests:{
            find:mock
        }
      }

      await user_queries.getReviewedRequestsofUser({},args,{models,user}).then((data)=>{
        console.log(data)
      })
      expect(mock).toBeCalledWith({"provider_id":"id", "state":"Reviewed"});

  });
});


});

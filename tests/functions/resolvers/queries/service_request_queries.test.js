const service_request_queries = require('../../../../resolvers/queries/service_request_queries');

describe('Service Request queries', () => {
  describe('when called getServiceRequestByID', () => {
    it('should call the function of getServiceRequestByID', function() {
      const mock = jest.fn();
      const models = {
        ServiceRequests: {
            findById: mock
        }
      };
      service_request_queries
        .getServiceRequestByID(
          {},
          { id: 1 },
          { models }
        )
        .then(data => {
          expect(mock).toHaveBeenCalled();
        });
    });

    it('should call the find function with correct parameter', function() {
        const args={
            id:1
        }
        const mock = jest.fn();
        const models = {
          ServiceRequests: {
              findById: mock
          }
        };

        const user={
            id:2
        }
        service_request_queries.getServiceRequestByID({}, args,{ models,user })
        expect(mock).toBeCalledWith(args.id);
      });

});

});

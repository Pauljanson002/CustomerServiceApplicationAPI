const service_types_queries = require('../../../../resolvers/queries/service_types_queries');

describe('Service types queries', () => {
  describe('when called viewAllServiceTypes', () => {
    it('should call the function of viewAllServiceTypes', function() {
      const mock = jest.fn();
      const models = {
        Service: {
          find: mock
        }
      };
      service_types_queries
        .viewAllServiceTypes(
          {},
          {},
          { models }
        )
        .then(data => {
          expect(mock).toHaveBeenCalled();
        });
    });
   });
});
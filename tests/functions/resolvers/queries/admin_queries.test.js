const admin_queries = require('../../../../resolvers/queries/admin_queries');

describe('System Admin queries', () => {
  describe('when called viewAllComplaints', () => {
    it('should call the function of viewAllComplaints', function() {
      const user = {
        id: 1
      };
      const mock = jest.fn();
      const models = {
        Complaint: {
          find: mock
        }
      };
      admin_queries.viewAllComplaints({}, {}, { models, user }).then(data => {
        expect(mock).toHaveBeenCalled();
      });
    });
  });

  describe('when called viewAllServices', () => {
    it('should call the function of viewAllServices', function() {
      const user = {
        id: 1
      };
      const mock = jest.fn();
      const models = {
        Service: {
          find: mock
        }
      };
      admin_queries.viewAllServices({}, {}, { models, user }).then(data => {
        expect(mock).toHaveBeenCalled();
      });
    });
  });

  describe('when called takeServiceProviders', () => {
    it('should call the function of takeServiceProviders', function() {
      const user = {
        id: 1
      };
      const mock = jest.fn();
      const models = {
        User: {
          find: mock
        }
      };
      admin_queries
        .takeServiceProviders({}, {}, { models, user })
        .then(data => {
          expect(mock).toHaveBeenCalled();
        });
    });
  });

  describe('when called takeUsers', () => {
    it('should call the function of takeUsers', function() {
      const args = {
        accountState: 'testState'
      };
      const user = {
        id: 1
      };
      const mock = jest.fn();
      const models = {
        User: {
          find: mock
        }
      };
      admin_queries.takeUsers({}, args, { models, user }).then(data => {
        expect(mock).toBeCalledWith({ profile_state: args.accountState });
      });
    });
  });
});

const system_admin_mutations = require('../../../../resolvers/mutations/admin_mutations');
const mongoose = require('mongoose');

describe('Given Admin Mutation ', () => {
  describe('When the createService function is called', () => {
    it('should create function with all the arguments', async function() {
      const args = {
        service_name: 'testService',
        description: 'testDescription',
        user_type: 'testUserType',
        image: 'testImageUrl'
      };

      const mock = jest.fn();
      const user = {
        id: 1
      };
      const models = {
        Service: {
          create: mock
        },
        User: {
          findById: id => {
            return {
              _id: id
            };
          }
        }
      };

      await system_admin_mutations.createService({}, args, { models, user });
      expect(mock).toBeCalledWith({
        service_name: 'testService',
        description: 'testDescription',
        user_type: 'testUserType',
        image: 'testImageUrl'
      });
    });
  });

  describe('When the setProfileState function is called', () => {
    it('should update function with all the arguments', async function() {
      const args = {
        providerID: 1,
        state: 'TestingState'
      };

      const mock = jest.fn();
      const user = {
        id: 1
      };
      const models = {
        User: {
          findById: id => {
            return {
              roles: ['service_requester'],
              _id: id
            };
          },
          findOneAndUpdate: mock
        }
      };

      await system_admin_mutations.setProfileState({}, args, { models, user });
      expect(mock).toBeCalledWith(
        { _id: 1 },
        {
          $set: {
            profile_state: 'TestingState',
            service_providing_status: true
          },
          $addToSet: {
            roles: 'service_provider'
          }
        },
        { new: true }
      );
    });
  });

  describe('When the removeServiceProvider function is called', () => {
    it('should update function with all the arguments', async function() {
      const args = {
        id: 1
      };

      const mock = jest.fn();
      const user = {
        id: 1
      };
      const models = {
        User: {
          findById: id => {
            return {
              _id: id
            };
          },
          findByIdAndUpdate: mock
        }
      };

      await system_admin_mutations.removeServiceProvider({}, args, {
        models,
        user
      });
      expect(mock).toBeCalledWith(1, {
        $set: {
          username: 'RemovedUser1',
          email: 'RemovedUserMail',
          nic: 'removedNIC',
          fullname: 'removedName',
          province: 'removedProvince',
          city: 'removedCity',
          town: 'removedTown',
          service_providing_status: false,
          profile_state: 'deleted'
        }
      });
    });
  });

  describe('When the  removeComplaint function is called', () => {
    it('should remove the complaint as expected', async function() {
      const args = {
        id: 1
      };

      const mock = jest.fn();
      const complaint = {
        id: 1
      };
      const models = {
        Complaint: {
          findById: id => {
            return {
              _id: id
            };
          },
          findOneAndRemove: mock
        }
      };

      await system_admin_mutations.removeComplaint({}, args, {
        models,
        complaint
      });
      expect(mock).toBeCalledWith({ _id: 1 });
    });
  });
});

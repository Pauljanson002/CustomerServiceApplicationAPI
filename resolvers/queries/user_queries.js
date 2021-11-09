module.exports ={

  users: async (parent, args, { models }) => {
    return await models.User.find({}).limit(100);
  },
  searchServiceProviderbyName: async (
    parent,
    { name },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    //console.log(name);
    var nameRegex = new RegExp(name.toUpperCase());
    const users= await models.User.find({ username: { $regex: nameRegex , $options:'i'}});
    console.log(users);
    return users;
  },
  searchServiceProviderbyProfession: async (
    parent,
    { profession },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }

    const users= await models.User.find({ profession: profession  });
    //console.log(users);
    return users;
  },
  searchServiceProviderbyProfessioninProvince: async (
    parent,
    { profession,province,city,rating },
    { models, user }
  ) => {
    console.log(profession,province==='',city===null,rating);
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    if(province!=='' && city!==''){
      if(rating==='0'){
        const users= await models.User.find({ profession: profession ,province:province, city:city }).sort({provider_rating:-1});
        return users;

      }else if (rating==='1'){
        const users= await models.User.find({ profession: profession ,province:province, city:city }).sort({provider_rating:1});
        return users;
      }else{
        const users= await models.User.find({ profession: profession ,province:province, city:city });
        return users;
      }
      
    }
    if(province!=='' && city===''){
      if(rating==='0'){
        const users= await models.User.find({ profession: profession ,province:province}).sort({provider_rating:-1});
        return users;

      }else if (rating==='1'){
        const users= await models.User.find({ profession: profession ,province:province }).sort({provider_rating:1});
        return users;
      }else{
        const users= await models.User.find({ profession: profession ,province:province});
        return users;
      }
    }
    if(province==='' && city !==''){
      if(rating==='0'){
        const users= await models.User.find({ profession: profession ,city:city }).sort({provider_rating:-1});
        return users;

      }else if (rating==='1'){
        const users= await models.User.find({ profession: profession ,city:city }).sort({provider_rating:1});
        return users;
      }else{
        const users= await models.User.find({ profession: profession , city:city });
        return users;
      }
    }
    if(province==='' && city ===''){
      if(rating==='0'){
        const users= await models.User.find({ profession: profession  }).sort({provider_rating:-1});
        return users;

      }else if (rating==='1'){
        const users= await models.User.find({ profession: profession  }).sort({provider_rating:1});
        return users;
      }else{
        const users= await models.User.find({ profession: profession  });
        return users;
      }
    }
   
    //console.log(users);
    
  },

  viewAllServiceProviders: async (
    parent,
    args,
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }

    const users= await models.User.find({ });
    //console.log(users);
    return users;
  },

  getUserbyId: async (
    parent,
    { id },
    { models, user }
  ) => {
    //if (!user) {
      //throw new AuthenticationError('You are not registered');
    //}

    const user_result= await models.User.findById(id);
    //console.log(users);
    return user_result;
  },

  getReviewedRequestsofUser:async( parent,{id}, {models,user})=>{
    //if (!user) {
      //throw new AuthenticationError('You are not registered');
    ////}
    const requests= await models.ServiceRequests.find({
      state: 'Reviewed',
      provider_id: id
    }).limit(100);
    console.log(requests, "REQUESTS",id);
    return requests;


  }
}

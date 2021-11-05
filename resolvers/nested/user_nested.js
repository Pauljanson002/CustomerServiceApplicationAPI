module.exports = {
  // bids:async (foundUser,args,{models,user})=>{
  //   const foundBids = await models.JobBid.find({
  //     bidBy:foundUser.id
  //   })
  //   return foundBids
  // }
  rating:async (foundUser,args,{models,user})=>{
    const bidsBy = await models.JobBid.aggregate([
      {
        $match:{
        bidBy:foundUser._id,
        providerRating:{$exists:true,$ne:null}
        },
      },{
        $group:{
          _id:"$bidBy",
          avgProviderRating:{$avg:"$providerRating"},
          count:{$sum:1}
        },
      }])
    const requestsFor = await models.ServiceRequests.aggregate([
      {
       $match:{
         provider_id:foundUser._id,
         requestRating:{$exists:true,$ne:null}
       },
      },{
        $group:{
          _id:"$provider_id",
          avgProviderRating:{$avg:"$requestRating"},
          count:{$sum:1}
        }
      }
    ])

    const val1 = (bidsBy[0] && bidsBy[0].avgProviderRating) || 0
    const count1 = (bidsBy[0] && bidsBy[0].count) || 0
    const val2 = (requestsFor[0] && requestsFor[0].avgProviderRating) || 0
    const count2 = (requestsFor[0] && requestsFor[0].count) || 0
    const providerRating =(count1+count2 !== 0 && (val1*count1+val2*count2)/(count1+count2) )|| 0

    const bidsFor = await models.JobBid.aggregate([
      {
        $lookup:{
          from:"jobpostings",
          localField:"jobPosting",
          foreignField:"_id",
          as:"jobPostingRef"
        }
      },
      {
        $unwind:"$jobPostingRef"
      },{
        $match:{
          "jobPostingRef.postedBy":foundUser._id,
          requesterRating:{$exists:true,$ne:null}
        }
      },{
        $group:{
          _id:{postedBy:"$jobPostingRef.postedBy"},
          avgRequesterRating:{
            $avg:"$requesterRating"
          },
          count:{$sum:1}
        }
      }
    ])

    const requestsBy = await models.ServiceRequests.aggregate([
      {
        $match:{
          requester_id:foundUser._id,
          customerRating:{$exists:true,$ne:null}
        }
      },{
        $group:{
          _id:"$requester_id",
          avgRequesterRating: {
            $avg:"$customerRating"
          },
          count:{
            $sum:1
          }
        }
      }
    ])
    const val3 = (bidsFor[0] && bidsFor[0].avgRequesterRating) || 0
    const count3 = (bidsFor[0] && bidsFor[0].count) || 0
    const val4 = (requestsBy[0] && requestsBy[0].avgRequesterRating) || 0
    const count4 = (requestsBy[0] && requestsBy[0].count) || 0
    const requesterRating =(count3+count4 !== 0 && (val3*count3+val4*count4)/(count3+count4) )|| 0
    return {
      providerRating:providerRating,
      requesterRating:requesterRating
    }
  }
};

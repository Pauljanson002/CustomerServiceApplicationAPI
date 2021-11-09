const db = require('../../../db')
const mongoose = require('mongoose')

jest.mock("mongoose",()=>({
  connect:jest.fn().mockImplementation(()=>{
    return Promise.resolve()
  }),
    close:jest.fn(),
  set:jest.fn()
}))
describe("Given database uri",()=>{
  describe("When called connect function",()=>{
    it("should call the mongoose connect function",()=>{
      db.connect("Uri")
      expect(mongoose.connect).toBeCalled()
    })
  })
})

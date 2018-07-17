var {Users} = require('./users');
const expect =require('expect');

describe('Users List',()=>{
  it('should add a user',()=>{
    var user1 = {
      id:123,
      name:'abc',
      room:'ABC'
    }
    var user2 = {
      id:124,
      name:'abd',
      room:'ABD'
    }
    var user = new Users();
    var reUser = user.addUser(123,'abc','ABC');

    expect(user.users).toEqual([user1]);
  });

  if('should not add the user',()=>{
    
  });
});

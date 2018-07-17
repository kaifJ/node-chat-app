var {isRealString} = require('./validate');
const expect = require('expect');

describe('isRealString',()=>{
  it('should return false for a number',()=>{
    var number = 98;
    expect(isRealString(number)).toBe(false);
  });

  it('should return true for valid string',()=>{
    var str = 'hello there';
    expect(isRealString(str)).toBe(true);
  });
});

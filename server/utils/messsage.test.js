var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('Generate Message',()=>{
  it('should generate correct message object',()=>{
    var from = 'jen';
    var text = 'hey there';
    var message = generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });

  });
});

describe('generateLocationMessage',()=>{
  it('should create correct location object',()=>{
    var from = 'Admin';
    var latitude = 15;
    var longitude = 20;
    var url=`https://www.google.com/maps?q=15,20`;

    var message = generateLocationMessage(from,latitude,longitude);

    expect(message.createdAt).toBeA('number');
    expect(message.url).toBe(url);
  });
});

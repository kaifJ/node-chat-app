var expect = require('expect');
var {generateMessage} = require('./message');

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

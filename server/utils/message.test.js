const expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {

        var from = 'davide.monticelli';
        var text = 'Ciao a tutti';
        var res = generateMessage(from, text);

        expect(res.from).toEqual(from);
        expect(res).toInclude({
            from, text
        });
    });
});
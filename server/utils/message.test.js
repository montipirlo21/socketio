const expect = require('expect');

var { generateMessage } = require('./message');
var { generateLocationMessage } = require('./message');

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


describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {

        var from = 'davide.monticelli';
        var latitude = 12;
        var longitude = 44;
        var url = "https://www.google.com/maps?q=" + latitude + "," + longitude;
        var res = generateLocationMessage(from, latitude, longitude);

        expect(res.createdAt).toBeA('number');
                expect(res).toInclude({
            from, url
        });
    });
});
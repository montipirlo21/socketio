const expect = require('expect');
var { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var string = 2343;
        var res = isRealString(string);
        expect(res).toBe(false);       
    });

    it('should reject string with only spaces', () => {
        var string = '         ';
        var res = isRealString(string);
        expect(res).toBe(false);
    });

    it('should allow string with non space characters', () => {
        var string = '      fg g f gf fg ';
        var res = isRealString(string);
        expect(res).toBe(true);
    });
});

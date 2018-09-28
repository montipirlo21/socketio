const expect = require('expect');
var { Users } = require('./users');


describe('Users', () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1', name: 'Mike', room: 'Node Course'
        },
        {
            id: '2', name: 'Jen', room: 'React Course'
        },
        {
            id: '3', name: 'Julie', room: 'Node Course'
        }];
    });


    it('Should add new user', () => {
        var users = new Users();
        var user = { id: '123', name: 'Davide', room: 'office' }
        var res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Should return users from node coursa', () => {
        var res = users.getUserList('Node Course');
        expect(res).toEqual(['Mike', 'Julie']);
    });


    it('Should return users from react coursa', () => {
        var res = users.getUserList('React Course');
        expect(res).toEqual(['Jen']);
    }); 

    it('Should remove a user', () => {
        var idToRemove = '1';
        var res = users.removeUser(idToRemove);
        expect(res.id).toEqual(idToRemove);
    });

    it('Should not remove a user', () => {
        var userId = '5';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
    });

    it('Should find a user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });


    it('Should not find a user', () => {
        var userId = '5';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

});
const supertest = require("supertest");
const should = require("should");

const server = supertest.agent("http://localhost:8000/api");

const userChecks = (user) => {
    user.should.have.property('_id');
    user.should.have.property('first_name');
    user.should.have.property('last_name');
    user.should.have.property('username');
    user.should.have.property('email');
};

const authChecks = (success, data, error) => {
    success.should.equal(true);
    data.should.have.property('token');
    data.should.have.property('user');
    userChecks(data.user);
    should.not.exist(error);
};

const tweetChecks = (success, data, error) => {
    success.should.equal(true);
    data.should.have.property('topics');
    data.should.have.property('content');
    data.should.have.property('time');
    data.author.should.have.property('_id');
    data.author.should.have.property('first_name');
    data.author.should.have.property('last_name');
    data.author.should.have.property('username');
    should.not.exist(error);
};

describe('REST API (/users)', function () {
    let testUser = {
        username: 'testuser101',
        first_name: 'test',
        last_name: 'user',
        email: 'testuse101@test.com',
        password: 'testuser101'

    };

    let loginCredentials = {
        username: 'testuser101',
        password: 'testuser101'

    };

    let tweet = {
        "content": "test tweet content",
        "topics": ["tag1", "tag2"],
    };

    let query = {
        query: "test"
    };

    let dummyUser = {
        username: 'dummy',
        first_name: 'dummy',
        last_name: 'dummy',
        email: 'dummy@user.com',
        password: 'dummy'
    };

    let followObject = {
        toFollow: '',
        user: '',
        op: 'follow'
    };

    let restApiHelpers = {
        id: '',
        token: ''
    };

    // ENTRYPOINT

    it("GET '/': should return simple 'hello'",(done) => {
        server
            .get("/")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.error.should.equal(false);
                res.text.should.equal('hello');
                done();
            });
    });

    // AUTH ROUTES

    it("POST '/auth/register': should return successfully registered user",(done) => {
        server
            .post("/auth/register")
            .send(testUser)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res) {
                res.status.should.equal(200);
                const {success, data, error} = res.body;
                authChecks(success, data, error);
                done();
            });
    });


    it("POST '/auth/login': should return successfully logged in user",(done) => {
        server
            .post("/auth/login")
            .send(loginCredentials)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res) {
                res.status.should.equal(200);
                const {success, data, error} = res.body;
                authChecks(success,data,error);
                restApiHelpers['id'] = data.user._id;
                restApiHelpers['token'] = data.token;
                done();
            });
    });

    // TWEET ROUTER API

    it("POST '/tweet': should return tweet",(done) => {
        tweet['author'] = restApiHelpers['id'];
        server
            .post("/tweet")
            .set('Authorization', 'Bearer ' + restApiHelpers['token'])
            .send(tweet)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res) {
                res.status.should.equal(200);
                const {success, data, error} = res.body;
                tweetChecks(success, data[0], error);
                done();
            });
    });

    it("GET '/tweet/:<userid>': should return tweets as per user",(done) => {
        server
            .get("/tweet/"+restApiHelpers['id'])
            .set('Authorization', 'Bearer ' + restApiHelpers['token'])
            .send(tweet)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res) {
                res.status.should.equal(200);
                const {success, data, error} = res.body;
                success.should.equal(true);
                (Array.isArray(data)).should.equal(true);
                if(Array.isArray(data) && data.length > 0)
                    data.forEach((tweet) => tweetChecks(success, tweet, error));
                should.not.exist(error);
                done();
            });
    });

    // SEARCH ROUTER API

    it("POST '/search': should return search results",(done) => {
        server
            .post("/search")
            .set('Authorization', 'Bearer ' + restApiHelpers['token'])
            .send(query)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res) {
                res.status.should.equal(200);
                const {success, data, error} = res.body;
                success.should.equal(true);
                (Array.isArray(data.users)).should.equal(true);
                (Array.isArray(data.tweets)).should.equal(true);
                if(Array.isArray(data.tweets) && data.tweets.length > 0)
                    data.tweets.forEach((tweet) => tweetChecks(success, tweet, error));
                if(Array.isArray(data.users) && data.users.length > 0)
                    data.users.forEach((user) => userChecks(user));
                should.not.exist(error);
                done();
            });
    });

    // FOLLOW ROUTER API

    it("POST '/user/follow/:<userid>': should return following and followers of a user ",(done) => {
        server
            .get("/user/follow/"+restApiHelpers['id'])
            .set('Authorization', 'Bearer ' + restApiHelpers['token'])
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res) {
                res.status.should.equal(200);
                const {success, data, error} = res.body;
                success.should.equal(true);
                (Array.isArray(data.following)).should.equal(true);
                (Array.isArray(data.followers)).should.equal(true);
                data.should.have.property('_id');
                should.not.exist(error);
                done();
            });
    });

    it("POST '/user/follow': should add a follower-following relation between two users ",(done) => {
        followObject['user'] = restApiHelpers['id'];
        server
            .post("/auth/register")
            .send(dummyUser)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res) {
                res.status.should.equal(200);
                const {success, data, error} = res.body;
                authChecks(success, data, error);
                followObject['toFollow'] = data.user._id;
                server
                    .post("/user/follow/")
                    .set('Authorization', 'Bearer ' + restApiHelpers['token'])
                    .send(followObject)
                    .expect("Content-type",/json/)
                    .expect(200)
                    .end(function(err,res) {
                        res.status.should.equal(200);
                        const {success, data, error} = res.body;
                        success.should.equal(true);
                        data.should.have.property('op');
                        data.should.have.property('toFollow');
                        should.not.exist(error);
                        done();
                    });
            });


    });




});

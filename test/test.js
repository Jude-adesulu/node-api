

const chai = require("chai");
const chaiHhttp = require("chai-http");
const server = require("../index")


//assertion style
chai.should()

chai.use(chaiHhttp)

describe("TEST API", ()=>{
    //test the post user route
    describe("POST /api/createUser",()=>{
        it("it should POST new user to the database if email does not match", (done)=>{
            const info = {
                name: "Pete",
                email: "@mail.com",
                password: "yuty",
                balance: 20
            }
            chai.request(server)
                .post("/api/createUser")
                .send(info)
                .end((err, response)=>{
                     response.should.have.status(200);
                     response.body.should.be.a('object')
                    
                done()
                })
        })
    })


    
})
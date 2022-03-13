
const chai = require("chai");
// const { should } = require("chai");
const should = chai.should()

const chaiHhttp = require("chai-http");
const { response } = require("../index");
const server = require("../index")


//assertion style
chai.should()

chai.use(chaiHhttp)

describe("TEST API", ()=>{
    //test the post user route
    describe("POST /api/createUser",()=>{
        //create a new user
        it("it should POST new user to the database ", (done)=>{
            const info = {
                name: "John Doe",
                email: "Newmail@mail.com",
                password: "yuty"   
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
            
        //return a 422 status code cause email already exist on my DB
        it("it should it show return 422 when the email already exist on the DB ", (done)=>{
            const info = {
                name: "Test Name",
                email: "Test@mail.com",
                password: "1234",
            }
            chai.request(server)
                .post("/api/createUser")
                .send(info)
                .end((err, response)=>{
                     response.should.have.status(422);
                     response.body.should.be.a('object')       
                done()
                })
            })
    })

    //test the login in and generate token router 

    describe("GET | Authenticate Users", ()=>{
        //it generate a token to the user
        it("It should authenticate a registered user by retrieving the token", (done)=>{
            const user = {
                email: "Test@mail.com",
                password: "1234"
            }
            chai.request(server)
            .get("/api/login")
            .send(user)
            .end((err, response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object')
                should.exist(response.body.token)

                //get the login token
                const token = response.body.token
                
               //Authorize user after verifying the token
               chai.request(server)
               .get("/api/user/verify")
               .set({"Authorization":`Bearer ${token}`})
               .end((err,response)=>{
                       response.should.have.status(200)
                       should.exist(response.body.id)
                       should.exist(response.body.name)
                       should.exist(response.body.email)
                       should.exist(response.body.account_number)
                       should.exist(response.body.balance)
               
                    })
                        
                done()
            })
        })

        //Users with wrong password are unauthorized

        it("Should not login in with the right user but wrong password", (done)=>{
            const user = {
                email: "Test@mail.com",
                password: "wrong"
            }
            chai.request(server)
                .get("/api/login")
                .send(user)
                .end((err, response)=>{
                    response.should.have.status(401)
                    should.not.exist(response.body.token)
    
            done()
            })
        })
    })


    //user transfer to another account
    describe("PUT | Funding other Wallets", ()=>{
        it("It Should send money to another user on the DB ", (done)=>{
            const userID = 8
            const info = {
                //ID of the receiver on the DB
                id : 7,
                amount: 50
            }
            chai.request(server)
                .put("/api/userTransfer/" + userID)
                .send(info)
                .end((err, response)=>{
                     response.should.have.status(200);
                     response.body.should.be.a('object')
                    
                done()
                })
                 
            })          

    })

    //user fund account test case
    describe("PUT | Fund User Account", ()=>{
        it("it should PUT new the new amount to your account", (done)=>{
            const userID = 8
            const info = {
                amount: 1220
            }
            chai.request(server)
                .put("/api/user/fundAcc/" + userID)
                .send(info)
                .end((err, response)=>{
                     response.should.have.status(200);
                     response.body.should.be.a('object')
                    
                done()
                })
                 
            })          

    })

    //user withdrawal test case

    describe("PUT | User Withdrawal", ()=>{
        it("it should withdral from your account if you have enough on it", (done)=>{
            const userID = 8
            const info = {
                amount: 1220
            }
            chai.request(server)
                .put("/api/user/withdraw/" + userID)
                .send(info)
                .end((err, response)=>{
                     response.should.have.status(200);
                     response.body.should.be.a('object')
                     should.exist(response.body)
                    
                done()
                })
                 
            })          

    })
})
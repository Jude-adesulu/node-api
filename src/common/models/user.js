class User{
    constructor(data){
        this.id == data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.balance = data.balance;
        this.password = data.password;
        this.account_no = data.account_no;
        this.transactions = data.transactions || [];
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}

module.exports = User;

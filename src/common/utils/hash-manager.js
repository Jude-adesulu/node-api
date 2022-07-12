const bcrypt = require('bcrypt');

const saltrounds = 10;

const hashManager = () => {
    return{
        async hash(password){
            return await bcrypt.hash(password, saltrounds);
        },
        async compare(password, hash) {
            return await bcrypt.compare(password, hash);
        }
    }
}

module.exports = { hashManager}

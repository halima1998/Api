var knex = require('../knex');
const bcrypt = require('bcrypt');
   const createUser = async (user) => {
    const {Name, Email_ID, Phone_NO, Password} = user;
    return  knex('user')
        .insert({
            Name,
            Email_ID,
            Phone_NO,
            Password: await hashPassword(Password)
        })
        .then((res) => res)
        .catch((err) => { 
            console.log(err);
             return err });
}
const hashPassword = async (textPassword) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return  bcrypt.hash(textPassword, salt);
}
// }
module.exports = { createUser }

exports.up = async (knex) => {
    await knex.schema.createTable('user', table => {
        table.increments('id')
        table.string('Name').notNullable()
        table.string('Email_ID').notNullable().unique()
        table.integer('Phone_NO').notNullable()
        table.string('Password').notNullable()
    })
   
};

exports.down = async (knex) => {
    await knex.schema.dropTable('user');
};

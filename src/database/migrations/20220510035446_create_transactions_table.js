
exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.string('sender').references('account_no').inTable('users').onDelete('CASCADE');
    table.string('receiver').references('account_no').inTable('users').onDelete('CASCADE');
    table.decimal('amount').notNullable();
    table.timestamps(true, true);
  });
};


exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};

import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('connections', table => {
    table.increments('id').primary();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE'); // CASCADE if I delete a class the connections will be too

    table.timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP')); // knex.raw to knex recognize CURRENT_TIMESTAMP as a parameter, otherwise it will be a string
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
}
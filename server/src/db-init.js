const { knex } = require("./model/Model");

async function createSchema() {
  if (await knex.schema.hasTable("users")) {
    console.log("users table exists");
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("email");
    table.string("hash");
  });

  console.log("created users table");
}

module.exports = createSchema;

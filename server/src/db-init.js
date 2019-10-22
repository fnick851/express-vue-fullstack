const { Model } = require("objection");
const Knex = require("knex");

const User = require("./model/User");

module.exports = () => {
  // Initialize knex.
  const knex = Knex({
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "sqlite3-dev.db"
    }
  });

  // Give the knex instance to objection.
  Model.knex(knex);

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
      table.string("password");
      table.string("hash");
    });

    const testUser = await User.query().insertGraph({
      email: "test1@test.com",
      password: "password",
      hash: "$2a$10$huNqSyO/IMOi/c5aQPqpuuNCX04jNrPlqhxrKZcesJ8R3bAq4rqvq"
    });

    console.log("created an initial user:", testUser);
  }

  createSchema()
    .then(() => knex.destroy())
    .catch(err => {
      console.error(err);
      return knex.destroy();
    });
};

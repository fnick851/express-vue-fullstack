const { Model } = require("./Model");

class User extends Model {
  static get tableName() {
    return "users";
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return "id";
  }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "hash"],

      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        hash: { type: "string" }
      }
    };
  }
}

module.exports = User;

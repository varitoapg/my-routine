/* eslint-disable @typescript-eslint/no-var-requires */
require("../utils/loadEnvironment");

const knexPostgresConfig = {
  client: "pg",
  connection: process.env.POSTGRES_URL,
  searchPath: ["knex", "public"],
};

module.exports = knexPostgresConfig;

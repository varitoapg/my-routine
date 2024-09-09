// eslint-disable-next-line @typescript-eslint/no-var-requires
export const knexPostgresClient = require("knex")({
  client: "pg",
  connection: process.env.POSTGRES_URL,
  searchPath: ["knex", "public"],
});

/* eslint-disable @typescript-eslint/no-var-requires */
const { knex } = require("knex");
const { updateTypes } = require("knex-types");

const db = knex(require("../client/knexPostgresConfig"));

updateTypes(db, { output: "./src/pages/api/types/typesFromDB.ts" }).catch(
  (err) => {
    console.error(err);
    process.exit(1);
  },
);

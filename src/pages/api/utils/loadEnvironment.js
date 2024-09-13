/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

const { POSTGRES_URL: postgresConnection } = process.env;

const environment = {
  postgresConnection,
};

module.exports = environment;

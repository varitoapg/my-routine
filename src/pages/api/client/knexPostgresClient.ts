import { Knex } from "knex";
import knexPostgresConfig from "./knexPostgresConfig";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const knexPostgresClient: Knex = require("knex")(knexPostgresConfig);

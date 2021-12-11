/* eslint-disable no-console */

import feathers from "@feathersjs/feathers";
import { Knex } from "knex";

export default async function (app: feathers.Application<any>) {
    const db: Knex = app.get('knexClient');
    const tableName = 'users';

    await db.schema.createTable(tableName, table => {
        table.increments('id');
        table.boolean("admin").defaultTo(false);
        table.text('picture');
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
    });

    await db.table(tableName).insert({
        username: 'admin',
        email: 'admin@gmail.com',
        password: '$2a$10$JB90tK3l2cOiIdle90Tso.CiruEO4Av6StOJ4i/c6yuGKr/tEVyiy',
        admin: true
    });

    console.log("Created " + tableName + " table");
};
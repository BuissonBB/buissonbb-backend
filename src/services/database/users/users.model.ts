/* eslint-disable no-console */

import feathers from "@feathersjs/feathers";
import { Knex } from "knex";

export default function (app: feathers.Application<any>): Knex {
    const db: Knex = app.get('knexClient');
    const tableName = 'users';

    db.schema.hasTable(tableName).then(async exists => {
        if (!exists) {
            await db.schema.createTable(tableName, table => {
                table.increments('id');
                table.boolean("admin");
                table.text('picture');
                table.string('username').unique().notNullable();
                table.string('email').notNullable();
                table.string('password').notNullable();
            });

            await db.table(tableName).insert({
                username: 'admin',
                email: 'admin@admin.fr',
                password: 'admin',
                admin: true
            });
        }
    });

    return db;
};
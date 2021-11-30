/* eslint-disable no-console */

import feathers from "@feathersjs/feathers";
import { Knex } from "knex";

export default async function(app: feathers.Application<any>, tableName: string) {
    try {
        const db: Knex = app.get('knexClient');

        await db.schema.createTable(tableName, table => {
            table.increments('id');
            table.text('picture');
            table.text('username').notNullable();
            table.text('email').notNullable();
            table.text('password').notNullable();
        })

        await db.table(tableName).insert({
            username: 'admin',
            email: 'admin@admin.fr',
            password: 'admin'
        });

        console.log(`Created ${tableName} table`)
    } catch(err: any) {
        console.log(`Error creating ${tableName} table: ${err.toString()}`);
    }
}

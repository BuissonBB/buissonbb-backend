/* eslint-disable no-console */

import feathers from "@feathersjs/feathers";
import { Knex } from "knex";

export default async function(app: feathers.Application<any>, tableName: string) {
    try {
        const db: Knex = app.get('knexClient');

        await db.schema.createTable(tableName, table => {
            table.increments('id');
            table.timestamp('created_date').defaultTo(db.fn.now());
            table.timestamp('modified_date').defaultTo(db.fn.now());
            table.text('subject').notNullable();
            table.integer('category');
            table.integer('author').references('id').inTable('users').onDelete('SET NULL');
        })

        await db.table(tableName).insert({
            subject: 'Test topic',
            category: 0,
            author: 1
        });

        console.log(`Created ${tableName} table`)
    } catch(err: any) {
        console.log(`Error creating ${tableName} table: ${err.toString()}`);
    }
}

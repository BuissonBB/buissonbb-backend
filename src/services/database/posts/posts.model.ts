/* eslint-disable no-console */

import feathers from "@feathersjs/feathers";
import { Knex } from "knex";

export default async function(app: feathers.Application<any>, tableName: string) {
    try {
        const db: Knex = app.get('knexClient');

        await db.schema.createTable(tableName, table => {
            table.increments('id');
            table.timestamp('created_date').defaultTo(db.fn.now()); // ex: 2020-11-23 06:32:48.524937+01
            table.timestamp('modified_date');
            
            table.text('text').notNullable();

            table.integer('topic')
                .notNullable()
                .references('id')
                .inTable('topics')
                .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
                .onDelete('CASCADE') // If Article is deleted, delete Comment as well.;

            table.integer('author')
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
                .onDelete('CASCADE') // If Article is deleted, delete Comment as well.;
        })

        await db.table(tableName).insert({
            text: 'test message',
            topic: 1,
            author: 1
        });

        console.log(`Created ${tableName} table`)
    } catch(err: any) {
        console.log(`Error creating ${tableName} table: ${err.toString()}`);
    }
}

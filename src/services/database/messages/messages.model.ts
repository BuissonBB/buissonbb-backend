/* eslint-disable no-console */

import feathers from "@feathersjs/feathers";
import { Knex } from "knex";

export default async function(app: feathers.Application<any>, tableName: string) {
    try {
        const db: Knex = app.get('knexClient');

        await db.schema.createTable(tableName, table => {
            table.increments('id');
            table.timestamp('date').defaultTo(db.fn.now()); // ex: 2020-11-23 06:32:48.524937+01
            table.text('text').notNullable();

            table.integer('chatId')
                .notNullable()
                .references('id')
                .inTable('chats')
                .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
                .onDelete('CASCADE') // If Article is deleted, delete Comment as well.;

            table.integer('author')
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
                .onDelete('CASCADE') // If Article is deleted, delete Comment as well.;
        })
        console.log(`Created ${tableName} table`)
    } catch(err: any) {
        console.log(`Error creating ${tableName} table: ${err.toString()}`);
    }
}


import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';

import knex from '../knex';

import createUsersTable from '../services/database/users/users.model';
import createPostsTable from '../services/database/posts/posts.model';
import createTopicsTable from '../services/database/topics/topics.model';
import { Knex } from 'knex';


async function main() {
   const app = feathers()

   app.configure(configuration())
   app.configure(knex)


   const db: Knex = app.get('knexClient');

   await db.raw(`DROP TABLE IF EXISTS users CASCADE;
   DROP TABLE IF EXISTS posts CASCADE;
   DROP TABLE IF EXISTS topics CASCADE;`);

   // database
   await createUsersTable(app, "users")
   await createTopicsTable(app, "topics")
   await createPostsTable(app, "posts")

   process.exit(0)
}

main()

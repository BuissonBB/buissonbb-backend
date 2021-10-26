import feathers from '@feathersjs/feathers';
import knex from 'knex';

export default function(app: feathers.Application<any>) {
   const { client, connection } = app.get('dbConfig')
   const db = knex({ client, connection })

   app.set('knexClient', db)
};

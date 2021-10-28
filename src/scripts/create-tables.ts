
import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';

import knex from '../knex';

import createItemsTable from '../services/database/items/items.model';


async function main() {
   const app = feathers()

   app.configure(configuration())
   app.configure(knex)

   // database   
   await createItemsTable(app, "items")

   process.exit(0)
}

main()

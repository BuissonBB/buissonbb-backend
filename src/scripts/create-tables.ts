
import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';

import knex from '../knex';

import createItemsTable from '../services/database/items/items.model';
import createUsersTable from '../services/database/users/users.model';
import createChatsTable from '../services/database/chats/chats.model';
import createMessagesTable from '../services/database/messages/messages.model';


async function main() {
   const app = feathers()

   app.configure(configuration())
   app.configure(knex)

   // database
   await createItemsTable(app, "items")
   await createChatsTable(app, "chats")
   await createUsersTable(app, "users")
   await createMessagesTable(app, "messages")

   process.exit(0)
}

main()

// database
import feathers from '@feathersjs/feathers';
import itemsService from './database/items/items.service';
import messagesService from './database/messages/messages.service';
import chatsService from './database/chats/chats.service';
import usersService from './database/users/users.service';

// custom
// ...

export default function(app: feathers.Application<any>) {

   // database
   app.configure(itemsService)
   app.configure(messagesService)
   app.configure(chatsService)
   app.configure(usersService)

   // custom
   // ...
}

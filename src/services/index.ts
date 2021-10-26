// database
import feathers from '@feathersjs/feathers';
import itemsService from './database/items/items.service';

// custom
// ...

export default function(app: feathers.Application<any>) {

   // database
   app.configure(itemsService)

   // custom
   // ...
}

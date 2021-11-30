// database
import feathers from '@feathersjs/feathers';
import postsService from './database/posts/posts.service';
import usersService from './database/users/users.service';
import topicsTable from './database/topics/topics.service';

// custom
// ...

export default function(app: feathers.Application<any>) {

   // database
   app.configure(postsService)
   app.configure(usersService)
   app.configure(topicsTable)

   // custom
   // ...
}

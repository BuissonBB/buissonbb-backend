import feathers from "@feathersjs/feathers";
import { Knex } from "knex";
import Users from "./users.class";
import hooks from './users.hooks';

export default function (app: feathers.Application<any>) {
    const db: Knex = app.get('knexClient') as Knex;
    db.table("users");

    const options = {
        Model: db,
        name: 'users',
    };

    // Initialize our service with any options it requires
    app.use('/users', new Users(options, app));
  
    // Get our initialized service so that we can register hooks
    const service = app.service('users');
  
    service.hooks(hooks);
  };
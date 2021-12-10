import feathers from "@feathersjs/feathers";
import Users from "./users.class";
import hooks from './users.hooks';
import createModel from './users.model';

export default function (app: feathers.Application<any>) {
    const options = {
        Model: createModel(app),
        name: 'users',
    };

    // Initialize our service with any options it requires
    app.use('/users', new Users(options, app));
  
    // Get our initialized service so that we can register hooks
    const service = app.service('users');
  
    service.hooks(hooks);
  };
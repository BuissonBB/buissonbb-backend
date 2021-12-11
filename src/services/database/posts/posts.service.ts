import feathers from "@feathersjs/feathers";
import service from 'feathers-knex';
import hooks from './posts.hooks'

export default function(app: feathers.Application<any>) {
    const db = app.get('knexClient')
    let name = 'posts'

    const serv = service({
        Model: db,
        name
    });

    app.use(name, serv)

    app.service(name).hooks(hooks);
}

import feathers from "@feathersjs/feathers";
import service from 'feathers-knex';

export default function(app: feathers.Application<any>) {
    const db = app.get('knexClient')
    let name = 'users'

    app.use(name, service({
        Model: db,
        name,
        paginate: undefined,
    }))

}

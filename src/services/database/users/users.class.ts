// This is the database adapter service class
import feathers, { Params } from '@feathersjs/feathers';
import { KnexServiceOptions, Service } from 'feathers-knex';

export interface UserData {
    id: number;
    admin: boolean;
    picture: string;
    username: string;
    email: string;
    password: string;
}

export default class Users extends Service<UserData> {
    constructor(options: Partial<KnexServiceOptions>, private app: feathers.Application<any>) {
        super({
            ...options,
            name: 'users'
        });
    }

    create(data: any, params: Params) {
        // This is the information we want from the user signup data
        const { username, email, password } = data;
        
        // The complete user
        const userData = {
            email,
            username,
            password,
            admin: false
        };

        // Call the original `create` method with existing `params` and new data
        return super.create(userData, params);
    }
};
import { HookContext } from "@feathersjs/feathers";

/* eslint-disable require-atomic-updates */
export default function (options = {}) { // eslint-disable-line no-unused-vars
    return async (context: HookContext) => {
        // Get `app`, `method`, `params` and `result` from the hook context
        const { app, method, result, params } = context;

        // Function that adds the user to a single message object
        const addUser = async (message: any) => {
            // Get the user based on their id, pass the `params` along so
            // that we get a safe version of the user data
            // console.log("before user");
            const {username, admin, picture} = await app.service('users').get(message.authorId);

            // Merge the message content to include the `user` object
            return {
                ...message,
                user: {
                    username,
                    admin,
                    picture
                }
            };
        };

        if (result) {
            // In a find method we need to process the entire page
            if (method === 'find') {
                // Map all data to include the `user` information
                context.result = await Promise.all(result.map(addUser));
                // console.log("after");
            } else {
                // Otherwise just update the single result
                context.result = await addUser(result);
            }
        }

        return context;
    };
};
import { HookContext } from "@feathersjs/feathers";

export default function (options = {}) { // eslint-disable-line no-unused-vars
    return async (context: HookContext) => {
      const { data } = context;
  
      // Throw an error if we didn't get a text
      if(!data.text) {
        throw new Error('A message must have a text');
      }
  
      // The logged in user
      const { user } = context.params;

      // The actual message text
      // Make sure that messages are no longer than 400 characters
      const {text, topicId} = context.data;

      console.log(context.data);
  
      // Update the original data (so that people can't submit additional stuff)
      context.data = {
        text,
        topicId,
        // Set the user id
        authorId: user!.id
      };
  
      return context;
    };
  };
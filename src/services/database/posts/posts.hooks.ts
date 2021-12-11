import populateUser from "./populate-user";
import processPost from "./process-post";
const { authenticate } = require('@feathersjs/authentication').hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ authenticate('jwt'), processPost() ],
    update: [ authenticate('jwt') ],
    patch: [ authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
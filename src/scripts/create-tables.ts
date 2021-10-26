
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')

const knex = require('../knex')

const createItemsTable = require('../services/database/items/items.model')


async function main() {
   const app = feathers()

   app.configure(configuration())
   app.configure(knex)

   // database   
   await createItemsTable(app, "items")

   process.exit(0)
}

main()

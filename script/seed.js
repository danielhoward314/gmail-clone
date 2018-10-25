'use strict'

const db = require('../server/db')
const {User, Inbox, Sent, Draft} = require('../server/db/models')
const seedUsers = require('./seedUsers')
const seedInbox = require('./seedInbox')
const seedSent = require('./seedSent')
const seedDraft = require('./seedDraft')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const seedRunner = (seedArr, seedFlag) => {
    let seedPromises = []
    seedArr.forEach((seedEl) => {
      if (seedFlag === 'users') {
        seedPromises.push(User.create({email: seedEl.email, password: seedEl.password,
          firstName: seedEl.firstName, lastName: seedEl.lastName}))
      } else if (seedFlag === 'inbox') {
        seedPromises.push(Inbox.create({from: seedEl.from, to: [seedEl.to],
          bccTo: [seedEl.bccTo], ccTo: [seedEl.ccTo],
          subject: seedEl.subject, body: seedEl.body, userId: seedEl.userId}))
      } else if (seedFlag === 'sent') {
        seedPromises.push(Sent.create({to: [seedEl.to], bccTo: [seedEl.bccTo],
          ccTo: [seedEl.ccTo], subject: seedEl.subject, body: seedEl.body,
          userId: seedEl.userId}))
      } else if (seedFlag === 'draft') {
        seedPromises.push(Draft.create({to: [seedEl.to], bccTo: [seedEl.bccTo],
          ccTo: [seedEl.ccTo], subject: seedEl.subject, body: seedEl.body,
          userId: seedEl.userId}))
      }

    })
    return Promise.all(seedPromises)
  }

  const users = await seedRunner(seedUsers, 'users')
  const inboxes = await seedRunner(seedInbox, 'inbox')
  const sents = await seedRunner(seedSent, 'sent')
  const drafts = await seedRunner(seedDraft, 'draft')

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${inboxes.length} inboxes`)
  console.log(`seeded ${sents.length} sents`)
  console.log(`seeded ${drafts.length} drafts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

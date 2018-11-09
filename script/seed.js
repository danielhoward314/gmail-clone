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

  const userSeedRunner = (seedArr) => {
    let seedPromises = []
    seedArr.forEach((seedEl) => {
        seedPromises.push(User.create({email: seedEl.email, password: seedEl.password,
          firstName: seedEl.firstName, lastName: seedEl.lastName}))
    })
    return Promise.all(seedPromises)
  }

  const inboxSeedRunner = (seedArr) => {
    let seedPromises = []
    seedArr.forEach((seedEl) => {
      const userFind = () => {
        const user = seedUsers.filter((userEl, idx) => {
          if(idx === seedEl.userId -1 && seedEl.userId === 1) return true
          return idx === (seedEl.userId -1)
        })
        const userId = seedUsers.map((userEl, idx) => {
          if(idx === (seedEl.userId -1)) return ++idx
        })
        const userIdFilt = userId.filter((userEl) => {
          return userEl
        })
        return {user: user[0], userIdFilt: userIdFilt[0]}
      }
      const userObj = userFind()
      let randomIdx = Math.floor(Math.random()*(29-0+1)+0)
      let randomIdxTwo = Math.floor(Math.random()*(29-0+1)+0)
      let randomIdxThree = Math.floor(Math.random()*(29-0+1)+0)
      seedPromises.push(Inbox.create({from: seedUsers[randomIdx].email, to: [userObj.user.email], bccTo: [seedUsers[randomIdxTwo].email],
        ccTo: [seedUsers[randomIdxThree].email], subject: seedEl.subject, body: seedEl.body, userId: userObj.userIdFilt}))
    })
    return Promise.all(seedPromises)
  }

  const sentSeedRunner = (seedArr) => {
    let seedPromises = []
    seedArr.forEach((seedEl) => {
      const userFind = () => {
        const user = seedUsers.filter((userEl, idx) => {
          if(idx === seedEl.userId -1 && seedEl.userId === 1) return true
          return idx === (seedEl.userId -1)
        })
        const userId = seedUsers.map((userEl, idx) => {
          if(idx === (seedEl.userId -1)) return ++idx
        })
        const userIdFilt = userId.filter((userEl) => {
          return userEl
        })
        return {user: user[0], userIdFilt: userIdFilt[0]}
      }
      const userObj = userFind()
      let randomIdx = Math.floor(Math.random()*(29-0+1)+0)
      let randomIdxTwo = Math.floor(Math.random()*(29-0+1)+0)
      let randomIdxThree = Math.floor(Math.random()*(29-0+1)+0)
      seedPromises.push(Sent.create({to: [seedUsers[randomIdx].email], bccTo: [seedUsers[randomIdxTwo].email],
        ccTo: [seedUsers[randomIdxThree].email], subject: seedEl.subject, body: seedEl.body, userId: userObj.userIdFilt}))
    })
    return Promise.all(seedPromises)
  }

  const draftSeedRunner = (seedArr) => {
    let seedPromises = []
    seedArr.forEach((seedEl) => {
      const userFind = () => {
        const user = seedUsers.filter((userEl, idx) => {
          if(idx === seedEl.userId -1 && seedEl.userId === 1) return true
          return idx === (seedEl.userId -1)
        })
        const userId = seedUsers.map((userEl, idx) => {
          if(idx === (seedEl.userId -1)) return ++idx
        })
        const userIdFilt = userId.filter((userEl) => {
          return userEl
        })
        return {user: user[0], userIdFilt: userIdFilt[0]}
      }
      const userObj = userFind()
      let randomIdx = Math.floor(Math.random()*(29-0+1)+0)
      let randomIdxTwo = Math.floor(Math.random()*(29-0+1)+0)
      let randomIdxThree = Math.floor(Math.random()*(29-0+1)+0)
      seedPromises.push(Draft.create({to: [seedUsers[randomIdx].email], bccTo: [seedUsers[randomIdxTwo].email],
        ccTo: [seedUsers[randomIdxThree].email], subject: seedEl.subject, body: seedEl.body, userId: userObj.userIdFilt}))
    })
    return Promise.all(seedPromises)
  }

  const users = await userSeedRunner(seedUsers)
  const inboxes = await inboxSeedRunner(seedInbox)
  const sents = await sentSeedRunner(seedSent)
  const drafts = await draftSeedRunner(seedDraft)

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

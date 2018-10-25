'use strict'
/* global describe beforeEach it */

const seed = require('./seed')

describe('seed script', () => {
  this.timeout(15000)
  it('completes successfully', seed)
  it('...', function(done){
    this.timeout(15000)
    setTimeout(done, 15000)
  })
})

const { assert } = require('console')

const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {

    describe("Tether deployment 💸", async () => {
        it('matches name successfully', async () => {
            let tether = await Tether.new()
            const name = await tether.name()
            assert.equal(name, "Tether")
        })
    })

    describe("RWD deployment 💰", async () => {
        it('matches name successfully', async () => {
            let rwd = await RWD.new()
            const name = await rwd.name()
            assert.equal(name, "Reward Token")
        })
    })

    /*
    describe("yield Farming", async () => {
        it('rewards tokens for staking', async () => {
            let result
            let tether = await Tether.new()
            // check investore balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer wallet has tether')
        })
    })
        */
})

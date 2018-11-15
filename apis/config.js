'use strict'
const express = require('express')
const config = require('config')
const router = express.Router()
const web3 = require('../models/blockchain/web3')

router.get('/', async function (req, res, next) {
    let appConfig = {}
    appConfig.blockchain = config.get('blockchain')
    try {
        appConfig.blockchain.blockNumber = await web3.eth.getBlockNumber()
    } catch (e) {
        console.log(e)
    }
    appConfig.explorerUrl = config.get('explorerUrl')
    appConfig.grafanaUrl = config.get('grafanaUrl')
    appConfig.GA = config.get('GA')
    return res.json(appConfig)
})

module.exports = router

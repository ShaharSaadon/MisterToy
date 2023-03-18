const toyService = require('./toy.services.js')

const logger = require('../../services/logger.service')

async function getToys(req, res) {
  try {
    const filterBy = {
      name: req.query.name || '',
      labels: req.query.labels || '',
      inStock: req.query.inStock || '',
    }
    const sortBy = req.query.sortBy
    logger.debug('Getting Toys', filterBy)
    const toys = await toyService.query(filterBy,sortBy)
    res.json(toys)
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

async function getToyById(req, res) {
  try {
    console.log('req.params.id',req.params.id)
    const toyId = req.params.id
    const toy = await toyService.getById(toyId)
    console.log('toy=',toy)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

async function addToy(req, res) {
  const {loggedinUser} = req

  try {
    const toy = req.body
    const addedToy = await toyService.add(toy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}

async function updateToy(req, res) {
  try {
    const toy = req.body
    console.log('toy='.toy)
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    await toyService.remove(toyId)
    res.send()
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

async function addToyMsg(req, res) {
  const {loggedinUser} = req
  console.log('logged=',loggedinUser)
  // console.log('logged=',req)
  try {
    const toyId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await toyService.addToyMsg(toyId, msg)
    console.log('saved=',savedMsg)
    return res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function removeToyMsg(req, res) {
  const {loggedinUser} = req
  try {
    const toyId = req.params.id
    const {msgId} = req.params

    const removedId = await toyService.removeToyMsg(toyId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy msg', err)
    res.status(500).send({ err: 'Failed to remove toy msg' })

  }
}

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  addToyMsg,
  removeToyMsg
}

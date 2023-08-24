const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
}

async function newTicket(req, res) {
    const flight = await Flight.findById(req.params.id)
    res.render('tickets/new', { title: 'Add Ticket', flight});
}

async function create(req, res) {
    try {
      req.body.flight = req.params.id
      const ticket = await Ticket.create(req.body)
      // Save any changes made to the flight doc
      res.redirect(`/flights/${req.params.id}`)
    } catch (err) {
      console.log(err)
      res.redirect(`/flights/${req.params.id}/tickets/new`)
    }
  }
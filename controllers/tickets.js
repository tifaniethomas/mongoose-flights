const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
    addToFlight
}

async function addToFlight(req, res) {
  const flight = await Flight.findById(req.params.id)
  flight.tickets.push(req.body.ticketId)
  await flight.save()
  res.redirect(`/flights/${flight._id}`)
}

async function newTicket(req, res) {
    const tickets = await Ticket.find({}).sort({seat: 'asc'})
    res.render('tickets/new', { title: 'Add Ticket', tickets });
}

async function create(req, res) {
    try {
      // Save any changes made to the flight doc
      await Ticket.create(req.body)
    } catch (err) {
      console.log(err)
    }
    // Step 5:  Respond to the Request (redirect if data has been changed)
    res.redirect('/tickets/new')
  }
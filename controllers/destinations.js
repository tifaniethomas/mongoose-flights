const Flight = require('../models/flight')

module.exports = {
    create
}

async function create(req, res) {
    const flight = await Flight.findById(req.params.id).sort({arrival: 'asc'})
    // We can push (or unshift) subdocs into Mongoose arrays
    flight.destinations.push(req.body)
    flight.destinations.sort(function(a,b){
      return a.arrival - b.arrival
    })
    try {
      // Save any changes made to the flight doc
      await flight.save()
    } catch (err) {
      console.log(err)
    }
    // Step 5:  Respond to the Request (redirect if data has been changed)
    res.redirect(`/flights/${flight._id}`)
  }

  
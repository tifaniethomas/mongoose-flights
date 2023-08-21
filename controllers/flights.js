const Flight = require('../models/flight')

module.exports = {
    index,
    new: newFlight,
    create,
}

async function index(req, res) {
    const flights = await Flight.find({}).sort({departs: 'asc'})
    res.render('flights/index', { flights })
}

function newFlight(req, res) {
    res.render('flights/new', { errorMsg: '' })
}


async function create(req, res) {
    //if req is falsey, remove the departs property
    if (!req.body.departs) {
        delete req.body.departs
    }
    try {
        Flight.create(req.body)
        res.redirect('/flights')
        console.log(req.body)
    }
    catch (err) {
        console.log(err)
        res.render('/flights/new')
    }
}
const models = require("../models");
const Events = models.events;
const Locations = models.locations;
const AvailableTickets = models.availableTickets;


exports.getInfo = (req, res) => {
  Events.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: [
      {
        model: Locations,
        // as: "locations",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
      },
      {
        model: AvailableTickets,
        // as: "availableTicket",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
      }
    ]
  })
    .then(data => {
      res.send(data)
    })
};

exports.createEvent = (req, res) => {
  const {
    title, 
    startTime, 
    endTime, 
    description, 
    locationId,
    address,
    img
  } = req.body

  Events.create({
    title,
    startTime,
    endTime,
    description,
    locationId,
    address,
    img
  }).then(data =>
    res.send({
      message: "Yeay~! Success to create new Event",
      data
    })
  )
};

//AVAILABLE TICKETS
exports.getAvailableTicketsInfo = (req, res) => {
  AvailableTickets.findAll(req.body)
  .then(data => {
    res.send(data)
  })
};

exports.createAvailableTicket = (req, res) => {
  const {
    eventId,
    ticketType,
    quantity,
    price,
    totalPrice
  } = req.body
  
  AvailableTickets.create({
    eventId,
    ticketType,
    quantity,
    price,
    totalPrice
  }).then(data =>
    res.send({
      message: "Yeay~! Success to create new Ticket",
      data
    })
  )
};
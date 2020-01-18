const models = require("../models");
const Purchases = models.purchases;
const Events = models.events;
const Tickets = models.tickets;


exports.createPurchase = (req, res) => {
  const {
    eventId,
    buyerName,
    hasBeenPaid
  } = req.body
  Purchases.create({
    eventId,
    buyerName,
    hasBeenPaid
  }).then(data =>
    res.send({
      message: "Yeay~! Success to create new Purchase",
      data
    })
  )
};

exports.getInfo = (req, res) => {
  Events.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: [
      {
        model: Purchases,
        as: "purchases",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Tickets,
            as: "tickets",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
        ]
      }
    ]
  })
    .then(data => {
      res.send(data)
    })
};

//-- Test ------------------------------
exports.allPurchases = (req, res) => {
  Purchases.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Tickets,
        as: "tickets"
      }
    ]
  })
    .then(data => {
      res.send(data)
    })
};
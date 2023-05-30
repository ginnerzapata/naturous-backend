const fs = require('fs')
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: { tours },
  })
}

exports.getSingleTour = (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find((el) => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    })
  }
  res.status(200).json({ status: 'success', data: { tour } })
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    }
  )
}

exports.updateTour = (req, res) => {
  const id = Number(req.params.id)
  const index = tours.findIndex((el) => el.id === id)
  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    })
  }
  tours[index] = { ...tours[index], ...req.body }
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tour: tours[index],
        },
      })
    }
  )
}

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id)
  const filtered = tours.filter((el) => el.id !== id)
  if (filtered.length >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    })
  }
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(filtered),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tour: id,
        },
      })
    }
  )
}

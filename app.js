const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const app = express()
//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

//route handlers
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: { tours },
  })
}

const getSingleTour = (req, res) => {
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

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This no yet defined',
  })
}
const getSingleUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This no yet defined',
  })
}
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This no yet defined',
  })
}
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This no yet defined',
  })
}
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This no yet defined',
  })
}
//routes
const tourRouter = express.Router()
const userRouter = express.Router()
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
tourRouter.route('/').get(getAllTours).post(createTour)
tourRouter.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour)

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser)

const port = 3000
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

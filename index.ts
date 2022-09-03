import express from 'express'
import cors from 'cors'
import { houseData, residentData } from './data'

let houses = houseData
let residents = residentData

const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`If you want to see the houses, go to /houses. If you want to see the residents, go to /residents`)
})

app.get('/houses', (req, res) => {
    let housesToSend = houses.map(house => {
        let residentsOfHouse = residents.filter(resident => resident.id === house.residentId)
        return {
            ...house,
            residents: residentsOfHouse
        }
    })
    res.send(housesToSend)
})

app.get('/houses/:id', (req, res) => {
    let id = Number(req.params.id)
    let house = houses.find(house => house.id === id)
    if (house) {
        res.send(house)
    } else {
        res.status(404).send({error: "House not found"})
    }
})

app.post('/houses', (req, res) => {
    let errors: string[] = []

    if(typeof req.body.address !== 'string') {
        errors.push("Address must be a string or not found")
    }
    if(typeof req.body.type !== 'string') {
        errors.push("Type must be a string or not found")
    }
    if(typeof req.body.residentId !== 'number') {
        errors.push("ResidentId must be a number or not found")
    }

    if(errors.length > 0) {
        
    }
})

app.listen(port, () => console.log(`Running on port ${port}`))
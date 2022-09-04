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
  res.send(
    `If you want to see the houses, go to /houses endpoint. If you want to see the residents, go to /residents endpoint
    If you want to see the houses first, click on the link below: <a href="/sike">Houses</a>
    `
    )
})

app.get("/sike", (req, res) => {
    res.send(`
    <iframe className="" width="560" height="315" src="https://www.youtube.com/embed/SAKEem9yIB0?&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    `)
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
        res.send({house, resident: residents.filter(resident => resident.id === house?.residentId)})
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
        const newHouse = {
            id: houses[houses.length - 1].id + 1,
            address: req.body.address,
            type: req.body.type,
            residentId: req.body.residentId
        }
        houses.push(newHouse)
        res.send(newHouse)
    } else {
        res.status(400).send(errors)
    }
})
app.patch('/houses/:id', (req, res) => {
    let id = Number(req.params.id)
    let house = houses.find(house => house.id === id)
    if (house) {
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

        res.send(`House with id ${id} has been updated`)
        } else {
            res.status(400).send(`House with id ${id} not found`)
        }
})

app.delete('/houses/:id', (req, res) => {
    let id = Number(req.params.id)
    let house = houses.find(house => house.id === id)
    if (house) {
        houses = houses.filter(house => house.id !== id)
        res.send(`House with id ${id} has been deleted`)
    } else {
        res.status(400).send(`House with id ${id} not found`)
    }
})



app.get('/residents', (req, res) => {
    let residentToSend = residents.map(resident => {
        let housesOfResident = houses.filter(house => house.residentId === resident.id)
        return {
            ...resident,
            houses: housesOfResident
        }
    })
    res.send(residentToSend)
})

app.get('/residents/:id', (req, res) => {
    let id = Number(req.params.id)
    let resident = residents.find(resident => resident.id === id)
    if (resident) {
    res.send({resident, houses: houses.filter(house => house.residentId === resident?.id)})
    } else {
        res.status(404).send({error: "Resident not found"})
    }
})

app.post('/residents', (req, res) => {
    let errors: string[] = []

    if(typeof req.body.name !== 'string') {
        errors.push("Name must be a string or not found")
    }
    if(typeof req.body.age !== 'number') {
        errors.push("Age must be a number or not found")
    }
    if(typeof req.body.gender !== 'string'){
        errors.push("Gender must be a string or not found")
    }

    if(errors.length === 0) {
        const newResident = {
            id: residents[residents.length - 1].id + 1,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
    }
    residents.push(newResident)
    res.send(newResident)
    } else {
        res.status(400).send({errors})
    }
})

app.patch('/residents/:id', (req, res) => {
    let id = Number(req.params.id)
    let resident = residents.find(resident => resident.id === id)
    if (resident) {
        let errors: string[] = []

        if(typeof req.body.name !== 'string') {
            errors.push("Name must be a string or not found")
        }
        if(typeof req.body.age !== 'number') {
            errors.push("Age must be a number or not found")
        }
        if(typeof req.body.gender !== 'string'){
            errors.push("Gender must be a string or not found")
        }
        res.send(`Resident with id ${id} has been updated`)
        } else {
            res.status(400).send(`Resident with id ${id} not found`)
        }
})

app.delete('/residents/:id', (req, res) => {
    let id = Number(req.params.id)
    let resident = residents.find(resident => resident.id === id)
    if (resident) {
        residents = residents.filter(resident => resident.id !== id)
        res.send(`Resident with id ${id} has been deleted`)
    } else {
        res.status(400).send(`Resident with id ${id} not found`)
    }
})

app.listen(port, () => console.log(`Running on port ${port}`))
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const app = express()
const RegisterModel = require('./models/register')
const TableModel = require('./models/Table')
app.use(express.json())

app.use(cors())

mongoose.connect("mongodb://localhost:27017/scm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to database"))
.catch((err) => console.error("Database connection error:", err));


app.post('/login', (req, res) => {
    const { privatekey, name, aspect, password } = req.body;
    RegisterModel.findOne({ privatekey: privatekey })
        .then(user => {
            if (user) {
                if (user.name === name && user.aspect === aspect) {
                    bcrypt.compare(password, user.password, (err, response) => {
                        if (err) {
                            res.json("incorrect password")
                        }
                        if (response) {
                            res.json("done")
                        }
                    })
                }
                else {
                    res.json("error with values")
                }
            }
            else {
                res.json("user doesnt exist")
            }
        })

})
app.post('/register', (req, res) => {
    const { privatekey, name, aspect, password } = req.body;
    RegisterModel.findOne({ privatekey: privatekey })
        .then(
            user => {
                if (user) {
                    res.json('cannot register, private key registered already')
                }
                else {
                    bcrypt.hash(password, 10)
                        .then(hash => {
                            RegisterModel.create({ privatekey, name, aspect, password: hash })
                                .then(registered => res.json(registered))
                                .catch(err => res.json(err))
                        })
                        .catch(err => console.log(err.message))
                }
            }
        )



})
app.post('/addtotable', (req, res) =>
    [
        TableModel.create(req.body)
            .then(table => res.json(table))
            .catch((err) => { res.json(err) })

    ])
app.get('/getfromtable', async (req, res) => {
    try {
        const { globalName, globalKey, entity } = req.query;
        const result = await TableModel.find({ globalName: globalName, globalKey: globalKey, entity: entity })
        if (result) {
            res.json(result)
            console.log("we recieved")
            console.log(result)
        }
        else {
            res.status(404).json({ message: 'no matching data found' })
        }


    }
    catch (err) {
        res.json(err)
    }
})


app.get('/getfromtable2nd', async (req, res) => {
    try {
        const { ProductCode, entity } = req.query;
        const result = await TableModel.findOne({ ProductCode: ProductCode, entity: entity })
        if (result) {
            res.json(result)
            console.log("we recieved")
            console.log(result)
        }
        else {
            res.status(404).json({ message: 'no matching data found' })
        }


    }
    catch (err) {
        res.json(err)
    }
})


app.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await TableModel.findByIdAndUpdate(id, request.body)
        if (!result) {
            return response.status(404).json({ message: 'data not found' })
        }
        else {
            return response.status(200).send({ message: "sucessfully updated" })
        }
    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})



app.listen(3001, () => {
    console.log('running')
})
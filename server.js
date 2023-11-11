require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()


const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const FRONT_END = process.env.FRONT_END;

var corsOptions = {
    //your domain in FE
    origin: FRONT_END,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//routes

app.use('/api/products',productRoute);


app.get('/', (req, res)=>{
    
    res.send('Hello node API')
})

app.get('/blog', (req, res)=>{
    res.send('Hello Bloooooooooooog')
})


app.use(errorMiddleware);

//database connection
mongoose.connect(MONGO_URL)
.then(()=>{

    console.log('Database connected');

    app.listen(PORT, ()=>{
        console.log(`Node app is running on port ${PORT}`);
    });

}).catch((error)=>{
    console.log(error);

})

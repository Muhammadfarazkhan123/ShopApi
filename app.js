const express = require('express');
const app = express();
const morgan = require('morgan');
const BodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoute = require('./Api/Routes/product');
const orderRoute = require('./Api/Routes/Order');

mongoose.connect('mongodb+srv://node-js-Shop:' + process.env.MONGO_ATLAS_PW + '@cluster0.o8brb.mongodb.net/'+process.env.MONGO_ATLAS_dbName+'?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true })

app.use(morgan('dev'));
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

// CORS=>Cross Origin Resource Sharing
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers',
		'Orgin,X-Requested-With,Content-Type,Accept,Authorization')

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
		return res.status(200).json({})
	}
	next()
})


app.use('/product', productRoute);
app.use('/order', orderRoute);

app.use((req, res, next) => {
	const error = new Error('not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});
module.exports = app;

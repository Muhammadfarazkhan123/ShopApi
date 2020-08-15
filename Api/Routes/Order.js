const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'order fetched check',
	});
});

router.post('/', (req, res, next) => {
	const Order={
		orderId:req.body.orderId,
		quantity:req.body.quantity
	}
	res.status(201).json({
		message: 'order created',
		orderDetail:Order
	});
});
router.get('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: 'order detail',
		id: req.params.orderId,
	});
});

router.delete('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: 'order deleted',
	});
});

module.exports = router;

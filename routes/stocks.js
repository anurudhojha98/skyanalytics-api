const express = require('express');
const router = express.Router();
const stocksController=require('../controllers/stocks');

router.post('',stocksController.addStocks);
router.get('',stocksController.getStocks);

module.exports = router;

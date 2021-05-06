const express = require('express');
const router = express.Router();

const queueController = require('../controllers/queue');

router.get("/", async (req, res) => {
    res.status(200).json(queueController.getMessage("hello from random queue"));
});

module.exports = router;
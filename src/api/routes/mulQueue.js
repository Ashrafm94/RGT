const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queue');
const {Queue, Worker, QueueEvents} = require('bullmq');

const QUEUE_NAME = "MUL";

const mulQueue = new Queue(QUEUE_NAME, {
    //REDIS URL LATER
});

const worker = new Worker(QUEUE_NAME, job => {
    let {number1, number2} = job.data; 
    let result = queueController.multiplyTwoNumbers(number1, number2);
    console.log(`${number1} * ${number2} = ${result}`);
});

const queueEvents = new QueueEvents(QUEUE_NAME);

queueEvents.on("completed", jobId => {
    console.log(`Job ${jobId}: completed successfully`)
})

queueEvents.on("failed", (jobId, err) => {
    console.log(`Job ${jobId}: failed`, err)
})

const addJobToQueue = (data) => {
    mulQueue.add(QUEUE_NAME, data);
}

router.get("/", async (req, res) => {

    let data = {
        number1: 2,
        number2: 3
    };

    addJobToQueue(data)

    res.status(200).json(queueController.getMessage("hello from multiply queue"));
});

module.exports = router;
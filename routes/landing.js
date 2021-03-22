const express = require('express')

// 1. create a new express router
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Welcome!')
})

router.get('/about', (req, res) => {
    res.send("About Us")
})

router.get('/contact-us', (req,res) => {
    res.send('Contact us')
})
module.exports = router;
const express = require('express')

// 1. create a new express router
const router = express.Router();

router.get('/', (req,res) => {
    res.render('landing/welcome')
})

router.get('/about', (req, res) => {
    res.render("About Us")
})

router.get('/contact-us', (req,res) => {
    res.render('Contact us')
})
module.exports = router;
const express = require('express')
const router = express.Router();

router.get('/founders', (req,res) => {
    res.send('About our Founders')
})

router.get('/funding', (req,res) => {
    res.send('Fundings')
})


module.exports = router;
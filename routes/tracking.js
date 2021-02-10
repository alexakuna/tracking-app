const express = require('express');
const router = express.Router();
const axios = require('axios')
const convert = require('xml-js');


router.post('/trace', async function(req, res) {
    await axios.get(`http://services.ukrposhta.ua/barcodestatistic/barcodestatistic.asmx/GetBarcodeInfo?guid=fcc8d9e1-b6f9-438f-9ac8-b67ab44391dd&barcode=${req.body.name}&culture=en`)
        .then(response => {
            const xml = convert.xml2js(response.data, {compact: true, spaces: 4})
            res.status(200).json(xml)
        })
        .catch(error => console.log(error))
});

module.exports = router;

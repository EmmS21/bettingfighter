const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios');
const port = process.env.PORT || 5000 ||  3000;

app.use(cors())
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/malecruiser', (req, res) => {
    axios({
        method: 'get',
        url: 'https://data.mongodb-api.com/app/data-pkrpq/endpoint/malecruise',
        withCredentials: false,
        headers: {
            'api-key': '5opRhTzTbi2N2A71LeLZBAhrZEDxjUakTc1UOncQ2qGjg5CE1IvGTfLBMFFpVyL2'
        }
    }).then((resp) => {
        res.json({ challenge: resp.data })
    })
});
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
});
app.get('/success', (req, res) => {
    res.sendFile(__dirname + "/success.html")
});
app.get('/failure', (req, res) => {
    res.sendFile(__dirname + "/failure.html")
});


app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/322a7ec74a";
    const options = {
        method: "POST",
        auth: "dave:735f126a51b13a99c1512b9afa2c735e-us20"
    }
    const request = https.request(url, options, (response) => {
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html"); 
        } else {
            res.sendFile(__dirname + "/failure.html")
        };
        
        
        
    });

    request.write(jsonData);
    request.end();
});

app.post('/failure', (req, res) => {
    res.redirect('/');
})

app.listen(process.env.PORT || port, () => {
    console.log('Server up and running on port ' + port);
})

// 735f126a51b13a99c1512b9afa2c735e-us20

//List id
// 322a7ec74a
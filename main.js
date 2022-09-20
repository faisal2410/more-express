const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser')

app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/',(req, res)=>{
    console.log(req)
    res.send(`<h1>Welcome to the home GET page!`)
})
app.post('/',(req, res)=>{
    res.send(`<h1>Welcome to the home POST page!`)
})
app.delete('/',(req, res)=>{
    res.send(`<h1>Welcome to the home Delete page!`)
})
app.put('/',(req, res)=>{
    res.send(`<h1>Welcome to the home put page!`)
})

/**
The res object represents the HTTP response that an Express app sends when it gets an HTTP request.

*/ 

// Response Status Code
// app.get("/four", (req, res)=> {
//     res.status(200).end("Response Four sent");
// })



// JSON Response

/**
res.json([body])
Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().

The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })

*/ 
app.get("/four",  (req, res)=> {
    let myJSONArray = [
        {
            name: "Rabbil",
            city: "Dhaka",
            occupation: "Engr."
        },
        {
            name: "Rakib",
            city: "Dhaka",
            occupation: "Pharama"
        },
        {
            name: "Rifat",
            city: "Rangpur",
            occupation: "Student"
        }

    ]
    res.json(myJSONArray);
})



// Response Download
app.get("/five", (req, res)=> {
    res.download("node.png");
})



// Response Redirect
app.get("/Bangladesh", function (req, res) {
    res.redirect("http://localhost:3000/India")
})


app.get("/India", function (req, res) {
    res.send("This is india");
})



app.get("/Six",  (req, res)=> {
    res.append("name", "Rabbil Hasan");
    res.append("city", "Dhaka");
    res.append("age", "30 Years Old");
    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
    res.append('Warning', '199 Miscellaneous warning')
    res.status(200).end("Hello World");
})



app.get("/Seven",  (req, res)=> {
    res.cookie('name', 'Rabbil')
    res.cookie('city', 'Dhaka')
    res.cookie('age', '30 years old')
    res.cookie('occupation','Programmer')
    res.end("cookie set success")

})


app.get("/Eight", (req, res)=> {

    res.clearCookie('name')
    res.clearCookie('age');
    res.clearCookie('city')
    res.clearCookie('occupation')


    res.end("cookie clear success")

})

app.get('/user/:id/:degree', function (req, res) {
    console.log(req.params)
    console.dir(req.ip)
    res.send(`My user id is ${req.params.id} and my educational degree is ${req.params.degree} and the users ip address is ${req.ip}`)
})

app.get('/user/:id',  (request, response) =>{
    response.send('user ' + request.params.id)
})





app.listen(3000)
console.log("Server Run Success")

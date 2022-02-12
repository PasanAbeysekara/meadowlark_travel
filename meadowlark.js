const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.port || 3000

// configure Handlebar view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout:'main',
}))
app.set('view engine','handlebars')

// add the static middleware
app.use(express.static(__dirname+'/public'))

// virtual fortune cookie
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]

// home page
app.get('/',(req,res)=>{
    res.render('home')
})

// about page
app.get('/about',(req,res)=>{
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune:randomFortune})
})


// custom 404 page
app.use((req,res)=>{
    res.render('404')
    res.status(404)
})

// custom 500 page
app.use((req,res,next)=>{
    res.render('500')
    res.status(500)
})

app.listen(port,() => console.log(`server stated on http://localhost:${port}`))

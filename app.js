// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security

// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way
app.get('/', function (req, res) {
  res.send('Welcome to the default page!  <br> <br>' +
    'Try going to different URIs by adding these at the end: <br> <br>' +
    '/printing-hello <br>' +
    '/enlarge <br>' +
    '/respond-json <br>' +
    '/homecoming/yourname <br>' +
    '/hola/your-name <br>' +
    '/future <br>' +
    '/basic/?first=Deepthi&last=Chokka <br>' +
    '/studytool <br>'+
    '/favimg <br>'+
    '<br> <br>' +
    'Fork the source code from <a href="https://github.com/denisecase/node-express-app">https://github.com/denisecase/node-express-app</a>'
  )
})

// or use the new arrow function syntax
// respond with text
app.get('/printing-hello', (req, res) => {
  res.send('Hello from the othersidee!!!!')
})

// or respond with html
app.get('/enlarge', (req, res) => {
  res.send('<h1 style="color:blue">Hello to you!!!</h1><br style="color:green">How are you???</br>')
})

// or respond with JSON
app.get('/respond-json', (req, res) => {
  res.send('<h1 style="color:red">{"Name" : "Deepthi"}</h1>')
})

// :name indicates a parameter at this location in the URI
app.get('/homecoming/:id', (req, res) => {
  res.send(`Hello ${req.params.id}! Hope you have a very happy homecoming.`)
})

// combine your skills and get creative
app.get('/hola/:friend', (req, res) => {
  res.send(`<h1 style="background-color:powderblue;">Hola, ${req.params.friend}! Hoping that you have great day!</h1>`)
})

//this creates a hyperlink
app.get('/studytool',(req,res)=>{
  res.send(`<a href="https://en.wikipedia.org/wiki/Main_Page"> A useful study tool</a>`)
})

app.get('/favimg',(req,res)=>{
  res.send(`<img src="pic_trulli.jpg" alt="Italian Trulli">`)
}) 

// provide multiple query parameters (named first and last) with ? and &
app.get('/basic', (req, res) => {
  const first = req.query.first
  const last = req.query.last
  res.send(`Hello ${first} ${last}!`)
})

let fortunes = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes - definitely.',
'You may rely on it', 'As I see it, yes.', 'Most likely', 'Outlook good.', 'Yes.', 'Signs point to yes.',
'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 
'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.',
'Very doubtful.']

// Implements a Magic 8 Ball service
app.get('/future', (req,res) => {
  if(isEmpty(req.query)){
    res.send('<h2>You wish to know the future?</h2>' +
             '<p>Ask a question in the query string, e.g., http://localhost:3002/fortune?Will I become rich? <br/>' +
             '<p>The Magic 8 Ball will answer!</p>')
  } else {
    res.send(`The answer is ... wait for it ... ${fortunes[randomInt(0, fortunes.length)]}`)
  }
})

// Use middleware to handle all non-managed routes (e.g. /xyz)
// https://expressjs.com/en/api.html#req.originalUrl
app.use((req, res, next) => {
  res.status(404).send(`status 404 - ${req.originalUrl} was not found`);
})

// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /printing-hello`)
  console.log(`   Try /enlarge`)
  console.log(`   Try /respond-json`)
  console.log(`   Try /fortune`)
  console.log(`   Try /greeting/yourname`)
  console.log(`   Try /yo/Dr.Rogers`)
  console.log(`   Try /fancy/?first=Denise&last=Case`)
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})

// Utility to see if an object is empty or not

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// generates a random value in [low,high) 
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}
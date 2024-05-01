const express = require('express');
const path = require('path')
//controller


// router
const postsRouter = require('./routes/posts.router')
const usersRouter = require('./routes/users.router');

const PORT = 3000;


// express 사용해서 
const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views')) 

app.use('/static', express.static(path.join('public'))) //절대 경로

app.use(express.json())
app.use((req, res, next) => {
    const start = Date.now()
    console.log(`start : ${req.method} ${req.url} ` ) 
    next();
    const diffTime = Date.now() - start
    console.log(`end : ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`)
})

app.get('/', (req, res) => {
    res.render('index', {
        imageTitle: "It is a cat - index.hbs"
    })
})

app.use('/users', usersRouter)
app.use('/posts' , postsRouter)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

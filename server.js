const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const customerRouter = require('./routers/customerRoutes');
const dbConnection = require('./db/dbConnection');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'views'))); 

app.use('/api/customers', customerRouter);

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    
    setInterval(() => {
        const randomNumber = parseInt(Math.random() * 10);
        socket.emit('number', randomNumber);
        console.log('Emitting Number:', randomNumber);
    }, 1000);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


http.listen(port, () => {
    console.log(`Express server started on http://localhost:${port}`);
});

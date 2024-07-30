const express = require('express')

const app = express();

app.get('/', (req, res)=>{
    return res.send('Hello From Home Page');
});

app.get('/about', (req, res)=>{
    return res.send('Hello From About Page ');
});

const port = 8000
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
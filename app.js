/*  Task 1 */
// const http = require('http');
// const express = require('express');
// const routes = require('./routes');

// const app = express();
// const server = http.createServer(app);

// server.listen(3000);

/*******************************/

/*  Task 2 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
});

app.listen(3000);
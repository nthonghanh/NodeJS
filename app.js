import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import db from './util/database';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import errorController from './controllers/error';

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views');

db.execute('SELECT * FROM products');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);
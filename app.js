const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const port = process.env.PORT || 5000;

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
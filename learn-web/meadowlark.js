const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const forTunes = require('./lib/fortune');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/about', (req, res) => {
    res.render('about', {fortune: forTunes.getTunes()});
});

//定制404页面
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

//定制500页面
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
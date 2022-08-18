let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/mintic-nrc1873-g15-hotel-front'));

app.get('/*', (req, res) =>{
    res.sendFile(__dirname+'/dist/mintic-nrc1873-g15-hotel-front/index.html');
});

app.listen(process.env.PORT || 8080);
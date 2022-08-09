var express = require('express');
var bodyParser = require('body-parser');
const { response } = require('express');

var app = express();
var port = process.env.PORT || 3525;

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let contacts = [''];

app.get('/', function(req, res){
	fetch('http://www.raydelto.org/agenda.php')
    .then(response => response.json())
    .then(data => contacts = data);

    const response = {
        data: contacts
    }

    res.send(response)
});

app.post('/save', (req, res) => {
    const contact = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono
    }

    contacts.push(contact)

    const response = {
        data: contact,
        message: 'Su contacto se agrego correctamente'
    }

    res.send(response)
})

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('	[GET] http://localhost:3525/');
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


//INICIA O SERVIDOR
app.listen(port);
console.log('API funcionando!');

//FAZ A CONEXÃO PARA SE FAZER AS CONSULTAS NO BANCO DE DADOS
function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'emailapi'
    });

    connection.query(sqlQry, function(error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}

//MOSTRA TODOS OS CLIENTES
router.get('/clientes', (req, res) => {
    execSQLQuery('SELECT * FROM testenode', res);
});

//MOSTRA CLIENTES ESPECIFICOS
router.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM testenode' + filter, res);
});

//DELETA UM USER
router.delete('/clienteD/:id', (req, res) => {
    execSQLQuery('DELETE FROM testenode WHERE ID=' + parseInt(req.params.id), res);
});

//INSERE UM USER
router.post('/clientes', (req, res) => {
    const nome = req.body.nome.substring(0, 150);
    const cpf = req.body.cpf.substring(0, 11);
    execSQLQuery(`INSERT INTO testenode(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});
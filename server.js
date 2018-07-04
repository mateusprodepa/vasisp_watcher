const express = require('express');
const app = express();
const readApacheLogs = require('./verificador/verificadorApache');
const axios = require('axios');
const port = process.env.PORT || 5000;

let url = 'http://10.1.13.27/logsisp/sisp2-minuto-access.log';

const readLogs = () =>
readApacheLogs(
  url,
  'SOAP',
  logs => {
    console.log('OK');
    // if(typeof logs === 'string') return;
    if(logs.length !== 0) {
      axios.post('http://10.1.3.59:3000/api/sistemasServidor', { nome: 'sisp2', status: "Offline" })
      .then(res => res.json(res))
    } else {
      axios.post('http://10.1.3.59:3000/api/sistemasServidor', { nome: 'sisp2', status: "Online" })
      .then(res => res.json(res))
    }
  }
)

setInterval(readLogs, 1000);


app.listen(port, () => console.info(`Servidor rodando na porta ${port}`));

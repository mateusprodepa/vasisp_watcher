const express = require('express');
const app = express();
const readApacheLogs = require('./verificador/verificadorApache');
const axios = require('axios');
const port = process.env.PORT || 8000;

let url = 'http://10.1.13.27/logsisp/sisp2-minuto-access.log';

const readLogs = () =>
readApacheLogs(
  url,
  'POST',
  logs => {
    if(typeof logs === 'string') return;
    logs.length !== 0 ?
      axios.post('http://localhost:3000/api/sistemasServidor', { nome: 'sisp2', status: "Offline" })
      .then(res => void(0))
      .catch(err => void(0)) :
      axios.post('http://localhost:3000/api/sistemasServidor', { nome: 'sisp2', status: "Online" })
      .then(res => void(0))
      .catch(err => void(0))
  }
)

setInterval(readLogs, 1000);


app.listen(port, () => console.info(`Servidor rodando na porta ${port}`));

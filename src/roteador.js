const express = require('express');
const { listarContas, intermediarioSenha, criarConta, atualizarUsuario, deletarConta } = require('./controladores/contas');
const { deposito, saque, transferencia, extrato, saldo, intermediarioSaldo, intermediarioSaldoExtrato } = require('./controladores/transacao');
const roteador = express();

roteador.get('/contas', intermediarioSenha, listarContas);
roteador.post('/contas', criarConta);
roteador.put('/contas/:numeroConta/usuario', atualizarUsuario);
roteador.delete('/contas/:numeroConta', deletarConta);

roteador.post('/transacoes/depositar', deposito);
roteador.post('/transacoes/sacar', saque);
roteador.post('/transacoes/transferir', transferencia);
roteador.get('/contas/saldo', intermediarioSaldoExtrato, saldo);
roteador.get('/contas/extrato', intermediarioSaldoExtrato, extrato);

module.exports = roteador;

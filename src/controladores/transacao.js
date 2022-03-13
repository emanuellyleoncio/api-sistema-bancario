let { banco, contas, saques, depositos, transferencias } = require('../bancodedados'); 
const format = require('date-fns/format');

const deposito = (req, res) => {
    const { numero_conta, valor } = req.body;
    const dataDeposito = format(new Date(), 'yyyy-MM-dd hh:mm:ss');

    if (!numero_conta) {
        return res.status(400).json({
            mensagem: "O número da conta e o valor são obrigatórios!"
        });
    };

    if (!valor) {
        return res.status(400).json({
            mensagem: "O número da conta e o valor são obrigatórios!"
        });
    };

    const numeroContaEncontrada = contas.find((item) => {
        return item.numero === Number(numero_conta);
    });

    if (!numeroContaEncontrada) {
        return res.status(404).json({ mensagem: 'Número de conta bancária não encontrado.' })
    };

    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "Não são permitidos depósitos zerados ou negativos." });
    };

    const depositar = {
        data: dataDeposito,
        numero_conta,
        valor
    };

    depositos.push(depositar);

    numeroContaEncontrada.saldo = numeroContaEncontrada.saldo + valor;

    return res.status(201).json();

};

const saque = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    const dataSaque = format(new Date(), 'yyyy-MM-dd kk:mm:ss');

    if (!numero_conta) {
        return res.status(400).json({
            mensagem: "O número da conta é obrigatório!"
        });
    };

    if (!valor) {
        return res.status(400).json({
            mensagem: "O valor é obrigatório!"
        });
    };

    if (!senha) {
        return res.status(400).json({
            mensagem: "A senha é obrigatória!"
        });
    };

    const contaEncontrada = contas.find((item) => {
        return item.numero === Number(numero_conta);
    });

    if (!contaEncontrada) {
        return res.status(404).json({
            mensagem: 'Número de conta bancária não encontrado.'
        });
    };

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(403).json({
            mensagem: "Senha incorreta!"
        });
    };

    if (contaEncontrada.saldo < Number(valor)) {
        return res.status(403).json({
            mensagem: 'Não há saldo disponível para saque.'
        });
    };

    const sacar = {
        data: dataSaque,
        numero_conta,
        valor
    };

    saques.push(sacar);

    contaEncontrada.saldo = contaEncontrada.saldo - valor;

    return res.status(201).json();

};

const transferencia =  (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const dataTransferencia = format(new Date(), 'yyyy-MM-dd kk:mm:ss');

    if (!numero_conta_origem) {
        return res.status(400).json({
            mensagem: "O número da conta de origem é obrigatório!"
        });
    };

    if (!numero_conta_destino) {
        return res.status(400).json({
            mensagem: "O número da conta de destino é obrigatório!"
        });
    };

    if (!valor) {
        return res.status(400).json({
            mensagem: "O valor é obrigatório!"
        });
    };

    if (!senha) {
        return res.status(400).json({
            mensagem: "A senha é obrigatória!"
        });
    };

    const contaOrigem = contas.find((item) => {
        return item.numero === Number(numero_conta_origem);
    });

    const contaDestino = contas.find((item) => {
        return item.numero === Number(numero_conta_destino);
    });

    if (!contaOrigem) {
        return res.status(404).json({
            mensagem: 'Número de conta bancária de origem não encontrado.'
        });
    };

    if (!contaDestino) {
        return res.status(404).json({
            mensagem: 'Número de conta bancária de destino não encontrado.'
        });
    };

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(403).json({
            mensagem: "Senha incorreta!"
        });
    };

    if (contaOrigem.saldo < Number(valor)) {
        return res.status(403).json({
            mensagem: 'Não há saldo disponível para transferência.'
        });
    };

    const transferir = {
        data: dataTransferencia,
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    transferencias.push(transferir);
    contaOrigem.saldo = contaOrigem.saldo - valor;
    contaDestino.saldo = contaDestino.saldo + valor;

    return res.status(201).json();
};

const intermediarioSaldoExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({
            mensagem: "O número da conta é obrigatório!"
        });
    };

    if (!senha) {
        return res.status(400).json({
            "mensagem": "A senha do banco é obrigatória"
        });
    };

    const contaEncontrada = contas.find((item) => {
        return item.numero === Number(numero_conta);
    });

    if (!contaEncontrada) {
        return res.status(404).json({
            mensagem: 'Número de conta bancária não encontrado.'
        });
    };

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(403).json({
            mensagem: "Senha incorreta!"
        });
    };

    next();
};

const saldo =  (req, res) => {
    const { numero_conta } = req.query;

    const contaEncontrada = contas.find((item) => {
        return item.numero === Number(numero_conta);
    });

    return res.status(200).json({
        saldo: contaEncontrada.saldo
    });
};

const extrato =  (req, res) => {
    const { numero_conta } = req.query;

    let numero = numero_conta;

    const transferenciasEnviadas = transferencias.filter((item) => {
        return item.numero_conta_origem === numero;
    });

    const transferenciasRecebidas = transferencias.filter((item) => {
        return item.numero_conta_destino === numero;
    });

    const depositosRealizados = depositos.filter((item) => {
        return item.numero_conta === numero;
    });

    const saquesRealizados = saques.filter((item) => {
        return item.numero_conta === numero;
    });

    const relacaoExtrato = {
        depositos: depositosRealizados,
        saques: saquesRealizados,
        transferenciasEnviadas: transferenciasEnviadas,
        transferenciasRecebidas: transferenciasRecebidas
    };

    return res.status(200).json(relacaoExtrato);
};

module.exports = {
    deposito,
    saque,
    transferencia,
    extrato,
    intermediarioSaldoExtrato,
    saldo
}

let { banco, contas, saques, depositos, transferencias } = require('../bancodedados');
let identificadorConta = 1;

const intermediarioSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(403).json({
            mensagem: "A senha do banco não foi informada!"
        });
    };

    if (senha_banco !== 'Cubos123Bank') {
        return res.status(400).json({
            mensagem: "A senha do banco informada é inválida!"
        });
    };

    next();
};

const listarContas = (req, res) => {
    return res.status(200).json(contas);
};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const cpfExistente =  contas.find((item) => {
        return item.usuario.cpf === Number(cpf);
    });

    const emailExistente =  contas.find((item) => {
        return item.usuario.email === email;
    });

    if (cpfExistente || emailExistente) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" })
    };

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório.' })
    };

    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório.' })
    };

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória.' })
    };

    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório.' })
    };

    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório.' })
    };

    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória.' })
    };


    const novaConta = {
        numero: identificadorConta++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    contas.push(novaConta);

    return res.status(201).json();
};

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const numeroContaEncontrado = contas.find((item) => {
        return item.numero === Number(numeroConta);
    });

    if (isNaN(Number(numeroConta)) === true) {
        return res.status(400).json({ mensagem: "Este número de conta bancária não é válido." });
    };

    if (!numeroContaEncontrado) {
        return res.status(404).json({ mensagem: 'Número de conta bancária não encontrado.' })
    };

    const cpfAtualizar =  contas.find((item) => {
        return item.usuario.cpf === cpf;
    });

    const emailAtualizar =  contas.find((item) => {
        return item.usuario.email === email;
    });

    if (emailAtualizar) {
        return res.status(400).json({ 
            mensagem: "Já existe uma conta com o e-mail informado!" })
    };

    if (cpfAtualizar) {
        return res.status(400).json({
            mensagem: "Já existe uma conta com o cpf informado!" })
    };

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório.' })
    };

    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório.' })
    };

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória.' })
    };

    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório.' })
    };

    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório.' })
    };

    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória.' })
    };

    numeroContaEncontrado.usuario.nome = nome;
    numeroContaEncontrado.usuario.cpf = cpf;
    numeroContaEncontrado.usuario.data_nascimento = data_nascimento;
    numeroContaEncontrado.usuario.telefone = telefone;
    numeroContaEncontrado.usuario.email = email;
    numeroContaEncontrado.usuario.senha = senha;

    return res.status(201).json();
};

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;

    const numeroContaEncontrado = contas.find((item) => {
        return item.numero === Number(numeroConta);
    });

    if (isNaN(Number(numeroConta)) === true) {
        return res.status(400).json({ mensagem: "Este número de conta bancária não é válido." });
    };

    if (!numeroContaEncontrado) {
        return res.status(404).json({ mensagem: 'Número de conta bancária não encontrado.' })
    };

    if (numeroContaEncontrado.saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    };

    contas = contas.filter((item) => {
        return item.numero !== Number(numeroConta);
    });

    return res.status(201).json();
};

module.exports = {
    intermediarioSenha,
    listarContas,
    criarConta,
    atualizarUsuario,
    deletarConta
};
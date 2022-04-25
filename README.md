![Logo do projeto](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/logo.png)

# Sistema Bancário :moneybag:

## Descrição do projeto

Este projeto consiste na criação de uma API de sistema bancário.

## Tabela de conteúdos

- [Descrição do Projeto](#descrição-do-projeto)
- [Tabela de Conteúdo](#tabela-de-conteúdo)
- [Status](#status)
- [Instalação](#instalação)
	- [Pré-requisitos](#pré-requisitos)
	- [Instalação](#instalação)
- [Como usar](#como-usar)
	- [Criar contas bancárias](#criar-contas-bancárias) 
   	- [Listar contas bancárias](#listar-contas-bancárias)
   	- [Atualizar usuário da conta bancária](#atualizar-usuários-da-conta-bancária)
   	- [Excluir conta](#excluir-conta)
   	- [Depositar](#depositar)
   	- [Sacar](#sacar)
   	- [Transferir](#transferir)
   	- [Saldo](#saldo)
   	- [Extrato](#extrato)
 - [Tecnologias](#tecnologias)
 - [Autora](#autora)

## Status

Projeto finalizado :heavy_check_mark:

## Instalação

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/) e um programa para testar as requisições como o [Insomnia](https://insomnia.rest/download).

### Instalação

```bash
# Clone este repositório
$ git clone <https://github.com/emanuellyleoncio/api-sistema-bancario>

# Acesse a pasta do projeto no terminal ou Git Bash

# Instale as dependências
$ npm init -y
$ npm install express
$ npm install nodemon
$ npm install date-fns --save

# No arquivo package.json, altere o script para "dev": "nodemon ./src/index.js"

# Execute a aplicação
$ npm run dev

# Realize os testes utilizando o Insomnia

```

## Como usar

Esta API permite as seguintes funcionalidades:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

Para os testes, utiliza-se a seguinte porta: **http://localhost:3000**

### 1 - Criar conta bancária

#### `POST` `/contas`

Esse endpoint cria uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

#### Exemplo de requisição efetuada:

![criar conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/criar_conta.JPG)

### 2 - Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint lista todas as contas bancárias existentes. Para acessá-lo deve ser informado a seguinte senha: **Cubos123Bank**

#### Exemplo de requisição efetuada:

![conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/listar_contas.JPG)

### 3 - Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint atualiza apenas os dados do usuário de uma conta bancária.

O corpo (body) deverá possuir um objeto com todas as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

#### Exemplo de requisição efetuada:

![conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/atualizar_conta.JPG)

### 4 - Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint exclui uma conta bancária existente.

Na requisição, deve ser passado o número da conta (como parâmetro na rota).

#### Exemplo de requisição efetuada:

![conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/deletar_conta.JPG)

### 5 - Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint soma o valor do depósito ao saldo de uma conta válida e registra essa transação.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor

#### Exemplo de requisição efetuada:

![conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/deposito.JPG)

### 6 - Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint deverá realiza o saque de um valor em uma determinada conta bancária e registrar essa transação.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

#### Exemplo de requisição efetuada:

![conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/saque.JPG)

### 7 - Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registra essa transação.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

#### Exemplo de requisição efetuada:

![conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/transferencia.JPG)

### 8 - Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint retorna o saldo de uma conta bancária.

Na requisição, deve ser informada na url (query params) o número da conta e a senha.

#### Exemplo de requisição efetuada:

![conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/saldo.JPG)

### 9 - Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint lista as transações realizadas de uma conta específica.

Na requisição, deve ser informada na url (query params) o número da conta e a senha.

#### Exemplo de requisição efetuada:

![conta](https://github.com/emanuellyleoncio/api-sistema-bancario/blob/main/public/readme_images/extrato.JPG)

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Javascript](https://www.javascript.com/)
- [Insomnia](https://insomnia.rest/download)

## Autora

Projeto desenvolvido por Emanuelly Leoncio, durante o curso de formação de Desenvolvimento de Software na Cubos Academy.

Entre em contato!

<div> 
  <a href = "mailto:manuleoncio01@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/emanuellyleoncio/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
</div>

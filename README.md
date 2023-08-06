# Hardhat Template

[![Open in Gitpod][gitpod-badge]][gitpod] [![Github Actions][gha-badge]][gha] [![Hardhat][hardhat-badge]][hardhat]
[![License: MIT][license-badge]][license]

[gitpod]: https://gitpod.io/#https://github.com/valmirphp/hardhat-template
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod
[gha]: https://github.com/valmirphp/hardhat-template/actions
[gha-badge]: https://github.com/valmirphp/hardhat-template/actions/workflows/ci.yml/badge.svg
[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg
[license]: https://opensource.org/licenses/MIT
[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg

Um modelo baseado em Hardhat para desenvolvimento de contratos inteligentes em Solidity, com configurações necessárias.

- [Hardhat](https://github.com/nomiclabs/hardhat): compilar, executar e testar contratos inteligentes
- [TypeChain](https://github.com/ethereum-ts/TypeChain): gerar ligações TypeScript para contratos inteligentes
- [Ethers](https://github.com/ethers-io/ethers.js/): renomada biblioteca Ethereum e implementação de carteira
- [Solhint](https://github.com/protofire/solhint): lint de código
- [Solcover](https://github.com/sc-forks/solidity-coverage): cobertura de código
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): formatador de código

## Começando

## Getting Started

Clique no botão [`Use este modelo`](https://github.com/valmirphp/hardhat-template/generate) no topo da página para criar
um novo repositório com este repositório como estado inicial.

## Recursos

Este modelo baseia-se nos frameworks e bibliotecas mencionados acima, portanto, para detalhes sobre suas características
específicas, consulte suas respectivas documentações.

Por exemplo, para o Hardhat, você pode consultar o [Tutorial Hardhat](https://hardhat.org/tutorial) e a
[Documentação Hardhat](https://hardhat.org/docs). Você pode estar particularmente interessado em ler a seção de
[Testando Contratos](https://hardhat.org/tutorial/testing-contracts).

### Configurações

Este template vem com configurações padrão sensatas nos seguintes arquivos:

```text
├── .editorconfig
├── .eslintignore
├── .eslintrc.yml
├── .gitignore
├── .prettierignore
├── .prettierrc.yml
├── .solcover.js
├── .solhint.json
└── hardhat.config.ts
```

### GitHub Actions

Este modelo já vem com o GitHub Actions pré-configurado. Seus contratos serão verificados e testados a cada push e pull
request feito para a branch `main`.

No entanto, para que isso funcione, você deve usar suas chaves secretas do GitHub `INFURA_API_KEY` e seu `MNEMONIC`.

Você pode editar o script de Integração Contínua (CI) em [.github/workflows/ci.yml](.github/workflows/ci.yml).

## Uso

### Pré-requisitos

Antes de poder executar qualquer comando, você precisa criar um arquivo `.env` e definir um mnemônico compatível com o
BIP-39 como uma variável de ambiente. Você pode seguir o exemplo em `.env.example`. Se você ainda não tiver um
mnemônico, pode usar este [site](https://iancoleman.io/bip39/) para gerar um.

Em seguida, prossiga com a instalação das dependências:

```sh
$ yarn install
```

### Configuração

Além das variáveis de ambiente mencionadas acima, em caso de uso de uma rede `mainnet` recomenda-se a criação de um
arquivo criptografado `.env.enc` com a chave privada da carteira que será usada para implantar os contratos
inteligentes.

Para isso iremos utilizar o pacote [@chainlink/env-enc](https://www.npmjs.com/package/@chainlink/env-enc)

Ja deixamos os atalhos para os comandos no arquivo `package.json` para facilitar o uso.

Para iniciar crie uma senha:

```sh
$ yarn envc:pwd
```

Na sequencia, execute o comando a baixo, e informe o nome da chave: `HW_PRIVATE_KEY`

```sh
$ yarn envc:set
```

### Compilar

Compile os contratos inteligentes com o Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile os contratos inteligentes e gere as ligações (bindings) do TypeChain:

```sh
$ yarn typechain
```

### Testar

Execute os testes com o Hardhat:

```sh
$ yarn test
```

### Lint Solidity

Execute a verificação de código (lint) no código Solidity:

```sh
$ yarn lint:sol
```

### Lint TypeScript

Execute a verificação de código (lint) no código TypeScript:

```sh
$ yarn lint:ts
```

### Coverage

Gere o relatório de cobertura de código:

```sh
$ yarn coverage
```

### Report Gas

Veja o consumo de gás por teste unitário e a média de gás por chamada de método:

```sh
$ REPORT_GAS=true yarn test
```

### Limpar

Exclua os artefatos dos contratos inteligentes, os relatórios de cobertura e o cache do Hardhat:

```sh
$ yarn clean
```

### Deploy

Implante os contratos na rede Hardhat:

```sh
$ yarn deploy:contracts
```

### Tasks

#### Deploy Greeter

Implante uma nova instância do contrato Greeter por meio de uma tarefa:

```sh
$ yarn task:deployGreeter --network ganache --greeting "Bonjour, le monde!"
```

#### Set Greeting

Execute a tarefa `setGreeting` na rede Ganache:

```sh
$ yarn task:setGreeting --network ganache --greeting "Bonjour, le monde!" --account 3
```

### Verificação de contrato

Faça a verificação de um contrato implantado na rede sepolia, isso é útil para quando desejar registrar o código fonte
do contrato na blockchain:

```sh
$ yarn hardhat verify --network sepolia 0xxxxx "Bonjour, le monde!"
```

Onde `0xxxxx` é o endereço do contrato implantado, e `"Bonjour, le monde!"` é o argumento do construtor.

## Dicas

### Syntax Highlighting

Se você usar o WebStorm, pode obter realce de sintaxe Solidity com o plugin
[IntelliJ Solidity](https://plugins.jetbrains.com/plugin/9475-solidity). Se você usar o VSCode, pode obter realce de
sintaxe Solidity com a extensão
[hardhat-solidity](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity).

## Using GitPod

[GitPod](https://www.gitpod.io/) é uma plataforma de desenvolvimento remoto de código aberto.

Para visualizar o relatório de cobertura gerado por `yarn coverage`, basta clicar em `Go Live`e na barra de status para
ligar/desligar o servidor.

## Desenvolvimento Local com Ganache

### Instalar o Ganache

```sh
$ npm i -g ganache
```

### Executar uma Blockchain de Desenvolvimento

```sh
$ ganache -s test
```

> O parâmetro `-s test` fornece uma semente à cadeia local e a torna determinística.

Make sure to set the mnemonic in your `.env` file to that of the instance running with Ganache.

## Licença

Este projeto está licenciado sob a Licença MIT.

## Fork do projeto

- [PaulRBerg/hardhat-template](https://github.com/PaulRBerg/hardhat-template)

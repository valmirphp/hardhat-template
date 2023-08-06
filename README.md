# Hardhat Template

[![Open in Gitpod][gitpod-badge]][gitpod] [![Github Actions][gha-badge]][gha] [![Hardhat][hardhat-badge]][hardhat]
[![built-with openzeppelin][openzeppelin-badge]][openzeppelin] [![License: MIT][license-badge]][license]

[gitpod]: https://gitpod.io/#https://github.com/valmirphp/hardhat-template
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod
[gha]: https://github.com/valmirphp/hardhat-template/actions
[gha-badge]: https://github.com/valmirphp/hardhat-template/actions/workflows/ci.yml/badge.svg
[openzeppelin-badge]: https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF
[openzeppelin]: https://docs.openzeppelin.com/
[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg
[license]: https://opensource.org/licenses/MIT
[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg

Um template baseado em Hardhat para desenvolvimento de contratos inteligentes em Solidity, com configurações
necessárias.

- [Hardhat](https://github.com/nomiclabs/hardhat): compilar, executar e testar contratos inteligentes
- [TypeChain](https://github.com/ethereum-ts/TypeChain): gerar ligações TypeScript para contratos inteligentes
- [Ethers](https://github.com/ethers-io/ethers.js/): renomada biblioteca Ethereum e implementação de carteira
- [Solhint](https://github.com/protofire/solhint): lint de código
- [Solcover](https://github.com/sc-forks/solidity-coverage): cobertura de código
- [Alchemy](https://www.alchemy.com): SDK web3 e API de nó de rede
- [OpenZeppelin][openzeppelin]: O padrão para aplicações seguras de blockchain.

## Começando

Clique no botão [`Use este modelo`](https://github.com/valmirphp/hardhat-template/generate) no topo da página para criar
um novo repositório com este repositório como estado inicial.

## Hardhat 🦺

Este template baseia-se nos frameworks e bibliotecas mencionados acima, portanto, para detalhes sobre suas
características específicas, consulte suas respectivas documentações.

Por exemplo, para o Hardhat, você pode consultar o [Tutorial Hardhat](https://hardhat.org/tutorial) e a
[Documentação Hardhat](https://hardhat.org/docs). Você pode estar particularmente interessado em ler a seção de
[Testando Contratos](https://hardhat.org/tutorial/testing-contracts).

### Redes suportadas

- Arbitrum
- Avalanche
- Binance Smart Chain
- Hardhat
- ETH Mainnet
- ETH Sepolia (Testnet)
- Optimism Mainnet
- Polygon Mainnet
- Polygon Mumbai (Testnet)
- Ganache
- Localhost (Hardhat node console)

### Nó de rede Hardhat

Execute um nó de rede local do Hardhat:

```sh
$ yarn hardhat node
```

> **Nota**: você pode executar os comandos hardhat passando a flag `--network localhost` para usar o nó local.

### Hardhat Console

Execute o console do Hardhat:

```sh
$ yarn hardhat console
```

Experimente o seguinte comando no console:

```sh
$ await ethers.provider.getBlockNumber()
$ const greeter = await ethers.deployContract("Greeter", ["Olá Mundo"]);
$ await ethers.provider.getBlockNumber()
$ await greeter.greet()
$ await greeter.setGreeting("Olá Hardhat!")
$ await greeter.greet()
$ const signers = await ethers.getSigners()
$ greeter.connect(signers[1]).pause()
```

> **Nota**: veja mais detalhes em [Hardhat Console](https://hardhat.org/hardhat-runner/docs/guides/hardhat-console)

### Autocompletar comando Hardhat

Para autocompletar os comandos do Hardhat, execute o seguinte comando:

```sh
$ npm install --global hardhat-shorthand
$ hardhat-completion install
```

> **Nota**: Veja mais detalhes em
> [hardhat-shorthand](https://hardhat.org/hardhat-runner/docs/guides/command-line-completion)

## Configurações

Este template vem com configurações recomendas nos seguintes arquivos:

```text
├── .editorconfig
├── .eslintignore
├── .eslintrc.yml
├── .gitignore
├── .gitpod.yml
├── .mocharc.json
├── .prettierignore
├── .prettierrc.yml
├── .solcover.js
├── .solhint.json
├── .solhintignore
├── .yarnrc.yml
├── tsconfig.json
├── hardhat.utils.ts
└── hardhat.config.ts
```

## GitHub Actions

Este template já vem com o GitHub Actions pré-configurado. Seus contratos serão verificados e testados a cada push e
pull request feito para a branch `main`.

No entanto, para que isso funcione, você deve usar suas chaves secretas do GitHub `INFURA_API_KEY` e seu `MNEMONIC`.

Você pode editar o script de Integração Contínua (CI) em [.github/workflows/ci.yml](.github/workflows/ci.yml).

### Workflow de CI

O fluxo de trabalho de CI é executado em cada push e pull request para a branch `main`. Ele executa os seguintes passos:

- ✅ Setup Node18x
- ✅ Lint (solhint + prettier + TS eslint)
- ✅ Typechain (compile os contratos e gere os tipos TS)
- ✅ Testes unitários (mocha)
- ✅ Testes de cobertura (quando não atingir % de cobertura deseja o CI falha)
- ✅ Executa as tasks do hardhat
- ✅ Relatório de consumo de gás

## IDEs

Este template é independente de IDE, mas para obter a melhor experiência do usuário, deixamos algumas configurações para
facilitar o uso com o VSCode e WebStorm.

### Integração com VSCode

Se você usar o VSCode, pode obter realce de sintaxe Solidity com a extensão
[Hardhat extension](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity).

No diretório `.vscode`, você encontrará uma configuração de tarefa para executar o Hardhat.

### Integração com WebStorm

Se você optar por WebStorm, pode obter realce de sintaxe Solidity com o plugin
[IntelliJ Solidity](https://plugins.jetbrains.com/plugin/9475-solidity).

No diretório `.run`, você encontrará uma template de configuração dos testes `Mocha` para executar no webstorm.

## Uso

### Pré-requisitos

Antes de poder executar qualquer comando, você precisa criar um arquivo `.env` e definir um mnemônico compatível com o
BIP-39 como uma variável de ambiente. Você pode seguir o exemplo em `.env.example`. Se você ainda não tiver um
mnemônico, pode usar este [site](https://iancoleman.io/bip39/) para gerar um.

Em seguida, prossiga com a instalação das dependências:

```sh
$ yarn install
```

### Variáveis de ambiente

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

### Extensões de contratos

Este template já possui a lib [OpenZeppelin Contracts](https://www.openzeppelin.com/contracts/) instalada.

Gere seu contrato com o [Wizard do OpenZeppelin](https://wizard.openzeppelin.com).

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

Veja mais sobre as regras de lint em [Solhint](https://protofire.github.io/solhint/docs/rules.html)

```sh
$ yarn lint:sol
```

**Plugins para IDEs:**

- [VS Code](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [JetBrains](https://plugins.jetbrains.com/plugin/10177-solidity-solhint)

**Veja mais:**

- [Regras de boas práticas](https://protofire.github.io/solhint/docs/rules.html#best-practise-rules)
- [Regras de segurança](https://protofire.github.io/solhint/docs/rules.html#security-rules)
- [Regras de estilo](https://protofire.github.io/solhint/docs/rules.html#style-guide-rules)

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
$ yarn test:gas
```

### Limpar

Exclua os artefatos dos contratos inteligentes, os relatórios de cobertura e o cache do Hardhat:

```sh
$ yarn clean
```

### Tasks

#### Deploy Greeter

Implante uma nova instância do contrato Greeter por meio de uma tarefa:

```sh
$ yarn task:deployGreeter --network sepolia --greeting "Bonjour, le monde!"
```

#### Set Greeting

Execute a tarefa `setGreeting` na rede testnet sepolia:

```sh
$ yarn task:setGreeting --network sepolia --greeting "Bonjour, le monde!" --account 3
```

## Deploy

### Implantação de contrato

Implante os contratos na rede Hardhat:

```sh
$ yarn deploy:contracts
```

### Verificação de contrato

Faça a verificação de um contrato implantado na rede sepolia, isso é útil para quando desejar registrar o código fonte
do contrato na blockchain:

```sh
$ yarn hardhat verify --network sepolia 0xxxxx "Bonjour, le monde!"
```

Onde `0xxxxx` é o endereço do contrato implantado, e `"Bonjour, le monde!"` é o argumento do construtor.

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

Fique à vontade para usar o código como quiser, mas não se esqueça de dar crédito quando apropriado.

## Projeto baseado em

Este repositório foi forkado do projeto [PaulRBerg/hardhat-template](https://github.com/PaulRBerg/hardhat-template).

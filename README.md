# API TEST TALLOS
## _Api desenvolvida para uma entrevista na Tallos_

## Tecnologias utilizadas:

- Nest
- MongoDB
- Docker
- Git

## Instalação

A API é baseada em Nest, logo é necessário possuir em sua máquina o software Node JS.

Contudo, devido a conteinerização aplicada nessa API é possível simplificar esse passo. Basta rodar o comando abaixo e o docker fará seu trabalho.

```sh
docker-compose up --build
```

Caso já tenha rodado o comando acima e deseje reiniciar a API, rode o seguinte comando:

```sh
npm run start
```

A pasta node_modules fica dentro do docker pra facilitar a instalação. Logo ela não é criada em sua máquina local. Isso pode gerar alguns erros de importação em sua IDE, mas é algo apenas visual. Caso queira que tudo funcione sem incomodos instale o node js em sua máquina. Em seguida rode o seguinte comando dentro desse projeto: 

```sh
npm install
```

A API rodará em:

```sh
127.0.0.1:3000
```

## License
**Software Livre, Divirta-se!**

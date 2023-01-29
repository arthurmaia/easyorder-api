# EasyOrder API

## Descrição

Esta é uma aplicação em NestJS feita especialmente para matéria Projeto e Desenvolvimento de Sistemas da Informação 1, na faculdade Universidade Federal de Uberlândia (UFU).

## Como rodar a aplicação

Por se tratar de um projeto que envolve tanto uma aplicação em NestJS quanto um banco de dados PostgreSQL, este projeto foi configurado para ser rodado dentro do Docker, para maior praticidade.

- Primeiro passo:

  - Ter o Docker baixado em sua máquina. O download pode ser feito a partir deste link https://docs.docker.com/desktop/install/windows-install/.

- Segundo passo:
  - Tendo o Docker instalado em sua máquina e com o Docker Desktop baixado em sua máquina, com o terminal dentro da pasta do seu projeto, rode o comando:

```bash
docker-compose up -d
```

_OBS: Este comando acaba por ler os comandos que constam dentro de um arquivo com nome **docker-compose.yml**. O **-d** significa que será executado e este não ficará preso no seu terminal._

_OBS 2: Quando o comando é rodado pela **primeira vez**, pode **demorar** um pouco pois será instalado as imagens usadas nas duas aplicações. Uma imagem é do **node:16-alpine** (uma imagem com a versão 16 do Node) e outra imagem **postgres:alpine** (uma imagem para executar comandos/queries postgres). Após a primeira execução do comando, será rápido, pois as imagens já estarão instaladas no seu docker._

Após executar este comando, sua aplicação já começará a rodar. Pode pode visualiza por meio do comando:

```bash
docker logs application -f
```

_OBS: Este comando fica listando os logs que acontecem dentro do seu container. Quando o projeto foi configurado, o container responsável por rodar nossa aplicação se chama **application**. Eis o porque do application no nosso comando. O **-f** é para que o mesmo fique mostrando os logs sem parar. Logo, qualquer alteração que for feita dentro da aplicação, automaticamente será atualizado no container e este fará o build novamente._

Ou senão pode visualizar por meio do Docker Desktop também.

![download](https://user-images.githubusercontent.com/56277345/185748964-21b4418d-0a81-4f42-8319-d363e4725aec.png)

## Aplicação

A aplicação rodará na porta **3000**. Logo, para consumir algum endpoint desta aplicação, o caminho será **http://localhost:3000**.

Vale lembrar que o projeto utilizou de uma lib externa para documentação de endpoints, o **Swagger**. Com ele, além de todos os endpoints estarem documentados, é possível também executá-los por meio da sua interface. Para acessar a interface, basta inserir **/swagger** no final da URL. Por fim, será **http://localhost:3000/swagger**.

![download (1)](https://user-images.githubusercontent.com/56277345/185748983-a6376a37-dff6-484c-8d11-87b85d9c6444.png)

Para fins de ensinamento, foi criado um endpoint [GET] /. Para executa-lo, clique no endpoint. Este será expandido e terá um botão "Try it out". Clicando nele, aparecerá um botão "Execute". Clique no botão e o endpoint será executado e terá seu retorno. **Por favor se atente ao retorno deste endpoint, é muito importante!**

![download (2)](https://user-images.githubusercontent.com/56277345/185748998-cab27844-347e-4596-aae4-7307777ed99d.png)

## Endpoints usados pelo front-end

```
[GET] /category/all // Endpoint responsável por retornar todas as possíveis categorias de produtos da aplicação

[GET] /product/getProductsByCategoryId/{id} // Endpoint responsável por retornar os produtos a partir de sua categoria

[POST] /order/create // Endpoint responsável por criar um pedido e vincular com a comando e com o dispositivo usado (celular do usuário)

[POST] /order/insertProductsIntoOrder // Endpoint responsável por inserir produtos e sua quantidade no pedido

[GET] /bill/getOrdersByBillId/{id} // Endpoint responsável por retornar todos os pedidos dentro da comanda

[POST] /payment/create // Endpoint responsável por registrar o pagamento do usuário na comanda
```

## Descrição geral de como foi feito o projeto

Basicamente, cada tabela do nosso banco teve seu modulo criado dentro da pasta **src**. Com isso, existe o **.module.ts**, responsável por mapear todas as importações, exportações, provedores e controladores. Logo, na maioria dos arquivos, há o **.controller.ts**, responsável por mapear todos os endpoints disponíveis naquele controller. Temos o **.service.ts**, responsável por toda a regra de negócio do endpoint, e também por fazer a chamada do repositório. Aproveitando, temos o **.repository.ts**, este responsável por ser uma ponte para executar queries SQL dentro da tabela em questão. Por fim, temos o **.entity.ts**, responsável por definir quais as colunas e seus tipos de cada tabela.

Cada **módulo** e **entidade** deve ser mapeada no módulo global **app.module.ts**.

De cada módulo, apenas **três não possuem controllers** por se tratarem de tabelas auxiliares entre o relacionamento de duas tabelas. Estas foram **bill-has-order**, **bill-has-payment** e **order-has-product**.

## Testes nos **CONTROLLERS**

Para rodar os testes, basta rodar

```bash
npm run test
```

- [x] Order
- [x] Bill
- [x] Payment
- [x] Category
- [x] Product
- [x] BarTable
- [x] OrderStatus

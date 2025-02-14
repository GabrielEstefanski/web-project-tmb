# Projeto Web TMB - Sistema de Pedidos

Este projeto foi desenvolvido para gerenciar pedidos de forma simples e eficiente. Ele conta com um CRUD completo,  
permitindo criar, editar e excluir pedidos. Sempre que um pedido tem seu status alterado, o sistema exibe notificações em tempo real,  
mantendo o usuário informado. Além disso, a interface é totalmente responsiva, garantindo uma boa experiência em qualquer dispositivo.

## Tecnologias Utilizadas

### Frontend:
  - Vite
  - React + Typescript
  - Tailwind CSS 4
  - Axios

### Backend:
  - .NET 8
  - Entity Framework Core
  - SignalR
  - PostgreSQL

### Infra:
  - Docker
  - Azure Service Bus

## Descrição do Sistema

O sistema permite que os usuários criem, editem e excluam pedidos através de uma interface intuitiva e responsiva. Cada vez que o status de um pedido é alterado, o sistema notifica os usuários em tempo real, garantindo que todos os envolvidos estejam sempre atualizados.
Além disso, o sistema é integrado com o Azure Service Bus para garantir uma comunicação assíncrona e escalável. Um Worker consome as mensagens enviadas para o Service Bus, e com isso, atualiza automaticamente o status dos pedidos, sem necessidade de intervenção manual.
A aplicação utiliza Docker para facilitar a execução, garantindo que o ambiente de desenvolvimento e produção seja consistente e isolado.

## Tecnologias Detalhadas

### Service Bus

O Azure Service Bus é uma fila de mensagens que permite que diferentes componentes do sistema se comuniquem de forma assíncrona. Quando um pedido é criado ou alterado, uma mensagem é enviada para a fila do Service Bus. Essa fila pode ser consumida por sistemas ou processos que necessitam de processamento posterior, como a atualização automática de status dos pedidos.

### Worker

O Worker é uma aplicação que fica em execução constante, consumindo mensagens da fila do Azure Service Bus. Cada vez que uma mensagem é recebida, o Worker processa essa informação e atualiza automaticamente o status do pedido no banco de dados. Isso permite que o sistema altere os status dos pedidos de forma automatizada e desacoplada, sem depender de ações manuais dos usuários.

### PostgreSQL

O sistema utiliza PostgreSQL como banco de dados relacional para armazenar informações de pedidos, status e outros dados essenciais. O Entity Framework Core é usado para interagir com o banco de dados de maneira eficiente, realizando operações CRUD (Create, Read, Update, Delete) nos dados de pedidos.

### Docker

O projeto foi contêinerizado utilizando Docker para garantir que o ambiente de desenvolvimento seja o mesmo em qualquer máquina, facilitando a instalação e execução do sistema. O docker-compose.yml orquestra os contêineres do frontend, backend e banco de dados, proporcionando um setup simples e eficiente.

## Configuração

### Variáveis de Ambiente
Certifique-se de definir as variáveis de ambiente no arquivo `.env`:

```env
AZURE_SERVICE_BUS="Endpoint=sb://<SERVICE_BUS_NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<ACCESS_KEY_NAME>;SharedAccessKey=<ACCESS_KEY>;EntityPath=<QUEUE_NAME>"
```

Por padrão o nome da fila utilizada é `tmb-queue`.  

Caso queira alterar o nome da fila usada pelo Azure Service Bus, edite a variável `AZURE_SERVICE_QUEUE` no `docker-compose.yml`.

A string de conexão com o banco de dados também está definida no `docker-compose.yml`, mas não é necessário alterá-la para a execução padrão.

## Execução do Projeto

### Executando o Projeto com Docker

Certifique-se de ter o Docker instalado. Em seguida, execute:

```bash
docker-compose up --build
```

Isso irá subir os contêineres do backend, frontend e banco de dados automaticamente.

O projeto estará disponível em:
- Frontend: http://localhost:5000
- Documentação da API (Swagger): https://localhost:3000/swagger

## Estrutura do Projeto:

```
/web-project-tmb
├── backend/          # API .NET 8 com SignalR
│   ├── api-tmb/      # Código fonte da API
│   ├── Dockerfile    # Configuração do contêiner backend
│   ├── ...
│
├── frontend/         # React + Vite + Tailwind CSS 4
│   ├── src/          # Código fonte
│   ├── public/       # Arquivos estáticos
│   ├── Dockerfile    # Configuração do contêiner frontend
│   ├── ...
│
├── docker-compose.yml # Orquestração dos contêineres
└── README.md         # Este arquivo
```

## Funcionalidades

- Criar, editar e excluir pedidos via interface responsiva.
- Notificação de mudança do status dos pedidos usando SignalR.
- Mensageria com Azure Service Bus para comunicação assíncrona.
- Worker para processamento de mensagens do Azure Service Bus, que irá realizar a atualização automática de status dos pedidos após uma alteração.
- Banco de dados relacional utilizando PostgreSQL.
- Contêinerização com Docker para facilitar a execução.

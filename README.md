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
  - Docker

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

Após os conteineres iniciarem navegue até a pasta do backend:

```bash
cd backend/api-tmb
```

E aplique as migrações:

```bash
dotnet ef database update
```

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
- Banco de dados relacional utilizando PostgreSQL.
- Contêinerização com Docker para facilitar a execução.
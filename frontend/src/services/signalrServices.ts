import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

let connection: HubConnection | null = null;

const startConnection = async () => {
  try {
    connection = new HubConnectionBuilder()
      .withUrl('http://localhost:3000/notifications')
      .build();

    await connection.start();
    console.log('Conexão SignalR estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao estabelecer conexão SignalR:', error);
  }
};

const subscribeToNotifications = (callback: (message: string) => void) => {
  if (connection) {
    connection.on('ReceiveNotification', (message: string) => {
      callback(message);
      console.log(message);
    });
  }
};

const stopConnection = async () => {
  if (connection) {
    await connection.stop();
    console.log('Conexão SignalR finalizada.');
  }
};

export { startConnection, subscribeToNotifications, stopConnection };

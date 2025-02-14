using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.Logging;

namespace ApiTmb.Services
{
    public class ServiceBusService : IServiceBusService
    {
        private readonly string _connectionString;
        private readonly string _queueName;
        private readonly ServiceBusClient _client;
        private readonly ServiceBusSender _sender;
        private readonly ILogger<OrderProcessingWorker> _logger;

        public ServiceBusService(IConfiguration configuration, ILogger<OrderProcessingWorker> logger)
        {
            _connectionString = configuration["AzureServiceBus:ConnectionString"]
                ?? throw new ArgumentNullException(nameof(configuration), "A string de conexão do Azure Service Bus está faltando.");
            _queueName = configuration["AzureServiceBus:QueueName"]
                ?? throw new ArgumentNullException(nameof(configuration), "O nome da fila do Azure Service Bus está faltando.");

            _client = new ServiceBusClient(_connectionString);
            _sender = _client.CreateSender(_queueName);
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }


        public async Task SendMessageAsync(string message)
        {
            try
            {
                ServiceBusMessage busMessage = new(message);
                await _sender.SendMessageAsync(busMessage);
                _logger.LogInformation($"Mensagem enviada para a fila {_queueName} com sucesso");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar mensagem para o service bus.");
                throw;
            }
        }
    }
}

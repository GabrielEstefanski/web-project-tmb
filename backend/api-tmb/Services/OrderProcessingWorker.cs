using Azure.Messaging.ServiceBus;

namespace ApiTmb.Services
{
    public class OrderProcessingWorker(IConfiguration configuration, IServiceScopeFactory scopeFactory, ILogger<OrderProcessingWorker> logger) : BackgroundService
    {
        private readonly string _connectionString = configuration["AzureServiceBus:ConnectionString"]
                ?? throw new ArgumentNullException(nameof(configuration), "A string de conexão do Azure Service Bus está faltando.");
        private readonly string _queueName = configuration["AzureServiceBus:QueueName"]
                ?? throw new ArgumentNullException(nameof(configuration), "O nome da fila do Azure Service Bus está faltando.");
        private readonly IServiceScopeFactory _scopeFactory = scopeFactory ?? throw new ArgumentNullException(nameof(scopeFactory));
        private ServiceBusClient? _client;
        private ServiceBusProcessor? _processor;
        private readonly ILogger<OrderProcessingWorker> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        public override async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Worker iniciado.");

            _client = new ServiceBusClient(_connectionString);
            _processor = _client.CreateProcessor(_queueName, new ServiceBusProcessorOptions());

            _processor.ProcessMessageAsync += async args =>
            {
                string body = args.Message.Body.ToString();
                _logger.LogInformation($"Mensagem recebida: {body}");

                if (Guid.TryParse(body, out Guid orderId))
                {
                    await ProcessOrderAsync(orderId);
                }

                await args.CompleteMessageAsync(args.Message);
            };

            _processor.ProcessErrorAsync += args =>
            {
                _logger.LogError($"Erro no Service Bus: {args.Exception.Message}");
                return Task.CompletedTask;
            };

            await _processor.StartProcessingAsync(cancellationToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.CompletedTask;
        }

        private async Task ProcessOrderAsync(Guid orderId)
        {
            try
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var orderService = scope.ServiceProvider.GetRequiredService<IOrderService>();

                    _logger.LogInformation($"Atualizando pedido {orderId} para 'Processando'...");
                    await orderService.UpdateOrderStatusAsync(orderId, Enums.OrderStatus.Processando);

                    await Task.Delay(5000, CancellationToken.None);

                    _logger.LogInformation($"Atualizando pedido {orderId} para 'Finalizado'.");
                    await orderService.UpdateOrderStatusAsync(orderId, Enums.OrderStatus.Finalizado);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao processar o pedido {orderId}: {ex.Message}");
            }
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Worker está sendo encerrado...");

            if (_processor != null)
            {
                await _processor.StopProcessingAsync(cancellationToken);
                await _processor.DisposeAsync();
            }

            if (_client != null)
            {
                await _client.DisposeAsync();
            }

            await base.StopAsync(cancellationToken);
        }
    }
}

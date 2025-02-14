using ApiTmb.Data.Repositories;
using ApiTmb.Enums;
using ApiTmb.Hubs;
using ApiTmb.Models;
using Microsoft.AspNetCore.SignalR;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace ApiTmb.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IServiceBusService _serviceBusService;
        private readonly IHubContext<NotificationHub> _hubContext;

        public OrderService(IOrderRepository orderRepository, IServiceBusService serviceBusService, IHubContext<NotificationHub> hubContext)
        {
            _orderRepository = orderRepository;
            _serviceBusService = serviceBusService;
            _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext), "HubContext não pode ser nulo.");
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllOrdersAsync();
        }

        public async Task<Order> GetOrderByIdAsync(Guid id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            return order ?? throw new KeyNotFoundException($"Pedido com ID {id} não encontrado.");
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            await _orderRepository.AddOrderAsync(order);

            await _serviceBusService.SendMessageAsync(order.Id.ToString());

            return order;
        }

        public async Task<Order> UpdateOrderAsync(Order order)
        {
            await _orderRepository.UpdateOrderAsync(order);

            await _serviceBusService.SendMessageAsync(order.Id.ToString());

            return order;
        }

        public async Task UpdateOrderStatusAsync(Guid orderId, OrderStatus status)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order != null)
            {
                var statusDisplayName = status.GetType()
                    .GetMember(status.ToString())
                    .FirstOrDefault()?
                    .GetCustomAttribute<DisplayAttribute>()
                    ?.Name;
                order.Status = status;
                await _orderRepository.UpdateOrderAsync(order);
                await _serviceBusService.SendMessageAsync($"Pedido {orderId} atualizado para {statusDisplayName}");
                await _hubContext.Clients.All.SendAsync("ReceiveNotification", $"Pedido {order.Produto} atualizado para {statusDisplayName}");
            }
        }

        public async Task DeleteOrderAsync(Guid id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order != null)
            {
                await _orderRepository.DeleteOrderAsync(order);

                await _serviceBusService.SendMessageAsync($"Pedido {id} deletado.");
            }
        }
    }
}

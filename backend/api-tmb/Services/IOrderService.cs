using ApiTmb.Enums;
using ApiTmb.Models;

namespace ApiTmb.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(Guid id);
        Task<Order> CreateOrderAsync(Order order);
        Task<Order> UpdateOrderAsync(Order order);
        Task UpdateOrderStatusAsync(Guid orderId, OrderStatus status);
        Task DeleteOrderAsync(Guid id);
    }
}

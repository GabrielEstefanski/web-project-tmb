using ApiTmb.Enums;

namespace ApiTmb.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public required string Cliente { get; set; }
        public required string Produto { get; set; }
        public decimal Valor { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pendente;
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
    }
}

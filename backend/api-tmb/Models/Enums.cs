using System.ComponentModel.DataAnnotations;

namespace ApiTmb.Enums
{
    public enum OrderStatus
    {
        [Display(Name = "Pendente")]
        Pendente = 0,

        [Display(Name = "Processando")]
        Processando = 1,

        [Display(Name = "Finalizado")]
        Finalizado = 2
    }
}

namespace ApiTmb.Services
{
    public interface IServiceBusService
    {
        Task SendMessageAsync(string message);
    }
}

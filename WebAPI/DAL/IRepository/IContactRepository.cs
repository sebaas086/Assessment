using WebAPI.Models.Entity;
using WebAPI.Models.Models;

namespace WebAPI.DAL.IRepository
{
    public interface IContactRepository
    {
        Task<List<Contacts>> GetAllContacts();
        Task<Contacts> GetContactById(Guid Id);
        Task<List<Contact>> CheckDuplicateEmail(Contacts contacts);
        Task<Guid> CreateContact(Models.Entity.Contact contact);
        Task<Guid> UpdateContact(Models.Entity.Contact contact);
        Task DeleteContact(Guid Id);
    }
}

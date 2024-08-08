using WebAPI.DAL.IRepository;
using WebAPI.Models.Entity;
using WebAPI.Models.Models;

namespace WebAPI.DAL.Services
{
    public class ContactService
    {
        public readonly IContactRepository contactRepository;
        public ContactService(IContactRepository contactRepository)
        {
            this.contactRepository = contactRepository;
        }

        public async Task<List<Contacts>> GetAllContacts()
        {
            return await contactRepository.GetAllContacts();
        }

        public async Task<Guid> CreateContact(Contacts contact)
        {
            var duplicates = await contactRepository.CheckDuplicateEmail(contact);
            if (duplicates.Any())
                throw new Exception("Duplicate Emails Found");
            var contactToSave = new Models.Entity.Contact
            {
                Address = contact.Address,
                City = contact.City,
                Country = contact.Country,
                Email = contact.Email,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                PhoneNumber = contact.PhoneNumber,
                PostalCode = contact.PostalCode,
                State = contact.State
            };
            return await contactRepository.CreateContact(contactToSave);
        }

        public async Task UpdateContact(Contacts contact)
        {
            var duplicates = await contactRepository.CheckDuplicateEmail(contact);
            if (duplicates.Any())
                throw new Exception("Duplicate Emails Found");
            var contactBeforeEdit = await contactRepository.GetContactById(contact.Id);
            if (contactBeforeEdit != null)
            {
                var contactToSave = new Models.Entity.Contact
                {
                    Id = contact.Id,
                    Address = contact.Address,
                    City = contact.City,
                    Country = contact.Country,
                    Email = contact.Email,
                    FirstName = contact.FirstName,
                    LastName = contact.LastName,
                    PhoneNumber = contact.PhoneNumber,
                    PostalCode = contact.PostalCode,
                    State = contact.State
                };
                var Id = await contactRepository.UpdateContact(contactToSave);
            }
            else
            {
                throw new Exception("Contact not found");
            }
        }

        public async Task DeleteContact(Guid Id)
        {
            var contactBeforeEdit = await contactRepository.GetContactById(Id);
            if (contactBeforeEdit != null)
            {
                await contactRepository.DeleteContact(Id);
            }
            else
            {
                throw new Exception("Contact not found");
            }
        }
    }
}

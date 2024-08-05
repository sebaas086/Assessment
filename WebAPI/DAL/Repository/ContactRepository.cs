using Microsoft.EntityFrameworkCore;
using WebAPI.DAL.IRepository;
using WebAPI.Data;
using WebAPI.Models.Entity;
using WebAPI.Models.Models;

namespace WebAPI.DAL.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly AppDbContext db;
        public ContactRepository(AppDbContext db)
        {
            this.db = db;
        }

        public async Task<List<Contacts>> GetAllContacts()
        {
            return await (from c in db.Contacts
                          select new Contacts
                          {
                              Address = c.Address,
                              City = c.City,
                              PostalCode = c.PostalCode,
                              Country = c.Country,
                              Email = c.Email,
                              FirstName = c.FirstName,
                              Id = c.Id,
                              LastName = c.LastName,
                              PhoneNumber = c.PhoneNumber,
                              State = c.State
                          }).OrderBy(c=>c.FirstName).ToListAsync();
        }

        public async Task<Contacts> GetContactById(Guid Id)
        {
            return await (from c in db.Contacts
                          select new Contacts
                          {
                              Address = c.Address,
                              City = c.City,
                              PostalCode = c.PostalCode,
                              Country = c.Country,
                              Email = c.Email,
                              FirstName = c.FirstName,
                              Id = c.Id,
                              LastName = c.LastName,
                              PhoneNumber = c.PhoneNumber,
                              State = c.State
                          }).FirstOrDefaultAsync(c => c.Id == Id);
        }

        public async Task<List<Contact>> CheckDuplicateEmail(Contacts contacts)
        {
            return await db.Contacts.Where(c => c.Id != contacts.Id && c.Email == contacts.Email).ToListAsync();
        }

        public async Task<Guid> CreateContact(Models.Entity.Contact contact)
        {
            await db.Contacts.AddAsync(contact);
            await db.SaveChangesAsync();
            return contact.Id;
        }

        public async Task<Guid> UpdateContact(Models.Entity.Contact contact)
        {
            db.Contacts.Update(contact);
            await db.SaveChangesAsync();
            return contact.Id;
        }

        public async Task DeleteContact(Guid Id)
        {
            var contactToDelete = await db.Contacts.Where(c => c.Id == Id).FirstOrDefaultAsync();
            if (contactToDelete != null)
                db.Contacts.Remove(contactToDelete);
            await db.SaveChangesAsync();
        }

    }
}

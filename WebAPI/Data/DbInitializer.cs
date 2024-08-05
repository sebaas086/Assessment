using WebAPI.Models.Entity;

namespace WebAPI.Data
{
    public class DbInitializer
    {
        internal static void Initialize(AppDbContext dbContext)
        {
            ArgumentNullException.ThrowIfNull(dbContext, nameof(dbContext));
            dbContext.Database.EnsureCreated();
            if (dbContext.Contacts.Any()) return;

            var users = new Contact[]
            {
                new Contact
                {
                    FirstName = "William",
                    LastName = "Shakespeare",
                    Address="London",
                    City="London",
                    Country="UK",
                    Email="test@abc.com",
                    PhoneNumber="9876543210",
                    PostalCode="000000",
                    State=""
                }
            };

            foreach (var user in users)
                dbContext.Contacts.Add(user);

            dbContext.SaveChanges();
        }
    }
}

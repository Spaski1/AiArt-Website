using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtShop.Entities.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string CreatedAt { get; set; } = DateTime.Now.ToString();
        public string CardNo { get; set; }
        public string ExpireDate { get; set; }
        public List<ArtImage> Images { get; set; } = new List<ArtImage>();     
        public string FullName => $"{FirstName} {LastName}";
    }
}

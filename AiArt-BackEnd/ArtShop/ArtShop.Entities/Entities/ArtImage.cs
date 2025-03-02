using ArtShop.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtShop.Entities.Entities
{
    public class ArtImage
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; }
        public int Price { get; set; }
        public bool Stock { get; set; }
        public string ImageUrl { get; set; }
        public string CreatedAt { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid? BoughtByUserId { get; set; }
        public Guid? SoldByUserId { get; set; }  
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain.BusinessProfiles
{
    public class BusinessProfile
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int ProjectedAnnualBusinessIncome { get; set; }
        public int AnnualBusinessIncome { get; set; }
        public int YearsInBusiness { get; set; }
        public string ImageUrl { get; set; }
        public int AddressId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public BusinessTypeId BusinessTypeId { get; set; }
        public BusinessStageId BusinessStageId { get; set; }
        public IndustryTypeId IndustryTypes { get; set; }
    }
}

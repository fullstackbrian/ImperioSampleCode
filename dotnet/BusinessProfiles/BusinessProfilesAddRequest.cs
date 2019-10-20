using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.BusinessProfiles
{
    public class BusinessProfilesAddRequest
    {
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 1,
        ErrorMessage = "The property {0} should have {1} maximum characters and {2} minimum characters")]
        public string Name { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int BusinessStageId  { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int BusinessTypeId { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int IndustryTypeId { get; set; }
        public int? ProjectedAnnualBusinessIncome { get; set; }
        public int? AnnualBusinessIncome { get; set; }
        public int? YearsInBusiness { get; set; }
        public string ImageUrl { get; set; }
        public int? AddressId { get; set; }
    }
}

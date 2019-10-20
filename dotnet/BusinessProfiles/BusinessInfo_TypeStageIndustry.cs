using Models.Domain.BusinessProfiles;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.BusinessProfiles
{
    public class BusinessInfo_TypeStageIndustry
    {
        public List<BusinessStageId> BusinessStageId { get; set; }
        public List<BusinessTypeId> BusinessTypeId { get; set; }
        public List<IndustryTypeId> IndustryTypeId { get; set; }

    }
}

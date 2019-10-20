using Data;
using Data.Providers;
using Models;
using Models.Domain.BusinessProfiles;
using Models.Requests.BusinessProfiles;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Services
{
    public class BusinessProfilesService : IBusinessProfilesService
    {
        private IDataProvider _dataProvider;
        public BusinessProfilesService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }
        public int Create(BusinessProfilesAddRequest model, int userId)
        {
            int retVal = 0;
            _dataProvider.ExecuteNonQuery("dbo.BusinessProfiles_Insert", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                SqlParameter parm = new SqlParameter();
                parm.ParameterName = "@Id";
                parm.SqlDbType = SqlDbType.Int;
                parm.Direction = ParameterDirection.Output;
                parms.Add(parm);

                parms.AddWithValue("@UserId", userId);
                AddParamMapper(model, parms);
                parms.AddWithValue("@CreatedBy", userId);
                parms.AddWithValue("@ModifiedBy", userId);
            }, returnParameters: delegate (SqlParameterCollection parms)
            {
                Int32.TryParse(parms["@Id"].Value.ToString(), out retVal);
            });
            return retVal;

        }
        public void Update(BusinessProfilesUpdateRequest model, int userId)
        {
            _dataProvider.ExecuteNonQuery("dbo.BusinessProfiles_Update", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                parms.AddWithValue("@Id", model.Id);
                parms.AddWithValue("@UserId", model.Id);
                AddParamMapper(model, parms);
                parms.AddWithValue("@ModifiedBy", userId);
            });
        }
        public Paged<BusinessProfile> Paginate(int pageIndex, int pageSize)
        {
            Paged<BusinessProfile> pagedList = null;
            List<BusinessProfile> businessProfilesList = null;
            int totalCount = 0;

            _dataProvider.ExecuteCmd("dbo.BusinessProfiles_SelectAll_Paginated", inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                BusinessProfile model = new BusinessProfile();
                model = Mapper(reader);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(18);
                }
                if (businessProfilesList == null)
                {
                    businessProfilesList = new List<BusinessProfile>();
                }
                businessProfilesList.Add(model);
            }
            );
            if (businessProfilesList != null)
            {
                pagedList = new Paged<BusinessProfile>(businessProfilesList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public BusinessProfile GetById(int id)
        {
            BusinessProfile model = null;

            _dataProvider.ExecuteCmd("dbo.BusinessProfiles_SelectById", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                parms.AddWithValue("@Id", id);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                model = Mapper(reader);

            });
            return model;
        }
        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery("dbo.BusinessProfiles_Delete", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                parms.AddWithValue("@Id", id);
            });
        }
        public BusinessInfo_TypeStageIndustry GetBusinessInfo()
        {
            BusinessInfo_TypeStageIndustry dropModel = new BusinessInfo_TypeStageIndustry();
            _dataProvider.ExecuteCmd("dbo.BusinessProfiles_AdditionalInfo", inputParamMapper: delegate (SqlParameterCollection parms)
            {
            }, singleRecordMapper: delegate (IDataReader reader, short set) {
                  

                switch (set)
                {
                    case 0:

                        BusinessStageId businessStagedModel = new BusinessStageId();
                        int index = 0;
                        businessStagedModel.Id = reader.GetSafeInt32(index++);
                        businessStagedModel.Name = reader.GetSafeString(index++);
                        if (dropModel.BusinessStageId == null)
                        {
                            dropModel.BusinessStageId = new List<BusinessStageId>();
                        }
                        if(dropModel.BusinessStageId != null)
                        {
                            BusinessStageId businessStages = new BusinessStageId();
                        }
                        dropModel.BusinessStageId.Add(businessStagedModel);
                        break;
                    case 1:

                        BusinessTypeId businessTypesModel = new BusinessTypeId();
                        int btindex = 0;
                        businessTypesModel.Id = reader.GetSafeInt32(btindex++);
                        businessTypesModel.Name = reader.GetSafeString(btindex++);
                        if (dropModel.BusinessTypeId == null)
                        {
                            dropModel.BusinessTypeId = new List<BusinessTypeId>();
                        }
                        if (dropModel.BusinessTypeId != null)
                        {
                            BusinessTypeId businessTypes = new BusinessTypeId();
                        }
                        dropModel.BusinessTypeId.Add(businessTypesModel);
                        break;
                    case 2:

                        IndustryTypeId industryTypesModel = new IndustryTypeId();
                        int itindex = 0;
                        industryTypesModel.Id = reader.GetSafeInt32(itindex++);
                        industryTypesModel.Name = reader.GetSafeString(itindex++);
                        if (dropModel.IndustryTypeId == null)
                        {
                            dropModel.IndustryTypeId = new List<IndustryTypeId>();
                        }
                        if (dropModel.IndustryTypeId != null)
                        {
                            IndustryTypeId industryTypes = new IndustryTypeId();
                        }
                        dropModel.IndustryTypeId.Add(industryTypesModel);
                        break;
                }
            });

            return dropModel;
        }
        private static void AddParamMapper(BusinessProfilesAddRequest model, SqlParameterCollection parms)
        {

            var nullValue = (object)(DBNull.Value);
            parms.AddWithValue("@Name", model.Name);
            parms.AddWithValue("@BusinessStageId", model.BusinessStageId);
            parms.AddWithValue("@BusinessTypeId", model.BusinessTypeId);
            parms.AddWithValue("@IndustryTypeId", model.IndustryTypeId);
            parms.AddWithValue("@ProjectedAnnualBusinessIncome", model.ProjectedAnnualBusinessIncome ?? nullValue);
            parms.AddWithValue("@AnnualBusinessIncome", model.AnnualBusinessIncome ?? nullValue);
            parms.AddWithValue("@YearsInBusiness", model.YearsInBusiness ?? nullValue);
            parms.AddWithValue("@ImageUrl", model.ImageUrl);
            parms.AddWithValue("@AddressId", model.AddressId ?? nullValue);

     
        }
        private static BusinessProfile Mapper(IDataReader reader)
        {
            BusinessProfile model = new BusinessProfile();
            int startingIndex = 0;
            model.Id = reader.GetSafeInt32(startingIndex++);
            model.UserId = reader.GetSafeInt32(startingIndex++);
            model.Name = reader.GetSafeString(startingIndex++);
            model.ProjectedAnnualBusinessIncome = reader.GetSafeInt32(startingIndex++);
            model.AnnualBusinessIncome = reader.GetSafeInt32(startingIndex++);
            model.YearsInBusiness = reader.GetSafeInt32(startingIndex++);
            model.ImageUrl = reader.GetSafeString(startingIndex++);
            model.AddressId = reader.GetSafeInt32(startingIndex++);
            model.DateCreated = reader.GetSafeDateTime(startingIndex++);
            model.DateModified = reader.GetSafeDateTime(startingIndex++);
            model.CreatedBy = reader.GetSafeInt32(startingIndex++);
            model.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            model.BusinessTypeId = new BusinessTypeId();
            BusinessTypeId businessTypes = new BusinessTypeId();
            model.BusinessTypeId.Id = reader.GetSafeInt32(startingIndex++);
            model.BusinessTypeId.Name = reader.GetSafeString(startingIndex++);
            model.BusinessStageId = new BusinessStageId();
            BusinessStageId businessStages = new BusinessStageId();
            model.BusinessStageId.Id = reader.GetSafeInt32(startingIndex++);
            model.BusinessStageId.Name = reader.GetSafeString(startingIndex++);
            model.IndustryTypes = new IndustryTypeId();
            IndustryTypeId industry = new IndustryTypeId();
            model.IndustryTypes.Id = reader.GetSafeInt32(startingIndex++);
            model.IndustryTypes.Name = reader.GetSafeString(startingIndex++);

            return model;
        }

    }
}

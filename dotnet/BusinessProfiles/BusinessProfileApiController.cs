using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Models.Domain.BusinessProfiles;
using Models.Requests.BusinessProfiles;
using Services;
using Web.Controllers;
using Web.Models.Responses;

namespace Web.Api.Controllers
{

    [Route("api/business")]
    [ApiController]
    public class BusinessProfileApiController : BaseApiController
    {
        private IBusinessProfilesService _service = null;
        private IAuthenticationService<int> _authService = null;
        public BusinessProfileApiController(IBusinessProfilesService service
            , ILogger<BusinessProfileApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<BusinessProfile>>> Paginate(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<BusinessProfile> paged = _service.Paginate(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<BusinessProfile>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);

            }
            return StatusCode(code, response);
        }
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<BusinessProfile>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                BusinessProfile BusinessProfiles = _service.GetById(id);

                if (BusinessProfiles == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<BusinessProfile>() { Item = BusinessProfiles };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());

                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(BusinessProfilesAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Create(model, userId);
                ItemResponse<int> response = new ItemResponse<int>();
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(BusinessProfilesUpdateRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpGet("additional")]
        public ActionResult<ItemResponse<BusinessInfo_TypeStageIndustry>> GetBusinessInfo()
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                BusinessInfo_TypeStageIndustry BusinessInfo = _service.GetBusinessInfo();

                if (BusinessInfo == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<BusinessInfo_TypeStageIndustry>() { Item = BusinessInfo };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());

                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }
    }
    }
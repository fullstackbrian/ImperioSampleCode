using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Domain;
using Models.Requests;
using Services;
using Web.Controllers;
using Web.Models.Responses;

namespace Web.Api.Controllers
{
    [Route("api/users")]
    public class UserApiController : BaseApiController
    {
        private IUserService _service;

        public UserApiController(IUserService service, ILogger<UserApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<ItemResponse<List<User>>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<User> list = _service.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<List<User>> { Item = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [HttpPost("register")]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int id = _service.Create(model);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse($"Generic error: {ex.Message}");
                result = StatusCode(500, response);
            }

            return result;
        }
        [HttpGet("roles")]
        public ActionResult<ItemResponse<Roles>> GetUserRoles()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Roles> list = _service.GetUserRoles();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<List<Roles>> { Item = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpPost("login")]
        public async Task<ActionResult<SuccessResponse>> Authenticate(LogInAddRequest loginInfo)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                bool isLoggedIn = await _service.LogInAsync(loginInfo.Email, loginInfo.Password);

                if (isLoggedIn == false)
                {
                    iCode = 404;
                    response = new ErrorResponse("Password did not match");
                }
                else
                {
                    response = new SuccessResponse();
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

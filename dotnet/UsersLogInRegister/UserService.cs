using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
        }

        public List<User> GetAll()
        {
            List<User> list = null;
            User model = null;

            _dataProvider.ExecuteCmd("dbo.Users_SelectAll", inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                model = Mapper(reader);

                if (list == null)
                {
                    list = new List<User>();
                }

                list.Add(model);
            });

            return list;
        }

        private static User Mapper(IDataReader reader)
        {
            User model = new User();
            int index = 0;

            model.Id = reader.GetSafeInt32(index++);
            model.Email = reader.GetSafeString(index++);
            model.IsConfirmed = reader.GetSafeInt32(index++);
            model.UserStatusId = reader.GetSafeInt32(index++);
            model.RoleId = new Roles();
            model.RoleId.Id = reader.GetSafeInt32(index++);
            model.RoleId.Name = reader.GetSafeString(index++);

            return model;
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = Authenticate(email, password);

            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }

            return isSuccessful;
        }

        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Content Manager" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Email = email
                ,
                Role = "User"
                ,
                TenantId = "Acme Corp UId"
            };

            Claim fullName = new Claim("CustomClaim", "User");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }
        public List<Roles> GetUserRoles()
        {
            List<Roles> role = null;
            _dataProvider.ExecuteCmd("dbo.Roles_SelectAll", inputParamMapper: delegate (SqlParameterCollection parms)
            {
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {

                Roles rolemodel = new Roles();
                int index = 0;
                rolemodel.Id = reader.GetSafeInt32(index++);
                rolemodel.Name = reader.GetSafeString(index++);

                if (role == null)
                {
                    role = new List<Roles>();
                }
                role.Add(rolemodel);
            });
            return role;
        }
        public int Create(UserAddRequest model)
        {
            //make sure the password column can hold long enough string. put it to 100 to be safe
            int userId = 0;
            
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(model.Password, salt);

            //DB provider call to create user and get us a user id
            _dataProvider.ExecuteNonQuery("dbo.Users_Insert", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                SqlParameter parm = new SqlParameter();
                parm.ParameterName = "@Id";
                parm.SqlDbType = SqlDbType.Int;
                parm.Direction = ParameterDirection.Output;
                parms.Add(parm);
                parms.AddWithValue("@Email", model.Email);
                parms.AddWithValue("@Password", hashedPassword);
                parms.AddWithValue("@RoleId", model.RoleId);
            }, returnParameters: delegate (SqlParameterCollection parms)
            {
                Int32.TryParse(parms["@Id"].Value.ToString(), out userId);
            });


            return userId;
            //be sure to store both salt and passwordHash
            //DO NOT STORE the original password value that the user passed us

        }

        /// <summary>
        /// Gets the Data call to get a give user
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        private IUserAuthData Get(string email, string password)
        {
            //make sure the password column can hold long enough string. put it to 100 to be safe
            string passwordFromDb = "";
            UserBase user = null;

            //get user object from db;

            bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, passwordFromDb);

            return user;
        }
        public UserBase Authenticate(string email, string password)
        {
            UserBase user = null;
            bool isValidCredentials;

            _dataProvider.ExecuteCmd("dbo.Users_GetUserData_ByEmail", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                SqlParameter parm = new SqlParameter();

                parms.AddWithValue("@Email", email);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                string passwordFromDb = reader.GetSafeString(index++);
                isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, passwordFromDb);
                if (isValidCredentials)
                {
                    user = new UserBase();
                    user.Id = reader.GetSafeInt32(index++);
                    user.Email = reader.GetSafeString(index++);
                    user.Role = reader.GetSafeString(index++);
                    user.TenantId = "Imperio";
                }
           
            });
           
            return user;
        }
    }
}
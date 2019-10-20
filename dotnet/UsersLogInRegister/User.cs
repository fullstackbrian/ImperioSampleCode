using System;
namespace Sabio.Models.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int IsConfirmed { get; set; }
        public int UserStatusId { get; set; }
        public Roles RoleId { get; set; }
    }
}

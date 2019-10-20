using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests
{
    public class UserAddRequest
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 6,
        ErrorMessage = "The property {0} should have {1} maximum characters and {2} minimum characters")]
        public string Email { get; set; }
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&_-]{8,}$")]
        [Required]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "The fields Password and Confirm Password should match")]
        public string ConfirmPassword { get; set; }
        [Required]
        public int RoleId { get; set; }
    }
}
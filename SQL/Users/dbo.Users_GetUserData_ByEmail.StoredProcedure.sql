USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[Users_GetUserData_ByEmail]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_GetUserData_ByEmail]
        @Email NVARCHAR(100)

AS

/*

    DECLARE
        @Email NVARCHAR(100) = 'log@log.com'


    EXECUTE dbo.Users_GetUserData_ByEmail
        @Email

*/

BEGIN

    SELECT
		u.[Password],
        u.[Id],
		u.Email,
		r.[Name] AS [Role]

    FROM	
        dbo.Users u join Roles r ON u.RoleId = r.Id
    WHERE
        Email = @Email
END
GO

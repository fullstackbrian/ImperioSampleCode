USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_SelectAll]

AS

/*

    EXECUTE dbo.Users_SelectAll


*/

BEGIN

    SELECT
        u.Id,
		u.Email,
		u.IsConfirmed,
		u.UserStatusId,
		r.Id as RoleId,
		r.[Name] as RoleName
    FROM
        dbo.Users u join dbo.Roles r ON u.RoleId = r.Id
		--WHERE UserStatusId = 1 AND IsConfirmed = 1

END
GO

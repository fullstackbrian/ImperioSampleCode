USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Delete]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[BusinessProfiles_Delete]

		@Id INT 
AS
/* 
	DECLARE 
		@Id INT = 3;

	EXEC [dbo].[BusinessProfiles_Delete]

		@Id;
*/

BEGIN

	DELETE FROM [dbo].[BusinessProfiles]

	WHERE 
		Id = @Id;

END



GO

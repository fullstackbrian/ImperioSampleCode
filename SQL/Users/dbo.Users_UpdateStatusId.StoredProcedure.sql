USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[Users_UpdateStatusId]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_UpdateStatusId]
	
	@Id INT,
	@UserStatusId INT

AS
/*
	DECLARE @Id INT = 5;

	DECLARE
		@UserstatusId INT = '1';
		
	SELECT * FROM dbo.Users WHERE Id = @Id;

	EXEC dbo.Users_UpdateStatusId
		@Id,
		@UserStatusId;
		
	SELECT * FROM dbo.Users WHERE Id = @Id;
*/
BEGIN

DECLARE @dateModified datetime2(7) = GETUTCDATE();
		UPDATE 
			dbo.Users
		 SET 
		 UserStatusId = @UserStatusId
		 WHERE 
				Id = @Id;
END

GO

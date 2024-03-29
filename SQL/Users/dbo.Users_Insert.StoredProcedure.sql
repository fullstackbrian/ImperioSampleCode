USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[Users_Insert]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_Insert]
			
		@Id INT OUT,
		@Email NVARCHAR(100), 
		@Password NVARCHAR(100),
		@RoleId INT
AS
/*
	DECLARE 
		@Id INT,
		@Email NVARCHAR(100) = 'testaqwefaer@mail.com', 
		@Password NVARCHAR(100) = 'Password!1',
		@RoleId INT = 2

	EXECUTE [dbo].[Users_Insert]
		@Id OUT,
		@Email,
		@Password,
		@RoleId

	SELECT * FROM [dbo].[Users]
	WHERE 
		Id = @Id; 
*/
	
	IF EXISTS 
	(SELECT 1 FROM dbo.Users WHERE @Email = Email)
	
	THROW 50000, 'This email has already been registered.', 1;

	BEGIN
	
	INSERT INTO [dbo].[Users]
        ([Email],
        [Password],
		[RoleId])

		VALUES 

		(@Email, 
		@Password,
		@RoleId);

	SET @Id = SCOPE_IDENTITY();

	END
GO

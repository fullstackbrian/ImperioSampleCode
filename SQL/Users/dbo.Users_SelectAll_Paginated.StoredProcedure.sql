USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll_Paginated]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_SelectAll_Paginated]
	
		@PageIndex INT,
		@PageSize INT
AS 
/*
	DECLARE      
		@PageIndex INT = 0,
		@PageSize INT = 10
				
	EXECUTE [dbo].[Users_SelectAll_Paginated]
		@PageIndex,
		@PageSize
*/
DECLARE @OFFSET INT = @PageIndex * @PageSize

	SELECT 
		[Id],
		[Email],
		[Password],
		[IsConfirmed],
		[UserStatusId],

		TotalCount = COUNT(1) OVER() 

	FROM [dbo].[Users]
	--WHERE UserStatusId = 1 AND IsConfirmed = 1
	ORDER BY Id DESC

	OFFSET @OFFSET ROWS
	FETCH NEXT @PageSize ROWS ONLY
GO

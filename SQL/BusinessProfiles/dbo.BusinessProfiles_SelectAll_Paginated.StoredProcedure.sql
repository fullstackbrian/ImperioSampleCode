USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_SelectAll_Paginated]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[BusinessProfiles_SelectAll_Paginated]

		@PageIndex INT,
		@PageSize INT

AS
/*
	DECLARE      
		@PageIndex int = 0,
		@PageSize int = 100
				
	EXECUTE dbo.BusinessProfiles_SelectAll_Paginated
		@PageIndex,
		@PageSize

*/
DECLARE @offset INT = @PageIndex * @PageSize

	SELECT
			Bp.[Id],
			Bp.[UserId],
			Bp.[Name],
			Bp.[ProjectedAnnualBusinessIncome],
			Bp.[AnnualBusinessIncome],
			Bp.[YearsInBusiness],
			Bp.[ImageUrl],
			Bp.[AddressId],
			Bp.[DateCreated],
			Bp.[DateModified],
            Bp.[CreatedBy],
            Bp.[ModifiedBy],
			Bt.Id as BusinessTypeId,
			Bt.Name as BusinessTypeName,
			Bs.Id as BusinessStageId,
			Bs.Name as BusinessStageName,
			It.Id as IndustryTypeId,
			It.Name as IndustryTypeName,
			TotalCount = COUNT(1) OVER() 

	FROM 
	[dbo].[BusinessProfiles] Bp join BusinessTypes Bt ON Bp.BusinessTypeId = Bt.Id
	join BusinessesStages Bs ON Bp.BusinessStageId = Bs.Id
	join IndustryTypes It ON Bp.IndustryTypeId = It.Id

	ORDER BY Bp.Id DESC
	
	OFFSET @offSet ROWS
	FETCH NEXT @pageSize ROWS ONLY
GO

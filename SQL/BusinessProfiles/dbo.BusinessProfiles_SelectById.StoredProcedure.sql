USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_SelectById]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[BusinessProfiles_SelectById]

		@Id INT

AS
/* 
	DECLARE 
		@Id INT = 43;

	EXEC dbo.BusinessProfiles_SelectById
		@Id;

*/

BEGIN

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
			It.Name as IndustryTypeName

	FROM 
	[dbo].[BusinessProfiles] Bp join BusinessTypes Bt ON Bp.BusinessTypeId = Bt.Id
	join BusinessesStages Bs ON Bp.BusinessStageId = Bs.Id
	join IndustryTypes It ON Bp.IndustryTypeId = It.Id

	WHERE Bp.Id = @Id;

END
GO

USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Update]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[BusinessProfiles_Update]

		@Id INT,
		@UserId INT,
		@Name NVARCHAR(100),
		@BusinessStageId INT,
		@BusinessTypeId INT,
		@IndustryTypeId INT,
		@ProjectedAnnualBusinessIncome INT,
		@AnnualBusinessIncome INT,
		@YearsInBusiness INT,
		@ImageUrl NVARCHAR(255),
		@AddressId INT,
        @ModifiedBy INT

AS
/*
	DECLARE
		@Id INT = 48,
		@UserId INT = 3,
		@Name NVARCHAR(100) = 'Updated',
		@BusinessStageId INT = 3,
		@BusinessTypeId INT = 3,
		@IndustryTypeId INT = 7,
		@ProjectedAnnualBusinessIncome INT = 2000000,
		@AnnualBusinessIncome INT = 300000,
		@YearsInBusiness INT = 19,
		@ImageUrl NVARCHAR(255) = 'image',
		@AddressId INT = 3,
        @ModifiedBy INT = 2

	SELECT * FROM dbo.BusinessProfiles
	WHERE
		Id = @Id;

	EXECUTE [dbo].[BusinessProfiles_Update]
		@Id,
		@UserId,
		@Name,
		@BusinessStageId,
		@BusinessTypeId,
		@IndustryTypeId,
		@ProjectedAnnualBusinessIncome,
		@AnnualBusinessIncome,
		@YearsInBusiness,
		@ImageUrl,
		@AddressId,
        @ModifiedBy

	SELECT * FROM dbo.BusinessProfiles
	WHERE
		Id = @Id;

*/
BEGIN
	DECLARE @dateModified datetime2(7) = GETUTCDATE();
	UPDATE [dbo].[BusinessProfiles]
SET
			[UserId] = @UserId,
			[Name] = @Name,
			[BusinessStageId] = @BusinessStageId,
			[BusinessTypeId] = @BusinessTypeId,
			[IndustryTypeId] = @IndustryTypeId,
			[ProjectedAnnualBusinessIncome] = @ProjectedAnnualBusinessIncome,
			[AnnualBusinessIncome] = @AnnualBusinessIncome,
			[YearsInBusiness] = @YearsInBusiness,
			[ImageUrl] = @ImageUrl,
			[AddressId] = @AddressId,
			[DateModified] = @DateModified,
            [ModifiedBy] = @ModifiedBy
	 WHERE 
		Id = @Id

END
GO

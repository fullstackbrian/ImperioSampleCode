USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Insert]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[BusinessProfiles_Insert]

		@Id INT OUT,
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
        @CreatedBy INT,
        @ModifiedBy INT

AS
/*
	DECLARE
		@Id INT = 0,
		@UserId INT = 3,
		@Name NVARCHAR(100) = 'Testing',
		@BusinessStageId INT = 3,
		@BusinessTypeId INT = 1,
		@IndustryTypeId INT = 1,
		@ProjectedAnnualBusinessIncome INT,
		@AnnualBusinessIncome INT,
		@YearsInBusiness INT,
		@ImageUrl NVARCHAR(255) = 'image',
		@AddressId INT,
        @CreatedBy INT = 1,
        @ModifiedBy INT = 1

	EXECUTE [dbo].[BusinessProfiles_Insert]

		@Id OUT,
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
        @CreatedBy,
        @ModifiedBy

	SELECT * FROM dbo.BusinessProfiles
	WHERE
		Id = @Id;

*/
BEGIN

	INSERT INTO dbo.BusinessProfiles
			([UserId],
			[Name],
			[BusinessStageId],
			[BusinessTypeId],
			[IndustryTypeId],
			[ProjectedAnnualBusinessIncome],
			[AnnualBusinessIncome],
			[YearsInBusiness],
			[ImageUrl],
			[AddressId],
            [CreatedBy],
            [ModifiedBy])

	VALUES
			(@UserId,
			@Name,
			@BusinessStageId,
			@BusinessTypeId,
			@IndustryTypeId,
			@ProjectedAnnualBusinessIncome,
			@AnnualBusinessIncome,
			@YearsInBusiness,
			@ImageUrl,
			@AddressId,
            @CreatedBy,
            @ModifiedBy)

SET @Id = SCOPE_IDENTITY();

END
GO

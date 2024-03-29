USE [C78_Imperio]
GO
/****** Object:  StoredProcedure [dbo].[BusinessProfiles_Select_ByIncomeRange]    Script Date: 10/19/2019 5:38:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[BusinessProfiles_Select_ByIncomeRange]
        @IncomeRangeLow INT,
        @IncomeRangeHigh INT

AS

/*

    DECLARE
        @IncomeRangeLow INT = 30000,
        @IncomeRangeHigh INT = 600000

    EXECUTE dbo.BusinessProfiles_Select_ByIncomeRange
        @IncomeRangeLow,
        @IncomeRangeHigh

*/

BEGIN

    SELECT
        Id,
        UserId,
        Name,
        BusinessStageId,
        BusinessTypeId,
        IndustryTypeId,
        ProjectedAnnualBusinessIncome,
        AnnualBusinessIncome,
        YearsInBusiness,
        ImageUrl,
        AddressId,
        DateCreated,
        DateModified,
        CreatedBy,
        ModifiedBy
    FROM dbo.BusinessProfiles
    WHERE
        AnnualBusinessIncome BETWEEN @IncomeRangeLow AND @IncomeRangeHigh

END
GO

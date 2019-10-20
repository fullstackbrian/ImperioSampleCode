CREATE PROC [dbo].[Checkout_Orders_Insert]

		---orders---
		 @Total decimal(18,2)
		,@TrackingCode varchar(100)
		,@TrackingUrl varchar(200) = null
        ,@ShippingAddressId int =0
		,@BillingAddressId int = 0
		,@ChargeId varchar(200)
		,@PaymentAccountId varchar(255)
		,@CreatedBy int
	
		-----shipping--- 
		,@saLocationTypeId int =4
		,@saLineOne NVARCHAR(255)
		,@saLineTwo NVARCHAR(255) = null
		,@saCity NVARCHAR(255)
		,@saZip NVARCHAR(255)
		,@saStateId INT
		,@saLatitude FLOAT
		,@saLongitude FLOAT

		---billing----
		,@baLocationTypeId int =2
		,@baLineOne NVARCHAR(255)
		,@baLineTwo NVARCHAR(255) = null
		,@baCity NVARCHAR(255)
		,@baZip NVARCHAR(255)
		,@baStateId INT
		,@baLatitude FLOAT
		,@baLongitude FLOAT

		---order items---
		,@OrderItems as dbo.[OrderItemType]
		,@OrderId int OUTPUT

/*
	DECLARE
		 @OrderId int
		,@Total decimal(18,2) = 542.34
		,@TrackingCode varchar(100) = 'vs12412xdsxa'
		,@TrackingUrl varchar(200) = 'www.fedex.com/vs12412xdsxa'
        ,@ShippingAddressId int = 1
		,@BillingAddressId int = 99
		,@ChargeId varchar(200) = '12211'
		,@PaymentAccountId varchar(255) = '2124'
		,@CreatedBy int = 3

		,@saLocationTypeId int =4
		,@saLineOne NVARCHAR(255) = '47 NE 1st St'
		,@saLineTwo NVARCHAR(255) = 'Apt 1'
		,@saCity NVARCHAR(255) = 'Boudelaire'
		,@saZip NVARCHAR(255) = '01784-0409'
		,@saStateId INT = 12
		,@saLatitude FLOAT = -98.7343
		,@saLongitude FLOAT = 68.0476

		,@baLocationTypeId int =2
		,@baLineOne NVARCHAR(255) = '4550 W Pico Blvd'
		,@baLineTwo NVARCHAR(255) 
		,@baCity NVARCHAR(255) = 'Los Angeles'
		,@baZip NVARCHAR(255) = '90019'
		,@baStateId INT = 9
		,@baLatitude FLOAT = 34.048754
		,@baLongitude FLOAT = -118.3356019

		,@_orderItems as dbo.[OrderItemType] 

		INSERT INTO  @_orderItems ( InventoryId, Quantity, DateCreated, DateModified, CreatedBy, ModifiedBy) VALUES ( 5, 6,(GETUTCDATE()),(GETUTCDATE()), 3, 3)
			Select * from @_orderItems		
					
	EXECUTE dbo.Checkout_Orders_Insert_V2
		@OrderId OUTPUT
		,@Total 
		,@TrackingCode 
		,@TrackingUrl 
        ,@ShippingAddressId 
		,@BillingAddressId
		,@ChargeId 
		,@PaymentAccountId 
		,@CreatedBy 

		,@saLocationTypeId
		,@saLineOne
		,@saLineTwo
		,@saCity
		,@saZip
		,@saStateId
		,@saLatitude
		,@saLongitude

		,@baLocationTypeId
		,@baLineOne
		,@baLineTwo
		,@baCity
		,@baZip
		,@baStateId
		,@baLatitude
		,@baLongitude

		,@_orderItems

		SELECT *
		FROM dbo.Orders

		SELECT *
		FROM dbo.OrderItems

*/

AS

BEGIN
	SET XACT_ABORT ON
	DECLARE @Tran nvarchar(50) = 'shoppingCart'

	BEGIN TRY
		BEGIN TRANSACTION @Tran

		-----------1 INSERT SHIPPING ADDRESS ------------
		
		INSERT INTO [dbo].[Locations]
				([LocationTypeId]
				,[LineOne]
				,[LineTwo]
				,[City]
				,[Zip]
				,[StateId]
				,[Latitude]
				,[Longitude]
				,[CreatedBy]
				,[ModifiedBy])

		VALUES
				(@saLocationTypeId
				,@saLineOne
				,@saLineTwo
				,@saCity
				,@saZip
				,@saStateId
				,@saLatitude
				,@saLongitude
				,@CreatedBy
				,@CreatedBy)

			SET @ShippingAddressId = SCOPE_IDENTITY()

		-------------2 INSERT BILLING ADDRESS ------------

			INSERT INTO [dbo].[Locations]
				([LocationTypeId]
				,[LineOne]
				,[LineTwo]
				,[City]
				,[Zip]
				,[StateId]
				,[Latitude]
				,[Longitude]
				,[CreatedBy]
				,[ModifiedBy])

		VALUES
				(@baLocationTypeId
				,@baLineOne
				,@baLineTwo
				,@baCity
				,@baZip
				,@baStateId
				,@baLatitude
				,@baLongitude
				,@CreatedBy
				,@CreatedBy)

			SET @BillingAddressId = SCOPE_IDENTITY()


		----------3 CREATE ORDER-------------

				INSERT INTO 
				  [dbo].[Orders]
					([Total]
					,[TrackingCode]
					,[TrackingUrl]
					,[ShippingAddressId]
					,[BillingAddressId]
					,[ChargeId]
					,[PaymentAccountId]
					,[CreatedBy]
					,[ModifiedBy])

					Values
					(@Total
					,@TrackingCode
					,@TrackingUrl
					,@ShippingAddressId
					,@BillingAddressId
					,@ChargeId
					,@PaymentAccountId
					,@CreatedBy
					,@CreatedBy)

				Set @OrderId = SCOPE_IDENTITY()

		----------4 INSERT ORDER ITEMS-------------

			INSERT INTO 
				[dbo].[OrderItems]
						([OrderId]
						,[InventoryId]
						,[Quantity]
						,[CreatedBy]
						,[ModifiedBy]
					)	SELECT 
						@OrderId,
						[InventoryId],
						[Quantity],
						[CreatedBy],
						[ModifiedBy]
					From
					@OrderItems
				
		----------5 DELETE FROM SHOPPING CART----------
			
				BEGIN
						DELETE FROM 
							[dbo].[ShoppingCart]
						WHERE CreatedBy = @CreatedBy

				END

		COMMIT TRANSACTION @Tran
		
		
	END TRY
	BEGIN CATCH
		
		IF (XACT_STATE()) = -1  
		BEGIN  
			PRINT 'The transaction is in an uncommittable state.' +  
				  ' Rolling back transaction.'  
			ROLLBACK TRANSACTION @Tran;;  
		END;  
  
		IF (XACT_STATE()) = 1  
		BEGIN  
			PRINT 'The transaction is committable.' +   
				  ' Committing transaction.'  
			COMMIT TRANSACTION @Tran;;     
		END; 

		-- If you want to see error info
		--SELECT
		--ERROR_NUMBER() AS ErrorNumber,
		--ERROR_SEVERITY() AS ErrorSeverity,
		--ERROR_STATE() AS ErrorState,
		--ERROR_PROCEDURE() AS ErrorProcedure,
		--ERROR_LINE() AS ErrorLine,
		--ERROR_MESSAGE() AS ErrorMessage

		THROW

	END CATCH
END
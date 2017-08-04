CREATE TABLE [dbo].[Customer]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Name] NCHAR(10) NULL, 
    [DiscountPercent] DECIMAL(20, 8) NULL
)

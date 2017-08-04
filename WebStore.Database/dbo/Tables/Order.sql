CREATE TABLE [dbo].[Order]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [OrderDate] DATETIME NULL, 
    [CustomerID] INT NOT NULL, 
    [DiscountPercent] DECIMAL NULL, 
    CONSTRAINT [FK_Order_ToTable] FOREIGN KEY (CustomerID) REFERENCES Customer(Id)
)

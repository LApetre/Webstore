CREATE TABLE [dbo].[OrderDetail]
(
	[Id] INT NOT NULL  IDENTITY(1,1) PRIMARY KEY, 
    [ProductID] INT NOT NULL, 
    [Price] DECIMAL(20, 2) NOT NULL, 
    [Quantity] DECIMAL NOT NULL, 
    [TotalPriceWithouDiscount] DECIMAL NOT NULL, 
    [TotalPrice] DECIMAL NOT NULL, 
    CONSTRAINT [FK_OrderDetail_ToTable] FOREIGN KEY (ProductID) REFERENCES Product(Id)
)

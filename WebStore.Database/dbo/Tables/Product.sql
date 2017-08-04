CREATE TABLE [dbo].[Product]
(
	[Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [Name] NCHAR(10) NULL, 
    [ListPrice] DECIMAL(20, 8) NULL
)

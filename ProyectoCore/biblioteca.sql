-- Paso 1: Crear la Base de Datos
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'biblioteca')
BEGIN
    CREATE DATABASE biblioteca;
END;
GO

-- Paso 2: Usar la Base de Datos 'biblioteca'
USE biblioteca;
GO

-- Paso 3: Borrar Tablas Existentes 
IF OBJECT_ID('Pago', 'U') IS NOT NULL DROP TABLE Pago;
IF OBJECT_ID('OrdenDetalle', 'U') IS NOT NULL DROP TABLE OrdenDetalle;
IF OBJECT_ID('Orden', 'U') IS NOT NULL DROP TABLE Orden;
GO

-- Paso 4: Crear la Tabla Orden
CREATE TABLE Orden (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    FechaCreacion DATETIME2 DEFAULT SYSDATETIME(),
    Total DECIMAL(10, 2) NOT NULL,
    Estado VARCHAR(50) DEFAULT 'PENDIENTE',       -- PENDIENTE | PAGADO | ENVIADO | CANCELADO
    TipoEntrega VARCHAR(50) NOT NULL,             -- 'retiro' o 'delivery'
    Observaciones TEXT NULL,
    SedeId INT NULL,
    SedeNombre NVARCHAR(100) NULL
);
GO

-- Paso 5: Añadir la Restricción CHECK a la Tabla Orden
ALTER TABLE Orden
ADD CONSTRAINT CK_TipoEntrega CHECK (TipoEntrega IN ('retiro', 'delivery'));
GO

-- Paso 6: Crear la Tabla OrdenDetalle
CREATE TABLE OrdenDetalle (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrdenId INT NOT NULL,
    ProductoId INT NOT NULL,
    ProductoNombre NVARCHAR(255),
    TipoProducto VARCHAR(50),                     -- 'libro', 'revista', etc.
    Formato VARCHAR(20),                          -- 'físico', 'digital'
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    Subtotal AS (Cantidad * PrecioUnitario) PERSISTED, 
    INDEX IX_OrdenDetalle_OrdenId (OrdenId), -- Índice para búsquedas por OrdenId
    -- Añadir FOREIGN KEY para asegurar integridad referencial
    CONSTRAINT FK_OrdenDetalle_Orden FOREIGN KEY (OrdenId) REFERENCES Orden(Id)
);
GO

-- Paso 7: Crear la Tabla Pago
CREATE TABLE Pago (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrdenId INT NOT NULL,
    FechaPago DATETIME2 DEFAULT SYSDATETIME(),
    Monto DECIMAL(10,2) NOT NULL,
    MetodoPago VARCHAR(50) NOT NULL,              -- 'Yape', 'Transferencia', 'Visa Niubiz', 'Pago Efectivo'
    Estado VARCHAR(50) DEFAULT 'PENDIENTE',       -- PENDIENTE | CONFIRMADO | RECHAZADO
    ReferenciaPago NVARCHAR(100),

    INDEX IX_Pago_OrdenId (OrdenId), -- Índice para búsquedas por OrdenId
    -- Añadir FOREIGN KEY para asegurar integridad referencial
    CONSTRAINT FK_Pago_Orden FOREIGN KEY (OrdenId) REFERENCES Orden(Id)
);
GO

-- Paso 8: Insertar Datos Mock en la tabla Orden
INSERT INTO Orden (UserId, Total, Estado, TipoEntrega, Observaciones, SedeId, SedeNombre) VALUES
(101, 75.50, 'PAGADO', 'retiro', 'Cliente recogerá el 2025-07-25', 1, 'Sede Principal - Lima'),
(102, 120.00, 'PENDIENTE', 'delivery', 'Coordinar entrega en Miraflores', NULL, NULL),
(103, 30.00, 'PAGADO', 'delivery', 'Enviar al correo electrónico por ser digital', NULL, NULL),
(104, 250.75, 'ENVIADO', 'delivery', 'Paquete entregado al courier', NULL, NULL),
(105, 55.00, 'CANCELADO', 'retiro', 'Cliente canceló la orden por cambio de opinión', 2, 'Sede Norte - Callao'),
(106, 99.99, 'PAGADO', 'retiro', 'Solicita factura A', 1, 'Sede Principal - Lima'),
(107, 15.00, 'PAGADO', 'delivery', 'Libro digital, enviar por email', NULL, NULL),
(108, 200.00, 'PENDIENTE', 'delivery', NULL, NULL, NULL),
(109, 45.20, 'PAGADO', 'retiro', 'Recoge hoy mismo', 3, 'Sede Sur - Chorrillos'),
(110, 88.00, 'PAGADO', 'delivery', 'Horario de entrega de 9am a 1pm', NULL, NULL);
GO

-- Paso 9: Insertar Datos Mock en la tabla OrdenDetalle
INSERT INTO OrdenDetalle (OrdenId, ProductoId, ProductoNombre, TipoProducto, Formato, Cantidad, PrecioUnitario) VALUES
(1, 1001, 'El Aleph', 'libro', 'físico', 1, 45.50),
(1, 1002, 'Revista Ciencia Hoy #50', 'revista', 'físico', 1, 30.00),
(2, 1003, '1984', 'libro', 'físico', 2, 60.00),
(3, 1004, 'Data Science: Guía Práctica', 'libro', 'digital', 1, 30.00),
(4, 1005, 'Colección Cuentos Cortos Peruanos', 'libro', 'físico', 1, 150.00),
(4, 1006, 'DVD: Documental Machu Picchu', 'DVD', 'físico', 1, 100.75),
(5, 1007, 'Tesis: Impacto del Comercio Electrónico', 'tesis', 'físico', 1, 55.00),
(6, 1008, 'Manual de SQL Server', 'libro', 'físico', 1, 99.99),
(7, 1009, 'Atlas Mundial de Geografía', 'mapa', 'digital', 1, 15.00),
(8, 1010, 'La Ciudad y los Perros', 'libro', 'físico', 1, 70.00),
(8, 1011, 'Crimen y Castigo', 'libro', 'físico', 1, 130.00),
(9, 1012, 'Revista National Geographic Noviembre', 'revista', 'digital', 1, 15.20),
(9, 1013, 'Folleto Museos de Lima', 'folleto', 'digital', 1, 10.00),
(9, 1014, 'CD: Música Peruana Clásica', 'CD', 'físico', 1, 20.00),
(10, 1015, 'Programación con C#', 'libro', 'físico', 1, 88.00);
GO

-- Paso 10: Insertar Datos Mock en la tabla Pago
INSERT INTO Pago (OrdenId, Monto, MetodoPago, Estado, ReferenciaPago) VALUES
(1, 75.50, 'Yape', 'CONFIRMADO', 'YAPE123456789'),
(3, 30.00, 'Pago Efectivo', 'CONFIRMADO', 'PEF-ABCDEF-123'),
(4, 250.75, 'Visa Niubiz', 'CONFIRMADO', 'NIUBIZ-TRANS-9876'),
(6, 99.99, 'Transferencia bancaria', 'CONFIRMADO', 'TRANSF-BCP-XYZ'),
(7, 15.00, 'Yape', 'CONFIRMADO', 'YAPE987654321'),
(10, 88.00, 'Visa Niubiz', 'CONFIRMADO', 'NIUBIZ-TRANS-5432'),
(2, 120.00, 'Pago Efectivo', 'PENDIENTE', 'PEF-GHIJKL-456'),
(8, 200.00, 'Transferencia bancaria', 'PENDIENTE', 'TRANSF-BBVA-DEF');
GO
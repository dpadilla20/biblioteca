## 🚀 Cómo levantar el Backend (ASP.NET Core)

Sigue estos pasos para ejecutar el microservicio de órdenes y pagos:

### ✅ Requisitos Previos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (local o remoto)
- (Opcional) [Visual Studio](https://visualstudio.microsoft.com/) o [VS Code](https://code.visualstudio.com/)

### 🛠️ Configuración inicial

1. Clona el repositorio:

```bash
git clone https://github.com/dpadilla20/biblioteca.git
```

2. Dirígete a la carpeta:
   cd biblioteca/ProyectoCore

3. Verifica el archivo appsettings.json para configurar la cadena de conexión:

{
"ConnectionStrings": {
"DefaultConnection": "Server=localhost;Database=BibliotecaDb;User Id=sa;Password=TuPasswordSegura123;"
}
}

4. Aplica las migraciones (solo la primera vez o si agregas cambios al modelo):

```
dotnet ef database update

dotnet run

Esto levantará el backend en:

https://localhost:5001
http://localhost:5000


```

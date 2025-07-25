# 📚 Proyecto Biblioteca Digital – Microservicio de Órdenes y Pagos

Este repositorio forma parte de la solución planteada para la transformación digital de una biblioteca con sedes físicas que busca expandirse al entorno digital. El presente proyecto abarca el desarrollo de un **microservicio para el registro de órdenes de compra y pagos**, implementado en **.NET Core 8** y expuesto mediante un **API RESTful**, así como una **interfaz web simple en React** para registrar órdenes.

---

## 📌 Descripción del proyecto

Como parte del proceso de expansión online, se planteó una solución integral que incluye:

- App móvil para clientes con catálogo, carrito y pago en línea.
- Sistema web administrativo para gestionar productos, clientes, inventario y pagos.
- Arquitectura basada en **microservicios desplegados en AWS**.

Este repositorio se centra en el **microservicio de órdenes y pagos**, cumpliendo los siguientes requerimientos:

✅ Registrar órdenes de compra de productos físicos y digitales.  
✅ Procesar pagos mediante diversas plataformas (Yape, Visa Niubiz, Transferencia, Pago Efectivo).  
✅ Asociar los pagos con órdenes.  
✅ Persistencia de datos con Entity Framework Core y SQL Server.  
✅ API REST documentado y preparado para escalabilidad.  
✅ Cliente frontend simple en React para registrar órdenes y pagos.

---

## 🏗️ Arquitectura de la solución

La arquitectura propuesta se basa en **microservicios distribuidos en AWS**, con separación de responsabilidades, escalabilidad y resiliencia.

### 🔧 Tecnologías usadas

| Capa            | Tecnología                                                 |
| --------------- | ---------------------------------------------------------- |
| Backend         | ASP.NET Core 8, MediatR, EF Core                           |
| Frontend        | React + Vite + Tailwind CSS                                |
| Base de datos   | SQL Server                                                 |
| Autenticación   | (Prevista en la solución global, por ejemplo: AWS Cognito) |
| Infraestructura | AWS EC2, RDS, S3 (previsto en despliegue completo)         |

---

### 🧱 Diagrama de arquitectura en AWS (alto nivel)

**Componentes clave:**

- API Gateway
- ECS o EC2 para microservicios
- RDS para base de datos relacional
- S3 para almacenamiento digital
- SNS para notificaciones push (planeado)
- CloudFront (para frontend)

---

## 💡 Patrones de diseño aplicados

El desarrollo aplica **principios SOLID** y patrones comunes de arquitectura limpia:

- 🧩 **CQRS (Command Query Responsibility Segregation)**: separación de comandos y consultas.
- 💬 **MediatR**: para desacoplar la lógica del negocio mediante handlers.
- 🧱 **Repository pattern** (integrado mediante EF Core).
- 🧼 **Código limpio**: clases pequeñas, SRP, sin lógica duplicada.
- ✅ Validaciones usando `DataAnnotations` y excepciones controladas.

---

## 🔁 Flujo general del microservicio

1. El usuario realiza una orden desde el frontend.
2. Se envía al microservicio vía HTTP POST.
3. El backend registra la orden y devuelve el id generado.
4. El usuario realiza el o los pagos de la orden generada

---

## 🖥️ Frontend simple (React)

Se implementó un cliente minimal en React para probar el registro de órdenes y pagos.

```bash
cd biblioteca/biblioteca
npm install
npm run dev
```

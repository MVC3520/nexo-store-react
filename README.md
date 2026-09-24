# Nexo Store — Pre-Entrega React JS

Proyecto desarrollado como parte del curso **React JS — Talento Tech 2026-2C**.

**Alumno:** Miguel Victorio Cabrera

## Sobre el proyecto

**Nexo Store** es una aplicación web de e-commerce desarrollada con React.  
Esta pre-entrega implementa una estructura basada en componentes reutilizables, navegación mediante React Router, consumo de datos desde un archivo JSON local y gestión global del carrito de compras utilizando Context API.

El objetivo es aplicar de manera integrada los principales conceptos trabajados durante el curso.

## Funcionalidades implementadas

- Estructura organizada mediante componentes y páginas.
- Layout general compuesto por `Header`, navegación y `Footer`.
- Footer con información de la empresa y tarjetas de integrantes.
- Catálogo de productos cargado desde `productos.json`.
- Consumo de datos mediante `fetch` y `useEffect`.
- Componente `ItemListContainer.jsx` para mostrar el catálogo.
- Componente reutilizable `Item.jsx` que recibe la información mediante props.
- Navegación implementada con `react-router-dom`.
- Ruta dinámica de detalle de producto mediante `useParams`.
- Gestión global del carrito utilizando Context API.
- Función `addToCart` para agregar productos desde la vista de detalle.
- `CartWidget` con actualización automática de la cantidad de productos.
- Vista del carrito consumiendo directamente la información de `CartContext`.
- Manejo básico de estados de carga y error.
- Diseño responsive adaptable a diferentes tamaños de pantalla.

## Rutas principales

La aplicación cuenta con las siguientes rutas:

- `/` — Página principal de Nexo Store.
- `/productos` — Catálogo completo de productos.
- `/producto/:id` — Vista dinámica con el detalle del producto seleccionado.
- `/carrito` — Carrito de compras con los productos agregados.

## Tecnologías utilizadas

- React
- JavaScript / JSX
- Vite
- React Router DOM
- Context API
- Fetch API
- CSS
- JSON

## Instalación y ejecución

Para ejecutar el proyecto localmente:

```bash
npm install
npm run dev
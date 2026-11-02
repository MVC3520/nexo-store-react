# Nexo Store — Entrega Final React JS

**Alumno:** Miguel Victorio Cabrera  
**Curso:** Talento Tech — React JS 2026  
**Proyecto:** Nexo Store — eCommerce de tecnología

## 1. Descripción del proyecto

Nexo Store es una aplicación web de comercio electrónico desarrollada como Proyecto Final Integrador del curso React JS de Talento Tech.

La aplicación permite explorar un catálogo de productos tecnológicos, realizar búsquedas, consultar información detallada y administrar un carrito de compras.

También incorpora autenticación mediante Firebase Authentication y un panel de administración protegido para gestionar productos almacenados en Cloud Firestore.

El proyecto utiliza una arquitectura SPA (Single Page Application) con React y Vite.

## 2. Tecnologías utilizadas

- React y Vite.
- JavaScript y JSX.
- React Router DOM.
- Context API.
- Firebase Authentication.
- Cloud Firestore.
- React-Bootstrap.
- styled-components.
- React Icons.
- React Helmet Async.
- HTML5 y CSS3.

## 3. Funcionalidades

### Catálogo de productos

- Visualización de productos almacenados en Firestore.
- Búsqueda de productos en tiempo real.
- Filtrado por categorías.
- Paginación del catálogo.
- Visualización del detalle de cada producto.
- Productos relacionados.

### Carrito de compras

- Incorporación de productos al carrito.
- Modificación de cantidades.
- Eliminación individual de productos.
- Vaciado del carrito.
- Cálculo automático del importe total.
- Persistencia local del carrito.
- Checkout simulado, sin procesamiento de pagos reales.

### Autenticación

- Registro de usuarios mediante correo electrónico y contraseña.
- Inicio y cierre de sesión.
- Persistencia de sesión administrada por Firebase Authentication.
- Protección de rutas privadas.

### Administración de productos

El panel `/admin` permite realizar operaciones CRUD sobre Cloud Firestore:

- Crear productos.
- Consultar productos existentes.
- Editar información.
- Eliminar productos con confirmación.
- Importar el catálogo inicial desde `productos.json`.
- Validar los datos ingresados.
- Mostrar mensajes de carga, confirmación y error.

El acceso al panel está restringido a una cuenta administradora identificada mediante su UID de Firebase Authentication.

Las reglas de seguridad de Firestore también restringen las operaciones de escritura al UID autorizado.

## 4. Requisitos previos

- Node.js compatible con la versión de Vite utilizada.
- npm.
- Editor de código, preferentemente Visual Studio Code.
- Navegador web actualizado.
- Proyecto de Firebase configurado.

## 5. Instalación local

Clonar o descargar el repositorio y abrir una terminal en la carpeta del proyecto.

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` a partir de `.env.example`.

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Completar las variables de configuración y ejecutar:

```bash
npm run dev
```

Abrir la dirección indicada por Vite, habitualmente:

http://localhost:5173

## 6. Configuración de Firebase

El proyecto utiliza Firebase Authentication para la gestión de usuarios y Cloud Firestore para el almacenamiento de productos.

### 6.1 Crear el proyecto

1. Ingresar a https://console.firebase.google.com/.
2. Crear un proyecto de Firebase.
3. Registrar una aplicación web.
4. Copiar los valores de configuración del SDK.

### 6.2 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```dotenv
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID

VITE_ADMIN_UID=UID_DEL_ADMINISTRADOR
```

Reemplazar los valores de ejemplo por los correspondientes al proyecto Firebase.

La variable `VITE_ADMIN_UID` identifica al usuario autorizado para ingresar al panel de administración.

Las variables con prefijo `VITE_` forman parte de la configuración pública del frontend. No deben utilizarse para almacenar contraseñas ni claves privadas.

El archivo `.env` debe permanecer excluido del repositorio mediante `.gitignore`.

### 6.3 Configurar Authentication

En Firebase Console:

1. Ingresar a Authentication.
2. Habilitar el proveedor Correo electrónico/Contraseña.
3. Crear una cuenta administradora.
4. Obtener el UID del usuario.
5. Configurar ese UID en `.env` y en las reglas de Firestore.

### 6.4 Configurar Firestore

Crear la base de datos Cloud Firestore y configurar las reglas de seguridad.

La colección utilizada por el proyecto se denomina:

`productos`

Las reglas deben permitir la lectura pública del catálogo y restringir las operaciones de escritura exclusivamente al UID administrador autorizado.

No se deben habilitar escrituras públicas ni permitir modificaciones a cualquier usuario autenticado.

## 7. Importación inicial del catálogo

Una vez configurado Firebase:

1. Iniciar sesión con la cuenta administradora.
2. Ingresar a `/admin`.
3. Verificar que la colección `productos` esté vacía.
4. Presionar **Importar catálogo inicial**.
5. Esperar la confirmación.
6. Comprobar los documentos en Firestore.

La importación utiliza el archivo `public/productos.json`.

El botón de importación está disponible únicamente cuando el catálogo está vacío y terminó de cargar correctamente.

## 8. Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/productos` | Catálogo, búsqueda y paginación |
| `/producto/:id` | Detalle del producto |
| `/carrito` | Carrito de compras |
| `/login` | Registro e inicio de sesión |
| `/admin` | Administración protegida |

## 9. Seguridad

La aplicación utiliza dos niveles complementarios de protección:

**Protección de interfaz:** React verifica que el UID del usuario conectado coincida con el UID administrador configurado.

**Protección de datos:** las reglas de Cloud Firestore verifican la identidad autenticada antes de autorizar operaciones de escritura.

Los usuarios comunes pueden consultar el catálogo y utilizar el carrito, pero no administrar productos.

La ocultación del enlace de administración no constituye por sí sola una medida de seguridad. La autorización efectiva de escritura depende de las reglas de Firestore.

## 10. Compilación de producción

Para generar una versión optimizada:

```bash
npm run build
```

Los archivos resultantes se generan en la carpeta `dist`.

Para visualizar la compilación localmente:

```bash
npm run preview
```

## 11. Publicación

El proyecto puede publicarse mediante servicios compatibles con aplicaciones React y Vite, como Firebase Hosting, Netlify o Vercel.

Para el despliegue deben configurarse las variables de entorno correspondientes, incluido `VITE_ADMIN_UID`.

También debe agregarse el dominio público de la aplicación a los dominios autorizados de Firebase Authentication, cuando corresponda.

La configuración de hosting debe permitir que las rutas internas de React Router funcionen al actualizar directamente una página.

## 12. Pruebas funcionales

Durante el desarrollo se realizaron las siguientes comprobaciones:

- [x] Compilación de producción con Vite.
- [x] Inicio de sesión con Firebase Authentication.
- [x] Registro de usuario de prueba.
- [x] Acceso autorizado al panel de administración.
- [x] Bloqueo de acceso al panel para usuarios comunes.
- [x] Importación inicial de seis productos a Firestore.
- [x] Creación de productos.
- [x] Lectura de productos.
- [x] Edición de productos.
- [x] Eliminación de productos.
- [x] Incorporación de productos al carrito.
- [x] Modificación de cantidades.
- [x] Actualización del total del carrito.
- [x] Eliminación de productos del carrito.
- [x] Búsqueda de productos en tiempo real.
- [x] Visualización responsive en celular, tablet y computadora.
- [ ] Verificación específica de la paginación.
- [ ] Verificación específica del checkout simulado.
- [ ] Comprobación de compatibilidad entre navegadores.
- [ ] Publicación y verificación de la aplicación en internet.

## 13. Alcance del proyecto

Nexo Store es una aplicación académica desarrollada con fines educativos.

El checkout es demostrativo y no procesa pagos reales.

El proyecto no incluye una pasarela de pagos ni un sistema de gestión de pedidos comerciales.

## 14. Autor

**Miguel Victorio Cabrera**

Proyecto Final Integrador  
Talento Tech — React JS  
2026

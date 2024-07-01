# Aplicación Harry Potter World

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Autores](#autores)
- [Licencia](#licencia)

## Introducción

Harry Potter World es una aplicación web que proporciona a los usuarios información detallada sobre los libros y personajes de Harry Potter. La aplicación está construida utilizando HTML, CSS y JavaScript, e interactúa con PotterAPI para obtener y mostrar datos.

## Características

- **Página de Inicio**: Una página de bienvenida con navegación a diferentes secciones.
- **Página de Libros**: Muestra un catálogo de todos los libros de Harry Potter.
- **Página de Personajes**: Muestra un catálogo de todos los personajes de la serie Harry Potter.
- **Página de Detalles del Libro**: Proporciona información detallada sobre un libro específico.
- **Página de Detalles del Personaje**: Proporciona información detallada sobre un personaje específico.
- **Login y Registro**: Los usuarios pueden registrarse e iniciar sesión para acceder a la aplicación.
- **Diseño Responsivo**: La aplicación es completamente responsiva y funciona bien en todos los dispositivos.

## Tecnologías Utilizadas

- **HTML**: Estructura de la aplicación.
- **CSS**: Estilizado de la aplicación con Bootstrap para un diseño responsivo.
- **JavaScript**: Funcionalidad e interacciones con la API.
- **CryptoJS**: Para encriptar y desencriptar contraseñas.
- **Bootstrap**: Para el diseño responsivo y componentes.

## Instalación

Para ejecutar la aplicación localmente, siga estos pasos:

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/P4V0L/web-app-funcional.git
    cd web-app-funcional
    ```

2. **Abrir la aplicación**:
   Abra `index.html` en su navegador web preferido.

## Uso

### Página de Inicio

- Navegue a la Página de Inicio abriendo `index.html`.

### Página de Libros

- Haga clic en "Catálogo de Libros" en la barra de navegación para ver la lista de libros.
- Haga clic en cualquier libro para ver información detallada.

### Página de Personajes

- Haga clic en "Personajes" en la barra de navegación para ver la lista de personajes.
- Haga clic en cualquier personaje para ver información detallada.

### Login y Registro

- Haga clic en "INICIA SESIÓN" para ir a la página de login.
- Si no tiene una cuenta, haga clic en "Regístrate aquí" para ir a la página de registro.
- Complete los campos requeridos y envíe el formulario para registrarse.
- Use sus credenciales registradas para iniciar sesión.

### Logout

- Una vez que haya iniciado sesión, verá su icono de perfil en la barra de navegación.
- Haga clic en el icono de perfil y seleccione "Logout" para cerrar sesión.

## Endpoints de la API

La aplicación interactúa con PotterAPI para obtener datos sobre libros y personajes. A continuación se muestran los endpoints de la API utilizados:

- **Libros**: `https://potterapi-fedeperin.vercel.app/es/books`
- **Personajes**: `https://potterapi-fedeperin.vercel.app/es/characters`
- **Detalles del Libro**: Se obtienen según el índice en la lista de libros.
- **Detalles del Personaje**: Se obtienen según el índice en la lista de personajes.

### Ejemplo de Uso de la API

#### Obtener Todos los Libros
```javascript
fetch('https://potterapi-fedeperin.vercel.app/es/books')
    .then(response => response.json())
    .then(data => console.log(data));
```
Obtener Todos los Personajes
``` javascript
Copiar código
fetch('https://potterapi-fedeperin.vercel.app/es/characters')
    .then(response => response.json())
    .then(data => console.log(data));
```
## Autores

- **Rossy Adrianny García Orocua**: [Perfil de GitHub](https://github.com/Roadgar)
- **Pablo Montón Gimeno**: [Perfil de GitHub](https://github.com/P4V0L)
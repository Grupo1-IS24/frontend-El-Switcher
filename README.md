# El Switcher (frontend).

## Descripción.

Este repositorio corresponde al frontend del juego "El Switcher", desarrollado para la materia Ingeniería del Software dictada el año 2024 en FAMAF.

## Tabla de Contenidos.

1. [Requisitos previos](#requisitos-previos)
2. [Comandos para ejecutar el frontend](#comandos-para-ejecutar-el-frontend)
3. [Formatear código](#formatear-código)
4. [Estructura de directorios](#estructura-de-directorios)
5. [Dependencias necesarias](#dependencias-necesarias)

## Requisitos previos.

Para poder correr este proyecto se necesita tener instalado [NodeJS](https://nodejs.org/es) en su versión 18 o superior. También es necesario tener instalado [npm](https://www.npmjs.com/), aunque generalmente ya vendrá instalado junto con NodeJS.

## Comandos para ejecutar el frontend.

A continuación se citaran los pasos necesarios para poder ejecutar el frontend de manera local:

1. `Instalar las dependencias del proyecto`: Para realizar la descarga inicial de las dependencias del proyecto deberán hacer:

    ```bash
    npm install
    ```

    Este comando descargará todas las dependencias necesarios para poder correr el proyecto de manera local. Dichas dependencias serán guardados de manera automática en una carpeta llamada `node_modules`.

2. `Correr el proyecto`: Una vez instaladas las dependencias, vamos a poder probar el proyecto usando el siguiente comando:

    ```bash
    npm run dev
    ```

    Dicho comando devolverá una respuesta de la siguiente forma:

    ```bash
      VITE v4.4.9  ready in 838 ms

      ➜  Local:   http://127.0.0.1:5173/
      ➜  Network: use --host to expose
      ➜  press h to show help
    ```
    Y entonces, debemos copiar y pegar en el navegador el link proporcionado por `Local`, el cuál será en nuestro ejemplo `http://127.0.0.1:5173/`.

## Formatear código.

Se ha agregado como `dependencia de desarrollo` a `Prettier`, el cuál junto con `EsLint` se encargarán de formatear el código, siempre y cuando ejecutemos el siguiente comando:

```bash
npm run format
```

Se recomienda ejecutar este comando antes de subir el código que hagamos a GitHub.

Notese que la definición de este comando podemos encontrarla en el `package.json`.

## Estructura de directorios.

Para el proyecto hemos decidido tener la siguiente estructura de directorios:

```
🗁 NOMBRE_DEL_PROYECTO
    │
    ├ 🗀 node_modules
    │
    ├ 🗀 public
    │
    ├ 🗁 src
    │   │
    │   ├ 🗁 assets
    │   │   │
    │   │   ├ 🗀 img
    │   │   │
    │   │   ├ 🗀 fonts
    │   │   │
    │   │   ...
    │   │
    │   ├ 🗁 components
    │   │   │
    │   │   ├ 🗁 NOMBRE_DEL_COMPONENTE
    │   │   │   │
    │   │   │   ├ 🗋 NOMBRE_DEL_COMPONENTE.jsx
    │   │   │   │
    │   │   │   └ 🗋 NOMBRE_DEL_COMPONENTE.test.js
    │   │   ...
    │   │
    │   ├ 🗀 hooks
    │   │
    │   ├ 🗀 contexts
    │   │
    │   ├ 🗀 utils
    │   │
    │   ├ 🗀 services
    │   │
    │   ├ 🗁 pages
    │   │   │
    │   │   ├ 🗋 NOMBRE_DE_LA_PAGE.jsx
    │   │   │
    │   │   ...
    │   │
    │   ├ 🗋 index.css
    │   │
    │   └ 🗋 main.jsx
    │
    ├ 🗋 .eslintrc.cjs
    │
    ├ 🗋 .gitignore
    │
    ├ 🗋 index.html
    │
    ├ 🗋 .prettierignore
    │
    ├ 🗋 .prettierrc
    │
    ├ 🗋 package-lock.json
    │
    ├ 🗋 postcss.config.js
    │
    ├ 🗋 tailwind.config.js
    │
    ├ 🗋 package.json
    │
    ├ 🗋 README.md
    │
    └ 🗋 vite.config.js
```

Como se puede observar en este árbol de directorios, hemos generalizado la estructura de directorios que tendrá el proyecto, el cuál consitirá de:

- `assets`: Allí se guardarán las imágenes, fuentes y demás información que nos será de utilidad para el sitio web.

- `components`: Por cada componente crearemos un directorio que tendrá el nombre del componente a implementar, y que contendrá el código del componente y sus correspondientes tests unitarios.

- `hooks`: Allí se guardarán todos los `custom hooks` que vayamos a crear.

- `contexts`: Allí se guardarán todos los `Context providers` que vayamos a crear.

- `utils`: Allí se guardarán todas funciones auxiliares que vayamos a crear.

- `services`: Allí se guardarán todas funciones que estarán relacionadas a nuestra `lógica de negocio` y también que se encarguen de hacer `llamadas a la API`.

- `pages`: Como utilizamos rutas, cada ruta deberá tener un componente raíz al cuál le llamaremos `page`. Por lo tanto, en `pages` irán los componentes raíz correspondientes a cada ruta.

- `main.jsx`: Es el código inicial de React.

## Dependencias necesarias.

A continuación se nombrarán las dependencias que vamos a utilizar y para qué sirve cada una:

- `Tailwind CSS`: Nos permitirá estilizar nuestros componentes utilizando estilos atómicos de CSS.

- `Axios`: Nos permitirá realizar solicitudes HTTP de manera sencilla y eficiente. En nuestro proyecto usaremos `Axios` como un reemplazo más cómodo de `fetch`.
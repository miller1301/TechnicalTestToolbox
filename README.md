# TechnicalTestToolbox

Sistema de manejo de archivos

Este proyecto consiste en una prueba técnica, la cual está estructurada de la siguiente forma:

<ul>
  <li>filesApi - API Desarrollada con NodeJS - Express</li>
  <li>files-client - Cliente desarrollado en React</li>
</ul>

Se desarrolla este proyecto teniendo en cuenta las versiones solicitadas y estables de las tecnologías anteriormente mencionadas. Se tienen en cuenta patrones de desarrollo y código limpio para que sea escalable en el futuro.

### Desarrollo de la prueba

Para que la aplicación funcione correctamente, es necesario tener en cuenta los siguientes pasos:

Obtener el repositorio <link> https://github.com/miller1301/TechnicalTestToolbox

### FilesApi
En este proyecto se encuentra el backend de la aplicación construido en NodeJS y Express. Este proyecto se desarrollo implementando el patrón por capas incluyendo servicios, controladores, rutas y pruebas, esto permite una correcta separación de responsabilidades cumpliendo con los estándares de Clean Code y patrones de diseño. En la ruta de la carpeta <strong>\files-client</strong> ejecutar <code>npm install</code> para ejecutar el proyecto.

### FilesClient
En este proyecto se encuentra la estructura del cliente, que se desarrolló en React.
En la ruta de la carpeta <strong>\files-client</strong> ejecutar <code>npm install</code>, para obtener todos los paquetes requeridos para que el cliente funcione. En el cliente, se pueden realizar las operaciones y los demás puntos solicitados.

Para el consumo de la API desde el cliente y para el API externa se utiliza `Axios`, ya que con este objeto se realizan solicitudes HTTP y se maneja la respuesta del servidor.


### Scaffolding FilesApi

<ul>
  <li>controllers</li>
  <li>node_modules</li>
  <li>routes</li>
  <li>services</li>
  <li>test</li>
  <li>.env</li>
  <li>index.js</li>
  <li>package.json</li>
</ul>

### Scaffolding FilesClient

<ul>
  <li>node_modules</li>
  <li>public</li>
  <li>src</li>
    - components
    <br>
    - App.css
    <br>
    - App.js
    <br>
    - index.js
    <br>
    ...
  <li>package.json</li>
</ul>


*-- Santiago Nivia*
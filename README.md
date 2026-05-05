# PROTOTIPO-2

## EXPLICACIÓN GENERAL
- En este prototipo de API REST construida con Express y TypeScript se pueden realizar operaciones CRUD sobre productos. Se utiliza el linter ESLint para detectar errores.

- Los datos iniciales (initialProducts en products.data.ts) simulan una base de datos en memoria y son gestionados por un Repository dentro de proto.ts, que contiene toda la lógica de acceso y modificación. 
El Controller actúa como intermediario, recibiendo las peticiones HTTP que previamente hemos definido en la lógica del repositorio. Finalmente, las rutas de Express (Request, Response) conectan cada endpoint (/products) con su método correspondiente del controller.

Cuando el servidor se inicia, queda escuchando en el puerto definido y permite interactuar con la API mediante herramientas como Postman para probar endpoints.

## TECNOLOGÍAS
- Para esta tecnología hemos utilizado:

    Node.js -> Entorno que ejecuta JavaScript en el servidor
    Express -> Framework para crear la API y gestionar rutas
    Morgan -> Muestra logs de las peticiones HTTP
    Cors -> Permite peticiones desde otros orígenes
    dotenv -> carga variables de entorno desde el archivo .env
    debug -> Logging controlado por entorno (.env)

## ESTRUCTURA

    # FICHEROS DE CONFIGURACIÓN
        package.json
        package-lock.json
        tsconfig.json
        eslint.config.json

    # FICHERO DE ENTORNO
        .env

    #GITIGNORE
        .gitignore

## CONFIGURACIÓN

- En primer lugar importamos los ficheros de configuración.
- npm install todas de todas sus dependecias.
- Creación de las variables de entorno.
- Ajustar la conf. de typescript.
- En package.json añadir el comando de ejecución "dev" para facilitar la ejecución del proyecto en desarrollo sin tener que escribir comandos largos cada vez, compilando typeScript automáticamente y reiniciando el servidor al detectar cambios (watch).
- Arrancamos el servidor y abrimos desde el navegador o en Postman.

## ENDPOINTS

GET /products: Devuelve todos los productos.
GET /products/:id: Devuelve un producto por su ID.
POST /products: Crea un nuevo producto a partir de la clase Product.
PATCH /products/:id: Actualiza un producto existente por ID.
DELETE /products/:id: Elimina un producto existente por su ID.

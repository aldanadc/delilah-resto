# Delilah Resto API

## Prerequisites
You will need to have Node.js and XAMPP installed (or Apache, MariaDB/MySQL and PHP if you don't have XAMPP).

## Getting started

1. From your console clone the repository either by using "https://github.com/aldanadc/delilah-resto.git" or by running `gh repo clone aldanadc/delilah-resto`.

2. Run `npm i` or `npm install` on the repo's root folder to install all necessary dependencies.

3. Create a local **MariaDB** or **MySQL** database named "delilah" or with a name of your choosing.

4. Rename the *sample.env* file in the project's root folder to be only *.env* as these will be your environment variables. You can customize the contents of anything from SERVER_PORT down as you like. Make sure you use the correct information for the database you created for this project if it differs from the data in the file.

5. Start the MySQL and Apache services on your machine.

6. Run `npm run dev` on your console and wait while the connection to the database is established and the tables are created. When finished, the console should show a message saying "Server is ready".

7. Import the *delilah.sql* file found in the repository into your database or run the queries found there in order to populate the tables with the initial data.

8. The API is now ready and waiting to be used. You can run any of the operations detailed in the *spec.v1.yaml* file to try the available endpoints. You can also use this Postman [collection](https://www.getpostman.com/collections/92e53db46228637fb0bc) to make the requests. The base URL for all endpoints is **https://localhost:8080/api/1.0.0**. Make sure you use the correct port if you used a different one on your *.env* file



***


## Prerrequisitos
Necesitarás tener instalado Node.js y XAMPP (o en su defecto, Apache, MariaDB/MySQL y PHP).
## Empezando

1. Desde la consola, clonar el repositorio desde utilizando "https://github.com/aldanadc/delilah-resto.git" o corriendo `gh repo clone aldanadc/delilah-resto`.

2. Correr `npm i` o `npm install` en la carpeta raíz del repositorio para instalar todas las dependencias necesarias.

3. Crear una base de datos local **MariaDB** o **MySQL** llamada "delilah" o con otro nombre elegido.

4. Renombrar el archivo *sample.env* que se encuentra en la carpeta raíz para que se llame solo *.env*; estas serán tus variables de entorno. Se puede personalizar el contenido desde SERVER_PORT hacia abajo. Asegurarse de que se utilice la información correspondiente a la base de datos creada si es diferente de la provista.

5. Comenzar los servicios de MySQL y Apache.

6. Correr `npm run dev` en la consola y esperar mientras se establece la conexión con la base de datos y se crean las tablas. Al finalizar, la consola debería mostrar "Server is ready".

7. Importar el archivo *delilah.sql* que se encuentra en el repositorio a la base de datos creada o correr las consultas encontradas allí para rellenar las tablas con la información inicial. 

8. La API está lista para ser usada. Se pueden utilizar cualquiera de las operaciones detalladas en el archivo de especificaciones *spec.v1.yaml* para probar los endpoints existentes. También se puede utilizar esta [colección](https://www.getpostman.com/collections/92e53db46228637fb0bc) de Postman para realizar las consultas. La URL base para todos los endpoints es **https://localhost:8080/api/1.0.0**. Asegurarse de usar el puerto correcto si se utilizó uno distinto en el archivo *.env*




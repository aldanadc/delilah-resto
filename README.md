# Delilah Restó API

Tercer proyecto de la carrera de Desarrollo Web Full Stack en Acámica. Se trata de una API para el manejo de pedidos de un restaurante siguiendo los principios REST.

---

Project #3 from the Full Stack Web Development course at Acámica. RESTful API for the management of restaurant orders.

---

Tecnologías y recursos utilizados / Technologies and resources used:

* Node.js
* Express.js
* MariaDB
* Sequelize
* JWT
* dotenv
* nodemon

![image](https://user-images.githubusercontent.com/75340355/120859230-4c22a700-c55a-11eb-81c8-57ef271ae508.png)

## Cómo utilizarlo 

### Prerrequisitos
Necesitarás tener instalado Node.js y XAMPP (o en su defecto, Apache, MariaDB/MySQL y PHP). Se recomienda utilizar Postman para realizar las consultas.

### Documentación
Encontrarás las especificaciones de la aplicación siguiendo el standard OpenAPI en el archivo **_spec.v1.yaml_**.

### Empezando

1. Desde la consola, clonar el repositorio desde utilizando "https://github.com/aldanadc/delilah-resto.git" o corriendo `gh repo clone aldanadc/delilah-resto`.

2. Correr `npm i` o `npm install` en la carpeta raíz del repositorio para instalar todas las dependencias necesarias.

3. Crear una base de datos local **MariaDB** o **MySQL** llamada "delilah" o con otro nombre elegido.

4. Renombrar el archivo **_sample.env_** que se encuentra en la carpeta raíz para que se llame solo **_.env_**, ya que estas serán tus variables de entorno. Se puede personalizar el contenido desde SERVER_PORT hacia abajo. Asegurarse de que se utilice la información correspondiente a la base de datos creada si es diferente de la provista.

5. Comenzar los servicios de MySQL y Apache.

6. Correr `npm run dev` en la consola y esperar mientras se establece la conexión con la base de datos y se crean las tablas. Al finalizar, la consola debería mostrar "Server is ready".

7. Importar el archivo **_delilah.sql_** que se encuentra en el repositorio a la base de datos creada o correr las consultas encontradas allí para rellenar las tablas con la información inicial. 

8. La API está lista para ser usada. Se pueden utilizar cualquiera de las operaciones detalladas en el archivo de especificaciones **_spec.v1.yaml_** para probar los endpoints existentes. También se puede utilizar esta [colección](https://www.getpostman.com/collections/92e53db46228637fb0bc) de Postman para realizar las consultas. La URL base para todos los endpoints es **https://localhost:8080/api/1.0.0/**. Asegurarse de usar el puerto correcto si se utilizó uno distinto en el archivo **_.env_**.

### Usuarios y permisos
Se puede utilizar cualquiera de los usuarios provistos para realizar las pruebas. Aquí hay dos ejemplos:
#### Administrador
- username: admin
- password: Password1

#### No administrador
- username: billyjoel
- password: Password2

Una vez realizado exitosamente el login, se devolverá un JWT que deberá utilizarse para realizar las consultas. Copiarlo y pegarlo en la cabecera Authorization con el tipo "Bearer token". 

![image](https://user-images.githubusercontent.com/75340355/120859230-4c22a700-c55a-11eb-81c8-57ef271ae508.png)


## How to use

### Prerequisites
You will need to have Node.js and XAMPP installed (or Apache, MariaDB/MySQL and PHP if you don't have XAMPP). It is recommended to use Postman for making requests.

### Documentation
You will find the app's specifications following the OpenAPI standard in the file **_spec.v1.yaml_**.

### Getting started

1. From your console clone the repository either by using "https://github.com/aldanadc/delilah-resto.git" or by running `gh repo clone aldanadc/delilah-resto`.

2. Run `npm i` or `npm install` on the repo's root folder to install all necessary dependencies.

3. Create a local **MariaDB** or **MySQL** database named "delilah" or with a name of your choosing.

4. Rename the **_sample.env_** file in the project's root folder to be only **_.env_** as these will be your environment variables. You can customize the contents of anything from SERVER_PORT down as you like. Make sure you use the correct information for the database you created for this project if it differs from the data in the file.

5. Start the MySQL and Apache services on your machine.

6. Run `npm run dev` on your console and wait while the connection to the database is established and the tables are created. When finished, the console should show a message saying "Server is ready".

7. Import the **_delilah.sql_** file found in the repository into your database or run the queries found there in order to populate the tables with the initial data.

8. The API is now ready and waiting to be used. You can run any of the operations detailed in the **_spec.v1.yaml_** file to try the available endpoints. You can also use this Postman [collection](https://www.getpostman.com/collections/92e53db46228637fb0bc) to make the requests. The base URL for all endpoints is **https://localhost:8080/api/1.0.0/**. Make sure you use the correct port if you used a different one on your **_.env_** file.

---

### Users and permissions
You can use any of the users provided or create your own to do the testing. Here are two examples you can use: 

#### Admin
- username: admin
- password: Password1

#### Non-admin
- username: billyjoel
- password: Password2

Once succesfully logged in, a JWT will be returned which should be used to make requests. Copy and paste it on the Authorization header with the type "Bearer token".


![image](https://user-images.githubusercontent.com/75340355/120859230-4c22a700-c55a-11eb-81c8-57ef271ae508.png)




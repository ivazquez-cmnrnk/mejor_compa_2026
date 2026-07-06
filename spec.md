# Objetivo

Crear una aplicación web con React para votar al mejor compañero por categoría de la empresa.

## Requisitos

1. Guardar la información en un archivo JSON local (`server/data/db.json`)
2. Crear login de usuarios para validar que usuario ya votó. 
    - Primero debes loguear la aplicación con la API de Sievert con `login` para obtener el token. 
    -  Después debes exigir al usuario que se loguee con `get_access` para poder realizar la votación por medio de un formulario de Login.
    - Debes validar en `db.json` en la lista `votantes` que el usuario no haya votado (buscando por `idFlxCore03`). De lo contrario debes mostrarle un cartel que diga "YA VOTASTE".
3. Crear formulario de votación:
    - Agrega una fila por cada una de estas categorías:
        - "El más Argel" 
        - "Alma de Jubilado" 
        - "El más Fachero/a" 
        - "El más Personaje"
        - "El más Manija" 
        - "El más Chamuyero/a" 
        - "El que te hace la segunda" 
        - “El adicto al mate”
        - “Al que siempre se pone la 10" 
        - "El más Paciente" 
        - "El más Detallista" 
        - "El Rey/Reina del Drama" 
        - “El más Resolutivo"              
        - “El más Fit” 
        - "El más Pichado"               
        - “El más Alegre" 
        - “El de la Risa contagiosa”    
        - “El del mejor peinado”
        - “El mas pollera”                    
        - “El mejor cocinero”
        - “El mejor deportista”             
        - “El más Glotón”
        - “El más descansero”                 
        - “El mejor bailarín” 
        - “El más Ratón”                             
        - “EL/la más gritón”
        - "El más borrachin"
    - Por cada categoría debe permitirse seleccionar un personal de una lista a obtener del endpoint `sys_admi_01`. Debe mostrarse el nombre completo y la foto del personal en el combo. Debe validarse que se seleccione un personal por categoría. No debe quedar vacío.
    - Al enviar el formulario debe agregarse un registro en `db.json` en la lista `votantes` con el `idFlxCore03` y el `flxCore03Nombre` del usuario que votó.
    - Para registrar los votos por categoría debe agregarse en `db.json` en el objeto `votos`, usando el nombre de la categoría como clave y agregando el nombre del personal votado a su array.  

### Endpoints

#### Obtención del token de la API de Sievert: 

- Método: `POST`

- Endpoint: `https://apirest.cemenurnk.org.ar/login/`

- Headers:

```json
{
  "flexAgent": "apirest-sievert"
}
```

- Body:

```json
{
  "username": string,
  "password": string
}
```

>"username" y "password" son variables de entorno de este servidor.

- Respuesta correcta (status 200): 

```json
{
    "idClient": "3",
    "name": "Api Rest",
    "tokenAuth": "d16a77f770f1c0c0",
    "expires": "2026-06-03 20:13:13"
}
```

>El token obtenido será empeleado en el header de las siguientes peticiones a la api.

- Respuesta incorrecta (status 400):

```json
{
    "resultid": "error",
    "resulttext": "Los datos ingresados son incorrectos",
    "resultdebug": "Los datos ingresados son incorrectos"
}
```

#### Autenticación de usuario de Sievert: 

Endpoint de login con las credenciales del usuario.

- Método: `POST`

- Endpoint: `https://apirest.cemenurnk.org.ar/get_access/`

- Headers: 

```json
{
  "flexAgent": "apirest-sievert",
  "X-Authorization-token": token
}
```

- Body:

```json
{
  "username": string,
  "password": string
}
```
> "username" y "password" son las credenciales del usuario
- Respuesta correcta (status 200)

```json
{
    "resultid": "success",
    "user": {
        "idFlxCore03": "195",
        "flxCore03Nombre": "Ivan Gaston Vazquez",
        "flxCore03Mail": "ivazquez@cemenurnk.org.ar",
        "flxCore03Imagen": "https://sievert.cemenurnk.org.ar/FLEX_FILES/chx_FoXQJOL-70lgcyYZgPhEBFCYS6wokzruboDsTEQJRoVYGvjTeV43ak3pWGxuINuE9encZgKpWh3Qm0vtaPiU6P9tMrEtnoFSDjrqkl5LeMxvkhXErJHoGLgbjCQEV_Ch1EowOvqZlhUG77JI",
        "funciones": []
    }
}
```

- Respuesta incorrecta (status 404)

```json
{
    "resultid": "error",
    "resulttext": "Usuario o Contraseña incorrectos.",
    "resultdebug": "Usuario o Contraseña incorrectos."
}
```

#### Obtener lista de personal

- Método: `GET`

- Endpoint: `https://apirest.cemenurnk.org.ar/sys_admi_01`

- Headers: 

```json
{
  "flexAgent": "apirest-sievert",
  "X-Authorization-token": token
}
```

- Request
```json
{
  "id_sysadmi01": "<id_personal>",
  "nombre_completo": "<nombre_completo>",
  "imagen": "<url_completa>"
}
``` 




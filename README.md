# Documentación de la API de Gestión de Alumnos

Esta API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre alumnos y gestionar las materias y notas asociadas a cada alumno.

## URL Base

```
[https://api-crud-unsta.vercel.app/]
```

## Endpoints Disponibles

### Crear un Nuevo Alumno

```
POST /students
```

Permite crear un nuevo alumno.

#### Parámetros del Cuerpo de la Solicitud

- `name` (string): Nombre del alumno.
- `studentId` (string): Número de legajo del alumno.
- `subjects` (array): Lista de materias y notas del alumno (opcional).

Ejemplo del cuerpo de la solicitud:

```json
{
  "name": "Juan",
  "studentId": "12345",
  "subjects": [
    {
      "name": "Matemáticas",
      "grades": []
    },
    {
      "name": "Historia",
      "grades": []
    }
  ]
}
```

### Obtener Todos los Alumnos

```
GET /students
```

Permite obtener todos los alumnos registrados.

### Obtener un Alumno por su ID

```
GET /students/:studentId
```

Permite obtener un alumno específico por su ID de legajo.

### Actualizar los Datos de un Alumno

```
PUT /students/:studentId
```

Permite actualizar los datos de un alumno existente por su ID de legajo.

#### Parámetros del Cuerpo de la Solicitud

- `name` (string): Nuevo nombre del alumno.
- `subjects` (array): Nueva lista de materias y notas del alumno (opcional).

Ejemplo del cuerpo de la solicitud:

```json
{
  "name": "Juan Pérez",
  "subjects": [
    {
      "name": "Matemáticas",
      "grades": [8, 9, 7]
    },
    {
      "name": "Historia",
      "grades": [7, 6, 8]
    }
  ]
}
```

### Eliminar un Alumno

```
DELETE /students/:studentId
```

Permite eliminar un alumno existente por su ID de legajo.

### Agregar una Nota a una Materia de un Alumno

```
POST /students/:studentId/subjects/:subjectName/grades
```

Permite agregar una nota a una materia específica de un alumno.

#### Parámetros del Cuerpo de la Solicitud

- `grade` (number): Nota a agregar.

Ejemplo del cuerpo de la solicitud:

```json
{
  "grade": 9
}
```

### Obtener las materias y notas de un alumno por su ID

```
GET /students/:studentId/grades
```

Esta ruta permite obtener las materias y notas de un alumno específico utilizando su ID.

#### Parámetros del Cuerpo de la Solicitud

- `:studentId` El ID del alumno del cual se desean obtener las materias y notas.

#### Ejemplo de uso

```
GET /students/12345/grades
```

### Modificar las materias de un alumno por su ID

```
PUT /students/:studentId/subjects
```

Esta ruta permite modificar las materias de un alumno específico utilizando su ID. Se pueden agregar, actualizar o eliminar materias.

#### Parámetros del Cuerpo de la Solicitud

- `:studentId` El ID del alumno cuyas materias se desean modificar.
  
Datos en el cuerpo de la solicitud (JSON):

- `subjects`  La lista actualizada de materias del alumno.

#### Ejemplo de uso

```
PUT /students/12345/subjects
```

Datos en el cuerpo de la solicitud:

```json
{
    "subjects": [
        {
            "name": "FrontEnd",
            "grades": [8, 9, 7]
        },
        {
            "name": "BackEnd",
            "grades": [7, 9, 6]
        },{
            "name": "FCC",
            "grades": [8, 10, 6]
        },
    ]
}
```





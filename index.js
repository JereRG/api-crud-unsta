// index.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let students = [];

// Ruta main

app.get('/', (req, res) => {
    const htmlResponse = `
        <html>
            <head>
                <title>API - CRUD - UNSTA</title>
            </head>
            <body>
                <h1>Esta es la api de la unsta</h1>
            </body>
        </html>
    `;
    res.send(htmlResponse);
});

// Ruta para obtener todos los alumnos
app.get('/students', (req, res) => {
    res.json(students);
});

// Ruta para crear un nuevo alumno
app.post('/students', (req, res) => {
    const { name, studentId, subjects } = req.body;
    const newStudent = { name, studentId, subjects };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Ruta para obtener un alumno por su id
app.get('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const student = students.find(student => student.studentId === studentId);
    if (!student) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(student);
});

// Ruta para actualizar los datos de un alumno
app.put('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const { name, subjects } = req.body;
    const studentIndex = students.findIndex(student => student.studentId === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    students[studentIndex].name = name;
    students[studentIndex].subjects = subjects;
    res.json(students[studentIndex]);
});

// Ruta para eliminar un alumno
app.delete('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const studentIndex = students.findIndex(student => student.studentId === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    students.splice(studentIndex, 1);
    res.sendStatus(204);
});

// Ruta para obtener las materias y notas de un alumno por su ID
app.get('/students/:studentId/grades', (req, res) => {
    const studentId = req.params.studentId;
    const student = students.find(student => student.studentId === studentId);
    if (!student) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(student.subjects);
});

// Ruta para modificar las materias de un alumno por su ID
app.put('/students/:studentId/subjects', (req, res) => {
    const studentId = req.params.studentId;
    const { subjects } = req.body;

    const studentIndex = students.findIndex(student => student.studentId === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    students[studentIndex].subjects = subjects;
    res.json({ message: 'Materias actualizadas exitosamente', student: students[studentIndex] });
});

// Ruta para agregar una nota a una materia especifica de un alumno
app.post('/students/:studentId/subjects/:subjectName/grades', (req, res) => {
    const studentId = req.params.studentId;
    const subjectName = req.params.subjectName;
    const { grade } = req.body;

  // Encontrar al alumno por su ID
    const student = students.find(student => student.studentId === studentId);
    if (!student) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
    }

  // Encontrar la materia por su nombre
    const subject = student.subjects.find(subject => subject.name === subjectName);
    if (!subject) {
        return res.status(404).json({ error: 'Materia no encontrada' });
    }

  // Agregar la nota a la materia
    subject.grades.push(grade);

    res.status(201).json({ message: `Nota agregada a ${subjectName}` });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

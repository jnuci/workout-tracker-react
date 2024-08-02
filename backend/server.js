import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'UC$b2019?!',
    database: 'WorkoutTracker'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/workouts', (req, res) => {
    const query = "SELECT * FROM Workouts";

    db.query(query, (err, result) => {
        if (err) return res.json({message: "Server error"}, err)
        return res.json(result);
    });
});


app.post('/add_workout', (req, res) => {
    const query = "INSERT INTO Workouts (title, description) VALUES (?, ?)";
    const values = [
        req.body.title,
        req.body.description ? req.body.description : "None"
    ]
    
    db.query(query, values, (err, result) => {
        if (err) return res.json({message: "Server error"}, err)
        return res.json(result);
    });
});

app.delete('/delete_workout/:id', (req, res) => {
    const query = "DELETE FROM Workouts WHERE id = ?"
    const values = [req.params.id]
    
    db.query(query, values, (err, result) => {
        if (err) return res.json({message: "Server error"}, err)
            return res.json(result);
    })
})

app.get('/get_workout/:id', (req, res) => {
    const query = "SELECT * FROM Workouts WHERE id = ?"
    const values = [req.params.id]

    db.query(query, values, (err, result) => {
        if (err) return res.json({message: "Server error"}, err)
        return res.json(result);
    })
})

app.post('/edit_workout/:id', (req, res) => {
    const query = "UPDATE Workouts SET title = ?, description = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.description,
        req.params.id
    ]

    db.query(query, values, (err, result) => {
        if (err) return res.json({message: "Server error"}, err)
        return res.json(result);
    })
})

app.listen(port, () => {
    console.log('listening')
});
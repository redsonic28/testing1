const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabaseUrl = "https://gcvlnuogyhbyptflzmkh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjdmxudW9neWhieXB0Zmx6bWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTk1NzEsImV4cCI6MjA1MzA3NTU3MX0.53z5edu8BEtQEhQLqDVD9rKBHr9R94_P_byW9k8JNso";
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta POST para insertar datos en la base de datos de Supabase
app.post('/submit', async (req, res) => {
    const { email, message } = req.body;

    try {
        const { data, error } = await supabase
            .from('messages')
            .insert([{ email, message }]);

        if (error) {
            console.error("Error al insertar mensaje:", error);
            return res.status(500).send("Error al insertar el mensaje.");
        }

        res.send("¡Mensaje enviado con éxito!");
    } catch (err) {
        console.error("Error inesperado:", err);
        res.status(500).send("Error inesperado.");
    }
});

// Iniciar el servidor
const port = process.env.PORT || 3000; // Usar el puerto asignado por Render o 3000 como defecto

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});


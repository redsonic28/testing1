// Inicializar el cliente de Supabase
const supabaseUrl = "https://gcvlnuogyhbyptflzmkh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjdmxudW9neWhieXB0Zmx6bWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTk1NzEsImV4cCI6MjA1MzA3NTU3MX0.53z5edu8BEtQEhQLqDVD9rKBHr9R94_P_byW9k8JNso";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("Formulario no encontrado en el DOM.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar recarga de la página

        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!email) {
            alert("El campo de email está vacío.");
            return;
        }
        if (!message) {
            alert("El campo de mensaje está vacío.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("messages") // Nombre de tu tabla en Supabase
                .insert([{ email, message }]);

            if (error) {
                console.error("Error al enviar datos a Supabase:", error);
                alert("Error al enviar los datos. Revisa la consola para más detalles.");
                return;
            }

            alert("¡Mensaje enviado con éxito!");
            form.reset();
        } catch (err) {
            console.error("Error inesperado:", err);
            alert("Error inesperado. Por favor, intenta más tarde.");
        }
    });
});

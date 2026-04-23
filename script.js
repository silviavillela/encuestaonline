document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('surveyForm');
    const submitBtn = form.querySelector('button');

    // Configuración Segura y Robusta (Proxy n8n en Producción)
    // No exponemos Airtable en el cliente para máxima seguridad
    const N8N_WEBHOOK_URL = 'https://desarrolloex.app.n8n.cloud/webhook/fff1a084-b763-4749-8931-8c3673392c85';

    form.addEventListener('submit', (e) => {
        // Estado de carga
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Enviando...';
        submitBtn.style.opacity = '0.7';

        // Usamos el "túnel" del iframe para evitar errores de CORS
        form.action = N8N_WEBHOOK_URL;
        form.method = 'POST';
        form.target = 'hidden_iframe';

        // Obtenemos el ID para el mensaje de éxito
        const studentInfo = form.querySelector('[name="IDEstudiante"]').value;

        // Mostramos la animación de éxito tras un breve delay de envío
        setTimeout(() => {
            const container = document.querySelector('.container');
            container.style.opacity = '0';
            container.style.transform = 'scale(0.9)';
            container.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🚀</div>
                        <h1 style="margin-bottom: 1rem;">¡Gracias, ${studentInfo}!</h1>
                        <p style="color: var(--text-dim); line-height: 1.6;">
                            Tus respuestas se han procesado de forma segura. 
                            ¡Nos vemos en la próxima lección!
                        </p>
                        <button onclick="location.reload()" style="margin-top: 2rem; width: auto; padding: 1rem 2rem;">Volver a Empezar</button>
                    </div>
                `;
                container.style.opacity = '1';
                container.style.transform = 'scale(1)';
            }, 500);
        }, 800);
    });

    // Micro-interacción: Resaltar labels al enfocar inputs
    const inputs = form.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.previousElementSibling.style.color = 'var(--primary)';
        });
        input.addEventListener('blur', () => {
            input.previousElementSibling.style.color = 'var(--text-dim)';
        });
    });
});

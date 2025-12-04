document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gold-dust-container');
    const particleCount = 40; // Cantidad de partículas

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Posición aleatoria
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Tamaño pequeño para que parezca polvo/estrellas
    const size = Math.random() * 3 + 1; 

    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Retraso de animación aleatorio para que no titilen todos juntos
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;

    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);
}
document.addEventListener('DOMContentLoaded', setupBackground);
// Regenerar el fondo si cambia el tamaño de la ventana (ej. rotar el celular)
window.addEventListener('resize', debounce(setupBackground, 200));

function setupBackground() {
    const container = document.getElementById('background-pattern');
    // Limpiar el contenedor por si es una regeneración por resize
    container.innerHTML = '';

    // Configuración de la cuadrícula
    const fontSize = 40; // Debe coincidir con el CSS
    const gap = 10; // Espacio mínimo entre números
    const cellSize = fontSize + gap; // Tamaño total de la celda de la cuadrícula

    // Obtener dimensiones de la pantalla
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Calcular cuántas columnas y filas caben
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    // Generar todas las posiciones posibles en la cuadrícula
    let positions = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Guardamos la coordenada superior izquierda de cada celda
            positions.push({ x: i * cellSize, y: j * cellSize });
        }
    }

    // Mezclar las posiciones al azar (Shuffle) para que no se llenen en orden
    positions.sort(() => Math.random() - 0.5);

    // Definir cuántos números queremos. 
    // Usamos un porcentaje de las celdas disponibles para que no quede saturado (ej. 40%)
    const density = 0.4; 
    const numberOfElements = Math.floor(positions.length * density);

    // Crear los elementos en las primeras N posiciones mezcladas
    for (let i = 0; i < numberOfElements; i++) {
        createNumber(container, positions[i], cellSize);
    }
}

function createNumber(container, position, cellSize) {
    const el = document.createElement('span');
    el.classList.add('bg-number');
    
    // Asignar un número aleatorio del 0 al 9
    el.innerText = Math.floor(Math.random() * 10);

    // Establecer la posición exacta basada en la cuadrícula
    el.style.left = `${position.x}px`;
    el.style.top = `${position.y}px`;
    
    // Asegurar que el elemento tenga el tamaño de la celda para centrarlo
    el.style.width = `${cellSize}px`;
    el.style.height = `${cellSize}px`;

    // Animaciones desfasadas para que no se muevan todos igual
    const duration = Math.random() * 10 + 10; // Entre 10 y 20s
    const delay = Math.random() * 5; 
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `-${delay}s`; // Delay negativo para que empiecen ya animados

    container.appendChild(el);
}

// Función auxiliar para no ejecutar el resize demasiadas veces seguidas
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
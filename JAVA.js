// Elementos del DOM
const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrContainer = document.getElementById('qr-container');
const qrSize = document.getElementById('qr-size');
const qrColor = document.getElementById('qr-color');
const bgColor = document.getElementById('bg-color');

// Variable para almacenar el código QR actual
let currentQR = null;

// Función para generar el QR
function generateQR() {
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Por favor, ingresa algún texto o URL');
        return;
    }
    
    // Limpiar QR anterior
    qrContainer.innerHTML = '';
    
    // Opciones para el QR
    const options = {
        text: text,
        width: parseInt(qrSize.value),
        height: parseInt(qrSize.value),
        colorDark: qrColor.value,
        colorLight: bgColor.value,
        correctLevel: QRCode.CorrectLevel.H
    };
    
    // Generar nuevo QR
    currentQR = new QRCode(qrContainer, options);
    
    // Mostrar botón de descarga después de un pequeño delay
    setTimeout(() => {
        downloadBtn.style.display = 'inline-block';
    }, 100);
}

// Función para descargar el QR
function downloadQR() {
    const canvas = qrContainer.querySelector('canvas');
    
    if (!canvas) {
        alert('Primero genera un código QR');
        return;
    }
    
    // Crear enlace de descarga
    const link = document.createElement('a');
    link.download = `codigo-qr-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// Función para generar QR con Enter
function handleEnter(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
        generateQR();
    }
}

// Event listeners
generateBtn.addEventListener('click', generateQR);
downloadBtn.addEventListener('click', downloadQR);
textInput.addEventListener('keydown', handleEnter);

// Generar QR automáticamente al cambiar tamaño o colores
qrSize.addEventListener('change', () => {
    if (textInput.value.trim()) {
        generateQR();
    }
});

qrColor.addEventListener('change', () => {
    if (textInput.value.trim()) {
        generateQR();
    }
});

bgColor.addEventListener('change', () => {
    if (textInput.value.trim()) {
        generateQR();
    }
});
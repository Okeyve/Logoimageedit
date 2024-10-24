const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

let img = new Image();
let logo = new Image();
let logoSelected = 'logo1'; // Logo padrão
let positionSelected = 'top-left'; // Posição padrão

const logos = {
    logo1: 'Imagens/logo1.png',
    logo2: 'Imagens/logo2.svg',
    logo3: 'Imagens/logo3.png',
};

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            drawImage(); // Chama a função para desenhar a imagem
        }
    }
    
    reader.readAsDataURL(file);
});

// Função para desenhar a imagem e a logo
function drawImage() {
    canvas.width = 300;
    canvas.height = 300;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    logo.src = logos[logoSelected]; // Usando a logo selecionada
    
    logo.onload = function() {
        drawLogo(); // Chama a função para desenhar a logo
    }
}

// Função para desenhar a logo na posição selecionada
function drawLogo() {
    const logoSize = 50; // Tamanho da logo
    let x = 0, y = 0;

    switch(positionSelected) {
        case 'top-left':
            x = 10; y = 10;
            break;
        case 'top-right':
            x = canvas.width - logoSize - 10; y = 10;
            break;
        case 'bottom-left':
            x = 10; y = canvas.height - logoSize - 10;
            break;
        case 'bottom-right':
            x = canvas.width - logoSize - 10; y = canvas.height - logoSize - 10;
            break;
    }

    ctx.drawImage(logo, x, y, logoSize, logoSize);
}

// Event listeners para mudança de logo e posição
document.querySelectorAll('input[name="logo"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
        logoSelected = event.target.value; // Atualiza a logo selecionada
        drawImage(); // Redesenha a imagem e a logo
    });
});

document.querySelectorAll('input[name="position"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
        positionSelected = event.target.value; // Atualiza a posição selecionada
        drawImage(); // Redesenha a imagem e a logo
    });
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'imagem-editada.png';
    link.href = canvas.toDataURL();
    link.click();
});

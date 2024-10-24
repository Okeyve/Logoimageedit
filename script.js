const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

let img = new Image();
let logo = new Image();

const logos = {
    logo1: 'path/to/logo1.png', // Substitua pelo caminho das suas logos
    logo2: 'path/to/logo2.png',
    logo3: 'path/to/logo3.png',
};

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            drawImage();
        }
    }
    
    reader.readAsDataURL(file);
});

function drawImage() {
    canvas.width = 300;
    canvas.height = 300;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const selectedLogo = document.querySelector('input[name="logo"]:checked').value;
    logo.src = logos[selectedLogo];
    
    logo.onload = function() {
        const position = document.querySelector('input[name="position"]:checked').value;
        let x = 0, y = 0;
        const logoSize = 50; // Tamanho da logo

        switch(position) {
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
}

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'imagem-editada.png';
    link.href = canvas.toDataURL();
    link.click();
});

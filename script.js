window.addEventListener('load', function() {
    document.getElementById('loading').style.display = 'none';
    document.querySelector('.center-container').style.display = 'block';
    document.body.style.opacity = '1';
});

document.querySelector('.copy_toggle').addEventListener('click', function() {
    const terminalText = document.querySelector('.cmd').getAttribute('data-cmd');
    navigator.clipboard.writeText(terminalText).then(() => {
        this.querySelector('svg path').style.animation = 'clipboard-check 500ms linear forwards';
        setTimeout(() => {
            this.querySelector('svg path').style.animation = '';
        }, 1000);
    });
});

function createNoiseElements() {
    const backgroundNoise = document.querySelector('.background-noise');
    backgroundNoise.innerHTML = ''; 
    
    for (let i = 0; i < 37; i++) {
        const noiseBit = document.createElement('span');
        noiseBit.className = 'noise-bit';
        noiseBit.textContent = Math.random() < 0.5 ? '0' : '1';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        noiseBit.style.left = `${left}%`;
        noiseBit.style.top = `${top}%`;
        noiseBit.style.animationDelay = `-${Math.random() * 3}s`;
        
        backgroundNoise.appendChild(noiseBit);
    }
}

setInterval(createNoiseElements, 3000);
createNoiseElements(); 

let loginAttempts = {};
const MAX_ATTEMPTS = 3;
const TIMEOUT_DURATION = 10000; 

document.querySelector('.ai-button').addEventListener('click', function() {
    const inputPassword = document.querySelector('.ai-input').value;
    const hashedPassword = CryptoJS.SHA256(inputPassword).toString();
    const correctHashedPassword = "e1ab48135572679cad35ff68e5319b3354881c97e40521d4138afc922a933da4";

    const userIP = "127.0.0.1";

    if (!loginAttempts[userIP]) {
        loginAttempts[userIP] = {
            count: 0,
            lastAttempt: Date.now()
        };
    }

    if (loginAttempts[userIP].count >= MAX_ATTEMPTS) {
        const timeSinceLastAttempt = Date.now() - loginAttempts[userIP].lastAttempt;
        if (timeSinceLastAttempt < TIMEOUT_DURATION) {
            const remainingTime = Math.ceil((TIMEOUT_DURATION - timeSinceLastAttempt) / 1000);
            alert(`Çok fazla başarısız deneme! Lütfen ${remainingTime} saniye bekleyin.`);
            return;
        } else {
            loginAttempts[userIP].count = 0;
        }
    }

    if (hashedPassword === correctHashedPassword) {
        alert('Giriş başarılı!');
        loginAttempts[userIP].count = 0; 
    } else {
        loginAttempts[userIP].count++;
        loginAttempts[userIP].lastAttempt = Date.now();
        const remainingAttempts = MAX_ATTEMPTS - loginAttempts[userIP].count;
        alert(`Yanlış şifre! ${remainingAttempts} deneme hakkınız kaldı.`);
    }
}); 

function openEnvelope() {
    const flap = document.querySelector('.flap');
    const button = document.querySelector('.heart-button');
    const envelope = document.querySelector('.envelope');

    button.style.pointerEvents = 'none';

    gsap.to(flap, { rotationX: -180, duration: 1, ease: 'power2.inOut' });
    gsap.to(envelope, { width: '900vw', height: '900vh', borderRadius: 0, duration: 1.5, ease: 'power2.inOut' });

    createHeartConfetti();

    setTimeout(() => {
        window.location.href = 'letter.html';
    }, 500);
}

function createHeartConfetti() {
    const heartConfetti = {
        particleCount: 250,
        spread: 360,
        startVelocity: 100,
        origin: { x: 0.5, y: 0.5 },
        shapes: ['❤'],
        scalar: 3,
        colors: ['#ffb6c1', '#ff6b81', '#ffc0cb', '#ff4b6e']
    };

    confetti(Object.assign({}, heartConfetti, { angle: 60 }));
    confetti(Object.assign({}, heartConfetti, { angle: 120 }));
    confetti(Object.assign({}, heartConfetti, { angle: 180 }));
    confetti(Object.assign({}, heartConfetti, { angle: 300 }));
}

function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = `${Math.random() * 100}vw`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 800);
}

function playBackgroundMusic() {
    const music = document.getElementById('background-music');
    music.play();
}

window.addEventListener('click', playBackgroundMusic, { once: true });

createFloatingHearts();
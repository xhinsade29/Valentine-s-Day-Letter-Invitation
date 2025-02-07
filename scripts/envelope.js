let isMusicPlayed = false; // Flag to track if music has been played

function openEnvelope() {
    const flap = document.querySelector('.flap');
    const button = document.querySelector('.heart-button');
    const envelope = document.querySelector('.envelope');
    const music = document.getElementById('background-music');
    const clickSound = document.getElementById('click-sound'); // Get the click sound

    button.style.pointerEvents = 'none';

    // Play the click sound effect
    if (clickSound) {
        clickSound.currentTime = 0; // Reset to start in case it's played quickly again
        clickSound.play();
    }

    // Stop the background music when the envelope is opened
    if (music && !music.paused) {
        music.pause();
        music.currentTime = 0; // Reset the music to the start
    }

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
    if (music && !isMusicPlayed) {
        music.volume = 0.5; // Ensure volume is not zero
        music.play().catch((error) => console.log("Autoplay failed:", error));
        isMusicPlayed = true; // Set the flag to true once music is played
    }
}

// Ensure the music plays after the first user interaction (click or touch)
window.addEventListener('click', () => {
    if (!isMusicPlayed) {
        playBackgroundMusic(); // Play the music on first click
    }
});

createFloatingHearts();

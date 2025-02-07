document.getElementById("yes-button").addEventListener("click", function() {
    document.getElementById("response-message").innerHTML = "Yay! Can't wait to see you! 💖🎉";
    confetti(); // Optional: Add confetti effect
});

const noButton = document.getElementById("no-button");

noButton.addEventListener("mouseover", function() {
    const x = Math.random() * window.innerWidth * 0.8;
    const y = Math.random() * window.innerHeight * 0.8;
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

function confetti() {
    const confettiSettings = {
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    };
    confetti(confettiSettings);
}

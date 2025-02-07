let isMusicPlayed = false;
const message = `Hey love,

Valentine’s Day is coming up, and I’d love to spend it with you! 💖 Let’s meet up at Manolo Fortich terminal around 9 AM—I’ve planned something special for us. 

Nothing too fancy, just a day filled with good vibes, fun, and of course, my favorite person (that’s you 😉). You can check out the activities first before deciding—just let me know what you think! 

Can’t wait to see you! 🥰  

- xhinsade`;

const typingTextElement = document.getElementById('typing-text');
let index = 0;

// Function to simulate typing text effect
function typeLetter() {
    if (index < message.length) {
        typingTextElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeLetter, 30); // Speeding up the typing effect
    }
}

// Function to handle button click event and navigate to activities page
function goToActivities() {
    // Play the button click sound with adjusted volume
    const clickSound = document.getElementById('click-sound');
    clickSound.currentTime = 0; // Reset the sound to start from the beginning
    clickSound.volume = 0.5;  // Set the click sound volume (0.0 to 1.0)
    clickSound.play(); // Play the click sound immediately

    // Stop the background music when the button is clicked
    const music = document.getElementById('background-music');
    if (music) {
        music.pause();
        music.currentTime = 0; // Reset to start
    }

    // Redirect to the activities page after the click sound finishes playing
    clickSound.onended = function() {
        window.location.href = 'map.html'; // Redirect to activities page
    };
}

// Use an event (like page load) to trigger the background music and set the volume
window.addEventListener('load', () => {
    const music = document.getElementById('background-music');
    if (music) {
        music.volume = 0.5; // Set the background music volume to 0.5 (50% of the full volume)
        music.play().catch((error) => console.log("Autoplay failed:", error)); // Play the music
    }
});

// Start typing the letter when the page loads
typeLetter();

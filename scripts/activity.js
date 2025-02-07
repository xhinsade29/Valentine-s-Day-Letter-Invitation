// Fetch places data from JSON file
let places = [];

fetch('json/activity.json')
    .then(response => response.json())
    .then(data => {
        places = data;
        showPlace(0); // Load first place
    })
    .catch(error => console.error('Error loading places data:', error));

let currentIndex = 0;

// Function to display a place
function showPlace(index) {
    if (places.length === 0) return;

    const place = places[index];

    document.getElementById('place-title').textContent = place.title;
    document.getElementById('place-description').textContent = place.description;
    document.getElementById('place-availability').textContent = `Availability: ${place.availability}`;
    document.getElementById('place-image').src = place.imgSrc;
    document.getElementById('place-image').alt = place.title;

    // Dynamically add icons for the contact info
    const contactDiv = document.getElementById('place-contact');
    contactDiv.innerHTML = ''; // Clear existing contact info

    const contactInfo = place.contact.split('|').map(contact => contact.trim());
    contactInfo.forEach(info => {
        const contactElement = document.createElement('p');
        let iconHTML = '';

        // Check for contact type (Facebook, Instagram, Website, Phone) and set appropriate icons
        if (info.includes('Facebook')) {
            iconHTML = '<i class="fab fa-facebook"></i>';
        } else if (info.includes('Instagram')) {
            iconHTML = '<i class="fab fa-instagram"></i>';
        } else if (info.includes('Website')) {
            iconHTML = '<i class="fas fa-globe"></i>';
        } else if (info.includes('Contact')) {
            iconHTML = '<i class="fas fa-phone-alt"></i>';
        }

        contactElement.innerHTML = `${iconHTML} ${info}`;
        contactDiv.appendChild(contactElement);
    });

    // Update activities list
    const activitiesList = document.getElementById('place-activities');
    activitiesList.innerHTML = '';
    place.activities.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = activity;
        activitiesList.appendChild(li);
    });

    // Update map
    const mapContainer = document.getElementById('place-map');
    mapContainer.innerHTML = `
        <iframe
            width="100%"
            height="250"
            frameborder="0" 
            style="border:0; border-radius: 8px;"
            src="https://www.google.com/maps?q=${place.coordinates[0]},${place.coordinates[1]}&output=embed"
            allowfullscreen>
        </iframe>`;
}

// Function to play click sound
function playClickSound() {
    const clickSound = document.getElementById('click-sound');
    clickSound.currentTime = 0; // Reset sound to start
    clickSound.play(); // Play sound
}

// Next place
function showNext() {
    playClickSound(); // Play click sound
    currentIndex = (currentIndex + 1) % places.length;

    if (currentIndex === 0) {
        // Redirect to confirmation.html when we loop back to the first place after reaching the last one
        window.location.href = 'confirmation.html';
    } else {
        showPlace(currentIndex);
    }
}

// Previous place
function showPrev() {
    playClickSound(); // Play click sound
    currentIndex = (currentIndex - 1 + places.length) % places.length;
    showPlace(currentIndex);
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.activities-button.prev').addEventListener('click', showPrev);
    document.querySelector('.activities-button.next').addEventListener('click', showNext);
});

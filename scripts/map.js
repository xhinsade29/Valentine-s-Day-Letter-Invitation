// Fetch locations from JSON file
fetch("json/map.json")
    .then(response => response.json())
    .then(places => {
        // Initialize map with minZoom and maxZoom limits
        const map = L.map('map', {
            center: [8.3, 124.85], 
            zoom: 12, 
            minZoom: 10, 
            maxZoom: 13 
        });

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Create a Tailwind-styled custom marker with an SVG icon
        const pinkPin = L.divIcon({
            className: "custom-pin",
            html: `
                <div class="relative w-10 h-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="pink" class="w-8 h-8 drop-shadow-lg">
                        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                    </svg>
                </div>
            `,
            iconSize: [40, 40], 
            iconAnchor: [20, 40], 
            popupAnchor: [0, -40] 
        });

        // Add markers and polyline
        const roadPath = [];

        places.forEach(place => {
            const marker = L.marker(place.coordinates, { icon: pinkPin }).addTo(map)
                .bindPopup(`<b>${place.title}</b><br>${place.info}`);

            roadPath.push(place.coordinates);

            // Play click sound when marker is clicked
            marker.on("click", () => {
                document.getElementById("click-sound").play();
            });
        });

        // Draw Pink Road Path
        L.polyline(roadPath, {
            color: '#ff69b4', // Hot Pink Line
            weight: 4,
            opacity: 0.8
        }).addTo(map);
    })
    .catch(error => console.error("Error loading JSON:", error));

// Redirect to activity.html when button is clicked
document.getElementById("see-activities").addEventListener("click", function() {
    document.getElementById("click-sound").play(); // Play sound effect
    setTimeout(() => {
        window.location.href = "activities.html"; // Redirect after sound
    }, 300); // Delay for a smoother effect
});

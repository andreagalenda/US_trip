const itineraryData = [
    {
        day: 1,
        date: "Aug 22 (Sat)",
        title: "Arrival & Welcome",
        activities: [
            "Land at LAX at 4:50pm.",
            "Pick up rental car.",
            "Drive to Pasadena, settle in, welcome dinner."
        ],
        driveTime: null,
        overnight: "Pasadena",
        coords: [34.1478, -118.1445],
        zoom: 11
    },
    {
        day: 2,
        date: "Aug 23 (Sun)",
        title: "Surf & Beach Vibes",
        activities: [
            "Morning: Surf at Zuma Beach, Malibu.",
            "Afternoon: Venice Beach boardwalk & canals."
        ],
        driveTime: "1.5h driving locally",
        overnight: "Pasadena",
        coords: [34.0200, -118.6300], // Malibuish
        zoom: 10
    },
    {
        day: 3,
        date: "Aug 24 (Mon)",
        title: "Science & The Long Drive",
        activities: [
            "Morning: JPL guided tour in Pasadena.",
            "Afternoon: Drive directly to Grand Canyon South Rim.",
            "Take breaks, split the drive if needed."
        ],
        driveTime: "~480 mi / ~7h45",
        overnight: "Grand Canyon (Camp/Car)",
        coords: [36.0544, -112.1401],
        zoom: 9
    },
    {
        day: 4,
        date: "Aug 25 (Tue)",
        title: "Grand Canyon",
        activities: [
            "Full day at Grand Canyon South Rim.",
            "Explore Desert View Drive, rim trail.",
            "Enjoy the sunset at Mather Point."
        ],
        driveTime: null,
        overnight: "Grand Canyon (Camp/Car)",
        coords: [36.0604, -112.1091], // Mather Point
        zoom: 12
    },
    {
        day: 5,
        date: "Aug 26 (Wed)",
        title: "To Zion National Park",
        activities: [
            "Morning: Drive to Zion NP.",
            "Afternoon: Hike Riverside Walk, Emerald Pools, or The Narrows."
        ],
        driveTime: "~260 mi / ~4h30",
        overnight: "Zion National Park (Camp/Car)",
        coords: [37.2982, -113.0263],
        zoom: 11
    },
    {
        day: 6,
        date: "Aug 27 (Thu)",
        title: "Zion & Death Valley",
        activities: [
            "Morning: Hike Angels Landing (if permit won).",
            "Afternoon: Drive to Death Valley NP.",
            "Sunset at Zabriskie Point or Badwater Basin."
        ],
        driveTime: "~290 mi / ~4h30",
        overnight: "Death Valley (Camp/Car)",
        coords: [36.4208, -116.8101], // Zabriskie Point
        zoom: 10
    },
    {
        day: 7,
        date: "Aug 28 (Fri)",
        title: "Death Valley to Yosemite",
        activities: [
            "Morning: Sunrise in Death Valley, short exploration.",
            "Afternoon: Scenic drive to Yosemite NP via Tioga Pass."
        ],
        driveTime: "~300 mi / ~5h",
        overnight: "Yosemite National Park (Camp/Car)",
        coords: [37.8651, -119.3563], // Tioga Pass / Tuolumne Meadows area
        zoom: 9
    },
    {
        day: 8,
        date: "Aug 29 (Sat)",
        title: "Yosemite Valley & Big Sur",
        activities: [
            "Morning/Early Afternoon: Day in Yosemite Valley (Tunnel View, El Capitan, Yosemite Falls).",
            "Late Afternoon: Drive to Big Sur coast."
        ],
        driveTime: "~250 mi / ~5h",
        overnight: "Big Sur (Camp/Car)",
        coords: [36.2704, -121.8081], // Big Sur Coast
        zoom: 9
    },
    {
        day: 9,
        date: "Aug 30 (Sun)",
        title: "Big Sur to Pasadena",
        activities: [
            "Morning: Walk around Big Sur, see Bixby Bridge and McWay Falls.",
            "Afternoon: Drive the Pacific Coast Highway back home.",
            "Evening: Relax and celebrate!"
        ],
        driveTime: "~300 mi / ~5h",
        overnight: "Pasadena",
        coords: [36.3714, -121.9017], // Bixby Bridge
        zoom: 9
    },
    {
        day: 10,
        date: "Aug 31 (Mon)",
        title: "Departure",
        activities: [
            "Morning: Sleep in, shower, laundry, and pack at home.",
            "Afternoon: Drive to LAX, return the rental car.",
            "Evening: Flight back to Italy."
        ],
        driveTime: "~45 min locally",
        overnight: "Plane",
        coords: [33.9416, -118.4085], // LAX
        zoom: 13
    }
];

// Initialize Map
const map = L.map('map', {
    zoomControl: false // Move zoom control if needed
}).setView([36.0, -119.0], 6); // Default view over California

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Add Dark Matter Tile Layer from CartoDB
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Markers array to keep track of them
const markers = [];

// Create a custom icon
const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #ec4899; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #ec4899;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
});

// Render Itinerary Cards
const listContainer = document.getElementById('itinerary-list');

itineraryData.forEach((day, index) => {
    // Add Marker
    const marker = L.marker(day.coords, {icon: customIcon}).addTo(map);
    marker.bindPopup(`<h3>Day ${day.day}: ${day.title}</h3><p>${day.date}</p>`);
    markers.push(marker);

    // Create Card
    const card = document.createElement('div');
    card.className = 'day-card';
    card.id = `day-${day.day}`;
    card.dataset.index = index;

    let activitiesHtml = day.activities.map(act => `<li>${act}</li>`).join('');
    
    let driveTimeHtml = day.driveTime 
        ? `<div class="drive-time">🚗 ${day.driveTime}</div>` 
        : '';

    card.innerHTML = `
        <div class="day-header">
            <h3 class="day-title">Day ${day.day}: ${day.title}</h3>
            <span class="day-date">${day.date}</span>
        </div>
        <div class="day-content">
            <ul>${activitiesHtml}</ul>
            ${driveTimeHtml}
            <div class="overnight">
                <span>⛺</span> Overnight: ${day.overnight}
            </div>
        </div>
    `;

    listContainer.appendChild(card);
});

// Draw a line connecting the stops
const latlngs = itineraryData.map(day => day.coords);
const polyline = L.polyline(latlngs, {
    color: '#6366f1', 
    weight: 3,
    dashArray: '10, 10',
    opacity: 0.7
}).addTo(map);

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px', // Trigger when card is mostly in middle of screen
    threshold: 0
};

let activeIndex = -1;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            
            // Remove active class from all
            document.querySelectorAll('.day-card').forEach(card => card.classList.remove('active'));
            // Add to current
            entry.target.classList.add('active');

            // Fly to marker if different
            if (activeIndex !== index) {
                activeIndex = index;
                const targetDay = itineraryData[index];
                
                map.flyTo(targetDay.coords, targetDay.zoom, {
                    animate: true,
                    duration: 1.5
                });
                
                markers[index].openPopup();
            }
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.day-card').forEach(card => {
    observer.observe(card);
});

// Smooth scroll arrow
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('.info-panels').scrollIntoView({ behavior: 'smooth' });
});

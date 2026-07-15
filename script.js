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
        coords: [34.0200, -118.6300], 
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
        overnight: "Grand Canyon (Mather or Desert View)",
        coords: [36.0544, -112.1401],
        zoom: 9
    },
    {
        day: 4,
        date: "Aug 25 (Tue)",
        title: "Grand Canyon & Drive to Zion",
        activities: [
            "Morning/Afternoon: Full day at Grand Canyon South Rim.",
            "Explore Desert View Drive, rim trail.",
            "Evening: Start driving towards Zion, sleep close to Zion (e.g. Kanab or Mt Carmel Junction)."
        ],
        driveTime: "~140 mi / ~3h",
        overnight: "Near Zion (Kanab/Mt Carmel Area)",
        coords: [37.0475, -112.5263], // Kanab, UT
        zoom: 10
    },
    {
        day: 5,
        date: "Aug 26 (Wed)",
        title: "Full Day in Zion National Park",
        activities: [
            "Morning: Head into Zion early.",
            "Full Day: Hike Riverside Walk, Emerald Pools, or The Narrows.",
            "Enjoy the majestic canyon views."
        ],
        driveTime: "~40 mi / ~1h locally",
        overnight: "Zion National Park (Watchman/South Camp)",
        coords: [37.2982, -113.0263],
        zoom: 11
    },
    {
        day: 6,
        date: "Aug 27 (Thu)",
        title: "Zion & Death Valley",
        activities: [
            "Morning: Hike Angels Landing (if permit won) or explore more of Zion.",
            "Afternoon: Drive to Death Valley NP.",
            "Sunset at Zabriskie Point or Badwater Basin."
        ],
        driveTime: "~290 mi / ~4h30",
        overnight: "Death Valley (Furnace Creek Camp)",
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
        overnight: "Yosemite National Park (Pines Camp)",
        coords: [37.8651, -119.3563], // Tioga Pass / Tuolumne Meadows
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
        overnight: "Big Sur (Pfeiffer/Kirk Creek Camp)",
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

// Initialize Map with zoom control on the right
const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false
}).setView([36.0, -119.0], 6);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Add Light Theme Tile Layer (CartoDB Positron)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

const markers = [];
const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #db2777; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(219,39,119,0.5);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

const listContainer = document.getElementById('itinerary-list');

itineraryData.forEach((day, index) => {
    // Add Marker
    const marker = L.marker(day.coords, {icon: customIcon}).addTo(map);
    marker.bindPopup(`<h3>Day ${day.day}</h3><p>${day.title}</p>`);
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

// Create Car Icon
const carIcon = L.divIcon({
    className: 'car-icon',
    html: '🚗',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});
let carMarker = null;

// Fetch Actual Routes using OSRM
let routeSegments = [];
let fullPolyline = null;

async function fetchAllRoutes() {
    const promises = [];
    for (let i = 0; i < itineraryData.length - 1; i++) {
        const start = itineraryData[i].coords;
        const end = itineraryData[i+1].coords;
        const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
        
        promises.push(
            fetch(url).then(res => res.json()).then(data => {
                if(data.routes && data.routes[0]) {
                    return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
                }
                return [start, end];
            }).catch(() => [start, end])
        );
    }
    
    routeSegments = await Promise.all(promises);
    
    // Draw all segments
    const allCoords = routeSegments.flat();
    fullPolyline = L.polyline(allCoords, {
        color: '#4f46e5', 
        weight: 5,
        opacity: 0.8
    }).addTo(map);

    // Initialize car marker at start
    carMarker = L.marker(itineraryData[0].coords, {icon: carIcon}).addTo(map);
    
    // Trigger scroll event to place car correctly based on initial scroll
    handleScroll();
}

fetchAllRoutes();

// Scroll animation logic
function getPointAlongLine(latlngs, progress) {
    if(progress <= 0) return latlngs[0];
    if(progress >= 1) return latlngs[latlngs.length - 1];
    
    let totalDist = 0;
    const dists = [];
    for(let i = 0; i < latlngs.length - 1; i++) {
        const d = map.distance(latlngs[i], latlngs[i+1]);
        totalDist += d;
        dists.push(d);
    }
    
    const targetDist = totalDist * progress;
    let currDist = 0;
    for(let i = 0; i < latlngs.length - 1; i++) {
        if(currDist + dists[i] >= targetDist) {
            const segProgress = (targetDist - currDist) / dists[i];
            const p1 = latlngs[i], p2 = latlngs[i+1];
            return [
                p1[0] + (p2[0] - p1[0]) * segProgress,
                p1[1] + (p2[1] - p1[1]) * segProgress
            ];
        }
        currDist += dists[i];
    }
    return latlngs[latlngs.length - 1];
}

const cards = Array.from(document.querySelectorAll('.day-card'));

function handleScroll() {
    if (routeSegments.length === 0 || !carMarker) return;
    
    const scrollCenter = window.scrollY + window.innerHeight / 2;
    
    let currentIndex = -1;
    let progress = 0;

    // Determine which segment we are in
    for (let i = 0; i < cards.length - 1; i++) {
        const currentCardTop = cards[i].offsetTop;
        const nextCardTop = cards[i+1].offsetTop;
        
        if (scrollCenter >= currentCardTop && scrollCenter < nextCardTop) {
            currentIndex = i;
            progress = (scrollCenter - currentCardTop) / (nextCardTop - currentCardTop);
            break;
        }
    }
    
    if (currentIndex === -1) {
        if (scrollCenter < cards[0].offsetTop) {
            // Before first card
            carMarker.setLatLng(itineraryData[0].coords);
        } else if (scrollCenter >= cards[cards.length - 1].offsetTop) {
            // After last card
            carMarker.setLatLng(itineraryData[itineraryData.length - 1].coords);
        }
    } else {
        // Move car along segment
        const point = getPointAlongLine(routeSegments[currentIndex], progress);
        carMarker.setLatLng(point);
    }
}

window.addEventListener('scroll', handleScroll);

// Intersection Observer for highlighting cards and moving map
const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px', 
    threshold: 0
};

let activeIndex = -1;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            
            // Highlight card
            document.querySelectorAll('.day-card').forEach(card => card.classList.remove('active'));
            entry.target.classList.add('active');

            // Move Map
            if (activeIndex !== index) {
                activeIndex = index;
                const targetDay = itineraryData[index];
                
                // Offset calculation (Shift center to the right since cards are on the left)
                if (window.innerWidth > 968) {
                    const targetPoint = map.project(targetDay.coords, targetDay.zoom);
                    targetPoint.x -= window.innerWidth * 0.25; 
                    const offsetLatLng = map.unproject(targetPoint, targetDay.zoom);
                    
                    map.flyTo(offsetLatLng, targetDay.zoom, {
                        animate: true,
                        duration: 1.5
                    });
                } else {
                    map.flyTo(targetDay.coords, targetDay.zoom, {
                        animate: true,
                        duration: 1.5
                    });
                }
                
                setTimeout(() => {
                    markers[index].openPopup();
                }, 500);
            }
        }
    });
}, observerOptions);

cards.forEach(card => observer.observe(card));

document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('.info-panels').scrollIntoView({ behavior: 'smooth' });
});

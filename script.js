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
        img: "images/day1.jpg",
        driveTime: null,
        overnight: "Pasadena",
        coords: [34.1478, -118.1445],
        zoom: 7
    },
    {
        day: 2,
        date: "Aug 23 (Sun)",
        title: "Surf & Beach Vibes",
        activities: [
            "Morning: Surf at Zuma Beach, Malibu.",
            "Afternoon: Venice Beach boardwalk & canals.",
            "Sunset: Griffith observatory."
        ],
        img: "images/day2.jpg",
        driveTime: "1.5h driving locally",
        overnight: "Pasadena",
        coords: [34.0200, -118.6300], 
        zoom: 7
    },
    {
        day: 3,
        date: "Aug 24 (Mon)",
        title: "Science & The Long Drive",
        activities: [
            "Morning: JPL guided tour in Pasadena.",
            "Afternoon: Drive directly to Grand Canyon South Rim."
        ],
        img: "images/day3.jpg",
        driveTime: "~480 mi / ~7h45",
        overnight: "Grand Canyon (Mather or Desert View)",
        coords: [36.0544, -112.1401],
        zoom: 7
    },
    {
        day: 4,
        date: "Aug 25 (Tue)",
        title: "Grand Canyon & Drive to Zion",
        activities: [
            "Morning/Afternoon: Hike at Grand Canyon South Rim.",
            "Explore Desert View Drive, rim trail.",
            "Evening: Start driving towards Zion, sleep close to Zion (e.g. Kanab or Mt Carmel Junction)."
        ],
        img: "images/day4.jpg",
        driveTime: "~140 mi / ~3h",
        overnight: "Near Zion (Kanab/Mt Carmel Area)",
        coords: [37.0475, -112.5263], // Kanab, UT
        zoom: 7
    },
    {
        day: 5,
        date: "Aug 26 (Wed)",
        title: "Full Day in Zion National Park",
        activities: [
            "Morning: Head into Zion early.",
            "Full Day: Angel's landing or The Narrows."
        ],
        img: "images/day5.jpg",
        driveTime: "~40 mi / ~1h locally",
        overnight: "Zion National Park (Watchman/South Camp)",
        coords: [37.2982, -113.0263],
        zoom: 7
    },
    {
        day: 6,
        date: "Aug 27 (Thu)",
        title: "Zion & Death Valley",
        activities: [
            "Morning: Hike Angels Landing (if not day 5) or The Narrows or explore more of Zion (if we don't win the permit).",
            "Afternoon: Drive to Death Valley NP.",
            "Sunset at Zabriskie Point or Badwater Basin."
        ],
        img: "images/day6.jpg",
        driveTime: "~290 mi / ~4h30",
        overnight: "Death Valley (Furnace Creek Camp)",
        coords: [36.4208, -116.8101], // Zabriskie Point
        zoom: 7
    },
    {
        day: 7,
        date: "Aug 28 (Fri)",
        title: "Death Valley to Yosemite",
        activities: [
            "Morning: Sunrise in Death Valley, short exploration.",
            "Afternoon: Scenic drive to Yosemite NP via Tioga Pass."
        ],
        img: "images/day7.jpg",
        driveTime: "~300 mi / ~5h",
        overnight: "Yosemite National Park (Pines Camp)",
        coords: [37.8651, -119.3563], // Tioga Pass / Tuolumne Meadows
        zoom: 7
    },
    {
        day: 8,
        date: "Aug 29 (Sat)",
        title: "Yosemite Valley & Big Sur",
        activities: [
            "Morning/Early Afternoon: Day in Yosemite Valley (Tunnel View, El Capitan, Yosemite Falls, Taft Point).",
            "Late Afternoon: Drive to Big Sur coast."
        ],
        img: "images/day8.jpg",
        driveTime: "~250 mi / ~5h",
        overnight: "Big Sur (Pfeiffer/Kirk Creek Camp)",
        coords: [36.2704, -121.8081], // Big Sur Coast
        zoom: 7
    },
    {
        day: 9,
        date: "Aug 30 (Sun)",
        title: "Big Sur to Pasadena",
        activities: [
            "Morning: Walk around Big Sur, see Bixby Bridge and McWay Falls.",
            "Afternoon: Drive the Pacific Coast Highway back home.",
            "Evening: Probably party and say goodbye to friends!"
        ],
        img: "images/day9.jpg",
        driveTime: "~300 mi / ~5h",
        overnight: "Pasadena",
        coords: [36.3714, -121.9017], // Bixby Bridge
        zoom: 7
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
        img: "images/day10.jpg",
        driveTime: "~45 min locally",
        overnight: "Plane",
        coords: [33.9416, -118.4085], // LAX
        zoom: 7
    }
];

// Initialize Map
const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false
}).setView([36.5, -119.5], 5); // Default zoom further away to show the whole trip

L.control.zoom({ position: 'bottomright' }).addTo(map);

// Add Satellite Tile Layer (Esri World Imagery)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EAP, and the GIS User Community',
    maxZoom: 18
}).addTo(map);

// Add an optional Labels layer over the satellite
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
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

// Draw initial straight lines while fetching OSRM data
const initialLatLngs = itineraryData.map(day => day.coords);
let fullPolyline = L.polyline(initialLatLngs, {
    color: '#4f46e5', 
    weight: 5,
    opacity: 0.8,
    dashArray: '10, 10'
}).addTo(map);

// Create Car Icon
const carIcon = L.divIcon({
    className: 'car-icon',
    html: '🏎️',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});
let carMarker = L.marker(itineraryData[0].coords, {icon: carIcon, zIndexOffset: 1000}).addTo(map);

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
    let imageHtml = day.img ? `<img src="${day.img}" alt="${day.title}" class="day-image">` : '';

    card.innerHTML = `
        ${imageHtml}
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

    // Click to scroll to this card
    card.addEventListener('click', () => {
        const targetScroll = card.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + card.offsetHeight / 2;
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    });

    listContainer.appendChild(card);
});

// Cache card absolute positions
const cards = Array.from(document.querySelectorAll('.day-card'));
let cardTops = [];
function updateCardTops() {
    cardTops = cards.map(card => card.getBoundingClientRect().top + window.scrollY);
}
window.addEventListener('resize', updateCardTops);
// Call initially and after a slight delay to ensure fonts/layout are loaded
updateCardTops();
setTimeout(updateCardTops, 500);

// Route Segments Data Structure
let routeSegments = [];

async function fetchAllRoutes() {
    const promises = [];
    for (let i = 0; i < itineraryData.length - 1; i++) {
        const start = itineraryData[i].coords;
        const end = itineraryData[i+1].coords;
        // removed overview=full to load faster simplified geometries
        const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?geometries=geojson`;
        
        promises.push(
            fetch(url).then(res => res.json()).then(data => {
                if(data.routes && data.routes[0]) {
                    return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
                }
                return [start, end]; // fallback
            }).catch(() => [start, end])
        );
    }
    
    const rawSegments = await Promise.all(promises);
    
    // Pre-calculate distances for smooth O(1) performance during scroll
    routeSegments = rawSegments.map(latlngs => {
        let totalDist = 0;
        const dists = [];
        for(let i = 0; i < latlngs.length - 1; i++) {
            const d = map.distance(latlngs[i], latlngs[i+1]);
            totalDist += d;
            dists.push(d);
        }
        return { latlngs, dists, totalDist };
    });
    
    // Replace the straight dashed line with the real smooth route
    map.removeLayer(fullPolyline);
    const allCoords = routeSegments.map(seg => seg.latlngs).flat();
    fullPolyline = L.polyline(allCoords, {
        color: '#4f46e5', 
        weight: 5,
        opacity: 0.8
    }).addTo(map);

    // Initial positioning
    handleScroll();
}

// Fire request for real roads instantly
fetchAllRoutes();

// Highly optimized scroll logic
function getPointAlongSegment(seg, progress) {
    if (progress <= 0) return seg.latlngs[0];
    if (progress >= 1) return seg.latlngs[seg.latlngs.length - 1];
    
    const targetDist = seg.totalDist * progress;
    let currDist = 0;
    
    for (let i = 0; i < seg.latlngs.length - 1; i++) {
        if (currDist + seg.dists[i] >= targetDist) {
            if (seg.dists[i] === 0) return seg.latlngs[i];
            
            const segProgress = (targetDist - currDist) / seg.dists[i];
            const p1 = seg.latlngs[i], p2 = seg.latlngs[i+1];
            return [
                p1[0] + (p2[0] - p1[0]) * segProgress,
                p1[1] + (p2[1] - p1[1]) * segProgress
            ];
        }
        currDist += seg.dists[i];
    }
    return seg.latlngs[seg.latlngs.length - 1];
}

// Scroll Event Loop
let ticking = false;

function handleScroll() {
    if (routeSegments.length === 0 || !carMarker || cardTops.length === 0) return;
    
    // Evaluate scroll compared to absolute card positions
    const scrollCenter = window.scrollY + window.innerHeight / 2;
    
    let currentIndex = -1;
    let progress = 0;

    for (let i = 0; i < cardTops.length - 1; i++) {
        if (scrollCenter >= cardTops[i] && scrollCenter < cardTops[i+1]) {
            currentIndex = i;
            progress = (scrollCenter - cardTops[i]) / (cardTops[i+1] - cardTops[i]);
            break;
        }
    }
    
    if (currentIndex === -1) {
        if (scrollCenter < cardTops[0]) {
            carMarker.setLatLng(itineraryData[0].coords);
        } else if (scrollCenter >= cardTops[cardTops.length - 1]) {
            carMarker.setLatLng(itineraryData[itineraryData.length - 1].coords);
        }
    } else {
        const seg = routeSegments[currentIndex];
        const point = getPointAlongSegment(seg, progress);
        carMarker.setLatLng(point);
    }
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Intersection Observer for Highlighting Cards and Panning map
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
            
            document.querySelectorAll('.day-card').forEach(card => card.classList.remove('active'));
            entry.target.classList.add('active');

            if (activeIndex !== index) {
                activeIndex = index;
                const targetDay = itineraryData[index];
                
                if (window.innerWidth > 968) {
                    const targetPoint = map.project(targetDay.coords, targetDay.zoom);
                    targetPoint.x -= window.innerWidth * 0.25; 
                    const offsetLatLng = map.unproject(targetPoint, targetDay.zoom);
                    
                    map.flyTo(offsetLatLng, targetDay.zoom, { animate: true, duration: 1.5 });
                } else {
                    const targetPoint = map.project(targetDay.coords, targetDay.zoom);
                    targetPoint.y += window.innerHeight * 0.20; // Offset map down so car is near the top
                    const offsetLatLng = map.unproject(targetPoint, targetDay.zoom);
                    
                    map.flyTo(offsetLatLng, targetDay.zoom, { animate: true, duration: 1.5 });
                }
                
                setTimeout(() => markers[index].openPopup(), 500);
            }
        }
    });
}, observerOptions);

cards.forEach(card => observer.observe(card));

// Observe the hero section to zoom out when scrolling to top
const heroObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        activeIndex = -1;
        document.querySelectorAll('.day-card').forEach(card => card.classList.remove('active'));
        map.flyTo([36.5, -119.5], 5, { animate: true, duration: 1.5 });
    }
}, { threshold: 0.3 });
heroObserver.observe(document.querySelector('.hero'));

document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('.info-panels').scrollIntoView({ behavior: 'smooth' });
});

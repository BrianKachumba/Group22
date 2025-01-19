
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger-menu');
    const hamburgerIcon = hamburger.querySelector('i');
    const overlay = document.querySelector('.overlay');
    
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Explicitly toggle between bars and times icons
    if (sidebar.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
}



function toggleDarkMode() {
    const htmlElement = document.documentElement;
    const toggleIcon = document.querySelector('.toggle-mode i');

    // Toggle the data-theme attribute
    if (htmlElement.getAttribute('data-theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
        toggleIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        toggleIcon.classList.replace('fa-sun', 'fa-moon');
    }
}


   
    const countdown = document.getElementById("countdown-timer");
// Assuming the next event date is "2025-01-25"
const eventDate = new Date("2025-01-25").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days} Days, ${hours} Hrs, ${minutes} Mins, ${seconds} Secs`;
}, 1000);


  async function loadUpcomingEvents() {
    const eventGrid = document.querySelector('.event-grid');
    eventGrid.innerHTML = '<div class="loading">Loading events...</div>';

    try {
        const response = await fetch('/api/upcoming-events');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const events = await response.json();
        
        if (events.length === 0) {
            eventGrid.innerHTML = '<p>No upcoming events found.</p>';
            return;
        }

        eventGrid.innerHTML = '';
        events.forEach(event => {
            const eventDate = new Date(event.event_date).toLocaleDateString();
            const eventCard = `
                <div class="event-card">
                    <div class="card-content">
                        <h3>${event.title}</h3>
                        <p class="date">📅 ${eventDate}</p>
                        <p>${event.description}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn-details" onclick="viewEventDetails(${event.id})">
                            View Details →
                        </button>
                    </div>
                </div>
            `;
            eventGrid.innerHTML += eventCard;
        });
    } catch (error) {
        console.error('Error loading events:', error);
        eventGrid.innerHTML = `
            <div class="error">
                Unable to load events. Please try again later.
            </div>
        `;
    }
}

// Add this function to handle viewing event details
function viewEventDetails(eventId) {
    window.location.href = `/event-details.html?id=${eventId}`;
}
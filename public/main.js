// DOM Elements
const eventContainer = document.getElementById('eventContainer');
const searchInput = document.getElementById('searchEvents');
const sortSelect = document.getElementById('sortEvents');
const viewToggleButtons = document.querySelectorAll('.view-toggle button');

// State
let events = [];
let currentView = 'grid';

// Loading screen functionality
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.container').classList.add('loaded');
    }, 600);
});

// Sidebar toggle function
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger-menu');
    const hamburgerIcon = hamburger.querySelector('i');
    const overlay = document.querySelector('.overlay');
    
    sidebar.classList.toggle('active');
    hamburger?.classList.toggle('active');
    overlay?.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
}

// Theme toggle functionality
// Function to toggle light and dark mode
const toggleLightDark = () => {
    const body = document.body;
    const logo = document.getElementById("logo"); // Get the logo image element

    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        // Switch to light mode logo
        logo.src = './logo.png'; // Replace with your light mode logo path
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        // Switch to dark mode logo
        logo.src = './logo-dark-mode.png'; // Replace with your dark mode logo path
    }
};

// On page load, check for saved theme and apply it
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const logo = document.getElementById("logo");

    if (savedTheme === 'dark') {
        body.classList.add('dark');
        logo.src = './logo-dark-mode.png'; // Dark mode logo
    } else {
        body.classList.remove('dark');
        logo.src = './logo.png'; // Light mode logo
    }
});


// Check saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    // Initialize form event listener if on add-event page
    const form = document.getElementById('add-event-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // Initialize events if on view-events page
    if (eventContainer) {
        fetchEvents();
    }
});


// Form validation
function validateForm(event) {
    const title = document.getElementById("event-title").value.trim();
    const description = document.getElementById("event-description").value.trim();
    const date = document.getElementById("event-date").value;
    const time = document.getElementById("event-time").value;
    const location = document.getElementById("event-location").value.trim();
    const category = document.getElementById("event-category").value;
    const image = document.getElementById("event-image").files[0];
    const maxAttendees = document.getElementById("event-attendees").value;
    
    const now = new Date();
    const selectedDate = new Date(date);
    let errorMessage = "";

    if (title === "") {
        errorMessage = "Event title is required.";
    } else if (title.length < 3) {
        errorMessage = "Event title must be at least 3 characters long.";
    } else if (description === "") {
        errorMessage = "Event description is required.";
    } else if (description.length < 10) {
        errorMessage = "Description must be at least 10 characters long.";
    } else if (date === "" || selectedDate < now.setHours(0, 0, 0, 0)) {
        errorMessage = "Please select a valid future date.";
    } else if (time === "") {
        errorMessage = "Please select event time.";
    } else if (location === "") {
        errorMessage = "Event location is required.";
    } else if (category === "") {
        errorMessage = "Please select an event category.";
    } else if (maxAttendees && maxAttendees < 1) {
        errorMessage = "Maximum attendees must be at least 1.";
    } else if (image && !image.type.startsWith("image/")) {
        errorMessage = "Please upload a valid image file.";
    } else if (image && image.size > 5000000) {
        errorMessage = "Image size should be less than 5MB.";
    }

    if (errorMessage) {
        showPopup(errorMessage);
        return false;
    }
    return true;
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm(event)) {
        return;
    }

    const formData = new FormData(event.target);
    const eventData = {
        title: formData.get('title'),
        description: formData.get('description'),
        event_date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        organizer: formData.get('organizer'),
        max_attendees: formData.get('attendees'),
        category: formData.get('category')
    };

    try {
        // Handle image upload if present
        const imageFile = formData.get('image');
        if (imageFile && imageFile.size > 0) {
            const imageUrl = await uploadImage(imageFile);
            eventData.image_url = imageUrl;
        }

        // Send event data to backend
        const response = await fetch(`/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        if (!response.ok) {
            throw new Error('Failed to create event');
        }

        showPopup('Event created successfully!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 4000);

    } catch (error) {
        console.error('Error:', error);
        showPopup('Failed to create event. Please try again.');
    }
}

// Image upload function
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`/api/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.imageUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

// Event viewing functionality
async function fetchEvents() {
    try {
        const response = await fetch(`/api/events`);
        if (!response.ok) throw new Error('Failed to fetch events');
        events = await response.json();
        renderEvents();
    } catch (error) {
        console.error('Error:', error);
        showPopup('Failed to load events');
    }
}

function renderEvents(filteredEvents = events) {
    if (!eventContainer) return;
    
    eventContainer.innerHTML = '';
    const eventsToRender = filteredEvents || events;
    
    eventContainer.className = currentView === 'grid' ? 'event-grid' : 'event-list';

    eventsToRender.forEach(event => {
        const eventElement = createEventElement(event);
        eventContainer.appendChild(eventElement);
    });
}

function createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.className = currentView === 'grid' ? 'event-card' : 'event-list-item';
    
    const eventDate = new Date(event.event_date).toLocaleDateString();
    
    eventElement.innerHTML = `
        <div class="event-card-header">
            <h3>${event.title}</h3>
            <div class="event-actions">
                <button class="favorite-btn ${event.is_favorite ? 'active' : ''}" 
                        title="${event.is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}" 
                        onclick="toggleFavorite(${event.id})">
                    <i class="fas fa-star"></i>
                </button>
                <button class="archive-btn ${event.is_archived ? 'active' : ''}" 
                        title="${event.is_archived ? 'Unarchive Event' : 'Archive Event'}" 
                        onclick="toggleArchive(${event.id})">
                    <i class="fas fa-box-archive"></i>
                </button>
                <button class="edit-btn" title="Edit Event" onclick="editEvent(${event.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" title="Delete Event" onclick="showDeleteModal(${event.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="event-details">
            <p><i class="fas fa-calendar"></i> ${eventDate}</p>
            <p><i class="fas fa-clock"></i> ${event.time}</p>
            <p><i class="fas fa-location-dot"></i> ${event.location}</p>
            <p class="event-description">${event.description}</p>
            ${event.image_url ? `<img src="${event.image_url}" alt="${event.title}" class="event-image">` : ''}
            <button class="view-details-btn" onclick="viewEventDetails(${event.id})">View Details</button>
        </div>
    `;
    return eventElement;
}

//  handle favorites and archives functions
async function toggleFavorite(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const button = document.querySelector(`[onclick="toggleFavorite(${eventId})"]`);
            button.classList.toggle('active');
            
            // Update the button title
            const isFavorite = button.classList.contains('active');
            button.title = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
            
            // Show feedback to user
            showNotification(isFavorite ? 'Added to favorites' : 'Removed from favorites');
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
        showNotification('Error updating favorite status', 'error');
    }
}

async function toggleArchive(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}/archive`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const button = document.querySelector(`[onclick="toggleArchive(${eventId})"]`);
            button.classList.toggle('active');
            
            // Update the button title
            const isArchived = button.classList.contains('active');
            button.title = isArchived ? 'Unarchive Event' : 'Archive Event';
            
            // If we're on the main events page, maybe hide the event
            if (isArchived && !window.location.pathname.includes('archived')) {
                const eventElement = button.closest('.event-card, .event-list-item');
                eventElement.style.animation = 'fadeOut 0.3s';
                setTimeout(() => eventElement.remove(), 300);
            }
            
            showNotification(isArchived ? 'Event archived' : 'Event unarchived');
        }
    } catch (error) {
        console.error('Error toggling archive:', error);
        showNotification('Error updating archive status', 'error');
    }
}
    
// Function to toggle between grid and list view
function toggleView(viewType) {
    const eventContainer = document.getElementById('event-list');
    const gridButton = document.querySelector('.grid-view');
    const listButton = document.querySelector('.list-view');
    
    if (viewType === 'grid') {
        eventContainer.className = 'events-grid';
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    } else {
        eventContainer.className = 'events-list';
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    }
    
    // Save preference
    localStorage.setItem('preferredView', viewType);
}

// Function to load events based on page type
function loadPageEvents() {
    const pagePath = window.location.pathname;
    let view = 'all';
    
    if (pagePath.includes('favorites')) {
        view = 'favorites';
    } else if (pagePath.includes('archived')) {
        view = 'archived';
    }
    
    loadEvents(view);
}

// Function to check if events exist and toggle empty state
function toggleEmptyState(events) {
    const emptyState = document.getElementById('empty-state');
    const eventList = document.getElementById('event-list');
    
    if (events.length === 0) {
        emptyState.classList.remove('hidden');
        eventList.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        eventList.classList.remove('hidden');
    }
}

// Update your existing loadEvents function
async function loadEvents(view = 'all') {
    try {
        const response = await fetch(`/api/events?view=${view}`);
        const events = await response.json();
        
        toggleEmptyState(events);
        
        if (events.length > 0) {
            const eventContainer = document.getElementById('event-list');
            eventContainer.innerHTML = '';
            events.forEach(event => {
                const eventElement = createEventElement(event);
                eventContainer.appendChild(eventElement);
            });
        }
    } catch (error) {
        console.error('Error loading events:', error);
        showNotification('Error loading events', 'error');
    }
}

// Load events when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPageEvents();
    
    // Restore preferred view
    const preferredView = localStorage.getItem('preferredView') || 'grid';
    toggleView(preferredView);
});

// Add a style element to the document head
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Enhanced popup functions
function showPopup(message) {
    const popup = document.getElementById("alert-popup");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message;
    popup.classList.remove("hidden");
}

function closePopup() {
    const popup = document.getElementById("alert-popup");
    popup.classList.add("hidden");
}

// Search functionality
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm)
        );
        renderEvents(filteredEvents);
    });
}

// Sort functionality
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        const [criteria, order] = e.target.value.split('-');
        const sortedEvents = [...events].sort((a, b) => {
            if (criteria === 'date') {
                const dateA = new Date(a.event_date);
                const dateB = new Date(b.event_date);
                return order === 'asc' ? dateA - dateB : dateB - dateA;
            } else if (criteria === 'title') {
                return order === 'asc' 
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
        });
        renderEvents(sortedEvents);
    });
}

// View toggle
if (viewToggleButtons) {
    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentView = button.dataset.view;
            viewToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderEvents();
        });
    });
}

// Event actions
function editEvent(id) {
    window.location.href = `/add-event.html?edit=${id}`;
}

function viewEventDetails(eventId) {
    window.location.href = `/event-details.html?id=${eventId}`;
}

// Delete functionality
async function deleteEvent(id) {
    try {
        const response = await fetch(`/api/events/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete event');
        
        events = events.filter(event => event.id !== id);
        renderEvents();
        hideDeleteModal();
        showPopup('Event deleted successfully');
    } catch (error) {
        console.error('Error:', error);
        showPopup('Failed to delete event');
    }
}

function showDeleteModal(id) {
    const deleteModal = document.getElementById('deleteModal');
    if (!deleteModal) return;
    
    deleteModal.style.display = 'flex';
    const confirmBtn = deleteModal.querySelector('.confirm-delete-btn');
    confirmBtn.onclick = () => deleteEvent(id);
    
    const cancelBtn = deleteModal.querySelector('.cancel-btn');
    cancelBtn.onclick = hideDeleteModal;
}

function hideDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
        deleteModal.style.display = 'none';
    }
}

// Close modals when clicking outside
window.onclick = (event) => {
    const deleteModal = document.getElementById('deleteModal');
    const eventDetailsModal = document.getElementById('eventDetailsModal');
    
    if (event.target === deleteModal) {
        hideDeleteModal();
    }
    if (event.target === eventDetailsModal) {
        eventDetailsModal.style.display = 'none';
    }
};


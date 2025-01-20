

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburgerIcon = document.querySelector('.hamburger-menu i');

    // Toggle sidebar visibility
    sidebar.classList.toggle('active');

    // Change the hamburger menu icon
    if (sidebar.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
}


window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.container').classList.add('loaded');
    }, 1500); // Shows spinner for 1.5 seconds, adjust as needed
});

// Function to toggle between light and dark modes
const toggleLightDark = () => {
    const body = document.body;

    // Toggle the "dark" class
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light'); 
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark'); 
    }
};

// Check the saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme'); // Get theme from localStorage

    // Apply the saved theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
});



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




document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-event-form');
    form.addEventListener('submit', handleSubmit);
});

//  form validation
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

    //  validation checks
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

    if (!validateForm(event)) {  // Pass the event
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
        const response = await fetch('http://localhost:3000/api/events', {
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
        const response = await fetch('http://localhost:3000/api/upload', {
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
//  function to handle viewing event details
function viewEventDetails(eventId) {
    window.location.href = `/event-details.html?id=${eventId}`;
}
// Original JavaScript code
// Sample data for the cascading dropdowns
const locationData = {
    usa: {
        cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
        areas: {
            'New York': ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
            'Los Angeles': ['Downtown', 'Hollywood', 'Venice', 'Santa Monica', 'Beverly Hills'],
            'Chicago': ['Loop', 'Lincoln Park', 'Wicker Park', 'River North', 'Hyde Park'],
            'Houston': ['Downtown', 'Midtown', 'Montrose', 'Heights', 'Medical Center'],
            'Miami': ['South Beach', 'Downtown', 'Brickell', 'Wynwood', 'Coral Gables']
        }
    },
    uk: {
        cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh'],
        areas: {
            'London': ['Westminster', 'Camden', 'Kensington', 'Greenwich', 'Hackney'],
            'Manchester': ['City Centre', 'Northern Quarter', 'Salford', 'Didsbury', 'Chorlton'],
            'Birmingham': ['City Centre', 'Digbeth', 'Jewellery Quarter', 'Edgbaston', 'Moseley'],
            'Liverpool': ['City Centre', 'Albert Dock', 'Baltic Triangle', 'Anfield', 'Everton'],
            'Edinburgh': ['Old Town', 'New Town', 'Leith', 'Stockbridge', 'Portobello']
        }
    },
    canada: {
        cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
        areas: {
            'Toronto': ['Downtown', 'North York', 'Scarborough', 'Etobicoke', 'Mississauga'],
            'Vancouver': ['Downtown', 'Kitsilano', 'Gastown', 'Yaletown', 'West End'],
            'Montreal': ['Downtown', 'Old Montreal', 'Plateau Mont-Royal', 'Mile End', 'Griffintown'],
            'Calgary': ['Downtown', 'Beltline', 'Kensington', 'Inglewood', 'Mission'],
            'Ottawa': ['Downtown', 'ByWard Market', 'Glebe', 'Westboro', 'Sandy Hill']
        }
    },
    australia: {
        cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
        areas: {
            'Sydney': ['CBD', 'Bondi', 'Surry Hills', 'Manly', 'Parramatta'],
            'Melbourne': ['CBD', 'St Kilda', 'Fitzroy', 'South Yarra', 'Brunswick'],
            'Brisbane': ['CBD', 'South Bank', 'Fortitude Valley', 'New Farm', 'West End'],
            'Perth': ['CBD', 'Fremantle', 'Northbridge', 'Subiaco', 'Cottesloe'],
            'Adelaide': ['CBD', 'North Adelaide', 'Glenelg', 'Prospect', 'Norwood']
        }
    },
    india: {
        cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
        areas: {
            'Mumbai': ['Bandra', 'Andheri', 'Colaba', 'Juhu', 'Worli'],
            'Delhi': ['Connaught Place', 'South Delhi', 'North Delhi', 'Old Delhi', 'Dwarka'],
            'Bangalore': ['MG Road', 'Indiranagar', 'Koramangala', 'Whitefield', 'Jayanagar'],
            'Hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Hitech City', 'Secunderabad', 'Gachibowli'],
            'Chennai': ['T Nagar', 'Anna Nagar', 'Adyar', 'Besant Nagar', 'Velachery']
        }
    },
    bangladesh: {
        cities: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'],
        areas: {
            'Dhaka': ['Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Motijheel'],
            'Chittagong': ['Agrabad', 'Nasirabad', 'Khulshi', 'Patenga', 'Halishahar'],
            'Khulna': ['Khalishpur', 'Sonadanga', 'Boyra', 'Daulatpur', 'Khan Jahan Ali'],
            'Rajshahi': ['Shaheb Bazar', 'Motihar', 'Padma Residential', 'Upashahar', 'Kazla'],
            'Sylhet': ['Zindabazar', 'Ambarkhana', 'Upashahar', 'Shahjalal', 'Shibganj']
        }
    }
};

// Navigation bar hide/show on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Code for Filter section dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('countrySelect');
    const citySelect = document.getElementById('citySelect');
    const areaSelect = document.getElementById('areaSelect');
    const cityContainer = document.getElementById('cityContainer');
    const areaContainer = document.getElementById('areaContainer');
    
    // Country selection changes
    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        
        // Reset city and area dropdowns
        citySelect.innerHTML = '<option value="" selected>Select City</option>';
        areaSelect.innerHTML = '<option value="" selected>Select Area</option>';
        
        if (selectedCountry) {
            // Add cities for the selected country
            const cities = locationData[selectedCountry].cities;
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
            
            // Show city dropdown and enable it
            cityContainer.style.display = 'block';
            citySelect.disabled = false;
            
            // Hide area dropdown
            areaContainer.style.display = 'block';
            areaSelect.disabled = true;
        } else {
            // Hide both city and area dropdowns
            cityContainer.style.display = 'block';
            areaContainer.style.display = 'block';
            citySelect.disabled = true;
            areaSelect.disabled = true;
        }
    });
    
    // City selection changes
    citySelect.addEventListener('change', function() {
        const selectedCountry = countrySelect.value;
        const selectedCity = this.value;
        
        // Reset area dropdown
        areaSelect.innerHTML = '<option value="" selected>Select Area</option>';
        
        if (selectedCity) {
            // Add areas for the selected city
            const areas = locationData[selectedCountry].areas[selectedCity];
            areas.forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                areaSelect.appendChild(option);
            });
            
            // Show area dropdown and enable it
            areaContainer.style.display = 'block';
            areaSelect.disabled = false;
        } else {
            // Hide area dropdown
            areaContainer.style.display = 'none';
            areaSelect.disabled = true;
        }
    });
});

// Dropdown functionality for More link in footer
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown .more-link');
    const dropdown = document.querySelector('.dropdown');
    
    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// NEW DARK MODE FUNCTIONALITY
// Dark mode functionality
function initDarkMode() {
    // Check for saved theme preference or use preferred-color-scheme
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled' || 
                            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Dark mode toggle button in nav
    const navList = document.querySelector('.nav-list');
    const darkModeToggle = document.createElement('li');
    darkModeToggle.className = 'nav-item dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    navList.appendChild(darkModeToggle);
    
    // Apply initial state
    if (darkModeEnabled) {
        enableDarkMode();
    }
    
    // Toggle dark mode on click
    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Listen for OS theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.querySelector('.dark-mode-toggle i').className = 'fas fa-sun';
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    document.querySelector('.dark-mode-toggle i').className = 'fas fa-moon';
    localStorage.setItem('darkMode', 'disabled');
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
});


// Add to your assets/js/script.js file

// News page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the news page by looking for news-specific elements
    const newsElements = document.querySelector('.news-feed');
    if (!newsElements) return; // Exit if not on news page
    
    // Post News button functionality
    const postNewsButton = document.getElementById('postNewsButton');
    if (postNewsButton) {
        postNewsButton.addEventListener('click', function() {
            // This could redirect to a post form or open a modal
            alert('Post News functionality would open here');
            // For a real implementation, you might do:
            // window.location.href = 'post-news.html';
            // or open a modal:
            // $('#postNewsModal').modal('show'); // If using Bootstrap's modal
        });
    }
    
    // Category filter functionality
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            // In a real application, this would filter news by category
            if (selectedCategory) {
                console.log('Filtering news by category:', selectedCategory);
                // Filter news cards by category
                filterNewsByCategory(selectedCategory);
            } else {
                // Show all news cards
                const newsCards = document.querySelectorAll('.news-card');
                newsCards.forEach(card => {
                    card.closest('.col-12').style.display = 'block';
                });
            }
        });
    }
    
    // Filter news cards by category
    function filterNewsByCategory(category) {
        const newsCards = document.querySelectorAll('.news-card');
        
        newsCards.forEach(card => {
            const cardCategory = card.querySelector('.badge').textContent.trim().toLowerCase();
            const cardColumn = card.closest('.col-12');
            
            // Check if the card's category matches the selected category
            if (category.toLowerCase() === cardCategory || category === '') {
                cardColumn.style.display = 'block';
            } else {
                cardColumn.style.display = 'none';
            }
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton && searchInput) {
        const performSearch = function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Search in news cards
                searchNews(searchTerm);
            } else {
                // Show all cards if search is cleared
                const newsCards = document.querySelectorAll('.news-card');
                newsCards.forEach(card => {
                    card.closest('.col-12').style.display = 'block';
                });
            }
        };
        
        searchButton.addEventListener('click', performSearch);
        
        // Also trigger search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Search within news cards
    function searchNews(term) {
        const newsCards = document.querySelectorAll('.news-card');
        
        newsCards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const cardText = card.querySelector('.card-text').textContent.toLowerCase();
            const cardColumn = card.closest('.col-12');
            
            // Check if the card contains the search term
            if (cardTitle.includes(term) || cardText.includes(term)) {
                cardColumn.style.display = 'block';
            } else {
                cardColumn.style.display = 'none';
            }
        });
    }
    
    // Load More button functionality
    const loadMoreButton = document.getElementById('loadMoreButton');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            loadMoreButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            loadMoreButton.disabled = true;
            
            // Simulate loading more content (in a real app, this would be an API call)
            setTimeout(() => {
                const newsRow = document.querySelector('.news-feed .row');
                
                // Add two new news items
                const newNewsItems = `
                    <!-- News Item 5 -->
                    <div class="col-12 col-lg-6 mb-3">
                      <div class="card news-card h-100">
                        <div class="news-img-container">
                          <img src="assets/img/education.jpg" class="card-img-top news-img" alt="Education">
                        </div>
                        <div class="card-body">
                          <h5 class="card-title">Local School Wins National Science Competition</h5>
                          <p class="text-muted mb-2">
                            <span class="badge bg-warning me-2">Education</span>
                            <small><i class="fas fa-clock me-1"></i> 2 days ago</small>
                          </p>
                          <p class="card-text">Students from the local high school have won first place in the National Science Competition with their innovative project on...</p>
                          <div class="d-flex justify-content-between">
                            <button class="btn btn-sm btn-outline-primary">Read More</button>
                            <div>
                              <span class="me-3"><i class="far fa-heart me-1"></i> 112</span>
                              <span><i class="far fa-comment me-1"></i> 45</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- News Item 6 -->
                    <div class="col-12 col-lg-6 mb-3">
                      <div class="card news-card h-100">
                        <div class="news-img-container">
                          <img src="assets/img/environment.jpg" class="card-img-top news-img" alt="Environment">
                        </div>
                        <div class="card-body">
                          <h5 class="card-title">New Environmental Initiative Launched in the City</h5>
                          <p class="text-muted mb-2">
                            <span class="badge bg-success me-2">Environment</span>
                            <small><i class="fas fa-clock me-1"></i> 3 days ago</small>
                          </p>
                          <p class="card-text">The city has launched a new environmental initiative aimed at reducing carbon emissions and promoting sustainable practices among local businesses...</p>
                          <div class="d-flex justify-content-between">
                            <button class="btn btn-sm btn-outline-primary">Read More</button>
                            <div>
                              <span class="me-3"><i class="far fa-heart me-1"></i> 78</span>
                              <span><i class="far fa-comment me-1"></i> 32</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                `;
                
                // Append the new items to the row
                newsRow.insertAdjacentHTML('beforeend', newNewsItems);
                
                // Reset the button
                loadMoreButton.innerHTML = 'Load More <i class="fas fa-chevron-down ms-1"></i>';
                loadMoreButton.disabled = false;
                
                // Initialize event listeners for new cards
                initializeNewsInteraction();
                
                // Apply any active filters
                const selectedCategory = categorySelect.value;
                if (selectedCategory) {
                    filterNewsByCategory(selectedCategory);
                }
                
                const searchTerm = searchInput.value.trim().toLowerCase();
                if (searchTerm) {
                    searchNews(searchTerm);
                }
            }, 1500); // Simulate loading delay
        });
    }
    
    // Initialize any interactive elements
    initializeNewsInteraction();
    
    // Handle image loading errors by providing a placeholder
    handleImageErrors();
});

// Handle images that fail to load
function handleImageErrors() {
    const newsImages = document.querySelectorAll('.news-img');
    newsImages.forEach(img => {
        img.addEventListener('error', function() {
            const container = this.closest('.news-img-container');
            
            // Add placeholder icon
            const placeholderIcon = document.createElement('div');
            placeholderIcon.innerHTML = `<i class="fas fa-newspaper placeholder-icon"></i>`;
            container.appendChild(placeholderIcon);
            container.classList.add('placeholder');
            
            // Hide the broken image
            this.style.display = 'none';
        });
    });
}

// Function to initialize interactive elements like likes and comments
function initializeNewsInteraction() {
    // Like functionality
    const heartIcons = document.querySelectorAll('.fa-heart');
    heartIcons.forEach(icon => {
        if (icon.dataset.initialized) return; // Skip if already initialized
        
        icon.dataset.initialized = 'true';
        icon.addEventListener('click', function() {
            const likeCountElement = this.parentElement;
            const currentLikes = parseInt(likeCountElement.textContent.trim());
            
            if (this.classList.contains('far')) {
                // Not liked yet - like it
                this.classList.remove('far');
                this.classList.add('fas');
                this.style.color = '#e74c3c'; // Red heart
                likeCountElement.innerHTML = `<i class="fas fa-heart me-1" style="color: #e74c3c;"></i> ${currentLikes + 1}`;
            } else {
                // Already liked - unlike it
                this.classList.remove('fas');
                this.classList.add('far');
                this.style.color = ''; // Reset color
                likeCountElement.innerHTML = `<i class="far fa-heart me-1"></i> ${currentLikes - 1}`;
            }
        });
    });
}

// News page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the news page
    const newsElements = document.querySelector('.news-feed');
    if (!newsElements) return;
    
    // Post News button functionality
    const postNewsButton = document.getElementById('postNewsButton');
    if (postNewsButton) {
        postNewsButton.addEventListener('click', function() {
            alert('Post News functionality would open here');
            // In a real implementation, redirect to form or open modal
        });
    }
    
    // Category filter functionality
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            if (selectedCategory) {
                filterNewsByCategory(selectedCategory);
            } else {
                // Show all news cards
                const newsCards = document.querySelectorAll('.news-card');
                newsCards.forEach(card => {
                    card.closest('.col-12').style.display = 'block';
                });
            }
        });
    }
    
    // Filter news by category
    function filterNewsByCategory(category) {
        const newsCards = document.querySelectorAll('.news-card');
        
        newsCards.forEach(card => {
            const cardCategory = card.querySelector('.category-badge').textContent.trim().toLowerCase();
            const cardColumn = card.closest('.col-12');
            
            if (category.toLowerCase() === cardCategory || category === '') {
                cardColumn.style.display = 'block';
            } else {
                cardColumn.style.display = 'none';
            }
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton && searchInput) {
        const performSearch = function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                searchNews(searchTerm);
            } else {
                // Show all cards if search is cleared
                const newsCards = document.querySelectorAll('.news-card');
                newsCards.forEach(card => {
                    card.closest('.col-12').style.display = 'block';
                });
            }
        };
        
        searchButton.addEventListener('click', performSearch);
        
        // Trigger search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Search within news cards
    function searchNews(term) {
        const newsCards = document.querySelectorAll('.news-card');
        
        newsCards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const cardColumn = card.closest('.col-12');
            
            // Check if the card title contains the search term
            if (cardTitle.includes(term)) {
                cardColumn.style.display = 'block';
            } else {
                cardColumn.style.display = 'none';
            }
        });
    }
    
    // Load More button functionality
    const loadMoreButton = document.getElementById('loadMoreButton');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            loadMoreButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            loadMoreButton.disabled = true;
            
            // Simulate loading more content
            setTimeout(() => {
                const newsRow = document.querySelector('.news-feed .row');
                
                // Add new news items with the updated structure
                const newNewsItems = `
                    <!-- News Item 5 -->
                    <div class="col-12 col-lg-6 mb-3">
                      <div class="card news-card h-100">
                        <div class="news-img-container">
                          <img src="https://media.istockphoto.com/id/1358013876/photo/web-development-concept.jpg?s=612x612&w=0&k=20&c=_jfDistdVzR-kl4gfY0qEcgmfo-ZFokLnKGiZ9O5j_4=" class="card-img-top news-img" alt="Education">
                          <span class="category-badge badge bg-warning">Education</span>
                        </div>
                        <div class="card-body">
                          <a href="#" class="news-title-link">
                            <h5 class="card-title">Local School Wins National Science Competition</h5>
                          </a>
                          <div class="news-meta">
                            <small class="text-muted"><i class="fas fa-clock me-1"></i> 2 days ago</small>
                            <div class="news-stats">
                              <span class="me-3"><i class="far fa-heart me-1"></i> 112</span>
                              <span><i class="far fa-comment me-1"></i> 45</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- News Item 6 -->
                    <div class="col-12 col-lg-6 mb-3">
                      <div class="card news-card h-100">
                        <div class="news-img-container">
                          <img src="https://media.istockphoto.com/id/1420729179/photo/reforestation-by-planting-a-tree-in-spring-the-garden-is-at-sunset.webp?b=1&s=170667a&w=0&k=20&c=yxHrjyTw1-0XeXZUsVhxFVu9yxQRGa1OX1dz7mVww54=" class="card-img-top news-img" alt="Environment">
                          <span class="category-badge badge bg-success">Environment</span>
                        </div>
                        <div class="card-body">
                          <a href="#" class="news-title-link">
                            <h5 class="card-title">New Environmental Initiative Launched in the City</h5>
                          </a>
                          <div class="news-meta">
                            <small class="text-muted"><i class="fas fa-clock me-1"></i> 3 days ago</small>
                            <div class="news-stats">
                              <span class="me-3"><i class="far fa-heart me-1"></i> 78</span>
                              <span><i class="far fa-comment me-1"></i> 32</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                `;
                
                // Append the new items to the row
                newsRow.insertAdjacentHTML('beforeend', newNewsItems);
                
                // Reset the button
                loadMoreButton.innerHTML = 'Load More <i class="fas fa-chevron-down ms-1"></i>';
                loadMoreButton.disabled = false;
                
                // Initialize interactive elements for new cards
                initializeNewsInteraction();
                
                // Apply any active filters
                const selectedCategory = categorySelect.value;
                if (selectedCategory) {
                    filterNewsByCategory(selectedCategory);
                }
                
                const searchTerm = searchInput.value.trim().toLowerCase();
                if (searchTerm) {
                    searchNews(searchTerm);
                }
            }, 1500);
        });
    }
    
    // Handle title clicks to simulate "Read More"
    document.querySelectorAll('.news-title-link').forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const newsTitle = this.querySelector('.card-title').textContent;
            // In a real app, this would navigate to the full news article
            alert(`Reading full article: ${newsTitle}`);
        });
    });
    
    // Initialize interactive elements
    initializeNewsInteraction();
    
    // Handle image loading errors
    handleImageErrors();
});

// Initialize interactive elements
function initializeNewsInteraction() {
    // Like functionality
    const heartIcons = document.querySelectorAll('.fa-heart');
    heartIcons.forEach(icon => {
        if (icon.dataset.initialized) return; // Skip if already initialized
        
        icon.dataset.initialized = 'true';
        icon.addEventListener('click', function() {
            const likeCountElement = this.parentElement;
            const currentLikes = parseInt(likeCountElement.textContent.trim());
            
            if (this.classList.contains('far')) {
                // Not liked yet - like it
                this.classList.remove('far');
                this.classList.add('fas');
                likeCountElement.innerHTML = `<i class="fas fa-heart me-1" style="color: #e74c3c;"></i> ${currentLikes + 1}`;
            } else {
                // Already liked - unlike it
                this.classList.remove('fas');
                this.classList.add('far');
                likeCountElement.innerHTML = `<i class="far fa-heart me-1"></i> ${currentLikes - 1}`;
            }
        });
    });
    
    // Handle newly added title links
    document.querySelectorAll('.news-title-link').forEach(title => {
        if (title.dataset.initialized) return;
        
        title.dataset.initialized = 'true';
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const newsTitle = this.querySelector('.card-title').textContent;
            // In a real app, this would navigate to the full news article
            alert(`Reading full article: ${newsTitle}`);
        });
    });
}

// Handle images that fail to load
function handleImageErrors() {
    const newsImages = document.querySelectorAll('.news-img');
    newsImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/img/news-placeholder.jpg'; // Fallback image
            // Alternative: show a placeholder icon
            // const container = this.closest('.news-img-container');
            // container.innerHTML = '<i class="fas fa-newspaper fa-3x"></i>';
            // container.style.display = 'flex';
            // container.style.justifyContent = 'center';
            // container.style.alignItems = 'center';
        });
    });
}// Updated dark mode functions to handle logo switching
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.querySelector('.dark-mode-toggle i').className = 'fas fa-sun';
    localStorage.setItem('darkMode', 'enabled');
    
    // Make sure category badges are still visible in dark mode
    const badges = document.querySelectorAll('.category-badge');
    badges.forEach(badge => {
        badge.style.opacity = '1';
    });
    
    // Alternative direct logo swap if CSS approach doesn't work
    const logo = document.getElementById('siteLogo');
    if (logo) {
        logo.src = 'assets/img/white-logo.png';
    }
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    document.querySelector('.dark-mode-toggle i').className = 'fas fa-moon';
    localStorage.setItem('darkMode', 'disabled');
    
    // Change logo back to default when switching to light mode
    const logo = document.getElementById('siteLogo');
    if (logo) {
        logo.src = 'assets/img/logo.png';
    }
}

// Initialize dark mode with logo control
function initDarkMode() {
    // Check for saved theme preference or use preferred-color-scheme
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled' || 
                            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Dark mode toggle button in nav
    const navList = document.querySelector('.nav-list');
    const darkModeToggle = document.createElement('li');
    darkModeToggle.className = 'nav-item dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    navList.appendChild(darkModeToggle);
    
    // Apply initial state
    if (darkModeEnabled) {
        enableDarkMode();
    }
    
    // Toggle dark mode on click
    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Listen for OS theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }
}











// Add this to your existing script.js file

// Initialize marketplace functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the marketplace page
    const marketplace = document.querySelector('.product-grid');
    if (!marketplace) return;
    
    // Save functionality
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const bookmarkIcon = this.querySelector('.fa-bookmark');
            
            if (bookmarkIcon.classList.contains('far')) {
                // Add to saved items
                bookmarkIcon.classList.remove('far');
                bookmarkIcon.classList.add('fas');
                showToast('Product saved');
            } else {
                // Remove from saved items
                bookmarkIcon.classList.remove('fas');
                bookmarkIcon.classList.add('far');
                showToast('Product removed from saved items');
            }
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productTitle = this.closest('.product-card').querySelector('.card-title').textContent;
            showToast(`${productTitle} added to cart`);
        });
    });
    
    // Helper function to show toast notifications
    function showToast(message) {
        // In a real implementation, this would show a toast notification
        console.log('Toast:', message);
    }
    
    // Post product button
    const postProductButton = document.getElementById('postProductButton');
    if (postProductButton) {
        postProductButton.addEventListener('click', function() {
            // This would open a form to post a new product
            alert('Post a new product form would open here');
            // In a real implementation, you might redirect to a form or open a modal
        });
    }
    
    // Category filter functionality
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value.toLowerCase();
            
            if (selectedCategory) {
                filterProductsByCategory(selectedCategory);
            } else {
                // Show all products
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    card.closest('.col-6').style.display = 'block';
                });
            }
        });
    }
    
    // Function to filter products by category
    function filterProductsByCategory(category) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
            const productColumn = card.closest('.col-6');
            
            if (productCategory === category || category === '') {
                productColumn.style.display = 'block';
            } else {
                productColumn.style.display = 'none';
            }
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton && searchInput) {
        const performSearch = function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                searchProducts(searchTerm);
            } else {
                // Show all products if search is cleared
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    card.closest('.col-6').style.display = 'block';
                });
            }
        };
        
        searchButton.addEventListener('click', performSearch);
        
        // Also trigger search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Function to search products
    function searchProducts(term) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
            const productColumn = card.closest('.col-6');
            
            // Check if product title or category contains the search term
            if (productTitle.includes(term) || productCategory.includes(term)) {
                productColumn.style.display = 'block';
            } else {
                productColumn.style.display = 'none';
            }
        });
    }
    
    // Load More button functionality
    const loadMoreButton = document.getElementById('loadMoreButton');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            loadMoreButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            loadMoreButton.disabled = true;
            
            // Simulate loading more products (in a real application, this would be an API call)
            setTimeout(() => {
                // Reset the button
                loadMoreButton.innerHTML = 'Load More <i class="fas fa-chevron-down ms-1"></i>';
                loadMoreButton.disabled = false;
                
                // In a real implementation, you would append new products here
                alert('In a real implementation, more products would be loaded here');
                
                // Re-initialize event listeners for new products if needed
                initializeMarketplace();
            }, 1500); // Simulate loading delay
        });
    }
    
    // Handle Product Details
    const productLinks = document.querySelectorAll('.product-title-link');
    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productTitle = this.querySelector('.card-title').textContent;
            // In a real application, this would navigate to the product detail page
            alert(`Viewing details for: ${productTitle}`);
        });
    });
    
    // Initialize all marketplace functionality
    function initializeMarketplace() {
        // Re-attach event listeners to save buttons
        document.querySelectorAll('.save-btn').forEach(btn => {
            if (!btn.dataset.initialized) {
                btn.dataset.initialized = 'true';
                btn.addEventListener('click', function() {
                    const bookmarkIcon = this.querySelector('.fa-bookmark');
                    
                    if (bookmarkIcon.classList.contains('far')) {
                        bookmarkIcon.classList.remove('far');
                        bookmarkIcon.classList.add('fas');
                        showToast('Product saved');
                    } else {
                        bookmarkIcon.classList.remove('fas');
                        bookmarkIcon.classList.add('far');
                        showToast('Product removed from saved items');
                    }
                });
            }
        });
        
        // Re-attach event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            if (!btn.dataset.initialized) {
                btn.dataset.initialized = 'true';
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const productTitle = this.closest('.product-card').querySelector('.card-title').textContent;
                    showToast(`${productTitle} added to cart`);
                });
            }
        });
        
        // Re-attach event listeners to product links
        document.querySelectorAll('.product-title-link').forEach(link => {
            if (!link.dataset.initialized) {
                link.dataset.initialized = 'true';
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const productTitle = this.querySelector('.card-title').textContent;
                    alert(`Viewing details for: ${productTitle}`);
                });
            }
        });
    }
});


// code for subcategory

 // Subcategory data structure - you can modify this based on your needs
 const subcategories = {
    electronics: ['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Cameras', 'Accessories', 'TVs', 'Gaming'],
    clothing: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories', 'Sports Wear', 'Seasonal', 'Ethnic Wear'],
    home: ['Kitchen', 'Furniture', 'Decor', 'Bedding', 'Bath', 'Storage', 'Lighting', 'Gardening'],
    toys: ['Action Figures', 'Dolls', 'Educational', 'Outdoor', 'Board Games', 'Puzzles', 'Remote Control', 'Arts & Crafts'],
    sports: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports', 'Winter Sports', 'Cycling', 'Camping', 'Sportswear'],
    books: ['Fiction', 'Non-Fiction', 'Educational', 'Comics', 'Children', 'Biography', 'Self-Help', 'Cooking'],
    health: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Personal Care', 'Healthcare', 'Bath & Body', 'Supplements'],
    automotive: ['Car Parts', 'Accessories', 'Tools', 'Tires', 'Electronics', 'Motorcycle', 'Car Care', 'Oils & Fluids'],
    services: ['Home Services', 'Professional', 'Transportation', 'Freelance', 'Education', 'Health', 'Tech Support', 'Events'],
    jobs: ['Full-time', 'Part-time', 'Remote', 'Freelance', 'Internship', 'Entry Level', 'Senior Level', 'Temporary']
};

document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('categorySelect');
    const subcategoryContainer = document.getElementById('subcategoryContainer');
    
    // Event listener for category selection
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        
        // Clear any existing subcategories
        subcategoryContainer.innerHTML = '';
        
        // If a category is selected, show the subcategory menu
        if (selectedCategory && subcategories[selectedCategory]) {
            // Show the container
            subcategoryContainer.style.display = 'block';
            
            // Add "All" option first
            const allOption = document.createElement('div');
            allOption.className = 'subcategory-option active';
            allOption.textContent = 'All ' + capitalizeFirstLetter(selectedCategory);
            allOption.setAttribute('data-subcategory', 'all');
            subcategoryContainer.appendChild(allOption);
            
            // Add subcategory options
            subcategories[selectedCategory].forEach(subcategory => {
                const option = document.createElement('div');
                option.className = 'subcategory-option';
                option.textContent = subcategory;
                option.setAttribute('data-subcategory', subcategory.toLowerCase());
                subcategoryContainer.appendChild(option);
            });
            
            // Add event listeners to subcategory options
            const subcategoryOptions = document.querySelectorAll('.subcategory-option');
            subcategoryOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove active class from all options
                    subcategoryOptions.forEach(opt => opt.classList.remove('active'));
                    // Add active class to clicked option
                    this.classList.add('active');
                    
                    // Here you would add filtering logic based on the selected subcategory
                    console.log('Selected subcategory:', this.getAttribute('data-subcategory'));
                });
            });
        } else {
            // Hide the container if no category is selected
            subcategoryContainer.style.display = 'none';
        }
    });
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});


// code for add asset button 

document.addEventListener('DOMContentLoaded', function() {
    // Function to adjust text based on available width
    function adjustButtonText() {
        const buttons = document.querySelectorAll('.no-overflow');
        
        buttons.forEach(button => {
            const textSpan = button.querySelector('.button-text');
            if (!textSpan) return;
            
            const fullText = textSpan.getAttribute('data-full-text') || textSpan.textContent;
            
            // Store the original text if not already stored
            if (!textSpan.getAttribute('data-full-text')) {
                textSpan.setAttribute('data-full-text', fullText);
            }
            
            // Get available width for text
            const buttonWidth = button.offsetWidth;
            const iconWidth = 25; // Approximate width of icon + margin
            const availableWidth = buttonWidth - iconWidth;
            
            // Calculate characters that can fit (approximation)
            // Assuming average character width is about 8px for a typical font
            const fontSizeComputed = window.getComputedStyle(textSpan).fontSize;
            const fontSize = parseFloat(fontSizeComputed);
            const charWidth = fontSize * 0.6; // Approximate character width
            
            const maxChars = Math.floor(availableWidth / charWidth);
            
            // Adjust text content
            if (maxChars >= fullText.length) {
                textSpan.textContent = fullText;
            } else if (maxChars > 0) {
                textSpan.textContent = fullText.substring(0, maxChars);
            } else {
                textSpan.textContent = ''; // Hide text completely if no space
            }
        });
    }
    
    // Run on load
    adjustButtonText();
    
    // Run on window resize
    window.addEventListener('resize', adjustButtonText);
});
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
    
    // Apply initial state
    if (darkModeEnabled) {
        enableDarkMode();
    }
    
    // Find your existing dark mode toggle button instead of creating a new one
    const existingDarkModeToggle = document.querySelector('.your-existing-dark-mode-button-selector');
    
    if (existingDarkModeToggle) {
        // Toggle dark mode on click using your existing button
        existingDarkModeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

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

// These functions need to be defined elsewhere in your code
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    // Update icon if needed
    const darkModeIcon = document.querySelector('.your-existing-dark-mode-button-selector i');
    if (darkModeIcon) darkModeIcon.className = 'fas fa-sun';
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    // Update icon if needed
    const darkModeIcon = document.querySelector('.your-existing-dark-mode-button-selector i');
    if (darkModeIcon) darkModeIcon.className = 'fas fa-moon';
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

    // code for dark mode Account page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Settings submenu toggle with smooth animation
    const settingsOption = document.getElementById('settings-option');
    const settingsSubmenu = document.getElementById('settings-submenu');
    const settingsToggle = document.getElementById('settings-toggle');
    
    if (settingsOption && settingsSubmenu && settingsToggle) {
        settingsOption.addEventListener('click', function() {
            if (settingsSubmenu.style.display === 'none' || settingsSubmenu.style.display === '') {
                // Show submenu with smooth animation
                settingsSubmenu.style.display = 'block';
                settingsSubmenu.style.maxHeight = '0px';
                setTimeout(() => {
                    settingsSubmenu.style.maxHeight = settingsSubmenu.scrollHeight + 'px';
                }, 10);
                settingsToggle.classList.remove('fa-chevron-down');
                settingsToggle.classList.add('fa-chevron-up');
            } else {
                // Hide submenu with smooth animation
                settingsSubmenu.style.maxHeight = '0px';
                setTimeout(() => {
                    settingsSubmenu.style.display = 'none';
                }, 300); // Match the transition duration
                settingsToggle.classList.remove('fa-chevron-up');
                settingsToggle.classList.add('fa-chevron-down');
            }
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
    
    // Check if dark mode is enabled
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        // Update dark mode icon
        const darkModeIcon = document.querySelector('#darkModeToggle i');
        if (darkModeIcon) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        }
    }
    
    // Edit profile option
    const editProfileOption = document.getElementById('edit-profile-option');
    if (editProfileOption) {
        editProfileOption.addEventListener('click', function() {
            alert('Edit Profile form would open here');
        });
    }
    
    // Change Password option
    const changePasswordOption = document.getElementById('change-password-option');
    if (changePasswordOption) {
        changePasswordOption.addEventListener('click', function() {
            alert('Change Password functionality would open here');
        });
    }
    
    // Delete Account option
    const deleteAccountOption = document.getElementById('delete-account-option');
    if (deleteAccountOption) {
        deleteAccountOption.addEventListener('click', function() {
            if(confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                alert('Account deletion process would start here');
            }
        });
    }
    
    // Notification option
    const notificationOption = document.getElementById('notification-option');
    if (notificationOption) {
        notificationOption.addEventListener('click', function() {
            alert('Notification settings would open here');
        });
    }
    
    // Messages option
    const messagesOption = document.getElementById('messages-option');
    if (messagesOption) {
        messagesOption.addEventListener('click', function() {
            alert('Messages would open here');
        });
    }
    
    // Edit profile text
    const editProfileText = document.querySelector('.edit-profile-text');
    if (editProfileText) {
        editProfileText.addEventListener('click', function() {
            alert('Edit Profile form would open here');
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if(confirm('Are you sure you want to logout?')) {
                // In a real application, this would log the user out
                window.location.href = 'index.html';
            }
        });
    }
});

// Dark mode functions - these should be merged with your existing functions
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    
    const darkModeIcon = document.querySelector('#darkModeToggle i');
    if (darkModeIcon) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }
    
    localStorage.setItem('darkMode', 'enabled');
    
    // Change logo to white version
    const logo = document.getElementById('siteLogo');
    if (logo) {
        logo.src = 'assets/img/white-logo.png';
    }
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    
    const darkModeIcon = document.querySelector('#darkModeToggle i');
    if (darkModeIcon) {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
    
    localStorage.setItem('darkMode', 'disabled');
    
    // Change logo back to default
    const logo = document.getElementById('siteLogo');
    if (logo) {
        logo.src = 'assets/img/logo.png';
    }
}

// code for forgot password page 

document.addEventListener('DOMContentLoaded', function() {
    // OTP input elements
    const otpInputs = [
        document.getElementById('otp1'),
        document.getElementById('otp2'),
        document.getElementById('otp3'),
        document.getElementById('otp4'),
        document.getElementById('otp5'),
        document.getElementById('otp6')
    ];
    const verifyButton = document.getElementById('verifyButton');
    const resendButton = document.getElementById('resendButton');
    const resendTimer = document.getElementById('resendTimer');
    const errorMessage = document.getElementById('errorMessage');
    const body = document.body;
    
    let resendCountdown = 30;
    let resendTimerId;
    
    // Check for saved dark mode preference and apply it
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
    
    // Start initial resend timer
    startResendTimer();
    
    // Handle OTP input functionality
    otpInputs.forEach((input, index) => {
        // Auto-focus to next input
        input.addEventListener('input', function() {
            if (this.value.length === this.maxLength) {
                // Move to next input if exists
                if (otpInputs[index + 1]) {
                    otpInputs[index + 1].focus();
                }
            }
            
            // Check if all inputs are filled
            checkVerifyButtonState();
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '') {
                // Move to previous input if exists
                if (otpInputs[index - 1]) {
                    otpInputs[index - 1].focus();
                }
            }
        });
        
        // Allow only numbers
        input.addEventListener('keypress', function(e) {
            // Allow only 0-9
            if (e.key < '0' || e.key > '9') {
                e.preventDefault();
            }
        });
        
        // Also handle paste events
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const paste = e.clipboardData.getData('text');
            
            // Check if paste is numeric
            if (/^\d+$/.test(paste)) {
                // Fill all inputs with pasted value
                for (let i = 0; i < Math.min(paste.length, otpInputs.length); i++) {
                    otpInputs[i].value = paste[i];
                }
                
                // Focus last filled input or last input
                const lastFilledIndex = Math.min(paste.length - 1, otpInputs.length - 1);
                otpInputs[lastFilledIndex].focus();
                
                // Check if verify button should be enabled
                checkVerifyButtonState();
            }
        });
    });
    
    // Check if all OTP inputs are filled
    function checkVerifyButtonState() {
        const allFilled = otpInputs.every(input => input.value.length === 1);
        verifyButton.disabled = !allFilled;
    }
    
    // Start resend timer
    function startResendTimer() {
        resendCountdown = 30;
        resendButton.disabled = true;
        
        resendTimerId = setInterval(function() {
            resendCountdown--;
            resendTimer.textContent = `(${resendCountdown}s)`;
            
            if (resendCountdown <= 0) {
                clearInterval(resendTimerId);
                resendButton.disabled = false;
                resendTimer.textContent = '';
            }
        }, 1000);
    }
    
    // Verify button click
    verifyButton.addEventListener('click', function() {
        // Get OTP code
        let otpCode = '';
        otpInputs.forEach(input => {
            otpCode += input.value;
        });
        
        // For demo purposes: 123456 is considered valid
        if (otpCode === '123456') {
            // Successful verification - redirect to next page
            window.location.href = 'account.html';
        } else {
            // Show error message
            errorMessage.style.display = 'block';
            
            // Shake effect for error
            otpInputs.forEach(input => {
                input.style.borderColor = '#dc3545';
                setTimeout(() => {
                    input.style.borderColor = body.classList.contains('dark-mode') ? '#333' : '#ced4da';
                }, 1500);
            });
        }
    });
    
    // Resend button click
    resendButton.addEventListener('click', function() {
        // Clear all inputs
        otpInputs.forEach(input => {
            input.value = '';
        });
        
        // Disable verify button
        verifyButton.disabled = true;
        
        // Hide error message
        errorMessage.style.display = 'none';
        
        // Show success message for resend
        alert('New OTP code has been sent to your phone.');
        
        // Restart timer
        startResendTimer();
        
        // Focus first input
        otpInputs[0].focus();
    });

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


// code for change password page 

document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const changePasswordButton = document.getElementById('changePasswordButton');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const newPasswordToggle = document.getElementById('newPasswordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
    
    // Toggle new password visibility
    newPasswordToggle.addEventListener('click', function() {
        const type = newPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        newPassword.setAttribute('type', type);
        
        // Toggle eye icon
        if (type === 'text') {
            newPasswordToggle.innerHTML = '<i class="far fa-eye-slash"></i>';
        } else {
            newPasswordToggle.innerHTML = '<i class="far fa-eye"></i>';
        }
    });
    
    // Toggle confirm password visibility
    confirmPasswordToggle.addEventListener('click', function() {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        
        // Toggle eye icon
        if (type === 'text') {
            confirmPasswordToggle.innerHTML = '<i class="far fa-eye-slash"></i>';
        } else {
            confirmPasswordToggle.innerHTML = '<i class="far fa-eye"></i>';
        }
    });
    
    // Change password button functionality
    changePasswordButton.addEventListener('click', function() {
        // Hide any previous messages
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        
        // Check if passwords match
        if (newPassword.value === confirmPassword.value) {
            if (newPassword.value.length < 6) {
                // Password is too short
                errorMessage.textContent = 'Password must be at least 6 characters long.';
                errorMessage.style.display = 'block';
            } else {
                // Successful password change
                successMessage.style.display = 'block';
                
                // Clear the form
                newPassword.value = '';
                confirmPassword.value = '';
                
                // Redirect after 2 seconds
                setTimeout(function() {
                    window.location.href = 'account.html';
                }, 2000);
            }
        } else {
            // Passwords don't match
            errorMessage.textContent = 'Passwords do not match. Please try again.';
            errorMessage.style.display = 'block';
        }
    });
    
    // Allow Enter key to trigger password change
    confirmPassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            changePasswordButton.click();
        }
    });
});

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









// login page code
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const loginButton = document.getElementById('loginButton');
    const password = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const forgotPassword = document.getElementById('forgotPassword');
    const passwordToggle = document.getElementById('passwordToggle');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
    
    // Toggle password visibility
    passwordToggle.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        // Toggle eye icon
        if (type === 'text') {
            passwordToggle.innerHTML = '<i class="far fa-eye-slash"></i>';
        } else {
            passwordToggle.innerHTML = '<i class="far fa-eye"></i>';
        }
    });
    
    // Login button functionality
    loginButton.addEventListener('click', function() {
        // For demo purposes, any password other than "demo123" is considered incorrect
        if (password.value === "demo123") {
            // Successful login - redirect to account page
            window.location.href = 'account.html';
        } else {
            // Show error message and forgot password link
            errorMessage.style.display = 'block';
            forgotPassword.style.display = 'block';
        }
    });
    
    // Allow Enter key to trigger login
    password.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginButton.click();
        }
    });
    
    // Forgot password functionality
    forgotPassword.addEventListener('click', function() {
        alert('A password reset link will be sent to your registered phone number.');
    });
});

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








// footer dorpdown manu code

// Footer dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the dropdown elements
    const dropdownToggle = document.querySelector('.dropdown .more-link');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle && dropdown) {
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});














// singup page er code 

document.addEventListener('DOMContentLoaded', function() {
    // Check for dark mode and apply it
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
    
    // Image upload preview
    const imageUpload = document.getElementById('profileUpload');
    const previewImage = document.querySelector('.preview-image');
    const removeImageBtn = document.querySelector('.remove-image');
    const uploadIcon = document.querySelector('.upload-icon');
    const uploadText = document.querySelector('.upload-text');
    
    imageUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                uploadIcon.style.display = 'none';
                uploadText.style.display = 'none';
                removeImageBtn.style.display = 'flex';
            }
            
            reader.readAsDataURL(file);
        }
    });
    
    removeImageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        imageUpload.value = '';
        previewImage.src = '';
        previewImage.style.display = 'none';
        uploadIcon.style.display = 'block';
        uploadText.style.display = 'block';
        removeImageBtn.style.display = 'none';
    });

    // City and Area suggestions
    const cityInput = document.getElementById('cityInput');
    const areaInput = document.getElementById('areaInput');
    const citySuggestList = document.getElementById('citySuggestList');
    const areaSuggestList = document.getElementById('areaSuggestList');
    
    // Database of cities and their areas
    const cityAreaData = {
        "Dhaka": ["Mirpur", "Gulshan", "Dhanmondi", "Uttara", "Mohammadpur", "Banani", "Bashundhara", "Motijheel", "Khilgaon", "Rampura"],
        "Chittagong": ["Agrabad", "Nasirabad", "Khulshi", "Halishahar", "Patenga", "Chawkbazar", "GEC", "Kotwali", "Bakalia", "Chandgaon"],
        "Rajshahi": ["Boalia", "Shaheb Bazar", "Motihar", "Katakhali", "Kajla", "Binodpur", "Bornali", "Padma Residential", "Upashahar", "Kazihata"],
        "Khulna": ["Khalishpur", "Daulatpur", "Sonadanga", "Boyra", "Gollamari", "Rupsha", "Khulna Sadar", "Nirala", "Khan Jahan Ali", "Arongghata"],
        "Sylhet": ["Zindabazar", "Ambarkhana", "Shahjalal Upashahar", "Shibganj", "Mirabazar", "Tilagor", "Dargah Mahalla", "Subidbazar", "Pathantula", "Sheikhghat"],
        "Barisal": ["Sadar Road", "Nathullabad", "Amtala", "Rupatali", "Kashipur", "Kawnia", "Nobogram", "Sagardi", "Amanatganj", "Charmatha"],
        "Rangpur": ["Dhap", "Jahaj Company More", "Lalbag Mor", "Modern More", "Shathibari", "College Road", "Shapla Chottor", "Rail Gate", "Collectorate Road", "Dhap Jail Road"],
        "Comilla": ["Kandirpar", "Bagichagaon", "Jhautola", "Tomsom Bridge", "Chawkbazar", "Shashongacha", "Monoharpur", "Kotbari", "Jhilpar", "Bijoypur"]
    };
    
    const cities = Object.keys(cityAreaData);
    let selectedCity = '';
    
    // Show all city suggestions when clicking on city field
    cityInput.addEventListener('click', function() {
        showCitySuggestions();
    });
    
    // Filter city suggestions when typing
    cityInput.addEventListener('input', function() {
        const inputVal = this.value.trim().toLowerCase();
        
        if (inputVal.length > 0) {
            const filteredCities = cities.filter(city => 
                city.toLowerCase().includes(inputVal)
            );
            
            updateCitySuggestionsList(filteredCities);
        } else {
            showCitySuggestions();
        }
    });
    
    // Show area suggestions when clicking on area field
    areaInput.addEventListener('click', function() {
        if (selectedCity) {
            showAreaSuggestions(selectedCity);
        }
    });
    
    // Filter area suggestions when typing
    areaInput.addEventListener('input', function() {
        const inputVal = this.value.trim().toLowerCase();
        
        if (selectedCity && inputVal.length > 0) {
            const areas = cityAreaData[selectedCity] || [];
            const filteredAreas = areas.filter(area => 
                area.toLowerCase().includes(inputVal)
            );
            
            updateAreaSuggestionsList(filteredAreas);
        } else if (selectedCity) {
            showAreaSuggestions(selectedCity);
        }
    });
    
    function showCitySuggestions() {
        updateCitySuggestionsList(cities);
    }
    
    function showAreaSuggestions(city) {
        const areas = cityAreaData[city] || [];
        updateAreaSuggestionsList(areas);
    }
    
    function updateCitySuggestionsList(items) {
        citySuggestList.innerHTML = '';
        
        if (items.length > 0) {
            items.forEach(city => {
                const div = document.createElement('div');
                div.className = 'suggest-item';
                div.textContent = city;
                div.addEventListener('click', function() {
                    cityInput.value = city;
                    selectedCity = city;
                    citySuggestList.style.display = 'none';
                    
                    // Clear and update area field when city is selected
                    areaInput.value = '';
                    showAreaSuggestions(city);
                });
                citySuggestList.appendChild(div);
            });
            
            citySuggestList.style.display = 'block';
        } else {
            citySuggestList.style.display = 'none';
        }
    }
    
    function updateAreaSuggestionsList(items) {
        areaSuggestList.innerHTML = '';
        
        if (items.length > 0) {
            items.forEach(area => {
                const div = document.createElement('div');
                div.className = 'suggest-item';
                div.textContent = area;
                div.addEventListener('click', function() {
                    areaInput.value = area;
                    areaSuggestList.style.display = 'none';
                });
                areaSuggestList.appendChild(div);
            });
            
            areaSuggestList.style.display = 'block';
        } else {
            areaSuggestList.style.display = 'none';
        }
    }
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== cityInput && !citySuggestList.contains(e.target)) {
            citySuggestList.style.display = 'none';
        }
        
        if (e.target !== areaInput && !areaSuggestList.contains(e.target)) {
            areaSuggestList.style.display = 'none';
        }
    });
    
    // Form submission
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission here
        alert('Account created successfully!');
        this.reset();
        previewImage.style.display = 'none';
        uploadIcon.style.display = 'block';
        uploadText.style.display = 'block';
        selectedCity = '';
    });
});











// create news page

document.addEventListener('DOMContentLoaded', function() {
    // Check for dark mode and apply it
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
    // Image upload preview
    const imageUpload = document.getElementById('newsImageFile');
    const previewImage = document.querySelector('.news-preview-image');
    const removeImageBtn = document.querySelector('.news-remove-btn');
    const uploadIcon = document.querySelector('.news-upload-icon');
    const uploadText = document.querySelector('.news-upload-text');
    
    imageUpload.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                uploadIcon.style.display = 'none';
                uploadText.style.display = 'none';
                removeImageBtn.style.display = 'flex';
            }
            
            reader.readAsDataURL(file);
        }
    });
    
    removeImageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        imageUpload.value = '';
        previewImage.src = '';
        previewImage.style.display = 'none';
        uploadIcon.style.display = 'block';
        uploadText.style.display = 'block';
        removeImageBtn.style.display = 'none';
    });
    
    // Category suggestions
    const categoryInput = document.getElementById('newsCategoryInput');
    const categorySuggestList = document.getElementById('newsCategorySuggestions');
    
    const categories = [
        "Breaking News", "Politics", "Business", "Technology", 
        "Sports", "Entertainment", "Health", "Science", 
        "Education", "Environment", "World", "Local"
    ];
    
    // Show all suggestions when clicking on the field
    categoryInput.addEventListener('click', function() {
        showAllSuggestions();
    });
    
    // Also filter suggestions when typing
    categoryInput.addEventListener('input', function() {
        const inputVal = this.value.trim().toLowerCase();
        
        if (inputVal.length > 0) {
            // Filter categories based on input
            const filteredCategories = categories.filter(cat => 
                cat.toLowerCase().includes(inputVal)
            );
            
            updateSuggestionsList(filteredCategories);
        } else {
            showAllSuggestions();
        }
    });
    
    function showAllSuggestions() {
        updateSuggestionsList(categories);
    }
    
    function updateSuggestionsList(items) {
        // Create suggestion list
        categorySuggestList.innerHTML = '';
        
        if (items.length > 0) {
            items.forEach(cat => {
                const div = document.createElement('div');
                div.className = 'news-suggestion-item';
                div.textContent = cat;
                div.addEventListener('click', function() {
                    categoryInput.value = cat;
                    categorySuggestList.style.display = 'none';
                });
                categorySuggestList.appendChild(div);
            });
            
            categorySuggestList.style.display = 'block';
        } else {
            categorySuggestList.style.display = 'none';
        }
    }
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== categoryInput && !categorySuggestList.contains(e.target)) {
            categorySuggestList.style.display = 'none';
        }
    });
    
    // Form submission
    const newsForm = document.getElementById('newsPostForm');
    newsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission here
        alert('News posted successfully!');
        this.reset();
        previewImage.style.display = 'none';
        uploadIcon.style.display = 'block';
        uploadText.style.display = 'block';
    });
    
    // Initialize dropdown in footer
    const moreLink = document.querySelector('.more-link');
    if (moreLink) {
        moreLink.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
});














// add product page 

document.addEventListener('DOMContentLoaded', function() {
    // Check for dark mode and apply it
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
    
    // Main image upload preview
    const mainImageUpload = document.getElementById('mainProductImage');
    const mainPreviewImage = document.querySelector('.main-image .product-preview-image');
    const mainRemoveBtn = document.querySelector('.main-image .product-remove-btn');
    const mainUploadIcon = document.querySelector('.main-image .product-upload-icon');
    const mainUploadText = document.querySelector('.main-image .product-upload-text');
    
    // Setup image preview functionality
    setupImagePreview(mainImageUpload, mainPreviewImage, mainRemoveBtn, mainUploadIcon, mainUploadText);
    
    // Additional images management
    const additionalImagesContainer = document.getElementById('additionalImagesContainer');
    const addMoreImagesBtn = document.getElementById('addMoreImagesBtn');
    let imageCounter = 0;
    const MAX_IMAGES = 5; // Maximum number of additional images
    
    addMoreImagesBtn.addEventListener('click', function() {
        if (imageCounter < MAX_IMAGES) {
            addImageUploader();
        } else {
            alert('Maximum 5 additional images allowed');
        }
    });
    
    function addImageUploader() {
        const imageId = 'additionalImage' + imageCounter;
        
        // Create container
        const imageUploader = document.createElement('div');
        imageUploader.className = 'product-image-uploader';
        imageUploader.innerHTML = `
            <input type="file" id="${imageId}" accept="image/*">
            <div class="product-remove-btn">
                <i class="fas fa-times"></i>
            </div>
            <i class="fas fa-cloud-upload-alt product-upload-icon"></i>
            <div class="product-upload-text">Image</div>
            <img class="product-preview-image" src="" alt="Product Image ${imageCounter + 1}" style="display:none;">
        `;
        
        additionalImagesContainer.appendChild(imageUploader);
        
        // Setup image preview for this new uploader
        const imageInput = document.getElementById(imageId);
        const previewImage = imageUploader.querySelector('.product-preview-image');
        const removeBtn = imageUploader.querySelector('.product-remove-btn');
        const uploadIcon = imageUploader.querySelector('.product-upload-icon');
        const uploadText = imageUploader.querySelector('.product-upload-text');
        
        setupImagePreview(imageInput, previewImage, removeBtn, uploadIcon, uploadText);
        
        // Setup remove button to remove entire uploader
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            additionalImagesContainer.removeChild(imageUploader);
            imageCounter--;
        });
        
        imageCounter++;
    }
    
    function setupImagePreview(inputElement, previewImage, removeBtn, uploadIcon, uploadText) {
        inputElement.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    uploadIcon.style.display = 'none';
                    uploadText.style.display = 'none';
                    removeBtn.style.display = 'flex';
                }
                
                reader.readAsDataURL(file);
            }
        });
        
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            inputElement.value = '';
            previewImage.src = '';
            previewImage.style.display = 'none';
            uploadIcon.style.display = 'block';
            uploadText.style.display = 'block';
            removeBtn.style.display = 'none';
        });
    }
    
    // Category and Subcategory suggestions
    const categoryInput = document.getElementById('categoryInput');
    const subcategoryInput = document.getElementById('subcategoryInput');
    const categorySuggestions = document.getElementById('categorySuggestions');
    const subcategorySuggestions = document.getElementById('subcategorySuggestions');
    
    // Database of categories and subcategories
    const categoryData = {
        "Electronics": ["Smartphone", "Laptop", "Headphones", "Camera", "TV", "Speaker", "Tablet", "Gaming Console", "Smartwatch", "Computer Accessories"],
        "Fashion": ["Men's Clothing", "Women's Clothing", "Shoes", "Bags", "Jewelry", "Watches", "Accessories", "Traditional Wear", "Kids Clothing", "Sunglasses"],
        "Home & Kitchen": ["Furniture", "Kitchenware", "Appliances", "Bedding", "Lighting", "Decor", "Storage", "Garden Tools", "Bathroom Accessories", "Cleaning Supplies"],
        "Sports & Fitness": ["Exercise Equipment", "Sports Gear", "Outdoor Recreation", "Yoga Equipment", "Cycling", "Team Sports", "Fitness Trackers", "Swimming", "Athletic Clothing", "Camping Gear"],
        "Books": ["Fiction", "Non-Fiction", "Educational", "Children's Books", "Business", "Self-Help", "Biography", "History", "Comics", "Magazines"],
        "Toys & Games": ["Puzzles", "Board Games", "Action Figures", "Educational Toys", "Dolls", "Outdoor Toys", "Electronic Toys", "Building Toys", "Art Supplies", "Collectibles"],
        "Beauty & Health": ["Skincare", "Makeup", "Hair Care", "Fragrance", "Personal Care", "Wellness", "Healthcare", "Organic Products", "Bath & Body", "Men's Grooming"],
        "Automotive": ["Car Accessories", "Motorcycle Accessories", "Car Parts", "Interior Accessories", "Exterior Accessories", "Car Electronics", "Oils & Fluids", "Tools & Equipment", "Car Care", "Motorcycle Parts"]
    };
    
    const categories = Object.keys(categoryData);
    let selectedCategory = '';
    
    // Show all categories when clicking on category field
    categoryInput.addEventListener('click', function() {
        showCategorySuggestions();
    });
    
    // Filter categories when typing
    categoryInput.addEventListener('input', function() {
        const inputVal = this.value.trim().toLowerCase();
        
        if (inputVal.length > 0) {
            const filteredCategories = categories.filter(cat => 
                cat.toLowerCase().includes(inputVal)
            );
            
            updateCategorySuggestionsList(filteredCategories);
        } else {
            showCategorySuggestions();
        }
    });
    
    // Show subcategories when clicking on subcategory field
    subcategoryInput.addEventListener('click', function() {
        if (selectedCategory) {
            showSubcategorySuggestions(selectedCategory);
        }
    });
    
    // Filter subcategories when typing
    subcategoryInput.addEventListener('input', function() {
        const inputVal = this.value.trim().toLowerCase();
        
        if (selectedCategory && inputVal.length > 0) {
            const subcategories = categoryData[selectedCategory] || [];
            const filteredSubcategories = subcategories.filter(subcat => 
                subcat.toLowerCase().includes(inputVal)
            );
            
            updateSubcategorySuggestionsList(filteredSubcategories);
        } else if (selectedCategory) {
            showSubcategorySuggestions(selectedCategory);
        }
    });
    
    function showCategorySuggestions() {
        updateCategorySuggestionsList(categories);
    }
    
    function showSubcategorySuggestions(category) {
        const subcategories = categoryData[category] || [];
        updateSubcategorySuggestionsList(subcategories);
    }
    
    function updateCategorySuggestionsList(items) {
        categorySuggestions.innerHTML = '';
        
        if (items.length > 0) {
            items.forEach(cat => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = cat;
                div.addEventListener('click', function() {
                    categoryInput.value = cat;
                    selectedCategory = cat;
                    categorySuggestions.style.display = 'none';
                    
                    // Clear and update subcategory field when category is selected
                    subcategoryInput.value = '';
                    showSubcategorySuggestions(cat);
                });
                categorySuggestions.appendChild(div);
            });
            
            categorySuggestions.style.display = 'block';
        } else {
            categorySuggestions.style.display = 'none';
        }
    }
    
    function updateSubcategorySuggestionsList(items) {
        subcategorySuggestions.innerHTML = '';
        
        if (items.length > 0) {
            items.forEach(subcat => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = subcat;
                div.addEventListener('click', function() {
                    subcategoryInput.value = subcat;
                    subcategorySuggestions.style.display = 'none';
                });
                subcategorySuggestions.appendChild(div);
            });
            
            subcategorySuggestions.style.display = 'block';
        } else {
            subcategorySuggestions.style.display = 'none';
        }
    }
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== categoryInput && !categorySuggestions.contains(e.target)) {
            categorySuggestions.style.display = 'none';
        }
        
        if (e.target !== subcategoryInput && !subcategorySuggestions.contains(e.target)) {
            subcategorySuggestions.style.display = 'none';
        }
    });
    
    // Form submission
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission here
        alert('Product added successfully!');
        this.reset();
        
        // Reset main image
        mainPreviewImage.style.display = 'none';
        mainUploadIcon.style.display = 'block';
        mainUploadText.style.display = 'block';
        
        // Clear additional images
        additionalImagesContainer.innerHTML = '';
        imageCounter = 0;
        
        // Reset category selection
        selectedCategory = '';
    });
});





















// business profile js

document.addEventListener('DOMContentLoaded', function() {
    // Check for dark mode and apply it
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
    
    // Logo image upload preview
    const logoImageUpload = document.getElementById('businessLogoImage');
    const logoPreviewImage = document.querySelector('.business-preview-image');
    const logoRemoveBtn = document.querySelector('.business-remove-btn');
    const logoUploadIcon = document.querySelector('.business-upload-icon');
    const logoUploadText = document.querySelector('.business-upload-text');
    
    // Setup image preview functionality
    setupImagePreview(logoImageUpload, logoPreviewImage, logoRemoveBtn, logoUploadIcon, logoUploadText);
    
    function setupImagePreview(inputElement, previewImage, removeBtn, uploadIcon, uploadText) {
        inputElement.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    uploadIcon.style.display = 'none';
                    uploadText.style.display = 'none';
                    removeBtn.style.display = 'flex';
                }
                
                reader.readAsDataURL(file);
            }
        });
        
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            inputElement.value = '';
            previewImage.src = '';
            previewImage.style.display = 'none';
            uploadIcon.style.display = 'block';
            uploadText.style.display = 'block';
            removeBtn.style.display = 'none';
        });
    }
    
    // Category and Subcategory suggestions
    const categoryInput = document.getElementById('categoryInput');
    const subcategoryInput = document.getElementById('subcategoryInput');
    const categorySuggestions = document.getElementById('categorySuggestions');
    const subcategorySuggestions = document.getElementById('subcategorySuggestions');
    
    // Database of categories and subcategories
    const categoryData = {
"Education": ["School", "College", "University", "Training Institute", "Coaching Center", "Language School", "Technical Institute", "Vocational Training", "Tuition Center", "Online Learning"],

"Healthcare": ["Hospital", "Clinic", "Doctor's Chamber", "Dental Clinic", "Diagnostic Center", "Pharmacy", "Physiotherapy Center", "Mental Health Center", "Fitness Center", "Nursing Home"],

"Food & Dining": ["Restaurant", "Cafe", "Fast Food", "Bakery", "Catering Service", "Food Delivery", "Ice Cream Shop", "Coffee Shop", "Bar & Pub", "Food Truck"],

"Retail": ["Supermarket", "Grocery Store", "Fashion Boutique", "Electronics Store", "Bookstore", "Hardware Store", "Gift Shop", "Furniture Store", "Pharmacy", "Department Store"],

"Financial Services": ["Bank", "Insurance Company", "Investment Firm", "Finance Consultant", "Tax Service", "Accounting Firm", "Money Exchange", "Microfinance", "Credit Union", "Payment Service"],

"Professional Services": ["Law Firm", "Accounting Firm", "Marketing Agency", "Consulting Firm", "Architecture Firm", "IT Services", "Engineering Firm", "Design Studio", "Translation Service", "Recruitment Agency"],

"Real Estate": ["Real Estate Agency", "Property Management", "Construction Company", "Apartment Complex", "Commercial Property", "Land Development", "Interior Design", "Home Inspection", "Renovation Service", "Architecture Firm"],

"Automotive": ["Car Dealership", "Auto Repair", "Car Wash", "Auto Parts Store", "Rental Service", "Towing Service", "Motorcycle Shop", "Gas Station", "Car Insurance", "Driving School"],

"Technology": ["Software Company", "IT Services", "Web Development", "Digital Marketing", "Electronic Repair", "Computer Store", "Data Services", "Cloud Services", "App Development", "Cybersecurity"],

"Travel & Tourism": ["Hotel", "Resort", "Travel Agency", "Tour Operator", "Car Rental", "Tourist Attraction", "Spa & Wellness", "Adventure Tourism", "Transportation Service", "Vacation Rental"],

"Entertainment": ["Cinema", "Theater", "Concert Hall", "Amusement Park", "Gaming Zone", "Sports Arena", "Art Gallery", "Museum", "Nightclub", "Event Organizer"],

"Manufacturing": ["Factory", "Production Plant", "Workshop", "Textile Mill", "Food Processing", "Electronics Manufacturing", "Furniture Making", "Chemical Production", "Metal Works", "Printing Press"]
};
    
    const categories = Object.keys(categoryData);
    let selectedCategory = '';
    
    // Show all categories when clicking on category field
    categoryInput.addEventListener('click', function() {
        showCategorySuggestions();
    });
    
    // Filter categories when typing
    categoryInput.addEventListener('input', function() {
        const inputVal = this.value.trim().toLowerCase();
        
        if (inputVal.length > 0) {
            const filteredCategories = categories.filter(cat => 
                cat.toLowerCase().includes(inputVal)
            );
            
            updateCategorySuggestionsList(filteredCategories);
        } else {
            showCategorySuggestions();
        }
    });
    
    // Show subcategories when clicking on subcategory field
    subcategoryInput.addEventListener('click', function() {
        if (selectedCategory) {
            showSubcategorySuggestions(selectedCategory);
        }
    });
    
    // Filter subcategories when typing
    subcategoryInput.addEventListener('input', function() {
        const inputVal = this.value.trim().toLowerCase();
        
        if (selectedCategory && inputVal.length > 0) {
            const subcategories = categoryData[selectedCategory] || [];
            const filteredSubcategories = subcategories.filter(subcat => 
                subcat.toLowerCase().includes(inputVal)
            );
            
            updateSubcategorySuggestionsList(filteredSubcategories);
        } else if (selectedCategory) {
            showSubcategorySuggestions(selectedCategory);
        }
    });
    
    function showCategorySuggestions() {
        updateCategorySuggestionsList(categories);
    }
    
    function showSubcategorySuggestions(category) {
        const subcategories = categoryData[category] || [];
        updateSubcategorySuggestionsList(subcategories);
    }
    
    function updateCategorySuggestionsList(items) {
        categorySuggestions.innerHTML = '';
        
        if (items.length > 0) {
            items.forEach(cat => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = cat;
                div.addEventListener('click', function() {
                    categoryInput.value = cat;
                    selectedCategory = cat;
                    categorySuggestions.style.display = 'none';
                    
                    // Clear and update subcategory field when category is selected
                    subcategoryInput.value = '';
                    showSubcategorySuggestions(cat);
                });
                categorySuggestions.appendChild(div);
            });
            
            categorySuggestions.style.display = 'block';
        } else {
            categorySuggestions.style.display = 'none';
        }
    }
    
    function updateSubcategorySuggestionsList(items) {
        subcategorySuggestions.innerHTML = '';
        
        if (items.length > 0) {
            items.forEach(subcat => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = subcat;
                div.addEventListener('click', function() {
                    subcategoryInput.value = subcat;
                    subcategorySuggestions.style.display = 'none';
                });
                subcategorySuggestions.appendChild(div);
            });
            
            subcategorySuggestions.style.display = 'block';
        } else {
            subcategorySuggestions.style.display = 'none';
        }
    }
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== categoryInput && !categorySuggestions.contains(e.target)) {
            categorySuggestions.style.display = 'none';
        }
        
        if (e.target !== subcategoryInput && !subcategorySuggestions.contains(e.target)) {
            subcategorySuggestions.style.display = 'none';
        }
    });
    
    // Form submission
    const businessForm = document.getElementById('businessForm');
    businessForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission here
        alert('Business profile created successfully!');
        this.reset();
        
        // Reset logo image
        logoPreviewImage.style.display = 'none';
        logoUploadIcon.style.display = 'block';
        logoUploadText.style.display = 'block';
        
        // Reset category selection
        selectedCategory = '';
    });
});



























// add to card js 

// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Cart elements
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartCountBadge = document.getElementById('cartCountBadge');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Checkout elements
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const orderSummaryItems = document.getElementById('orderSummaryItems');
    const orderTotalPrice = document.getElementById('orderTotalPrice');
    const paymentMethod = document.getElementById('paymentMethod');
    const cardPaymentFields = document.getElementById('cardPaymentFields');
    const mobilePaymentFields = document.getElementById('mobilePaymentFields');
    const checkoutForm = document.getElementById('checkoutForm');
    
    // Success elements
    const successModal = document.getElementById('successModal');
    const orderNumber = document.getElementById('orderNumber');
    const continueShopping = document.getElementById('continueShopping');
    
    // Cart state
    let cart = [];
    
    // Add navigation cart button
    function addCartNavButton() {
        // Find the nav list element
        const navList = document.querySelector('.corner-cart-container');
        if (!navList) return;
        
        // Create cart button element
        const cartNavItem = document.createElement('div');
        cartNavItem.className = 'nav-item';
        
        const cartButton = document.createElement('button');
        cartButton.className = 'cart-icon-btn';
        cartButton.id = 'cartNavBtn';
        cartButton.innerHTML = '<i class="fas fa-shopping-cart"></i><span class="cart-icon-count" id="cartNavCount">0</span>';
        
        cartNavItem.appendChild(cartButton);
        
        // Insert before the account item (last item)
        const lastItem = navList.querySelector('.nav-item:last-child');
        navList.insertBefore(cartNavItem, lastItem);
        
        // Add event listener
        cartButton.addEventListener('click', openCart);
    }
    
    // Initialize cart
    function initCart() {
        // Add cart button to navigation
        addCartNavButton();
        
        // Load cart from localStorage
        const savedCart = localStorage.getItem('einfo_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
        
        // Add event listeners for cart controls
        closeCartBtn.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);
        checkoutBtn.addEventListener('click', openCheckout);
        closeModalBtn.addEventListener('click', closeCheckout);
        continueShopping.addEventListener('click', closeSuccessModal);
        
        // Add event listeners for add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                addToCart(button);
                
                // Add animation class
                button.classList.add('clicked');
                setTimeout(() => {
                    button.classList.remove('clicked');
                }, 300);
            });
        });
        
        // Payment method change handler
        paymentMethod.addEventListener('change', function() {
            const selectedMethod = this.value;
            
            // Hide all payment specific fields first
            document.querySelectorAll('.payment-specific-fields').forEach(field => {
                field.style.display = 'none';
            });
            
            // Show the relevant fields based on selection
            if (selectedMethod === 'card') {
                cardPaymentFields.style.display = 'block';
            } else if (selectedMethod === 'mobile') {
                mobilePaymentFields.style.display = 'block';
            }
        });
        
        // Checkout form submission
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
    
    // Add item to cart
    function addToCart(button) {
        // Get product details from the card
        const productCard = button.closest('.product-card') || button.closest('.card');
        if (!productCard) return;
        
        const productTitle = productCard.querySelector('.card-title').textContent;
        const productPriceEl = productCard.querySelector('.product-price');
        let productPrice = '';
        
        // Handle price with or without "old price"
        if (productPriceEl.querySelector('.old-price')) {
            productPrice = productPriceEl.textContent.split(' ')[1]; // Get the discounted price
        } else {
            productPrice = productPriceEl.textContent;
        }
        
        // Remove currency symbol and convert to number
        const price = parseFloat(productPrice.replace('$', ''));
        
        // Get product image
        const productImgEl = productCard.querySelector('.product-img') || 
                            productCard.querySelector('img');
        const productImg = productImgEl ? productImgEl.getAttribute('src') : 'assets/img/product/placeholder.jpg';
        
        // Get product category
        const productCategory = productCard.querySelector('.product-category').textContent;
        
        // Check if product already in cart
        const existingItemIndex = cart.findIndex(item => 
            item.title === productTitle && item.price === price);
        
        if (existingItemIndex > -1) {
            // Increment quantity if already in cart
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            cart.push({
                id: generateProductId(),
                title: productTitle,
                price: price,
                img: productImg,
                category: productCategory,
                quantity: 1
            });
        }
        
        // Save to localStorage and update UI
        saveCart();
        updateCartUI();
        openCart();
    }
    
    // Generate random ID for cart items
    function generateProductId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('einfo_cart', JSON.stringify(cart));
    }
    
    // Update cart UI elements
    function updateCartUI() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountBadge.textContent = totalItems;
        const cartNavCount = document.getElementById('cartNavCount');
        if (cartNavCount) {
            cartNavCount.textContent = totalItems;
        }
        
        // Show/hide empty cart message
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'flex';
        } else {
            emptyCartMessage.style.display = 'none';
        }
        
        // Update cart items
        cartItemsContainer.innerHTML = cart.length === 0 ? 
            emptyCartMessage.outerHTML : '';
        
        // Calculate total price
        let total = 0;
        
        // Add each item to the cart container
        cart.forEach(item => {
            total += item.price * item.quantity;
            
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="item-quantity-control">
                            <button class="quantity-btn minus-btn" data-id="${item.id}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="text" class="item-quantity" value="${item.quantity}" readonly>
                            <button class="quantity-btn plus-btn" data-id="${item.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemEl);
        });
        
        // Update total price display
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to quantity buttons
        const minusButtons = document.querySelectorAll('.minus-btn');
        const plusButtons = document.querySelectorAll('.plus-btn');
        const removeButtons = document.querySelectorAll('.remove-item-btn');
        
        minusButtons.forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        plusButtons.forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
    
    // Decrease item quantity
    function decreaseQuantity() {
        const itemId = this.getAttribute('data-id');
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
            saveCart();
            updateCartUI();
        }
    }
    
    // Increase item quantity
    function increaseQuantity() {
        const itemId = this.getAttribute('data-id');
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex > -1) {
            cart[itemIndex].quantity += 1;
            saveCart();
            updateCartUI();
        }
    }
    
    // Remove item from cart
    function removeItem() {
        const itemId = this.getAttribute('data-id');
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            saveCart();
            updateCartUI();
        }
    }
    
    // Open cart sidebar
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close cart sidebar
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Open checkout modal
    function openCheckout() {
        if (cart.length === 0) return;
        
        // Populate order summary
        orderSummaryItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <span>${item.title} x${item.quantity}</span>
                <span>${itemTotal.toFixed(2)}</span>
            `;
            
            orderSummaryItems.appendChild(orderItem);
        });
        
        // Update total
        orderTotalPrice.textContent = `${total.toFixed(2)}`;
        
        // Show checkout modal
        checkoutModal.classList.add('active');
        cartSidebar.classList.remove('active');
    }
    
    // Close checkout modal
    function closeCheckout() {
        checkoutModal.classList.remove('active');
    }
    
    // Process order
    function processOrder() {
        // Generate random order number
        const orderNum = Math.floor(100000 + Math.random() * 900000);
        orderNumber.textContent = orderNum;
        
        // Close checkout modal and show success
        checkoutModal.classList.remove('active');
        successModal.classList.add('active');
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
    }
    
    // Close success modal
    function closeSuccessModal() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Initialize cart functionality
    initCart();
});
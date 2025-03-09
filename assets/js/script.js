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
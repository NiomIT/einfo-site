
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


// code for  Filter section dropdown functionality
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

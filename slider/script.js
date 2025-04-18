document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const navigation = document.querySelector('.navigation');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create navigation dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('nav-btn');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        navigation.appendChild(dot);
        
        // Add click event to each dot
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
        });
    }
    
    const dots = document.querySelectorAll('.nav-btn');
    
    // Initialize
    updateSlider();
    
    // Event Listeners
    slider.addEventListener('click', function() {
        goToSlide((currentIndex + 1) % slideCount);
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering slider click
        goToSlide((currentIndex - 1 + slideCount) % slideCount);
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering slider click
        goToSlide((currentIndex + 1) % slideCount);
    });
    
    // Functions
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Optional: Auto slide functionality
    // Uncomment to enable auto sliding
    
    let autoSlideInterval = setInterval(() => {
        goToSlide((currentIndex + 1) % slideCount);
    }, 2000);
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            goToSlide((currentIndex + 1) % slideCount);
        }, 2000);
    });
    
});
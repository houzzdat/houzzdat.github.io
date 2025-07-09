// app.js

document.addEventListener('DOMContentLoaded', () => {
    /* =====================
       Slide Navigation
    ====================== */
    const slides = Array.from(document.querySelectorAll('.slide'));
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = Array.from(document.querySelectorAll('.dot'));
    const currentSlideText = document.querySelector('.current-slide');

    let currentSlide = 0;

    function updateNavigation() {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active', 'prev');
            if (idx === currentSlide) {
                slide.classList.add('active');
            } else if (idx < currentSlide) {
                slide.classList.add('prev');
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });

        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        currentSlideText.textContent = currentSlide + 1;
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        updateNavigation();
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = Number(dot.getAttribute('data-slide'));
            goToSlide(idx);
        });
    });

    // Keyboard navigation (arrow keys)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // Initialize navigation on load
    updateNavigation();

    /* =====================
       Charts & Data
    ====================== */
    // Revenue Growth Bar Chart (Slide 7 - index 6)
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['Q2-24', 'Q3-24', 'Q4-24', 'Q1-25'],
            datasets: [{
                label: 'Revenue (₹ Crores)',
                data: [0.66, 1.02, 1.53, 2.61],
                backgroundColor: '#1D3E91',
                hoverBackgroundColor: '#0F1E50',
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) { return '₹' + value + ' Cr'; }
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.parsed.y + ' Cr';
                        }
                    }
                }
            }
        }
    });

    // Fund Deployment Doughnut Chart (Slide 11 - index 10)
    const deploymentCtx = document.getElementById('deploymentChart').getContext('2d');
    const deploymentChart = new Chart(deploymentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Working Capital', 'Sales & Operations', 'Technology'],
            datasets: [{
                data: [70, 15, 15],
                backgroundColor: ['#0F1E50', '#F7931E', '#1D3E91'],
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '60%'
        }
    });
});

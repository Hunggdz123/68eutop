// Animation loading vòng tròn
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const logo = card.querySelector('.logo-center');
        
        // Không xoay - giữ tĩnh ở giữa
        if (logo) {
            logo.style.animation = 'none';
        }
    });

    // Cải thiện cho mobile - Remove hover effect trên touch device
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    };

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        
        // Tối ưu cho mobile
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
});
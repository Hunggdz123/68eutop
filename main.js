// Animation loading vòng tròn
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.background-video');
    const cards = document.querySelectorAll('.service-card');
    
    const applyVideoFallback = function() {
        document.body.classList.add('video-fallback');
        if (video) {
            video.style.display = 'none';
        }
    };

    if (video) {
        const restartVideo = function() {
            try {
                video.currentTime = 0;
                video.play().catch(function() {});
            } catch (error) {
                // ignore
            }
        };

        const scheduleVideoCheck = function(delay) {
            setTimeout(function() {
                if (video.readyState < 2 || video.networkState === 3) {
                    applyVideoFallback();
                    return;
                }
                if (video.paused) {
                    restartVideo();
                }
            }, delay);
        };

        video.addEventListener('error', applyVideoFallback, { once: true });
        video.addEventListener('stalled', function() {
            scheduleVideoCheck(1200);
        });
        video.addEventListener('waiting', function() {
            scheduleVideoCheck(1500);
        });
        video.addEventListener('ended', function() {
            restartVideo();
        });
        video.addEventListener('pause', function() {
            if (document.visibilityState === 'visible') {
                restartVideo();
            }
        });

        video.play().catch(function() {});
    }

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
const { Plugin } = require('obsidian');

module.exports = class MobileSwipeBlocker extends Plugin {
    async onload() {
        let startX = 0;
        let startY = 0;

        this.registerDomEvent(document, 'touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true, capture: true });

        this.registerDomEvent(document, 'touchmove', (e) => {
            if (document.body.classList.contains('is-left-sidebar-open')) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const deltaX = currentX - startX; 
            const deltaY = currentY - startY;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            if (absDeltaX > (absDeltaY * 3) && absDeltaX > 10 && deltaX > 0) {
                if (e.cancelable) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }, { passive: false, capture: true });
    }
};
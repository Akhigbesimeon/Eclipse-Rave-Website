document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('#menu-icon');
    const navmenu = document.querySelector('.navmenu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeBtn = document.querySelector('.close-btn');

    if (menuIcon && navmenu) {
        menuIcon.addEventListener('click', () => {
            navmenu.classList.add('open');
            if (menuOverlay) menuOverlay.classList.add('active');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                navmenu.classList.remove('open');
                if (menuOverlay) menuOverlay.classList.remove('active');
            });
        }

        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                navmenu.classList.remove('open');
                menuOverlay.classList.remove('active');
            });
        }
    }

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('shadow', window.scrollY > 0);
        });
    }
});

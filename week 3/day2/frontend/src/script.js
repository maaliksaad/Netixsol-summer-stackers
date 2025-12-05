document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const toggleBtns = document.querySelectorAll('#toggleBtn');
    
    // Theme initialization
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Theme toggle
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            document.documentElement.classList.toggle('dark', !isDark);
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
        });
    });
    
    // Mobile menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeMobileMenu.addEventListener('click', closeMenu);
    mobileMenuOverlay.addEventListener('click', closeMenu);
    
    document.querySelectorAll('.mobile-menu nav li').forEach(item => {
        item.addEventListener('click', closeMenu);
    });
});
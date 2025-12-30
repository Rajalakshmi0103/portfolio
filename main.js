document.addEventListener('DOMContentLoaded', () => {
  // Element references
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Initialize saved theme
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Mobile menu toggle (matches your navbar's slide-down animation)
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileBtn.getAttribute('aria-expanded') === 'true';
      
      if (isOpen) {
        // Close menu
        mobileMenu.classList.add('hidden', '-translate-y-2', 'opacity-0', 'scale-95');
        mobileMenu.classList.remove('translate-y-0', 'opacity-100', 'scale-100');
        mobileBtn.setAttribute('aria-expanded', 'false');
      } else {
        // Open menu
        mobileMenu.classList.remove('hidden', '-translate-y-2', 'opacity-0', 'scale-95');
        mobileMenu.classList.add('translate-y-0', 'opacity-100', 'scale-100');
        mobileBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Close menu on mobile link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden', '-translate-y-2', 'opacity-0', 'scale-95');
      mobileMenu?.classList.remove('translate-y-0', 'opacity-100', 'scale-100');
      mobileBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (mobileBtn && mobileMenu && 
        !mobileMenu.contains(e.target) && 
        !mobileBtn.contains(e.target) && 
        mobileBtn.getAttribute('aria-expanded') === 'true') {
      mobileMenu.classList.add('hidden', '-translate-y-2', 'opacity-0', 'scale-95');
      mobileMenu.classList.remove('translate-y-0', 'opacity-100', 'scale-100');
      mobileBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

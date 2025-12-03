// assets/js/script.js
// Global JS for Mercuri site
// - Smooth scroll for anchor links
// - Active link highlighting
// - Mobile menu toggle
// - Navbar sticky blur on scroll
// - Placeholder dynamic data
// - Component loading (navbar & footer)

(function(){
  // Helpers
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Smooth scroll for in-page anchors
  function initSmoothScroll(){
    document.addEventListener('click', function(e){
      const a = e.target.closest('a[href^="#"]');
      if(!a) return;
      const href = a.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  }

  // Mobile menu toggle
  function initMobileMenu(){
    const toggle = $('#menu-toggle');
    const mobileMenu = $('#mobile-menu');
    const openIcon = $('#menu-open');
    const closeIcon = $('#menu-close');
    if(!toggle || !mobileMenu) return;

    toggle.addEventListener('click', function(){
      mobileMenu.classList.toggle('show');
      mobileMenu.classList.toggle('hidden');
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    // Close when clicking a mobile link
    $$('.mobile-link').forEach(link=> link.addEventListener('click', ()=>{
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('show');
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }));
  }

  // Active link highlighting based on current path
  function initActiveLinks(){
    const path = window.location.pathname.replace(/\/index.html$/,'/');
    const links = $$('.nav-link').concat($$('.mobile-link'));
    links.forEach(link=>{
      try{
        const href = new URL(link.href);
        const linkPath = href.pathname;
        if(linkPath === path || (linkPath === '/' && (path === '/' || path === '')) ){
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }catch(e){ /* ignore invalid hrefs */ }
    });
  }

  // Navbar sticky blur on scroll
  function initNavbarScroll(){
    const nav = $('#site-navbar');
    if(!nav) return;
    function onScroll(){
      if(window.scrollY > 12) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Load HTML component
  async function loadComponent(id, file){
    const el = document.getElementById(id);
    if(el){
      const response = await fetch(`/components/${file}`);
      el.innerHTML = await response.text();
    }
  }

  // Initialize everything after DOM and components loaded
  document.addEventListener("DOMContentLoaded", async () => {
    // Load components
    await loadComponent("navbar", "navbar.html");
    await loadComponent("footer", "footer.html");

    // Initialize after navbar exists in DOM
    initMobileMenu();
    initSmoothScroll();
    initActiveLinks();
    initNavbarScroll();

    // Placeholder dynamic data example
    fetchLiveCounts().then(data=>{
      const memberCounter = document.getElementById('member-counter');
      if(memberCounter) memberCounter.textContent = data.members;
      console.debug('Live counts (placeholder):', data);
    }).catch(()=>{});
  });

})();

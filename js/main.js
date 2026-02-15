(() => {
  const panels = document.querySelectorAll('.panel');
  const tabs = document.querySelectorAll('.nav-tab');
  const track = document.getElementById('panels-track');
  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const langBtn = document.getElementById('lang-toggle');

  let currentPanel = 0;
  let lang = 'es';

  // --- Vertical slides state per panel ---
  const panelSlides = []; // { slides: NodeList, track: el, dots: el, current: number }

  function initSlides() {
    panels.forEach((panel, pi) => {
      const scroll = panel.querySelector('.panel-scroll');
      const children = Array.from(scroll.children);

      // Create slides track
      const slidesTrack = document.createElement('div');
      slidesTrack.className = 'slides-track';

      // Wrap each direct child in a .slide
      children.forEach((child, ci) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (ci === 0) slide.classList.add('active-slide');

        // Wrap child content in slide-content for entrance animation
        const content = document.createElement('div');
        content.className = 'slide-content';
        content.appendChild(child);
        slide.appendChild(content);
        slidesTrack.appendChild(slide);
      });

      scroll.appendChild(slidesTrack);

      // Create dot indicators
      const dots = document.createElement('div');
      dots.className = 'slide-dots';
      const slideEls = slidesTrack.querySelectorAll('.slide');

      slideEls.forEach((_, di) => {
        const dot = document.createElement('button');
        dot.className = 'slide-dot' + (di === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${di + 1}`);
        dot.addEventListener('click', () => goToSlide(pi, di));
        dots.appendChild(dot);
      });
      scroll.appendChild(dots);

      panelSlides.push({
        slides: slideEls,
        track: slidesTrack,
        dots: dots,
        current: 0,
        scrollEl: scroll
      });
    });
  }

  // --- Navigate to a vertical slide within a panel ---
  let isAnimating = false;

  function goToSlide(panelIdx, slideIdx) {
    const ps = panelSlides[panelIdx];
    if (!ps || slideIdx < 0 || slideIdx >= ps.slides.length) return;
    if (slideIdx === ps.current && isAnimating) return;

    isAnimating = true;
    const prev = ps.current;
    ps.current = slideIdx;

    // Move track
    const panelHeight = ps.scrollEl.offsetHeight;
    ps.track.style.transform = `translateY(-${slideIdx * panelHeight}px)`;

    // Update dots
    ps.dots.querySelectorAll('.slide-dot').forEach((d, i) => {
      d.classList.toggle('active', i === slideIdx);
    });

    // Deactivate old slide
    ps.slides[prev].classList.remove('active-slide');

    // Activate new slide after a brief delay for the transform to start
    setTimeout(() => {
      ps.slides[slideIdx].classList.add('active-slide');
    }, 100);

    // Reset scroll inside the slide (if it has overflow)
    ps.slides[slideIdx].scrollTop = 0;

    // Allow next transition after animation completes
    setTimeout(() => {
      isAnimating = false;
    }, 850);
  }

  // --- Wheel event handling ---
  let wheelTimeout = null;
  let accumulatedDelta = 0;
  const WHEEL_THRESHOLD = 50;

  function handleWheel(e) {
    if (isAnimating) {
      e.preventDefault();
      return;
    }

    const ps = panelSlides[currentPanel];
    if (!ps) return;

    const currentSlide = ps.slides[ps.current];

    // Check if the current slide has scrollable content
    const hasOverflow = currentSlide.scrollHeight > currentSlide.clientHeight + 2;

    if (hasOverflow) {
      const atTop = currentSlide.scrollTop <= 1;
      const atBottom = currentSlide.scrollTop + currentSlide.clientHeight >= currentSlide.scrollHeight - 2;

      // Allow native scroll if content is scrollable and not at edges
      if (e.deltaY < 0 && !atTop) return;
      if (e.deltaY > 0 && !atBottom) return;
    }

    // Prevent default scroll
    e.preventDefault();

    // Accumulate delta to avoid micro-scroll triggers
    accumulatedDelta += e.deltaY;

    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      accumulatedDelta = 0;
    }, 200);

    if (Math.abs(accumulatedDelta) < WHEEL_THRESHOLD) return;

    const direction = accumulatedDelta > 0 ? 1 : -1;
    accumulatedDelta = 0;

    const nextSlide = ps.current + direction;
    if (nextSlide >= 0 && nextSlide < ps.slides.length) {
      goToSlide(currentPanel, nextSlide);
    }
  }

  // --- Touch handling for mobile ---
  let touchStartY = 0;
  let touchStartTime = 0;

  function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }

  function handleTouchEnd(e) {
    if (isAnimating) return;
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    const deltaTime = Date.now() - touchStartTime;

    // Need a meaningful swipe (50px or fast)
    if (Math.abs(deltaY) < 50 && deltaTime > 300) return;
    if (Math.abs(deltaY) < 20) return;

    const ps = panelSlides[currentPanel];
    if (!ps) return;

    const currentSlide = ps.slides[ps.current];
    const hasOverflow = currentSlide.scrollHeight > currentSlide.clientHeight + 2;

    if (hasOverflow) {
      const atTop = currentSlide.scrollTop <= 1;
      const atBottom = currentSlide.scrollTop + currentSlide.clientHeight >= currentSlide.scrollHeight - 2;
      if (deltaY < 0 && !atTop) return;
      if (deltaY > 0 && !atBottom) return;
    }

    const direction = deltaY > 0 ? 1 : -1;
    const nextSlide = ps.current + direction;
    if (nextSlide >= 0 && nextSlide < ps.slides.length) {
      goToSlide(currentPanel, nextSlide);
    }
  }

  // --- Tab navigation (horizontal) ---
  function goToPanel(index) {
    if (index < 0 || index >= panels.length) return;
    currentPanel = index;
    track.style.transform = `translateX(-${index * 100}vw)`;

    tabs.forEach((t, i) => t.classList.toggle('active', i === index));
    panels.forEach((p, i) => p.classList.toggle('active', i === index));

    // Reset to first slide of the panel
    const ps = panelSlides[index];
    if (ps && ps.current !== 0) {
      // Quick reset without animation
      ps.slides[ps.current].classList.remove('active-slide');
      ps.current = 0;
      ps.track.style.transition = 'none';
      ps.track.style.transform = 'translateY(0)';
      ps.dots.querySelectorAll('.slide-dot').forEach((d, i) => {
        d.classList.toggle('active', i === 0);
      });
      // Re-enable transition after reset
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ps.track.style.transition = '';
        });
      });
    }

    // Activate first slide's content
    if (ps) {
      ps.slides.forEach(s => s.classList.remove('active-slide'));
      setTimeout(() => {
        ps.slides[0].classList.add('active-slide');
      }, 200);
    }

    // Close mobile menu
    menuBtn.classList.remove('open');
    nav.classList.remove('open');
  }

  // --- Recalc slide positions on resize ---
  function onResize() {
    panelSlides.forEach((ps, pi) => {
      if (ps.current > 0) {
        const panelHeight = ps.scrollEl.offsetHeight;
        ps.track.style.transition = 'none';
        ps.track.style.transform = `translateY(-${ps.current * panelHeight}px)`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ps.track.style.transition = '';
          });
        });
      }
    });
  }

  // --- Initialize ---
  initSlides();

  // Bind events
  document.addEventListener('wheel', handleWheel, { passive: false });
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  window.addEventListener('resize', onResize);

  // Tab clicks
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => goToPanel(i));
  });

  // Logo click
  document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    goToPanel(0);
  });

  // data-go-tab buttons (need to re-bind after slides init moved them)
  document.querySelectorAll('[data-go-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-go-tab');
      const tabNames = ['inicio', 'como-trabajamos', 'casos', 'contacto'];
      const idx = tabNames.indexOf(target);
      if (idx !== -1) goToPanel(idx);
    });
  });

  // Init first panel
  panels[0].classList.add('active');
  // Activate first slide of first panel
  setTimeout(() => {
    const ps = panelSlides[0];
    if (ps) ps.slides[0].classList.add('active-slide');
  }, 200);

  // --- Mobile menu ---
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // --- Language toggle ---
  function setLang(newLang) {
    lang = newLang;
    langBtn.innerHTML = lang === 'es'
      ? '<svg class="lang-flag" viewBox="0 0 20 14"><rect width="20" height="14" rx="2" fill="#012169"/><path d="M0 0L20 14M20 0L0 14" stroke="#fff" stroke-width="2.5"/><path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" stroke-width="1.5"/><path d="M10 0V14M0 7H20" stroke="#fff" stroke-width="4"/><path d="M10 0V14M0 7H20" stroke="#C8102E" stroke-width="2.5"/></svg> EN'
      : '<svg class="lang-flag" viewBox="0 0 20 14"><rect width="20" height="14" rx="2" fill="#c60b1e"/><rect y="4" width="20" height="6" fill="#ffc400"/></svg> ES';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-es]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text && el.children.length === 0) {
        el.textContent = text;
      }
    });

    document.title = lang === 'es'
      ? 'Braced Engineering — Software interno estructurado'
      : 'Braced Engineering — Structured internal software';
  }

  langBtn.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

  // --- Particles ---
  function createParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = (Math.random() * 100 + 100) + '%';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      container.appendChild(particle);
    }
  }

  createParticles('particles-hero', 30);

  // --- Contact form ---
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    const original = btn.textContent;
    btn.textContent = lang === 'es' ? 'Enviado' : 'Sent';
    btn.style.background = '#27ae60';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 2000);
  });

  // --- Keyboard nav ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToPanel(currentPanel + 1);
    if (e.key === 'ArrowLeft') goToPanel(currentPanel - 1);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ps = panelSlides[currentPanel];
      if (ps) goToSlide(currentPanel, ps.current + 1);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ps = panelSlides[currentPanel];
      if (ps) goToSlide(currentPanel, ps.current - 1);
    }
  });

})();

(() => {
  const panels = document.querySelectorAll('.panel');
  const tabs = document.querySelectorAll('.nav-tab');
  const track = document.getElementById('panels-track');
  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const langBtn = document.getElementById('lang-toggle');

  let currentPanel = 0;
  let lang = 'es';

  // Mobile detection based on viewport width
  function isMobile() {
    return window.innerWidth <= 768;
  }

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

      // Create dot indicators with icons
      const dots = document.createElement('div');
      dots.className = 'slide-dots';
      const slideEls = slidesTrack.querySelectorAll('.slide');

      // Icon mapping per panel and slide
      const slideIcons = {
        0: ['fa-solid fa-house', 'fa-solid fa-triangle-exclamation', 'fa-solid fa-gear', 'fa-solid fa-euro-sign'], // Inicio
        1: ['fa-solid fa-diagram-project', 'fa-solid fa-list-check', 'fa-solid fa-shield-halved'], // Cómo trabajamos
        2: ['fa-solid fa-microchip', 'fa-solid fa-chart-line', 'fa-solid fa-briefcase'], // Capacidades técnicas (3 slides)
        3: ['fa-brands fa-stack-exchange'], // FAQ
        4: ['fa-solid fa-comments'] // Contacto
      };

      slideEls.forEach((_, di) => {
        const dot = document.createElement('button');
        dot.className = 'slide-dot' + (di === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${di + 1}`);
        
        // Add icon
        const icon = document.createElement('i');
        const panelIcons = slideIcons[pi] || [];
        icon.className = panelIcons[di] || 'fa-solid fa-circle';
        dot.appendChild(icon);
        
        dot.addEventListener('click', () => goToSlide(pi, di));
        dots.appendChild(dot);
      });
      scroll.appendChild(dots);

      // Add scroll down indicators
      slideEls.forEach((slide, si) => {
        // Don't add to last slide (if this is not the last slide)
        if (si < slideEls.length - 1) {
          const scrollIndicator = document.createElement('div');
          scrollIndicator.className = 'scroll-indicator';
          
          // Add text only to first slide of first panel (hero)
          if (pi === 0 && si === 0) {
            const textEl = document.createElement('span');
            textEl.className = 'scroll-indicator-text';
            textEl.setAttribute('data-es', 'Descubre más');
            textEl.setAttribute('data-en', 'Discover more');
            textEl.textContent = lang === 'es' ? 'Descubre más' : 'Discover more';
            scrollIndicator.appendChild(textEl);
          }
          
          const iconEl = document.createElement('i');
          iconEl.className = 'fa-regular fa-circle-down';
          scrollIndicator.appendChild(iconEl);
          
          scrollIndicator.addEventListener('click', () => {
            goToSlide(pi, si + 1);
          });
          
          // Append to slide-content instead of slide directly
          const slideContent = slide.querySelector('.slide-content');
          if (slideContent) {
            slideContent.appendChild(scrollIndicator);
          } else {
            slide.appendChild(scrollIndicator);
          }
        }
      });

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

    // On mobile: CSS handles display:none/block via .active class
    // On desktop: horizontal transform
    if (!isMobile()) {
      track.style.transform = `translateX(-${index * 100}vw)`;
    }

    tabs.forEach((t, i) => t.classList.toggle('active', i === index));
    panels.forEach((p, i) => p.classList.toggle('active', i === index));

    // Reset to first slide of the panel (desktop only)
    if (!isMobile()) {
      const ps = panelSlides[index];
      if (ps && ps.current !== 0) {
        ps.slides[ps.current].classList.remove('active-slide');
        ps.current = 0;
        ps.track.style.transition = 'none';
        ps.track.style.transform = 'translateY(0)';
        ps.dots.querySelectorAll('.slide-dot').forEach((d, i) => {
          d.classList.toggle('active', i === 0);
        });
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
    }

    // On mobile: scroll to top of page
    if (isMobile()) {
      window.scrollTo({ top: 0, behavior: 'instant' });
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

  // Bind events - only desktop slide navigation
  if (!isMobile()) {
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
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
      const tabNames = ['inicio', 'como-trabajamos', 'casos', 'faq', 'contacto'];
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
    
    // Save language preference
    localStorage.setItem('braced_lang', lang);
  }

  // Load saved language preference
  const savedLang = localStorage.getItem('braced_lang');
  if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
    setLang(savedLang);
  }

  langBtn.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

  // --- Hero canvas background ---
  (function() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let cW, cH;
    const CDIST = 90;
    const ANG = 60 * Math.PI / 180;
    const cosA = Math.cos(ANG), sinA = Math.sin(ANG);

    function cResize() {
      const hero = canvas.closest('.hero');
      cW = canvas.width = hero ? hero.offsetWidth : window.innerWidth;
      cH = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    }

    function sampleBrace(cx, cy, h, count) {
      const w = h*0.16, tipW = h*0.25, pts = [];
      for (let i = 0; i <= count; i++) {
        const t = i/count; let x, y;
        if (t<=0.08){const l=t/0.08;x=cx+w*0.3+w*0.7*(1-l);y=cy-h/2+h*0.02*l*l;}
        else if(t<=0.42){const l=(t-0.08)/0.34;x=cx+w*0.3-w*0.05*Math.sin(l*Math.PI);y=cy-h/2+h*0.02+h*0.44*l;}
        else if(t<=0.5){const l=(t-0.42)/0.08,e=l*l*(3-2*l);x=cx+w*0.3-tipW*e;y=cy-h*0.04+h*0.08*e;}
        else if(t<=0.58){const l=(t-0.5)/0.08,e=l*l*(3-2*l);x=cx+w*0.3-tipW*(1-e);y=cy+h*0.04-h*0.08*(1-e);}
        else if(t<=0.92){const l=(t-0.58)/0.34;x=cx+w*0.3-w*0.05*Math.sin(l*Math.PI);y=cy+h*0.04+h*0.44*l;}
        else{const l=(t-0.92)/0.08;x=cx+w*0.3+w*0.7*l;y=cy+h/2-h*0.02*(1-l)*(1-l);}
        const rx=cx+(x-cx)*cosA-(y-cy)*sinA, ry=cy+(x-cx)*sinA+(y-cy)*cosA;
        pts.push({x:rx,y:ry});
      }
      return pts;
    }

    let gCols, gRows, gGrid;
    function buildGrid(nodes) {
      gCols=Math.ceil(cW/CDIST)+1; gRows=Math.ceil(cH/CDIST)+1;
      gGrid=new Array(gCols*gRows);
      for(let i=0;i<gGrid.length;i++) gGrid[i]=[];
      for(let i=0;i<nodes.length;i++){
        const n=nodes[i],col=Math.floor(n.x/CDIST),row=Math.floor(n.y/CDIST);
        if(col>=0&&col<gCols&&row>=0&&row<gRows) gGrid[row*gCols+col].push(i);
      }
    }

    let hNodes=[], bTargets=[], hStart, hTime=0, hLastAssign=0;
    const CONV_MS=10000;

    function hInit() {
      hNodes=[]; bTargets=[];
      const cx=cW*0.5, cy=cH*0.47, bH=Math.min(cH*0.76,640);
      sampleBrace(cx,cy,bH,55).forEach(p=>{
        bTargets.push({x:p.x,y:p.y});
        if(Math.random()<0.35) bTargets.push({x:p.x+(Math.random()-0.5)*8,y:p.y+(Math.random()-0.5)*8});
      });
      // Reduce particles on mobile for better performance
      const mobileFactor = isMobile() ? 4000 : 1800;
      const mobileMax = isMobile() ? 400 : 1500;
      const total=Math.min(Math.floor(cW*cH/mobileFactor),mobileMax);
      for(let i=0;i<total;i++){
        const gx=(Math.random()+Math.random()+Math.random())/3;
        const gy=(Math.random()+Math.random()+Math.random())/3;
        hNodes.push({
          x:cx+(gx-0.5)*cW*1.4, y:cy+(gy-0.5)*cH*1.4,
          vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25,
          r:Math.random()*1.4+0.2, baseAlpha:Math.random()*0.38+0.02, alpha:0,
          phase:Math.random()*Math.PI*2, braceIdx:-1,
          driftR:Math.random()*7+2, driftSpd:Math.random()*0.15+0.06
        });
      }
      hStart=performance.now(); hLastAssign=0;
    }

    function assignBrace() {
      hNodes.forEach(n=>n.braceIdx=-1);
      const taken=new Uint8Array(hNodes.length);
      for(let ti=0;ti<bTargets.length;ti++){
        const t=bTargets[ti]; let best=Infinity,bi=-1;
        for(let ni=0;ni<hNodes.length;ni++){
          if(taken[ni]) continue;
          const dx=hNodes[ni].x-t.x,dy=hNodes[ni].y-t.y,d=dx*dx+dy*dy;
          if(d<best){best=d;bi=ni;}
        }
        if(bi!==-1){hNodes[bi].braceIdx=ti;taken[bi]=1;}
      }
    }

    function hDraw() {
      ctx.clearRect(0,0,cW,cH);
      const elapsed=performance.now()-hStart;
      const conv=Math.pow(Math.min(elapsed/CONV_MS,1),2);
      if(elapsed-hLastAssign>2000){assignBrace();hLastAssign=elapsed;}

      const cx=cW/2,cy=cH*0.47;
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,cH*0.55);
      g.addColorStop(0,`rgba(0,180,216,${0.008+conv*0.018})`);
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g; ctx.fillRect(0,0,cW,cH);

      hTime+=0.01;
      for(let i=0;i<hNodes.length;i++){
        const n=hNodes[i];
        if(n.braceIdx>=0&&conv>0.01){
          const t=bTargets[n.braceIdx];
          const bx=Math.sin(hTime*n.driftSpd+n.phase)*n.driftR;
          const by=Math.cos(hTime*n.driftSpd*0.7+n.phase)*n.driftR*0.5;
          const str=conv*0.01;
          n.x+=(t.x+bx-n.x)*str; n.y+=(t.y+by-n.y)*str;
          n.x+=n.vx*(1-conv*0.7); n.y+=n.vy*(1-conv*0.7);
        } else { n.x+=n.vx; n.y+=n.vy; }
        if(n.x<-20)n.x=cW+20;if(n.x>cW+20)n.x=-20;
        if(n.y<-20)n.y=cH+20;if(n.y>cH+20)n.y=-20;
        n.alpha=n.baseAlpha+Math.sin(hTime*0.7+n.phase)*0.02;
      }

      buildGrid(hNodes);
      const maxD2=CDIST*CDIST;
      ctx.lineWidth=0.4;
      for(let row=0;row<gRows;row++){
        for(let col=0;col<gCols;col++){
          const cell=gGrid[row*gCols+col];
          for(let dc=0;dc<=1;dc++){for(let dr=0;dr<=1;dr++){
            if(dc===0&&dr===0){
              for(let a=0;a<cell.length;a++)for(let b=a+1;b<cell.length;b++){
                const ni=hNodes[cell[a]],nj=hNodes[cell[b]];
                const dx=ni.x-nj.x,dy=ni.y-nj.y,d2=dx*dx+dy*dy;
                if(d2<maxD2){ctx.beginPath();ctx.moveTo(ni.x,ni.y);ctx.lineTo(nj.x,nj.y);ctx.strokeStyle=`rgba(0,180,216,${(1-Math.sqrt(d2)/CDIST)*0.06})`;ctx.stroke();}
              }
            } else {
              const nr=row+dr,nc=col+dc;
              if(nr<0||nr>=gRows||nc<0||nc>=gCols) continue;
              const other=gGrid[nr*gCols+nc];
              for(let a=0;a<cell.length;a++)for(let b=0;b<other.length;b++){
                const ni=hNodes[cell[a]],nj=hNodes[other[b]];
                const dx=ni.x-nj.x,dy=ni.y-nj.y,d2=dx*dx+dy*dy;
                if(d2<maxD2){ctx.beginPath();ctx.moveTo(ni.x,ni.y);ctx.lineTo(nj.x,nj.y);ctx.strokeStyle=`rgba(0,180,216,${(1-Math.sqrt(d2)/CDIST)*0.06})`;ctx.stroke();}
              }
            }
          }}
          if(row+1<gRows&&col-1>=0){
            const other=gGrid[(row+1)*gCols+(col-1)];
            for(let a=0;a<cell.length;a++)for(let b=0;b<other.length;b++){
              const ni=hNodes[cell[a]],nj=hNodes[other[b]];
              const dx=ni.x-nj.x,dy=ni.y-nj.y,d2=dx*dx+dy*dy;
              if(d2<maxD2){ctx.beginPath();ctx.moveTo(ni.x,ni.y);ctx.lineTo(nj.x,nj.y);ctx.strokeStyle=`rgba(0,180,216,${(1-Math.sqrt(d2)/CDIST)*0.06})`;ctx.stroke();}
            }
          }
        }
      }

      for(let i=0;i<hNodes.length;i++){
        const n=hNodes[i],a=n.alpha;
        if(a>0.1){ctx.beginPath();ctx.arc(n.x,n.y,n.r*2.5,0,Math.PI*2);ctx.fillStyle=`rgba(0,180,216,${a*0.05})`;ctx.fill();}
        ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,180,216,${a})`;ctx.fill();
      }
      requestAnimationFrame(hDraw);
    }

    cResize(); hInit(); hDraw();
    window.addEventListener('resize', () => { cResize(); hInit(); });
  })();

  // --- Email Copy to Clipboard ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailFeedback = document.querySelector('.email-copied-feedback');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'team@bracedeng.com';
      
      try {
        await navigator.clipboard.writeText(email);
        
        // Show feedback
        emailFeedback.classList.add('show');
        
        // Hide after animation
        setTimeout(() => {
          emailFeedback.classList.remove('show');
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          emailFeedback.classList.add('show');
          setTimeout(() => {
            emailFeedback.classList.remove('show');
          }, 2000);
        } catch (e) {
          console.error('Copy failed', e);
        }
        document.body.removeChild(textarea);
      }
    });
  }

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

  // --- Cookie Consent & Google Analytics ---
  (function() {
    const CONSENT_KEY = 'braced_cookie_consent';
    const GA_ID = 'G-JBMBCNVEHT';

    // Google Analytics loader function
    function loadGoogleAnalytics() {
      if (window.gtag) return; // Already loaded

      // Create and load gtag script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script1);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_ID);

      console.log('Google Analytics loaded');
    }

    // Check consent status
    const consent = localStorage.getItem(CONSENT_KEY);
    
    if (consent === 'accepted') {
      // User already accepted - load GA immediately
      loadGoogleAnalytics();
    } else if (consent === 'rejected') {
      // User rejected - do nothing
      console.log('Cookies rejected by user');
    } else {
      // No decision yet - show banner
      const banner = document.getElementById('cookie-banner');
      const acceptBtn = document.getElementById('cookie-accept');
      const rejectBtn = document.getElementById('cookie-reject');

      if (banner) {
        banner.style.display = 'block';

        acceptBtn.addEventListener('click', () => {
          localStorage.setItem(CONSENT_KEY, 'accepted');
          banner.style.display = 'none';
          loadGoogleAnalytics();
        });

        rejectBtn.addEventListener('click', () => {
          localStorage.setItem(CONSENT_KEY, 'rejected');
          banner.style.display = 'none';
        });
      }
    }
  })();

})();

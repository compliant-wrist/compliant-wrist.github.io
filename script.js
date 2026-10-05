(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const loops = [...document.querySelectorAll('video.loop')];
  const manualPause = new WeakSet();
  const inView = new WeakSet();
  function play(video) { video.play().catch(() => {}); }
  function updateButton(video) {
    const button = document.querySelector(`[data-video="${video.id}"]`);
    if (button) { button.textContent = video.paused ? 'Play clip' : 'Pause clip'; button.setAttribute('aria-pressed', String(!video.paused)); }
  }
  loops.forEach(video => {
    video.muted = true;
    ['play', 'pause'].forEach(event => video.addEventListener(event, () => updateButton(video)));
    const button = document.querySelector(`[data-video="${video.id}"]`);
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      if (video.paused) { manualPause.delete(video); play(video); }
      else { manualPause.add(video); video.pause(); }
    });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        inView.add(video);
        if (!reducedMotion.matches && !manualPause.has(video) && !document.hidden) play(video);
      } else { inView.delete(video); video.pause(); }
    }), { threshold: 0.3 });
    loops.forEach(video => observer.observe(video));
  }
  document.addEventListener('visibilitychange', () => loops.forEach(video => {
    if (document.hidden) video.pause();
    else if (inView.has(video) && !manualPause.has(video) && !reducedMotion.matches) play(video);
  }));
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) loops.forEach(video => video.pause()); });

  const moduleChoices = [...document.querySelectorAll('[data-module]')];
  const moduleStatus = document.getElementById('module-selection-status');
  moduleChoices.forEach((button, index) => {
    const name = button.querySelector('.module-name').textContent;
    const subtitle = button.querySelector('.module-shape');
    const shape = subtitle.textContent;
    function flip() {
      const flipped = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(flipped));
      button.setAttribute('aria-label', flipped ? `${name}: six-axis stiffness profile shown. Show module shape` : `${name}: show six-axis stiffness profile`);
      subtitle.textContent = flipped ? 'Six-axis stiffness' : shape;
      button.querySelector('.module-flip-hint').textContent = flipped ? 'Back to shape ↶' : 'View stiffness ↗';
      const count = moduleChoices.filter(choice => choice.getAttribute('aria-pressed') === 'true').length;
      moduleStatus.textContent = `${name} now shows its ${flipped ? 'stiffness profile' : 'module shape'}. ${count} of 3 stiffness profiles are open.`;
    }
    button.addEventListener('click', flip);
    button.addEventListener('keydown', event => {
      const keys = { ArrowRight: (index + 1) % moduleChoices.length, ArrowLeft: (index + moduleChoices.length - 1) % moduleChoices.length, Home: 0, End: moduleChoices.length - 1 };
      if (event.key in keys) {
        event.preventDefault();
        moduleChoices[keys[event.key]].focus();
      } else if (event.key === 'Escape' && button.getAttribute('aria-pressed') === 'true') {
        event.preventDefault();
        flip();
      }
    });
  });

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function selectTab(selected, moveFocus = false) {
    tabs.forEach(tab => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !active;
      if (!active) panel.querySelector('video').pause();
    });
    if (moveFocus) selected.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
    });
  });

  const fullVideo = document.getElementById('full-video');
  document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click', () => {
    const start = () => { fullVideo.currentTime = Number(button.dataset.time); play(fullVideo); };
    if (fullVideo.readyState >= 1) start();
    else { fullVideo.addEventListener('loadedmetadata', start, { once: true }); fullVideo.load(); }
    fullVideo.scrollIntoView({ block: 'center', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }));

  const lightbox = document.getElementById('lightbox');
  document.querySelectorAll('.zoom').forEach(link => link.addEventListener('click', event => {
    if (!lightbox.showModal) return;
    event.preventDefault();
    const img = lightbox.querySelector('img');
    img.src = link.href;
    img.alt = link.querySelector('img').alt;
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  }));
  lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close', () => { document.body.style.overflow = ''; });

  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.section-nav a')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-20% 0px -65% 0px' });
    links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
})();

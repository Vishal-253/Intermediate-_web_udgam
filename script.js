/**
 * UDGAM 2026 — "CHASE THE BLOOM" CORE SCRIPTS (DARK THEME EDITION)
 * Bioluminescent petal canvas, glowing lerp cursor insects,
 * flying starlit cranes, modals, filtering, timeline, and audio synthesis.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. FULLPAGE GLOWING PETALS CANVAS ENGINE (DARK NIGHT SKY)
     ========================================================================== */
  const canvas = document.getElementById('petal-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track mouse for gentle petal wind deflection
  let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.vx = (e.clientX - mouse.lastX) * 0.1;
    mouse.vy = (e.clientY - mouse.lastY) * 0.1;
    mouse.lastX = mouse.x = e.clientX;
    mouse.lastY = mouse.y = e.clientY;
  });

  class Petal {
    constructor(isSpawnFromTree = false) {
      this.reset(isSpawnFromTree);
    }

    reset(isSpawnFromTree = false) {
      if (isSpawnFromTree) {
        this.x = width * 0.65 + (Math.random() * 200 - 100);
        this.y = Math.random() * (height * 0.5);
      } else {
        this.x = Math.random() * (width + 200) - 100;
        this.y = Math.random() * -height;
      }

      this.size = 12 + Math.random() * 15;
      this.speedY = 0.8 + Math.random() * 1.7;
      this.speedX = 0.5 + Math.random() * 1.3;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.035;
      this.flip = Math.random() * Math.PI * 2;
      this.flipSpeed = 0.02 + Math.random() * 0.03;
      this.opacity = 0.55 + Math.random() * 0.4;
      this.swayFreq = 0.001 + Math.random() * 0.002;
      this.swayPhase = Math.random() * Math.PI * 2;

      // Luminous neon & moonlight color tones for night backdrop
      const shades = [
        { r: 255, g: 107, b: 139 }, // vivid sakura pink
        { r: 255, g: 183, b: 197 }, // luminous cherry blossom
        { r: 255, g: 133, b: 162 }, // glowing rose
        { r: 255, g: 230, b: 242 }, // starlit moonlight white
        { r: 240, g: 194, b: 138 }  // warm golden amber spark
      ];
      this.color = shades[Math.floor(Math.random() * shades.length)];
    }

    update(time) {
      this.angle += this.angularSpeed;
      this.flip += this.flipSpeed;

      const sway = Math.sin(time * this.swayFreq + this.swayPhase) * 0.85;
      this.x += this.speedX + sway;
      this.y += this.speedY;

      // Mouse draft deflection
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const force = (140 - dist) / 140;
        this.x += (dx / dist) * force * 4.5 + mouse.vx * 0.35;
        this.y += (dy / dist) * force * 3.5 + mouse.vy * 0.35;
      }

      if (this.y > height + 50 || this.x > width + 100 || this.x < -100) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      const scaleY = Math.sin(this.flip);
      ctx.scale(1, scaleY);

      // Night Petal Glow
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.7)`;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      const s = this.size;
      ctx.moveTo(0, -s * 0.6);
      ctx.bezierCurveTo(-s * 0.5, -s * 0.8, -s * 0.7, -s * 0.1, -s * 0.3, s * 0.6);
      ctx.bezierCurveTo(-s * 0.1, s * 0.9, 0, s, 0, s);
      ctx.bezierCurveTo(0, s, s * 0.1, s * 0.9, s * 0.3, s * 0.6);
      ctx.bezierCurveTo(s * 0.7, -s * 0.1, s * 0.5, -s * 0.8, 0, -s * 0.6);

      const grad = ctx.createRadialGradient(0, s * 0.2, 1, 0, 0, s);
      grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
      grad.addColorStop(0.8, `rgba(255, 107, 139, ${this.opacity * 0.85})`);
      grad.addColorStop(1, `rgba(212, 165, 116, ${this.opacity * 0.6})`);

      ctx.fillStyle = grad;
      ctx.fill();

      // Vein
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.8);
      ctx.lineTo(0, -s * 0.3);
      ctx.stroke();

      ctx.restore();
    }
  }

  const petalCount = Math.min(Math.floor(window.innerWidth / 28), 50);
  const petals = [];
  for (let i = 0; i < petalCount; i++) {
    const p = new Petal(false);
    p.y = Math.random() * height;
    petals.push(p);
  }

  function animatePetals(time) {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      petals[i].update(time);
      petals[i].draw();
    }

    requestAnimationFrame(animatePetals);
  }
  requestAnimationFrame(animatePetals);

  setInterval(() => {
    if (petals.length < 60) {
      petals.push(new Petal(true));
    }
  }, 3500);

  /* ==========================================================================
     2. BIOLUMINESCENT CURSOR-FOLLOWING INSECTS (LERP & WING FLUTTER)
     ========================================================================== */
  const butterfly = document.getElementById('insect-butterfly');
  const bee = document.getElementById('insect-bee');

  if (butterfly && bee && window.matchMedia('(pointer: fine)').matches) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let bPos = { x: targetX, y: targetY };
    let beePos = { x: targetX, y: targetY };
    let hasMoved = false;
    let lastMoveTime = Date.now();

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastMoveTime = Date.now();
      if (!hasMoved) {
        hasMoved = true;
        butterfly.classList.add('active');
        bee.classList.add('active');
      }
    });

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    let insectAnimTime = 0;
    function updateInsects() {
      insectAnimTime += 0.02;
      const idle = Date.now() - lastMoveTime > 400;

      let idleOffsetX = 0;
      let idleOffsetY = 0;
      let idleBeeX = 0;
      let idleBeeY = 0;

      if (idle) {
        idleOffsetX = Math.sin(insectAnimTime * 1.5) * 24;
        idleOffsetY = Math.sin(insectAnimTime * 3) * 14;
        idleBeeX = Math.cos(insectAnimTime * 2) * 20;
        idleBeeY = Math.sin(insectAnimTime * 2) * 18;
      }

      const targetBX = targetX - 35 + idleOffsetX;
      const targetBY = targetY - 25 + idleOffsetY;
      bPos.x = lerp(bPos.x, targetBX, 0.055);
      bPos.y = lerp(bPos.y, targetBY, 0.055);

      const targetBeeX = targetX + 30 + idleBeeX;
      const targetBeeY = targetY + 20 + idleBeeY;
      beePos.x = lerp(beePos.x, targetBeeX, 0.04);
      beePos.y = lerp(beePos.y, targetBeeY, 0.04);

      const bVx = targetBX - bPos.x;
      const bAngle = Math.max(Math.min(bVx * 0.8, 25), -25);

      butterfly.style.transform = `translate(${bPos.x}px, ${bPos.y}px) rotate(${bAngle}deg)`;
      bee.style.transform = `translate(${beePos.x}px, ${beePos.y}px)`;

      requestAnimationFrame(updateInsects);
    }
    requestAnimationFrame(updateInsects);
  }

  /* ==========================================================================
     3. STARLIT FLYING CRANES ACROSS NIGHT SKY
     ========================================================================== */
  const birdsContainer = document.getElementById('hero-birds');

  function spawnCranes() {
    if (!birdsContainer) return;
    birdsContainer.innerHTML = '';

    const birdCount = 3;
    for (let i = 0; i < birdCount; i++) {
      const crane = document.createElement('div');
      crane.className = 'flying-crane';
      crane.style.animationDelay = `${i * 1.8}s`;
      crane.style.top = `${15 + i * 12}%`;

      crane.innerHTML = `
        <svg viewBox="0 0 48 36" width="40" height="30" fill="none">
          <g stroke="#FFF0F5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" filter="drop-shadow(0 0 6px rgba(255, 183, 197, 0.8))">
            <path d="M12 20 C18 18 28 17 38 14" />
            <path d="M38 14 C42 13 45 11 47 10" />
            <path class="crane-wing" d="M22 18 C26 8 32 3 36 2 C28 9 24 15 22 18" fill="rgba(255, 183, 197, 0.5)" />
            <path class="crane-wing" d="M20 19 C15 11 8 6 4 4 C11 11 16 16 20 19" fill="rgba(255, 183, 197, 0.4)" />
            <path d="M12 20 C6 22 3 25 1 27" />
          </g>
        </svg>
      `;
      birdsContainer.appendChild(crane);
    }
  }

  spawnCranes();
  setInterval(spawnCranes, 19000);

  /* ==========================================================================
     4. COUNTDOWN TIMER TO UDGAM 2026 (MARCH 27, 2026)
     ========================================================================== */
  const targetDate = new Date('2026-03-27T09:30:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const elDays = document.getElementById('count-days');
      const elHours = document.getElementById('count-hours');
      const elMins = document.getElementById('count-mins');
      const elSecs = document.getElementById('count-secs');

      if (elDays) elDays.textContent = String(days).padStart(2, '0');
      if (elHours) elHours.textContent = String(hours).padStart(2, '0');
      if (elMins) elMins.textContent = String(minutes).padStart(2, '0');
      if (elSecs) elSecs.textContent = String(seconds).padStart(2, '0');
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================================================
     5. SCROLL-TRIGGERED BLOOM REVEALS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     6. EVENT FILTERING SYSTEM
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const eventCards = document.querySelectorAll('.event-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      eventCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     7. SCHEDULE / TIMELINE DAY SWITCHER
     ========================================================================== */
  const dayNavBtns = document.querySelectorAll('.day-nav-btn');
  const dayContents = document.querySelectorAll('.timeline-day-content');

  dayNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayNavBtns.forEach(b => b.classList.remove('active'));
      dayContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetDay = btn.getAttribute('data-day');
      const activeContent = document.getElementById(`timeline-${targetDay}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     8. EVENT DETAILS MODAL
     ========================================================================== */
  const eventDetailsData = {
    rhapsody: {
      title: "Rhapsody: Battle of the Rock Bands",
      tag: "Pronites & Music Competition",
      prize: "₹60,000 Cash Prize + Recording Contract",
      date: "Day 2 (Saturday, March 28) • 6:30 PM",
      venue: "Open Air Amphitheatre, NIT Sikkim",
      teamSize: "3 to 8 Members",
      desc: "Rhapsody is the benchmark musical battlefield of the Eastern Himalayas. Bring your original compositions and electric anthems to captivate a stadium of 5,000+ passionate students under starlight.",
      rules: [
        "Time limit: 20 minutes (including line check & sound check).",
        "Original compositions are strongly rewarded with bonus points.",
        "A full 5-piece drum kit and standard guitar/bass amplifiers will be provided.",
        "Judgment criteria: Tightness, vocal quality, stage presence, and crowd engagement."
      ]
    },
    hackthebloom: {
      title: "HackTheBloom: 36h National Hackathon",
      tag: "Technical & Innovation Marathon",
      prize: "₹1,00,000 Prize Pool + Seed Grants & Swag",
      date: "Day 1 – Day 2 (March 27 – 28) • 36 Non-Stop Hours",
      venue: "Computing Innovation Lab & Hackers Hall",
      teamSize: "2 to 4 Members",
      desc: "Build solutions for climate resilience, AI automation, healthcare accessibility, or decentralized systems. Continuous mentorship from industry leaders and venture partners.",
      rules: [
        "All code, designs, and assets must be crafted exclusively during the 36-hour sprint.",
        "Use of open-source frameworks and public APIs is welcome.",
        "Top 10 teams qualify for the Day 3 Grand Pitching Arena before angel investors.",
        "Round-the-clock refreshments, high-speed WiFi, and rest lounges provided."
      ]
    },
    nrityanjali: {
      title: "Nrityanjali: Choreonite Dance Fiesta",
      tag: "Dance & Performing Arts",
      prize: "₹45,000 Cash Prize + Golden Trophy",
      date: "Day 2 (Saturday, March 28) • 2:00 PM",
      venue: "Main Auditorium",
      teamSize: "8 to 25 Members",
      desc: "A breathtaking showcase of synchronized footwork, dramatic storytelling, and acrobatic formations. Open to Eastern classical, modern fusion, hip-hop, and contemporary crews.",
      rules: [
        "Performance duration: 8 to 12 minutes.",
        "Soundtracks must be submitted in MP3 format 4 hours prior to the event.",
        "Props permitted with prior notification to stage managers.",
        "Judging parameters: Synchronization, choreography, costumes, expression, and energy."
      ]
    },
    vogue: {
      title: "Vogue Vista: The Sakura Haute Couture Runway",
      tag: "Fashion, Styling & Runway",
      prize: "₹50,000 Cash Pool + Modeling Portfolio Deals",
      date: "Day 3 (Sunday, March 29) • 5:00 PM",
      venue: "Central Courtyard & Starlit Floral Runway",
      teamSize: "10 to 18 Models & Stylists",
      desc: "Celebrate ethereal beauty, avant-garde silhouettes, and botanical night aesthetics. Strut the runway illuminated by floating lanterns and blossom projections.",
      rules: [
        "Theme: 'Whimsical Blossoms' or 'Futuristic Organic Couture'.",
        "Sequence time: 10 to 14 minutes per college.",
        "Garments must demonstrate ethical sourcing or innovative wearable art.",
        "Professional lighting and sound engineering provided by fest committee."
      ]
    },
    roboclash: {
      title: "RoboClash: Autonomous Arena",
      tag: "Robotics & Hardware Battle",
      prize: "₹40,000 Cash Pool + Tech Kits",
      date: "Day 1 (Friday, March 27) • 11:00 AM",
      venue: "Mechanical Workshop & Arena",
      teamSize: "2 to 4 Members",
      desc: "Engineered bots conquer dynamic obstacles, variable inclines, and high-speed autonomous navigation in our custom Himalayan terrain simulator.",
      rules: [
        "Max bot dimensions: 30cm x 30cm x 30cm, Max weight: 3.5 kg.",
        "Power supply on-board must not exceed 24V DC.",
        "Two phases: Phase 1 (Autonomous Line & Maze), Phase 2 (Obstacle Blitz).",
        "Fair play strictly enforced; jamming devices lead to disqualification."
      ]
    },
    poetry: {
      title: "Echoes of Spring: Spoken Word Poetry Slam",
      tag: "Literary & Oratory Expression",
      prize: "₹25,000 Cash Prize + Publication Feature",
      date: "Day 1 (Friday, March 27) • 3:00 PM",
      venue: "Conference Hall Alpha",
      teamSize: "Individual Solo Performance",
      desc: "Give voice to raw emotion, social reflection, and the quiet poetry of change. Languages accepted: English, Hindi, and Nepali.",
      rules: [
        "Time limit: 4 minutes per poet + 30-second grace period.",
        "Poems must be original works of the contestant.",
        "No musical instruments or props; pure voice and gesture.",
        "Judged on wordcraft, emotional resonance, tempo, and vocal projection."
      ]
    },
    cosplay: {
      title: "Matsuri Anime & Comic Con Cosplay Walk",
      tag: "Pop-Culture & Costume Crafting",
      prize: "₹35,000 Prize Pool + Collectible Goodies",
      date: "Day 2 (Saturday, March 28) • 4:00 PM",
      venue: "Pine Grove Open Stage",
      teamSize: "Solo or Duo Entry",
      desc: "Transform into your cherished characters from anime, gaming, comic universes, and fantasy lore. Walk the cherry blossom carpet and dazzle our guest judges.",
      rules: [
        "Cosplay must be at least 60% crafted or self-altered.",
        "1-minute stage skit / character walk with dedicated audio cue.",
        "All weapons must be peace-bonded and blunt (foam, wood, or 3D printed).",
        "Special awards for Best Craftsmanship, Best Performance, and Crowd Favorite."
      ]
    },
    pronite: {
      title: "The Grand Bloom: Celebrity Star Pronite",
      tag: "Mega Star Night Concert",
      prize: "The Ultimate Live Concert Experience",
      date: "Day 3 (Sunday, March 29) • 7:30 PM Till Midnight",
      venue: "Main Festival Grounds Stadium",
      teamSize: "Open to All Delegate Pass Holders",
      desc: "The monumental finale of Udgam 2026! Featuring nationally celebrated artists, high-energy live band sets, and international DJ beats amidst laser blossoms.",
      rules: [
        "Valid festival wristband / digital pass required at stadium turnstiles.",
        "Gates open at 6:00 PM. VIP pass holders enter via Express Gate 1.",
        "Prohibited items: Glass bottles, laser pointers, outside food.",
        "Emergency medical tents and water stations situated throughout grounds."
      ]
    }
  };

  const eventModal = document.getElementById('event-modal');
  const eventModalContent = document.getElementById('event-modal-content');
  const modalCloseBtn = document.getElementById('modal-close');

  document.querySelectorAll('.btn-event-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.getAttribute('data-event-id');
      const data = eventDetailsData[eventId];
      if (!data) return;

      eventModalContent.innerHTML = `
        <span class="modal-event-tag">${data.tag}</span>
        <h3 class="modal-event-title">${data.title}</h3>
        <p class="modal-event-desc">${data.desc}</p>
        
        <div class="modal-details-grid">
          <div class="modal-detail-box">
            <strong>Prize Bounty</strong>
            <span>${data.prize}</span>
          </div>
          <div class="modal-detail-box">
            <strong>Schedule</strong>
            <span>${data.date}</span>
          </div>
          <div class="modal-detail-box">
            <strong>Location</strong>
            <span>${data.venue}</span>
          </div>
          <div class="modal-detail-box">
            <strong>Team Size</strong>
            <span>${data.teamSize}</span>
          </div>
        </div>

        <h4 class="modal-rules-title">Guidelines & Rules</h4>
        <ul class="modal-rules-list">
          ${data.rules.map(r => `<li>${r}</li>`).join('')}
        </ul>

        <div style="text-align: right; margin-top: 20px;">
          <button class="btn btn-primary btn-bloom" id="modal-register-trigger">
            <span>Register for this Event</span>
            <span>🌸</span>
          </button>
        </div>
      `;

      eventModal.classList.add('open');

      document.getElementById('modal-register-trigger').addEventListener('click', () => {
        eventModal.classList.remove('open');
        openRegisterModal('Blossom Pass (₹299)');
      });
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      eventModal.classList.remove('open');
    });
  }

  /* ==========================================================================
     9. REGISTRATION MODAL & PASS GENERATION
     ========================================================================== */
  const registerModal = document.getElementById('register-modal');
  const registerModalClose = document.getElementById('register-modal-close');
  const regForm = document.getElementById('pass-registration-form');
  const ticketSuccessView = document.getElementById('ticket-success-view');

  function openRegisterModal(preferredPass) {
    if (registerModal) {
      if (preferredPass) {
        const select = document.getElementById('reg-pass-type');
        if (select) {
          for (let opt of select.options) {
            if (opt.value.toLowerCase().includes(preferredPass.toLowerCase().slice(0, 5))) {
              select.value = opt.value;
              break;
            }
          }
        }
      }
      regForm.style.display = 'flex';
      ticketSuccessView.style.display = 'none';
      registerModal.classList.add('open');
    }
  }

  document.querySelectorAll('.btn-claim-ticket').forEach(btn => {
    btn.addEventListener('click', () => {
      const passName = btn.getAttribute('data-pass') || 'Blossom Pass';
      openRegisterModal(passName);
    });
  });

  if (registerModalClose) {
    registerModalClose.addEventListener('click', () => {
      registerModal.classList.remove('open');
    });
  }

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const passType = document.getElementById('reg-pass-type').value;
      const name = document.getElementById('reg-name').value;
      const college = document.getElementById('reg-college').value;

      document.getElementById('ticket-tier-name').textContent = passType.split('(')[0].trim();
      document.getElementById('ticket-user-name').textContent = name;
      document.getElementById('ticket-college-name').textContent = college;
      document.getElementById('ticket-code').textContent = 'UDG-' + Math.floor(100000 + Math.random() * 900000);

      regForm.style.display = 'none';
      ticketSuccessView.style.display = 'block';

      // Play joyful chime on successful pass registration
      playChimeNote(523.25);
      setTimeout(() => playChimeNote(659.25), 150);
      setTimeout(() => playChimeNote(783.99), 300);
      setTimeout(() => playChimeNote(1046.50), 450);
    });
  }

  /* ==========================================================================
     10. GALLERY LIGHTBOX VIEWER
     ========================================================================== */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption') || 'Udgam Festival Memory';
      if (src && lightboxImg && lightboxCaption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightboxModal.classList.add('open');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('open');
    });
  }

  [eventModal, registerModal, lightboxModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (eventModal) eventModal.classList.remove('open');
      if (registerModal) registerModal.classList.remove('open');
      if (lightboxModal) lightboxModal.classList.remove('open');
    }
  });

  /* ==========================================================================
     11. NATIVE WEB AUDIO API AMBIENT WIND CHIMES (PENTATONIC SAKURA SCALE)
     ========================================================================== */
  let audioCtx = null;
  let isSoundActive = false;
  let ambientInterval = null;

  const chimeFrequencies = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50 // C6
  ];

  function playChimeNote(freq) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.8);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 3.0);
  }

  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundActive = !isSoundActive;
      if (isSoundActive) {
        soundBtn.classList.add('playing');
        soundBtn.querySelector('.control-label').textContent = 'Chimes On';
        playChimeNote(chimeFrequencies[0]);
        setTimeout(() => playChimeNote(chimeFrequencies[2]), 200);
        setTimeout(() => playChimeNote(chimeFrequencies[4]), 400);

        ambientInterval = setInterval(() => {
          if (isSoundActive && Math.random() > 0.35) {
            const randomNote = chimeFrequencies[Math.floor(Math.random() * chimeFrequencies.length)];
            playChimeNote(randomNote);
            if (Math.random() > 0.6) {
              setTimeout(() => {
                const harmonic = chimeFrequencies[Math.floor(Math.random() * chimeFrequencies.length)];
                playChimeNote(harmonic);
              }, 220);
            }
          }
        }, 3200);
      } else {
        soundBtn.classList.remove('playing');
        soundBtn.querySelector('.control-label').textContent = 'Wind Chime';
        if (ambientInterval) clearInterval(ambientInterval);
      }
    });
  }

  document.querySelectorAll('.swaying-lantern').forEach(lantern => {
    lantern.addEventListener('click', () => {
      const note = chimeFrequencies[Math.floor(Math.random() * chimeFrequencies.length)];
      playChimeNote(note);
      lantern.style.animationDuration = '1.2s';
      setTimeout(() => {
        lantern.style.animationDuration = '';
      }, 2500);
    });
  });

  /* ==========================================================================
     12. MOBILE HAMBURGER NAVIGATION
     ========================================================================== */
  const navHamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  if (navHamburger && navLinks) {
    navHamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     13. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      playChimeNote(chimeFrequencies[5]);
    });
  }

  /* ==========================================================================
     14. ACTIVE LINK SCROLL SPY
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        current = sec.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});

document.addEventListener('DOMContentLoaded', () => {
  // ========== Lenis Smooth Scroll ==========
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ========== Custom Cursor ==========
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2 });
  });
  // Magnetic hover on interactive elements
  document.querySelectorAll('a, button, .perfume-card, .product-card, .journal-card, .testimonial-card, .orb').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2)');
    el.addEventListener('mouseleave', () => cursor.style.transform = cursor.style.transform.replace(' scale(2)', ''));
  });

  // ========== Preloader ==========
  gsap.to('.preloader', {
    opacity: 0,
    duration: 1.2,
    delay: 1.5,
    onComplete: () => {
      document.querySelector('.preloader').style.display = 'none';
    }
  });

  // ========== Advertisement Modal ==========
  const adTrigger = document.getElementById('adTrigger');
  const adModal = document.getElementById('adModal');
  const adClose = document.getElementById('adClose');
  const adSlider = document.getElementById('adSlider');
  const adPrev = document.getElementById('adPrev');
  const adNext = document.getElementById('adNext');
  let currentAd = 0;
  const ads = [
    { img: 'pictures/Advertisment9.png', title: 'Midnight Fun', desc: 'An intimate luxury oil perfume. Long-lasting, mysterious, and deeply captivating.' },
    { img: 'pictures/Advertisment8.png', title: 'Captivating Beauty', desc: '100% oil extract. Magnetic confidence that leaves an unforgettable impression.' },
    { img: 'pictures/Advertisment6.png', title: 'Start Your Own Perfume Business', desc: 'Turn K1,100 into K2,000+. Join our reseller network and earn high margins with ready-to-sell kits.' },
    { img: 'pictures/Advertisment4.png', title: 'Pure Sophistication', desc: 'A scent that speaks elegance. Limited stock – experience luxury oil perfume today.' },
    { img: 'pictures/Advertisment2.png', title: 'New Launch – Midnight Fun', desc: 'Where mystery meets seduction. Perfect for nights you’ll never forget.' },
  ];

  function renderAds() {
    if (!adSlider) return;
    adSlider.innerHTML = ads.map((ad, i) => `
      <div class="ad-slide ${i === currentAd ? 'active' : ''}">
        <img src="${ad.img}" alt="${ad.title}" class="ad-slide__img" />
        <div class="ad-slide__info">
          <h3>${ad.title}</h3>
          <p>${ad.desc}</p>
        </div>
      </div>
    `).join('');
  }
  function showAd(index) {
    currentAd = (index + ads.length) % ads.length;
    renderAds();
  }
  if (adTrigger) {
    adTrigger.addEventListener('click', () => {
      adModal.classList.add('open');
      showAd(0);
    });
  }
  if (adClose) adClose.addEventListener('click', () => adModal.classList.remove('open'));
  document.querySelector('.ad-modal__overlay')?.addEventListener('click', () => adModal.classList.remove('open'));
  if (adPrev) adPrev.addEventListener('click', () => showAd(currentAd - 1));
  if (adNext) adNext.addEventListener('click', () => showAd(currentAd + 1));
  renderAds();

  // ========== Catalogue Data & Generation ==========
  const perfumes = [
    { name: 'Aventus', inspired: 'Creed', img: 'pictures/11.png', notes: 'Pineapple, Birch, Musk', mood: 'Bold · Confident · Legendary', desc: 'The scent of success, reimagined as a rich oil attar. Opens with vibrant pineapple, settles into smoky birch and musk.' },
    { name: 'Coco Mademoiselle', inspired: 'Chanel', img: 'pictures/12.png', notes: 'Orange, Rose, Patchouli', mood: 'Elegant · Feminine · Timeless', desc: 'A radiant bouquet of fresh orange and rose, grounded by earthy patchouli.' },
    { name: 'Sauvage', inspired: 'Dior', img: 'pictures/13.png', notes: 'Bergamot, Pepper, Ambroxan', mood: 'Bold · Raw · Powerful', desc: 'Inspired by wide‑open landscapes. Fresh bergamot, spicy pepper, and mineral ambroxan.' },
    { name: 'Code', inspired: 'Armani', img: 'pictures/14.png', notes: 'Bergamot, Olive Flower, Tonka', mood: 'Smooth · Magnetic · Seductive', desc: 'Sophisticated citrus and soft florals wrapped in warm tonka bean.' },
    { name: 'Rebel Flur', inspired: 'Rihanna', img: 'pictures/15.png', notes: 'Plum, Frangipani, Vanilla', mood: 'Bold · Feminine · Addictive', desc: 'Sweet plum and exotic flowers meet creamy vanilla.' },
    { name: 'Spicebomb', inspired: 'Viktor & Rolf', img: 'pictures/16.png', notes: 'Chili, Saffron, Leather', mood: 'Explosive · Unforgettable', desc: 'Fiery chili and saffron tempered by smooth leather.' },
    { name: 'Utopia Vanilla Cocoa', inspired: 'Kayali', img: 'pictures/17.png', notes: 'Vanilla, Cocoa, Amber', mood: 'Warm · Creamy · Addictive', desc: 'Like a dessert for the soul – vanilla, cocoa, and golden amber.' },
    { name: 'Yum Pistachio Gelato', inspired: 'Kayali', img: 'pictures/18.png', notes: 'Pistachio, Whipped Cream, Tonka', mood: 'Creamy · Nutty · Addictive', desc: 'Playful nutty pistachio and airy cream – sunshine in a bottle.' },
    { name: 'Yara Candy', inspired: 'Lattafa', img: 'pictures/19.png', notes: 'Berries, Caramel, Musk', mood: 'Sweet · Playful · Addictive', desc: 'Juicy berries and caramelised sugar meet soft musk.' },
    { name: 'Khamrah', inspired: 'Lattafa', img: 'pictures/20.png', notes: 'Cinnamon, Dates, Vanilla', mood: 'Spicy · Gourmand · Addictive', desc: 'Spiced cinnamon, sweet dates, and vanilla – exotic and warm.' },
    { name: 'Flowerbomb', inspired: 'Viktor & Rolf', img: 'pictures/21.png', notes: 'Tea, Jasmine, Patchouli', mood: 'Floral · Explosive · Radiant', desc: 'An explosion of tea and jasmine on a patchouli base.' },
    { name: 'Prada Candy', inspired: 'Prada', img: 'pictures/22.png', notes: 'Caramel, Musk, Vanilla', mood: 'Sweet · Addictive · Unforgettable', desc: 'Golden caramel and soft musk – pure indulgence.' },
    { name: 'The One (Men)', inspired: 'Dolce & Gabbana', img: 'pictures/23.png', notes: 'Grapefruit, Ginger, Tobacco', mood: 'Fresh · Warm · Magnetic', desc: 'Bright grapefruit, spicy ginger, and smoky tobacco – modern gentleman.' },
    { name: 'Love', inspired: 'By Kilian', img: 'pictures/24.png', notes: 'Bergamot, Jasmine, Caramel', mood: 'Sweet · Sensual · Enchanting', desc: 'Citrus sparkle, jasmine allure, and caramel warmth.' },
    { name: 'Black Opium', inspired: 'YSL', img: 'pictures/25.png', notes: 'Coffee, Vanilla, Orange Blossom', mood: 'Bold · Sensual · Addictive', desc: 'Addictive coffee and vanilla wrapped in orange blossom.' },
    { name: 'Libre', inspired: 'YSL', img: 'pictures/26.png', notes: 'Lavender, Orange Blossom, Musk', mood: 'Bold · Confident · Liberated', desc: 'French lavender and Moroccan orange blossom – a freedom statement.' },
    { name: 'Eros Flame', inspired: 'Versace', img: 'pictures/27.png', notes: 'Mandarin, Pepper, Vanilla', mood: 'Spicy · Passionate · Powerful', desc: 'Zesty mandarin, fiery pepper, and creamy vanilla – burning desire.' },
    { name: 'Good Girl', inspired: 'Carolina Herrera', img: 'pictures/31.png', notes: 'Almond, Coffee, Tuberose', mood: 'Bold · Sensual · Addictive', desc: 'The duality of modern woman: bright tuberose and dark coffee.' },
    { name: 'Valentino Donna', inspired: 'Valentino', img: 'pictures/33.png', notes: 'Bergamot, Iris, Vanilla', mood: 'Luminous · Romantic · Captivating', desc: 'Radiant floral bouquet with powdery iris heart.' },
    { name: 'Valentino Uomo', inspired: 'Valentino', img: 'pictures/32.png', notes: 'Bergamot, Myrtle, Leather', mood: 'Vibrant · Confident · Magnetic', desc: 'Italian elegance: fresh bergamot, aromatic myrtle, leather base.' },
    { name: 'Cherry Bouquet', inspired: 'Oriental Signature', img: 'pictures/Oriental Frag Resellers Flyers (2).png', notes: 'Cherry, Rose, Musk', mood: 'Sweet · Floral · Seductive', desc: 'Ripe cherries and delicate rose on velvety musk – romantic and unforgettable.' },
    { name: 'Pure Sophistication', inspired: 'Oriental Signature', img: 'pictures/Oriental Frag Resellers Flyers (1).png', notes: 'Bergamot, Jasmine, Sandalwood', mood: 'Elegant · Feminine · Luxurious', desc: 'Quiet luxury: bright bergamot, ethereal jasmine, creamy sandalwood.' },
    { name: 'Midnight Fun', inspired: 'Oriental Signature', img: 'pictures/Oriental Frag Resellers Flyers (3).png', notes: 'Citrus, Vanilla, Amber', mood: 'Mysterious · Elegant · Addictive', desc: 'For after-dark adventures – sparkling citrus, warm vanilla, deep amber.' },
    { name: 'Captivating Beauty', inspired: 'Oriental Signature', img: 'pictures/Oriental Frag Resellers Flyers (4).png', notes: 'Blackcurrant, Rose, Musk', mood: 'Magnetic · Confident · Unforgettable', desc: 'Juicy blackcurrant, lush rose, clean musk – beauty that commands the room.' }
  ];

  const grid = document.getElementById('catalogueGrid');
  if (grid) {
    grid.innerHTML = perfumes.map((p, i) => `
      <div class="perfume-card glass" data-index="${i}">
        <img src="${p.img}" alt="${p.name}" class="perfume-card__img" />
        <h3>${p.name}</h3>
        <p class="perfume-card__mood">${p.mood}</p>
      </div>
    `).join('');
  }

  // Perfume detail modal
  const perfumeModal = document.getElementById('perfumeModal');
  const perfumeClose = document.getElementById('perfumeClose');
  const perfumeDetail = document.getElementById('perfumeDetail');

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.perfume-card');
    if (!card || !card.dataset.index || !perfumeModal) return;
    const p = perfumes[card.dataset.index];
    perfumeDetail.innerHTML = `
      <div class="detail-layout">
        <img src="${p.img}" alt="${p.name}" class="detail-img" />
        <div class="detail-text">
          <h2 class="detail-title">${p.name} <span>Inspired by ${p.inspired}</span></h2>
          <p class="detail-notes"><strong>Scent Notes:</strong> ${p.notes}</p>
          <p class="detail-mood"><strong>Personality:</strong> ${p.mood}</p>
          <p class="detail-desc">${p.desc}</p>
          <p class="detail-oil">✔ 100% Oil Extract · Alcohol‑Free · Long‑Lasting (8‑12h)</p>
          <a href="https://wa.me/67575705680" target="_blank" class="btn gold">Order via WhatsApp</a>
        </div>
      </div>
    `;
    perfumeModal.classList.add('open');
  });

  if (perfumeClose) perfumeClose.addEventListener('click', () => perfumeModal.classList.remove('open'));
  document.querySelector('.perfume-modal__overlay')?.addEventListener('click', () => perfumeModal.classList.remove('open'));

  // ========== Three.js Background for Hero ==========
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0xd8b36a, metalness: 1, roughness: 0.2 });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(20, 20, 20);
    scene.add(light);
    camera.position.z = 30;

    function animate() {
      requestAnimationFrame(animate);
      knot.rotation.x += 0.003;
      knot.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ========== GSAP Scroll Animations ==========
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.perfume-card, .shop-item, .story__visual, .orb, .about-card, .product-card, .testimonial-card, .journal-card').forEach(item => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 85%' },
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: 'power3.out'
    });
  });

  // Mobile menu toggle
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) nav.classList.remove('open');
    });
  }
});
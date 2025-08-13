import './index.css';
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

document.addEventListener("DOMContentLoaded", () => {
  // === TOGGLE MOBILE NAV ===
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const body = document.body;

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('translate-x-0');

    // Add delay before opening menu
    if (!isOpen) {
      setTimeout(() => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');

        mobileOverlay?.classList.remove('hidden', 'opacity-0');
        mobileOverlay?.classList.add('opacity-100');

        body.style.overflow = 'hidden';
        menuToggle.classList.add('open');
      }, 150); // <-- Adjust delay here (150ms)
    } else {
      // Instantly close menu
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');

      mobileOverlay?.classList.add('hidden', 'opacity-0');
      mobileOverlay?.classList.remove('opacity-100');

      body.style.overflow = '';
      menuToggle.classList.remove('open');
    }
  }

  menuToggle?.addEventListener('click', toggleMobileMenu);

  mobileOverlay?.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    mobileOverlay.classList.add('hidden', 'opacity-0');
    mobileOverlay.classList.remove('opacity-100');
    menuToggle.classList.remove('open');
    body.style.overflow = '';
  });

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      mobileOverlay.classList.add('hidden', 'opacity-0');
      mobileOverlay.classList.remove('opacity-100');
      menuToggle.classList.remove('open');
      body.style.overflow = '';
    });
  });

  const mobileMenuClose = document.getElementById('mobile-menu-close');

  mobileMenuClose?.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    mobileOverlay?.classList.add('hidden', 'opacity-0');
    mobileOverlay?.classList.remove('opacity-100');
    body.style.overflow = '';
    menuToggle.classList.remove('open');
  });


  // Swipe to close (optional)
  let touchStartX = 0;
  mobileMenu?.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });
  mobileMenu?.addEventListener('touchmove', e => {
    const deltaX = e.touches[0].clientX - touchStartX;
    if (deltaX < -50) {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      mobileOverlay.classList.add('hidden', 'opacity-0');
      mobileOverlay.classList.remove('opacity-100');
      menuToggle.classList.remove('open');
      body.style.overflow = '';
    }
  });


  // === DARK MODE TOGGLE ===
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const themeButtons = [themeToggle, mobileThemeToggle].filter(Boolean);

  function applyTheme(isDark) {
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = !root.classList.contains('dark');
      applyTheme(isDark);
    });
  });

  // Navbar Active Section Highlighting
  // ✅ NEW: Improved section highlighting (especially for About/Resume)
  const navLinks = document.querySelectorAll("nav a, .mobile-nav-link");
  const sections = document.querySelectorAll("section[id]");

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const linkTarget = link.getAttribute("href")?.substring(1);
          if (linkTarget === entry.target.id) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "-100px 0px -40% 0px" // Tweak this if needed
  });

  sections.forEach(section => sectionObserver.observe(section));



  const stored = localStorage.getItem('theme');
  const isDarkTheme = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  applyTheme(isDarkTheme);

  // === AOS ANIMATION ===
  AOS.init({ duration: 1000 });

  const updateThemeUI = (isDark) => {
    const themeIcon = document.getElementById("theme-icon");
    const themeLabel = document.getElementById("theme-label");
    const mobileIcon = document.getElementById("mobile-theme-icon");
    const mobileLabel = document.getElementById("mobile-theme-label");

    if (themeIcon && themeLabel) {
      themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
      themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
    }

    if (mobileIcon && mobileLabel) {
      mobileIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
      mobileLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
    }
  };

  const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light";
    updateThemeUI(isDark);
  };

  document.body.classList.toggle("dark", localStorage.theme === "dark");
  updateThemeUI(localStorage.theme === "dark");

  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
  document.getElementById("mobile-theme-toggle")?.addEventListener("click", toggleTheme);


  // FILTER BUTTONS
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");

      buttons.forEach(b => b.classList.remove("bg-indigo-600", "text-white"));
      btn.classList.add("bg-indigo-600", "text-white");

      cards.forEach(card => {
        card.style.display = (category === "all" || card.dataset.category === category) ? "block" : "none";
      });
    });
  });

  // PROJECTS SECTION 
  const projects = [
    {
      title: "E-commerce UI",
      category: "design",
      image: "/images/craft.jpg",
      description:
        "A visually engaging and user-centric UI/UX design concept tailored for an eCommerce platform specializing in handcrafted wooden furniture. The interface showcases a rich catalog of custom-made chairs, tables, wardrobes, and other crafts. Emphasis was placed on elegant product displays, seamless category navigation, real-time filtering, and a responsive layout to ensure a smooth shopping experience across devices. The design supports customer trust-building through aesthetic consistency, detailed product views, and a streamlined checkout process.",
      tech: ["Figma"],
      github: "#",
      demo: "https://your-demo-link.com",
    },
    {
      title: "Hotel Management System",
      category: "web",
      image: "/images/GT dashboard.png",
      description:
        "A full-stack hotel management system designed to simplify operations for administrators, managers, employees, and customers. The system includes role-based dashboards with tailored functionalities: bookings, room management, employee scheduling, user authentication, and automated billing. Built using PHP and SQL for robust backend operations, with a responsive frontend using HTML and CSS. This solution offers a practical interface for real-time hotel resource tracking and service optimization, ensuring a streamlined hospitality experience for all user roles.",
      tech: ["HTML", "CSS", "PHP", "SQL"],
      github: "https://github.com/your-hotel-mgt",
      demo: "https://your-demo-link.com",
    },
    {
      title: "Disney+ UI/UX",
      category: "design",
      image: "/images/disney.png",
      description:
        "A playful and modern redesign concept for Disney+, crafted to enhance the user journey across devices. It features intuitive navigation, bold typography, and immersive visuals with a magical theme. This version improves content discovery with personalized rows, animation-enhanced UI, and kid-friendly layouts. Parental controls and accessibility are built-in. The interface was designed with families in mind—focusing on both functionality and joy, ensuring users (both young and aged) stay engaged in the streaming experience.",
      tech: ["Figma"],
      github: "#",
      demo: "https://your-demo-link.com",
    },
    {
      title: "Tailor App",
      category: "mobile",
      image: "/images/tailor.jpg",
      description:
        "A specialized mobile app for fashion designers and tailors to efficiently manage clients, fabrics, and custom orders. The app allows users to store accurate measurements, attach fabric images, assign deadlines, and monitor balances. Built with Flutter and Firebase, it supports real-time updates, push notifications, and secure cloud data handling. Designed to prevent fabric mix-ups and improve workflow, the platform enhances productivity and customer satisfaction with its sleek, intuitive interface. An upcoming update will include visual dress previews.",
      tech: ["Flutter", "Firebase"],
      github: "https://github.com/your-fashion-app",
      demo: "https://your-demo-link.com",
    },
    {
      title: "Healthcare DBMS",
      category: "web",
      image: "/images/phpMyAdmin.png",
      description:
        "A secure, SQL-powered healthcare database system for organizing patient records, prescriptions, and clinical tasks. Featuring multi-role access levels, the platform differentiates doctors, pharmacists, and admins. It supports analytical queries, medication history tracking, and prescription management. The interface enables real-time data retrieval and updates to reduce errors. By centralizing healthcare operations, this system improves efficiency, accountability, and the overall patient care experience. Future upgrades may include mobile doctor access.",
      tech: ["SQL"],
      github: "https://github.com/your-healthcare-dbms",
      demo: "https://your-demo-link.com",
    },
    {
      title: "Smart Villa VR Experience",
      category: "3D graphics",
      image: "/images/smart-villa.png",
      description:
        "An immersive virtual reality smart villa built using A-Frame. This interactive 3D experience allows users to explore a digital villa environment with realistic lighting, ambient sound, animated water effects, and detailed models of furniture and appliances. It supports both desktop and VR headset navigation, offering features like grab-and-pan camera control, light/dark mode toggle, and day/night transitions. Designed for architectural visualization, this project demonstrates modern web-based VR techniques, spatial UI interaction, and mobile responsiveness.",
      tech: ["A-Frame", "HTML", "three.js"],
      github: "https://github.com/your-smart-villa-vr",
      demo: "https://4100823423ceiscycom-examination.vercel.app/",
    },
    {
      title: "Graphics Design Showcase",
      category: "design",
      image: "/images/showcase.png",
      description:
        "A portfolio of branding and logo design projects made for businesses in tech, fashion, food, and education. This collection showcases clean, minimalist styles emphasizing geometry, symbolism, and typography. Every logo reflects the brand's voice while remaining versatile across digital and print formats. Designed in Adobe Illustrator and Figma, these pieces are optimized for scalability and visual consistency. The showcase captures the evolution of concepts from sketches to polished, production-ready designs.",
      tech: ["Photoshop", "Illustrator", "Figma"],
      github: "#",
      demo: "https://dribbble.com/yourprofile",
    },
  ]; // more projects array here

  let swiper;
  function renderProjects(category = "all") {
    const grid = document.getElementById("projectGrid");
    grid.innerHTML = "";

    const filtered = category === "all" ? projects : projects.filter(p => p.category === category);

    const slideHTML = filtered.map(project => `
      <div class="swiper-slide transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg group flex flex-col">
        <div class="relative overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-52 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-5 flex flex-col flex-1">
          <div class="flex justify-between items-start mb-3">
            <i class="fas fa-folder-open text-orange-400 text-xl"></i>
            <div class="flex gap-3 text-gray-400 text-lg">
              ${project.github !== "#" ? `<a href="${project.github}" target="_blank"><i class="fas fa-code-branch"></i></a>` : ""}
              ${project.demo !== "#" ? `<a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ""}
            </div>
          </div>
          <h4 class="text-lg font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-orange-400">${project.title}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
          <div class="mt-auto flex flex-wrap gap-2">
            ${project.tech.map(t => `<span class="bg-indigo-100 dark:bg-indigo-600 text-indigo-800 dark:text-white text-xs px-2 py-1 rounded-full font-medium">${t}</span>`).join("")}
          </div>
        </div>
      </div>
    `).join("");

    grid.innerHTML = slideHTML;

    if (swiper) swiper.destroy(true, true);

    swiper = new Swiper(".projectSwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      grabCursor: true,
      pagination: {
        el: ".project-swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: document.getElementById("project-next"),
        prevEl: document.getElementById("project-prev"),
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 3,
          centeredSlides: true,
        },
      },
    });

    setTimeout(() => AOS.refresh(), 500);
  }

  renderProjects(); // ✅ Call after defining

  document.querySelectorAll(".project-filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".project-filter").forEach(b => b.classList.remove("active", "bg-orange-500", "text-white"));
      button.classList.add("active", "bg-orange-500", "text-white");
      renderProjects(button.dataset.category);
    });
  });

  // === PROJECT DRAG SCROLL ===
  const wrapper = document.getElementById("projectGridWrapper");
  if (wrapper) {
    let isDragging = false, startX, scrollLeft;

    const startDrag = (x) => {
      isDragging = true;
      startX = x - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    };

    const stopDrag = () => {
      isDragging = false;
      wrapper.classList.remove("dragging");
    };

    const moveDrag = (x) => {
      if (!isDragging) return;
      const walk = (x - startX) * 1.5;
      wrapper.scrollLeft = scrollLeft - walk;
    };

    wrapper.addEventListener("mousedown", (e) => {
      wrapper.classList.add("dragging");
      startDrag(e.pageX);
    });

    wrapper.addEventListener("mouseleave", stopDrag);
    wrapper.addEventListener("mouseup", stopDrag);
    wrapper.addEventListener("mousemove", (e) => moveDrag(e.pageX));
    wrapper.addEventListener("touchstart", (e) => startDrag(e.touches[0].pageX));
    wrapper.addEventListener("touchend", stopDrag);
    wrapper.addEventListener("touchmove", (e) => moveDrag(e.touches[0].pageX));
  }

  // === SKILLS SECTION ===
  const skillsGrid = document.getElementById("skillsGrid");
  const swiperWrapper = document.getElementById("skillsSwiperWrapper");

  const skillsData = [
    {
      name: "HTML",
      icon: "fab fa-html5",
      category: "frontend",
      description: "Markup language for structuring web content.",
      years: 2,
      projects: 10,
      proficiency: 90,
    },
    {
      name: "CSS",
      icon: "fab fa-css3-alt",
      category: "frontend",
      description: "Styling language for enhancing web content layout.",
      years: 2,
      projects: 10,
      proficiency: 90,
    },
    {
      name: "Tailwind CSS",
      icon: "fas fa-wind",
      category: "frontend",
      description: "Utility-first CSS framework for building modern UIs.",
      years: 1,
      projects: 2,
      proficiency: 75,
    },
    {
      name: "Bootstrap CSS",
      icon: "fab fa-bootstrap",
      category: "frontend",
      description:
        "CSS framework for responsive and mobile-first web development.",
      years: 2,
      projects: 7,
      proficiency: 80,
    },
    {
      name: "JavaScript",
      icon: "fab fa-js",
      category: "frontend",
      description: "Programming language for interactive web development.",
      years: 1,
      projects: 7,
      proficiency: 80,
    },
    {
      name: "PHP",
      icon: "fab fa-php",
      category: "backend",
      description: "Server-side scripting language for web development.",
      years: 2,
      projects: 6,
      proficiency: 80,
    },
    {
      name: "MySQL",
      icon: "fas fa-database",
      category: "backend",
      description:
        "Relational database system for storing structured data.",
      years: 2,
      projects: 6,
      proficiency: 85,
    },
    {
      name: "MongoDB",
      icon: "fas fa-leaf",
      category: "backend",
      description: "NoSQL database for scalable applications.",
      years: 1,
      projects: 2,
      proficiency: 70,
    },
    {
      name: "Python",
      icon: "fab fa-python",
      category: "backend",
      description:
        "General-purpose programming language with backend capabilities.",
      years: 2,
      projects: 6,
      proficiency: 70,
    },
    {
      name: "Java",
      icon: "fab fa-java",
      category: "backend",
      description:
        "Object-oriented programming language used in backend development.",
      years: 1,
      projects: 2,
      proficiency: 75,
    },
    {
      name: "Figma",
      icon: "fab fa-figma",
      category: "design",
      description:
        "UI/UX design tool for interface prototyping and wireframing.",
      years: 1,
      projects: 10,
      proficiency: 85,
    },
    {
      name: "Adobe Photoshop",
      icon: "fas fa-paint-brush",
      category: "design",
      description:
        "Industry-standard graphic design tool for image editing.",
      years: 3,
      projects: 10,
      proficiency: 85,
    },
    {
      name: "Git & GitHub",
      icon: "fab fa-github",
      category: "backend",
      description: "Version control and code collaboration platform.",
      years: 2,
      projects: 5,
      proficiency: 85,
    },
    {
      name: "Mavis Beacon Teaches Typing",
      icon: "fas fa-keyboard",
      category: "tools",
      description:
        "Typing instruction software that improves speed and accuracy.",
      years: 5,
      projects: 0,
      proficiency: 95,
    },
  ]; // skillsData array here

  let skillsSwiperInstance;
  let skillsInitialized = false;
  let animationsTriggered = false;
  let skillsSectionObserver = null;

  function createSkillCard(skill) {
    const skillCard = document.createElement("div");
    skillCard.className =
      "flex flex-col gap-3 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md opacity-0 translate-y-10 transition-all duration-700 ease-out";

    skillCard.style.flex = "1 1 calc(50% - 0.5rem)"; // 50% width minus gap
    skillCard.style.display = "flex";
    skillCard.style.flexDirection = "column";

    // Conditional layout for "Mavis Beacon Teaches Typing"
    let nameSection = "";

    if (skill.name === "Mavis Beacon Teaches Typing") {
      nameSection = `
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <i class="${skill.icon} text-2xl text-indigo-600 dark:text-indigo-400"></i>
          <span class="text-sm font-medium">Mavis Beacon</span>
        </div>
        <h3 class="text-lg md:text-xl font-semibold break-words mt-1 ml-8">Teaches Typing</h3>
      </div>
    `;
    } else {
      nameSection = `
      <div class="flex items-center gap-3">
        <i class="${skill.icon} text-2xl text-indigo-600 dark:text-indigo-400"></i>
        <h3 class="text-lg md:text-xl font-semibold break-words">${skill.name}</h3>
      </div>
    `;
    }

    skillCard.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="${skill.icon} text-2xl text-indigo-600 dark:text-indigo-400"></i>
      <h3 class="text-lg md:text-xl font-semibold break-words">${skill.name}</h3>
    </div>
    <p class="text-gray-600 dark:text-gray-300 text-sm">${skill.description}</p>
    <div class="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded overflow-hidden">
      <div class="proficiency-bar h-2 rounded bg-indigo-500" style="width: 0%" data-percentage="${skill.proficiency}"></div>
    </div>
    <div class="flex flex-col md:flex-row md:justify-between text-sm text-gray-600 dark:text-gray-400 gap-2 md:gap-0 text-center md:text-left">
      <span><strong>${skill.years}</strong> years</span>
      <span><strong>${skill.projects >= 10 ? "10+" : skill.projects}</strong> projects</span>
      <span class="proficiency-count">
        <strong class="proficiency-text text-indigo-600" data-count="${skill.proficiency}">0%</strong> proficiency
      </span>
    </div>
  `;

    skillCard.setAttribute('data-animated', 'false');

    return skillCard;
  }

  function renderSkills(category = "all") {
    const filtered = category === "all"
      ? skillsData
      : skillsData.filter(skill => skill.category === category);

    const skillsGrid = document.getElementById("skillsGrid");
    const swiperWrapper = document.getElementById("skillsSwiperWrapper");
    const swiperContainer = document.querySelector(".skillsSwiper");
    const pagination = document.querySelector(".skills-swiper-pagination");

    const isMobile = window.innerWidth < 768;

    // Reset containers
    skillsGrid.innerHTML = "";
    swiperWrapper.innerHTML = "";

    if (isMobile) {
      // ✅ Mobile View: Show swiper
      skillsGrid.classList.add("hidden");
      swiperContainer?.classList.remove("hidden");
      pagination?.classList.remove("hidden");

      // Build Swiper slides (2x2 layout: 4 per slide)
      for (let i = 0; i < filtered.length; i += 4) {
        const slide = document.createElement("div");
        slide.className = "swiper-slide grid grid-cols-2 gap-4 px-2 pb-6";
        filtered.slice(i, i + 4).forEach(skill => {
          slide.appendChild(createSkillCard(skill));
        });
        swiperWrapper.appendChild(slide);
      }

      // Initialize Swiper only once
      if (!skillsInitialized) {
        skillsSwiperInstance = new Swiper(".skillsSwiper", {
          slidesPerView: 1,
          spaceBetween: 24,
          autoHeight: true,
          pagination: {
            el: ".skills-swiper-pagination",
            clickable: true,
          },
          // Prevent DOM recycling and unnecessary updates
          virtual: false,
          observer: false,
          observeParents: false,
          observeSlideChildren: false
        });
        skillsInitialized = true;
      } else if (skillsSwiperInstance) {
        // Update existing swiper without destroying
        skillsSwiperInstance.update();
      }

    } else {
      // Desktop View: Show grid
      swiperContainer?.classList.add("hidden");
      pagination?.classList.add("hidden");
      skillsGrid.classList.remove("hidden");

      // Destroy Swiper and clean state
      if (skillsSwiperInstance) {
        skillsSwiperInstance.destroy(true, true);
        skillsSwiperInstance = null;
        skillsInitialized = false;
        swiperContainer?.classList.remove("swiper-initialized", "swiper-backface-hidden");
        pagination.innerHTML = "";
      }

      // Render cards in grid
      filtered.forEach(skill => {
        skillsGrid.appendChild(createSkillCard(skill));
      });
    }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activeCategory = document.querySelector(".skill-filter.active")?.dataset.category || "all";
      const wasAnimationsTriggered = animationsTriggered; // Preserve animation state

      renderSkills(activeCategory);

      // If animations were already triggered, apply them immediately to new cards
      if (wasAnimationsTriggered) {
        requestAnimationFrame(() => {
          document.querySelectorAll("#skillsGrid > div, .skillsSwiper .swiper-slide > div").forEach(card => {
            if (card.dataset.animated !== 'true') {
              card.classList.remove("opacity-0", "translate-y-10");
              card.classList.add("opacity-100", "translate-y-0");
              card.dataset.animated = 'true';

              const bar = card.querySelector(".proficiency-bar");
              if (bar) {
                bar.style.width = bar.getAttribute("data-percentage") + "%";
              }

              const countEl = card.querySelector(".proficiency-count strong");
              if (countEl && countEl.dataset.animated !== 'true') {
                const target = parseInt(countEl.dataset.count, 10);
                countEl.textContent = target + "%";
                countEl.dataset.animated = 'true';
              }
            }
          });
        });
      }
    }, 300);
  });


  function triggerAnimationsOnce() {
    // Only trigger if animations haven't been triggered yet
    if (animationsTriggered) return;

    document.querySelectorAll("#skillsGrid > div, .skillsSwiper .swiper-slide > div").forEach(card => {
      // Skip if already animated
      if (card.dataset.animated === 'true') return;

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");

            const bar = entry.target.querySelector(".proficiency-bar");
            if (bar) {
              bar.style.width = bar.getAttribute("data-percentage") + "%";
            }

            // Mark as animated
            entry.target.dataset.animated = 'true';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(card);
    });

    animationsTriggered = true;
  }

  function animateOnScrollOnce() {
    // Only trigger if animations haven't been triggered yet
    if (animationsTriggered) return;

    document.querySelectorAll(".proficiency-count strong").forEach(el => {
      // Skip if already animated
      if (el.dataset.animated === 'true') return;

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let count = 0;
            const target = parseInt(entry.target.dataset.count, 10);
            const interval = setInterval(() => {
              if (count >= target) {
                clearInterval(interval);
                entry.target.dataset.animated = 'true';
              } else {
                count++;
                entry.target.textContent = count + "%";
              }
            }, 15);

            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  }

  // Initial render
  renderSkills();

  // Set up section observer to trigger animations only once when skills section comes into view
  const skillsSection = document.getElementById("skills");
  if (skillsSection && !skillsSectionObserver) {
    skillsSectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationsTriggered) {
          // Trigger animations only once when section comes into view
          requestAnimationFrame(() => {
            triggerAnimationsOnce();
            animateOnScrollOnce();
          });
          skillsSectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    skillsSectionObserver.observe(skillsSection);
  }

  // Skill filter logic
  document.querySelectorAll(".skill-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      document.querySelectorAll(".skill-filter").forEach(b =>
        b.classList.remove("active", "bg-indigo-600", "text-white")
      );

      // Add active class to clicked button
      btn.classList.add("active", "bg-indigo-600", "text-white");

      // Lock in current height of the skills grid to prevent layout jump
      const skillsGrid = document.getElementById("skillsGrid");
      const previousHeight = skillsGrid.offsetHeight;
      skillsGrid.style.minHeight = previousHeight + "px";

      // Re-render filtered skills
      const selectedCategory = btn.getAttribute("data-category");
      renderSkills(selectedCategory);

      // If animations have already been triggered, apply them immediately to new cards
      if (animationsTriggered) {
        requestAnimationFrame(() => {
          // Apply animations immediately to new cards without observers
          document.querySelectorAll("#skillsGrid > div, .skillsSwiper .swiper-slide > div").forEach(card => {
            if (card.dataset.animated !== 'true') {
              card.classList.remove("opacity-0", "translate-y-10");
              card.classList.add("opacity-100", "translate-y-0");
              card.dataset.animated = 'true';

              const bar = card.querySelector(".proficiency-bar");
              if (bar) {
                bar.style.width = bar.getAttribute("data-percentage") + "%";
              }

              const countEl = card.querySelector(".proficiency-count strong");
              if (countEl && countEl.dataset.animated !== 'true') {
                const target = parseInt(countEl.dataset.count, 10);
                countEl.textContent = target + "%";
                countEl.dataset.animated = 'true';
              }
            }
          });
        });
      }

      // Scroll back to Skills section (tablet & desktop only)
      const skillsSection = document.getElementById("skills");
      if (skillsSection && window.innerWidth >= 768) {
        skillsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Clear minHeight after render + transition
      setTimeout(() => {
        skillsGrid.style.minHeight = "auto";
        if (window.AOS) AOS.refresh(); // Optional: re-trigger AOS animations
      }, 600); // Should match transition duration
    });
  });

  // Scroll to Top Button
  const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
      scrollBtn.classList.remove("opacity-0", "pointer-events-none");
    } else {
      scrollBtn.classList.add("opacity-0", "pointer-events-none");
    }
  });

  scrollBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Contact Form Submission
  const form = document.getElementById("contact-form");
  const statusContainer = document.getElementById("form-status");
  const successMsg = document.getElementById("success-message");
  const errorMsg = document.getElementById("error-message");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" }
      });

      statusContainer.classList.remove("hidden");
      successMsg.classList.add("hidden");
      errorMsg.classList.add("hidden");

      if (response.ok) {
        form.reset();
        successMsg.classList.remove("hidden");
      } else {
        const data = await response.json();
        errorMsg.textContent = data.errors?.[0]?.message || "Something went wrong.";
        errorMsg.classList.remove("hidden");
      }
    } catch (error) {
      errorMsg.textContent = "Network error. Please try again.";
      errorMsg.classList.remove("hidden");
    }

    setTimeout(() => {
      successMsg.classList.add("hidden");
      errorMsg.classList.add("hidden");
    }, 5000);
  });

  // Hero Section CV / Resume modal logic
  const heroOpenCvBtn = document.getElementById("openCvModal");
  const heroCloseCvBtn = document.getElementById("heroCloseCvModal");
  const heroCvModal = document.getElementById("heroCvModal");
  const heroCvIframe = document.getElementById("heroCvIframe");

  // URL for CV/Resume PDF
  const heroCvPdfUrl = "/Derrick_Sarfo_Wiredu_CV.pdf";

  heroOpenCvBtn.addEventListener("click", (e) => {
    e.preventDefault();
    heroCvModal.classList.remove("hidden");
    if (!heroCvIframe.src) {
      heroCvIframe.src = heroCvPdfUrl;
      heroCvIframe.classList.remove("hidden");
    }
  });

  heroCloseCvBtn.addEventListener("click", () => {
    heroCvModal.classList.add("hidden");
    heroCvIframe.src = "";
    heroCvIframe.classList.add("hidden");
  });

  heroCvModal.addEventListener("click", (e) => {
    if (e.target === heroCvModal) {
      heroCvModal.classList.add("hidden");
      heroCvIframe.src = "";
      heroCvIframe.classList.add("hidden");
    }
  });

  // download center modal logic
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfIframe");
  const closeBtn = document.getElementById("closePdfModal");
  const modalTitle = document.getElementById("pdfModalTitle");

  document.querySelectorAll(".openPdfBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const pdfUrl = btn.dataset.pdf;
      const isResume = pdfUrl.toLowerCase().includes("resume");
      modalTitle.textContent = isResume ? "My Resume" : "My Curriculum Vitae";
      iframe.src = pdfUrl;
      iframe.classList.remove("hidden");
      modal.classList.remove("hidden");
      document.body.classList.add("modal-open");
    });
  });

  function closeModal() {
    modal.classList.add("hidden");
    iframe.src = "";
    iframe.classList.add("hidden");
    document.body.classList.remove("modal-open");
    document.getElementById("download").scrollIntoView({ behavior: "smooth" });
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  
  // Resume/CV filter buttons
  function isMobileView() {
    return window.innerWidth < 768;
  }

  const filterButtons = document.querySelectorAll(".download-filter-btn");
  const downloadCards = document.querySelectorAll(".resume-cv-card");
  let currentCard = document.querySelector('[data-card="resume"]');

  function applyMobileFilter(target) {
    const newCard = document.querySelector(`[data-card="${target}"]`);
    if (!newCard || newCard === currentCard) return;

    currentCard?.classList.add("hidden");
    currentCard?.classList.remove("fade-in");

    newCard.classList.remove("hidden");
    newCard.classList.add("fade-in");

    currentCard = newCard;
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (!isMobileView()) return;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const target = button.getAttribute("data-target");
      applyMobileFilter(target);
    });
  });

  function updateCardVisibilityOnResize() {
    if (!isMobileView()) {
      // Show both cards
      downloadCards.forEach(card => card.classList.remove("hidden"));
      currentCard = null;
    } else {
      // Show only selected card
      const activeBtn = document.querySelector(".download-filter-btn.active");
      const target = activeBtn?.getAttribute("data-target") || "resume";

      downloadCards.forEach(card => {
        const isTarget = card.getAttribute("data-card") === target;
        card.classList.toggle("hidden", !isTarget);
        if (isTarget) currentCard = card;
      });
    }
  }

  window.addEventListener("resize", updateCardVisibilityOnResize);
  window.addEventListener("DOMContentLoaded", updateCardVisibilityOnResize);


  const resumeFilterBtns = document.querySelectorAll(".resume-filter-btn");
  const resumeCardEls = document.querySelectorAll(".resume-card");
  const defaultFilter = "major";

  // Set initial card visibility on load
  resumeCardEls.forEach(card => {
    const isVisible = card.getAttribute("data-category") === defaultFilter;
    card.classList.toggle("hidden", !isVisible);
  });

  // Set initial active button state
  resumeFilterBtns.forEach(btn => {
    const isActive = btn.getAttribute("data-filter") === defaultFilter;
    btn.classList.toggle("bg-indigo-500", isActive);
    btn.classList.toggle("dark:bg-orange-500", isActive);
    btn.classList.toggle("text-white", isActive);
    btn.classList.toggle("bg-gray-200", !isActive);
    btn.classList.toggle("dark:bg-gray-800", !isActive);
    btn.classList.toggle("text-gray-700", !isActive);
    btn.classList.toggle("dark:text-gray-300", !isActive);
  });

  // Add click interaction
  resumeFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedCategory = btn.getAttribute("data-filter");

      // 👉 Immediately update active styling
      resumeFilterBtns.forEach(b => {
        b.classList.remove(
          "bg-indigo-500",
          "dark:bg-orange-500",
          "text-white",
          "border",
          "border-gray-300",
          "dark:border-gray-700"
        );
        b.classList.add(
          "bg-gray-200",
          "dark:bg-gray-800",
          "text-gray-700",
          "dark:text-gray-300",
          "transition-colors",
          "duration-150"
        );
      });

      btn.classList.remove(
        "bg-gray-200",
        "dark:bg-gray-800",
        "text-gray-700",
        "dark:text-gray-300"
      );
      btn.classList.add(
        "bg-indigo-500",
        "dark:bg-orange-500",
        "text-white"
      );

      // 🔄 Filter the cards
      resumeCardEls.forEach(card => {
        const matches = card.getAttribute("data-category") === selectedCategory;
        card.classList.toggle("hidden", !matches);
      });
    });
  });

  // Debounce Function
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Google Analytics Tracking
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");

  // Typing Animation
  new Typed("#typed-text", {
    strings: [
      "Computer Science &amp; Engineering Major",
      "Frontend Developer",
      "UI/UX Designer",
      "Backend Engineer",
      "Freelance Publisher",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
  });
});
import './index.css';
import Swiper from "swiper/bundle";
import "swiper/css/bundle";


window.addEventListener('DOMContentLoaded', () => {
  // Toggle mobile nav
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Dark mode toggle (desktop + mobile)
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const themeButtons = [themeToggle, mobileThemeToggle].filter(Boolean); // remove nulls

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

  // Apply stored or system theme
  const stored = localStorage.getItem('theme');
  const isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  applyTheme(isDark);
});


document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS animations
    AOS.init({ duration: 1000 });

    // Theme Toggle Setup
    const updateThemeUI = (isDark) => {
        const themeIcon = document.getElementById("theme-icon");
        const themeLabel = document.getElementById("theme-label");
        if (themeIcon && themeLabel) {
            themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
            themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
        }

        const mobileIcon = document.getElementById("mobile-theme-icon");
        const mobileLabel = document.getElementById("mobile-theme-label");
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

    // Apply stored theme preference
    const isDark = localStorage.theme === "dark";
    document.body.classList.toggle("dark", isDark);
    updateThemeUI(isDark);

    document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
    document.getElementById("mobile-theme-toggle")?.addEventListener("click", toggleTheme);

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

document.addEventListener("DOMContentLoaded", () => {
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
});

document.addEventListener("DOMContentLoaded", () => {
    const projects = [
        {
                  title: "E-commerce UI",
                  category: "design",
                  image: "assets/images/craft.jpg",
                  description:
                    "A visually engaging and user-centric UI/UX design concept tailored for an eCommerce platform specializing in handcrafted wooden furniture. The interface showcases a rich catalog of custom-made chairs, tables, wardrobes, and other crafts. Emphasis was placed on elegant product displays, seamless category navigation, real-time filtering, and a responsive layout to ensure a smooth shopping experience across devices. The design supports customer trust-building through aesthetic consistency, detailed product views, and a streamlined checkout process.",
                  tech: ["Figma"],
                  github: "#",
                  demo: "https://your-demo-link.com",
                },
                {
                  title: "Hotel Management System",
                  category: "web",
                  image: "assets/images/GT dashboard.png",
                  description:
                    "A full-stack hotel management system designed to simplify operations for administrators, managers, employees, and customers. The system includes role-based dashboards with tailored functionalities: bookings, room management, employee scheduling, user authentication, and automated billing. Built using PHP and SQL for robust backend operations, with a responsive frontend using HTML and CSS. This solution offers a practical interface for real-time hotel resource tracking and service optimization, ensuring a streamlined hospitality experience for all user roles.",
                  tech: ["HTML", "CSS", "PHP", "SQL"],
                  github: "https://github.com/your-hotel-mgt",
                  demo: "https://your-demo-link.com",
                },
                {
                  title: "Disney+ UI/UX",
                  category: "design",
                  image: "assets/images/disney.png",
                  description:
                    "A playful and modern redesign concept for Disney+, crafted to enhance the user journey across devices. It features intuitive navigation, bold typography, and immersive visuals with a magical theme. This version improves content discovery with personalized rows, animation-enhanced UI, and kid-friendly layouts. Parental controls and accessibility are built-in. The interface was designed with families in mind—focusing on both functionality and joy, ensuring users (both young and aged) stay engaged in the streaming experience.",
                  tech: ["Figma"],
                  github: "#",
                  demo: "https://your-demo-link.com",
                },
                {
                  title: "Tailor App",
                  category: "mobile",
                  image: "assets/images/tailor.jpg",
                  description:
                    "A specialized mobile app for fashion designers and tailors to efficiently manage clients, fabrics, and custom orders. The app allows users to store accurate measurements, attach fabric images, assign deadlines, and monitor balances. Built with Flutter and Firebase, it supports real-time updates, push notifications, and secure cloud data handling. Designed to prevent fabric mix-ups and improve workflow, the platform enhances productivity and customer satisfaction with its sleek, intuitive interface. An upcoming update will include visual dress previews.",
                  tech: ["Flutter", "Firebase"],
                  github: "https://github.com/your-fashion-app",
                  demo: "https://your-demo-link.com",
                },
                {
                  title: "Healthcare DBMS",
                  category: "web",
                  image: "assets/images/phpMyAdmin.png",
                  description:
                    "A secure, SQL-powered healthcare database system for organizing patient records, prescriptions, and clinical tasks. Featuring multi-role access levels, the platform differentiates doctors, pharmacists, and admins. It supports analytical queries, medication history tracking, and prescription management. The interface enables real-time data retrieval and updates to reduce errors. By centralizing healthcare operations, this system improves efficiency, accountability, and the overall patient care experience. Future upgrades may include mobile doctor access.",
                  tech: ["SQL"],
                  github: "https://github.com/your-healthcare-dbms",
                  demo: "https://your-demo-link.com",
                },
                {
                  title: "Smart Villa VR Experience",
                  category: "3D graphics",
                  image: "assets/images/smart-villa.png",
                  description:
                    "An immersive virtual reality smart villa built using A-Frame. This interactive 3D experience allows users to explore a digital villa environment with realistic lighting, ambient sound, animated water effects, and detailed models of furniture and appliances. It supports both desktop and VR headset navigation, offering features like grab-and-pan camera control, light/dark mode toggle, and day/night transitions. Designed for architectural visualization, this project demonstrates modern web-based VR techniques, spatial UI interaction, and mobile responsiveness.",
                  tech: ["A-Frame", "HTML", "three.js"],
                  github: "https://github.com/your-smart-villa-vr",
                  demo: "https://4100823423ceiscycom-examination.vercel.app/",
                },
                {
                  title: "Graphics Design Showcase",
                  category: "design",
                  image: "assets/images/showcase.png",
                  description:
                    "A portfolio of branding and logo design projects made for businesses in tech, fashion, food, and education. This collection showcases clean, minimalist styles emphasizing geometry, symbolism, and typography. Every logo reflects the brand’s voice while remaining versatile across digital and print formats. Designed in Adobe Illustrator and Figma, these pieces are optimized for scalability and visual consistency. The showcase captures the evolution of concepts from sketches to polished, production-ready designs.",
                  tech: ["Photoshop", "Illustrator", "Figma"],
                  github: "#",
                  demo: "https://dribbble.com/yourprofile",
                },
    ]; // Keep your projects array unchanged here
    let swiper;

    function renderProjects(category = "all") {
        const grid = document.getElementById("projectGrid");
        grid.innerHTML = "";

        const filtered = category === "all" ? projects : projects.filter(p => p.category === category);

        const slideHTML = filtered.map(project => `
            <div class="swiper-slide bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group flex flex-col">
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
            slidesPerView: 1,
            spaceBetween: 24,
            loop: false,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });

        setTimeout(() => {
        AOS.refresh();
    }, 500);
}

    renderProjects(); // Initial load

    document.getElementById("projectGrid")?.addEventListener("click", (e) => {
        const clickedSlide = e.target.closest(".swiper-slide");
        if (!clickedSlide) return;

        const title = clickedSlide.querySelector("h4")?.innerText;
        const project = projects.find(p => p.title === title);

        if (project) {
            openModal(project);
        }
    });

    document.querySelectorAll(".project-filter").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".project-filter").forEach(b => b.classList.remove("active", "bg-orange-500", "text-white"));
            button.classList.add("active", "bg-orange-500", "text-white");
            renderProjects(button.dataset.category);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("projectGridWrapper");
    if (!wrapper) return; // Prevent errors if the element doesn't exist

    let isDragging = false;
    let startX;
    let scrollLeft;

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
});

document.addEventListener("DOMContentLoaded", () => {
    const skillsGrid = document.getElementById("skillsGrid");
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
    ]; // Keep your skillsData array unchanged here

    function renderSkills(category = "all") {
        skillsGrid.innerHTML = "";

        const filteredSkills = category === "all" ? skillsData : skillsData.filter(skill => skill.category === category);

        filteredSkills.forEach(skill => {
            const skillCard = document.createElement("div");
            skillCard.className = "flex flex-col gap-3 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md opacity-0 translate-y-10 transition-all duration-700 ease-out will-change-transform";

            skillCard.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="${skill.icon} text-2xl text-indigo-600 dark:text-indigo-400"></i>
                    <h3 class="text-xl font-semibold">${skill.name}</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-300 text-sm">${skill.description}</p>
                <div class="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded overflow-hidden">
                    <div class="proficiency-bar h-2 rounded" style="width: 0%" data-percentage="${skill.proficiency}"></div>
                </div>
                <div class="flex flex-col md:flex-row md:justify-between text-sm text-gray-600 dark:text-gray-400 gap-2 md:gap-0 text-center md:text-left">
                    <span><strong>${skill.years}</strong> years</span>
                    <span><strong>${skill.projects >= 10 ? "10+" : skill.projects}</strong> projects</span>
                    <span class="proficiency-count">
                        <strong class="proficiency-text text-indigo-600 transition-transform-opacity" data-count="${skill.proficiency}">0%</strong> proficiency
                    </span>
                </div>
            `;

            skillsGrid.appendChild(skillCard);

            setTimeout(() => {
                const loaderBar = skillCard.querySelector(".proficiency-bar");
                loaderBar.style.width = loaderBar.getAttribute("data-percentage") + "%";
            }, 100);
        });

        triggerAnimations();
        animateOnScroll();
    }

    function triggerAnimations() {
        document.querySelectorAll("#skillsGrid > div").forEach(card => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove("opacity-0", "translate-y-10");
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(card);
        });
    }

    function animateOnScroll() {
        document.querySelectorAll(".proficiency-count strong").forEach(el => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let count = 0;
                        const target = parseInt(entry.target.dataset.count, 10);
                        const interval = setInterval(() => {
                            if (count < target) {
                                count++;
                                entry.target.textContent = count + "%";
                            } else {
                                clearInterval(interval);
                            }
                        }, 15);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(el);
        });
    }

    renderSkills(); // Ensure the initial render executes properly

    document.querySelectorAll(".skill-filter").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".skill-filter").forEach(b => b.classList.remove("active", "bg-indigo-600", "text-white"));
            btn.classList.add("active", "bg-indigo-600", "text-white");
            renderSkills(btn.getAttribute("data-category"));
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Navbar Active Section Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove("text-indigo-600", "font-bold");
                    if (link.getAttribute("href").substring(1) === entry.target.id) {
                        link.classList.add("text-indigo-600", "font-bold");
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // Scroll to Top Button
    const scrollBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
            scrollBtn.classList.remove("opacity-0", "pointer-events-none");
        } else {
            scrollBtn.classList.add("opacity-0", "pointer-events-none");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Contact Form Submission
    const form = document.getElementById("contact-form");
    const statusContainer = document.getElementById("form-status");
    const successMsg = document.getElementById("success-message");
    const errorMsg = document.getElementById("error-message");

    form.addEventListener("submit", async (event) => {
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

    // Resume Modal Handling
    const openBtn = document.getElementById("openResumeModal");
    const closeBtn = document.getElementById("closeResumeModal");
    const modal = document.getElementById("resumeModal");
    const iframe = document.getElementById("resumeIframe");
    const pdfUrl = "resume/Derrick_Sarfo_Wiredu_Resume.pdf";

    openBtn?.addEventListener("click", () => {
        modal.classList.remove("hidden");
        if (!iframe.src) {
            iframe.src = pdfUrl;
            iframe.classList.remove("hidden");
        }
    });

    closeBtn?.addEventListener("click", () => modal.classList.add("hidden"));

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
    });

    // Resume Filtering Logic
    const resumeFilterBtns = document.querySelectorAll(".resume-filter-btn");
    const resumeCardEls = document.querySelectorAll(".resume-card");
    const defaultFilter = "major";

    // Set initial visibility
    resumeCardEls.forEach(card => {
        card.classList.toggle("hidden", card.getAttribute("data-category") !== defaultFilter);
    });

    // Apply default filter styling
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

    // Add filtering interaction
    resumeFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedCategory = btn.getAttribute("data-filter");

            resumeCardEls.forEach(card => {
                card.classList.toggle("hidden", card.getAttribute("data-category") !== selectedCategory);
            });

            resumeFilterBtns.forEach(b => {
                b.classList.remove("bg-indigo-500", "dark:bg-orange-500", "text-white");
                b.classList.add("bg-gray-200", "dark:bg-gray-800", "text-gray-700", "dark:text-gray-300", "border", "border-gray-300", "dark:border-gray-700");
            });

            btn.classList.remove("bg-gray-200", "dark:bg-gray-800", "dark:text-gray-300", "text-gray-700");
            btn.classList.add("bg-indigo-500", "dark:bg-orange-500", "text-white");
        });
    });
});




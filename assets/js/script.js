document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobilePanel = document.querySelector("[data-mobile-panel]");

  if (menuButton && mobilePanel) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      const icon = menuButton.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  document.querySelectorAll("[data-faq-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isActive = item.classList.toggle("active");
      button.setAttribute("aria-expanded", String(isActive));
      if (answer) answer.setAttribute("aria-hidden", String(!isActive));

      if (isActive) {
        document.querySelectorAll(".faq-item").forEach((other) => {
          if (other === item) return;
          other.classList.remove("active");
          const otherButton = other.querySelector("[data-faq-button]");
          const otherAnswer = other.querySelector(".faq-answer");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
          if (otherAnswer) otherAnswer.setAttribute("aria-hidden", "true");
        });
      }
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      let valid = true;
      const fields = contactForm.querySelectorAll("[data-required]");

      fields.forEach((field) => {
        const error = contactForm.querySelector(`[data-error-for="${field.id}"]`);
        const value = field.value.trim();
        let message = "";

        if (!value) {
          message = "This field is required.";
        } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Enter a valid email address.";
        }

        if (message) valid = false;
        if (error) error.textContent = message;
        field.setAttribute("aria-invalid", String(Boolean(message)));
      });

      const status = contactForm.querySelector("[data-form-status]");
      if (status) {
        if (valid) {
          status.textContent = "Submitting your inquiry...";
          status.className = "text-sm font-bold text-green-700";
        } else {
          status.textContent = "Please correct the highlighted fields.";
          status.className = "text-sm font-bold text-red-700";
        }
      }

      if (!valid) event.preventDefault();
    });
  }

  if (window.AOS) {
    AOS.init({
      duration: 760,
      once: true,
      offset: 90,
      easing: "ease-out-cubic"
    });
  }

  if (window.gsap) {
    gsap.from(".hero-kicker", { y: 18, opacity: 0, duration: 0.7, ease: "power2.out" });
    gsap.from(".hero-title", { y: 30, opacity: 0, duration: 0.85, delay: 0.12, ease: "power3.out" });
    gsap.from(".hero-copy", { y: 24, opacity: 0, duration: 0.75, delay: 0.24, ease: "power2.out" });
    gsap.from(".hero-actions", { y: 20, opacity: 0, duration: 0.7, delay: 0.36, ease: "power2.out" });
    gsap.from(".hero-card", { x: 34, opacity: 0, duration: 0.9, delay: 0.28, ease: "power3.out" });

    const revealItems = document.querySelectorAll(".service-card, .value-card, .office-card, .faq-item, .stat-card, .kpi-card, .lane-card, .timeline-card, .process-step, .map-card");
    revealItems.forEach((item) => {
      gsap.set(item, { opacity: 0, y: 18 });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => revealObserver.observe(item));

    const counterItems = document.querySelectorAll("[data-counter]");
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute("data-counter")) || 0;
        const suffix = el.getAttribute("data-suffix") || "";
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target,
          duration: 1.3,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function onUpdate() {
            el.textContent = `${Math.round(Number(el.innerText)).toLocaleString()}${suffix}`;
          }
        });
        observer.unobserve(el);
      });
    }, { threshold: 0.35 });
    counterItems.forEach((item) => counterObserver.observe(item));
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});

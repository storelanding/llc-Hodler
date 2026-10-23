/* Hodler Store — shared interactions */
(function () {
  "use strict";

  // Sticky header background on scroll
  var header = document.querySelector(".site-header");
  if (header && !header.classList.contains("solid")) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      header.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        header.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Collection filter
  var filterButtons = document.querySelectorAll(".filter-bar button");
  var products = document.querySelectorAll(".product");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.dataset.filter;
      products.forEach(function (p) {
        var match = f === "all" || p.dataset.cat.split(" ").indexOf(f) !== -1;
        p.classList.toggle("hide", !match);
      });
    });
  });

  // AI try-on preview
  var stageImg = document.querySelector(".tryon-stage img");
  var scan = document.querySelector(".tryon-scan");
  var labelName = document.querySelector(".tryon-label strong");
  var labelInfo = document.querySelector(".tryon-label span");
  var picks = document.querySelectorAll(".tryon-picker button");
  picks.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("active")) return;
      picks.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      stageImg.classList.add("fade");
      scan.classList.remove("run");
      void scan.offsetWidth;
      scan.classList.add("run");
      setTimeout(function () {
        stageImg.src = btn.dataset.look;
        stageImg.alt = btn.dataset.name;
        labelName.textContent = btn.dataset.name;
        labelInfo.textContent = btn.dataset.info;
        stageImg.classList.remove("fade");
      }, 450);
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open);
      a.style.maxHeight = open ? a.scrollHeight + "px" : null;
    });
  });

  // Contact form -> opens the visitor's email client
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = "[Hodler Store] " + d.get("topic") + " — " + d.get("name");
      var body =
        "Name: " + d.get("name") + "\n" +
        "Email: " + d.get("email") + "\n" +
        "Topic: " + d.get("topic") + "\n\n" +
        d.get("message");
      window.location.href =
        "mailto:nambabi2609@gmail.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  // Newsletter
  var news = document.querySelector("#newsletter-form");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = news.querySelector("input").value;
      window.location.href =
        "mailto:nambabi2609@gmail.com?subject=" + encodeURIComponent("Newsletter subscription") +
        "&body=" + encodeURIComponent("Please add " + email + " to the Hodler Store newsletter.");
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

(function () {
  "use strict";

  // Highlight the active nav link based on body[data-page]
  var page = document.body.getAttribute("data-page");
  if (page) {
    document.querySelectorAll(".site-nav a[data-page]").forEach(function (a) {
      if (a.getAttribute("data-page") === page) a.classList.add("active");
    });
  }

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  // Copy-to-clipboard buttons: <div class="copyable">...<button class="copy-btn">Copy</button></div>
  document.querySelectorAll(".copyable").forEach(function (block) {
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var clone = block.cloneNode(true);
      var innerBtn = clone.querySelector(".copy-btn");
      if (innerBtn) innerBtn.remove();
      var text = clone.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "Copied";
          btn.classList.add("copied");
          setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 1500);
        }).catch(function () {});
      }
    });
    block.style.position = block.style.position || "relative";
    block.appendChild(btn);
  });

  // Confidential-info overlay (index page only): accept dismisses it upward.
  var overlay = document.getElementById("confidentialOverlay");
  var acceptBtn = document.getElementById("confidentialOverlayAccept");
  if (overlay && acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      overlay.classList.add("is-dismissed");
      document.body.classList.remove("confidential-locked");
      overlay.addEventListener("transitionend", function handler() {
        overlay.removeEventListener("transitionend", handler);
        overlay.remove();
      });
    });
  }
})();

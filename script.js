(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     1) MỞ CON DẤU -> HIỆN NỘI DUNG + CONFETTI
     ========================================================= */
  const sealScreen = document.getElementById("seal-screen");
  const sealButton = document.getElementById("break-seal");
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Màu confetti lấy đúng từ bảng màu của trang (vàng / hồng / kem)
  const confettiColors = ["#c9a24c", "#e3c98a", "#d98c8c", "#f6efe0"];
  let particles = [];
  let confettiRunning = false;

  function spawnConfetti(count) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 60,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 9,
        vy: Math.random() * -9 - 3,
        size: Math.random() * 7 + 4,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        gravity: 0.22 + Math.random() * 0.08,
        life: 0
      });
    }
  }

  function tickConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.life += 1;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });

    particles = particles.filter((p) => p.y < canvas.height + 40 && p.life < 260);

    if (particles.length > 0) {
      requestAnimationFrame(tickConfetti);
    } else {
      confettiRunning = false;
    }
  }

  function burstConfetti() {
    spawnConfetti(prefersReducedMotion ? 0 : 130);
    if (!confettiRunning && particles.length > 0) {
      confettiRunning = true;
      requestAnimationFrame(tickConfetti);
    }
  }

  function openCard() {
    sealButton.classList.add("is-cracking");
    burstConfetti();

    // Tự động phát nhạc nền ngay khi mở thiệp (nằm trong thao tác click của người dùng
    // nên hầu hết trình duyệt sẽ cho phép autoplay có âm thanh).
    playMusic();

    window.setTimeout(() => {
      sealScreen.classList.add("is-open");
      document.body.style.overflow = "auto";
      revealOnScroll();
    }, prefersReducedMotion ? 0 : 420);
  }

  function closeCard() {
    sealScreen.classList.remove("is-open");
    sealButton.classList.remove("is-cracking");
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  // Chặn cuộn trang khi màn hình con dấu còn hiện
  document.body.style.overflow = "hidden";

  sealButton.addEventListener("click", openCard);
  sealButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openCard();
    }
  });

  const backButton = document.getElementById("back-to-seal");
  backButton.addEventListener("click", closeCard);

  /* =========================================================
     2) SCROLL REVEAL CHO TỪNG SECTION
     ========================================================= */
  const revealEls = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ========================================================= 
     3) NHẠC NỀN — TỰ PHÁT KHI MỞ THIỆP, ĐIỀU KHIỂN QUA 1 NÚT DUY NHẤT
     ========================================================= */
  const bgMusic = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle");

  function setMusicUI(isPlaying) {
    if (!musicBtn) return;
    musicBtn.classList.toggle("is-playing", isPlaying);
    musicBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    musicBtn.setAttribute("aria-label", isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền");
  }

  function playMusic() {
    bgMusic.play()
      .then(() => setMusicUI(true))
      .catch(() => {
        setMusicUI(false);
        console.warn("Trình duyệt chặn autoplay hoặc chưa có file assets/music.mp3");
      });
  }

  function toggleMusic() {
    if (bgMusic.paused) {
      playMusic();
    } else {
      bgMusic.pause();
      setMusicUI(false);
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusic);}
})();

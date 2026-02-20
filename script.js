const canvas = document.querySelector('#bg');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0x9333ea});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
scene.add(pointLight);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
}

animate();
const textArray = [
  "Frontend VLSI Designer",
  "AI Enthusiast",
  "Digital System Architect",
  "Electronics Engineer"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  const typed = document.getElementById("typed");
  if (!typed) return;

  if (!isDeleting && charIndex <= textArray[index].length) {
    currentText = textArray[index].substring(0, charIndex++);
  } else if (isDeleting && charIndex >= 0) {
    currentText = textArray[index].substring(0, charIndex--);
  }

  typed.textContent = currentText;

  if (charIndex === textArray[index].length) {
    isDeleting = true;
    setTimeout(() => {}, 1000);
  } else if (charIndex === 0 && isDeleting) {
    isDeleting = false;
    index = (index + 1) % textArray.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
window.addEventListener("scroll", () => {
  const fills = document.querySelectorAll(".progress-fill");

  fills.forEach(fill => {
    const rect = fill.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      fill.style.width = fill.getAttribute("data-width");
    }
  });
});
const projectCards = document.querySelectorAll(".project-card");

const revealProjects = () => {
  const triggerBottom = window.innerHeight * 0.85;

  projectCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealProjects);
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("footerParticles");

  // Safety check
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];

  // create particles
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      // bounce from edges
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 211, 238, 0.7)";
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});

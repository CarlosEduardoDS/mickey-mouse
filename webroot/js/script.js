// troca o mickey pelo queijo e anima o nariz e troca o icon da aba do navegador
const mickeyMouse = document.getElementById("mickeyMouse");
const queijoContainer = document.getElementById("queijoContainer");
const nariz = document.getElementById("nariz");
const pontoLuz = document.getElementById("pontoLuz");
const queijo = document.querySelectorAll(".queijo");
const audioBuzina = new Audio()

let favicon = document.querySelector("link[rel='icon']");

audioBuzina.src = "webroot/buzina.mp3";

nariz.addEventListener("click", () => {
   audioBuzina.play();
   nariz.classList.add("anima-nariz");
   pontoLuz.classList.add("anima-nariz-ponto");

   setTimeout(() => {
      favicon.href = "webroot/img/iconqueijo.png";
      mickeyMouse.style.display = "none";
      queijoContainer.style.display = "block";
   }, 750);
});

queijo.forEach(function (queijoFilho) {
   queijoFilho.addEventListener("click", () => {
      if (queijoContainer.style.display === "block") {
         mickeyMouse.style.display = "flex";
         queijoContainer.style.display = "none";
         nariz.classList.remove("anima-nariz");
         pontoLuz.classList.remove("anima-nariz-ponto");
         favicon.href = "webroot/img/iconmickey.png";
      }
   });
});


// Animação dos olhos
document.addEventListener("DOMContentLoaded", () => {
   const olhoEsq = document.getElementById("olhoEsq");
   const olhoDir = document.getElementById("olhoDir");
   const pupilaEsq = document.getElementById("pupilaEsq");
   const pupilaDir = document.getElementById("pupilaDir");

   let mouseX = 0;
   let mouseY = 0;
   let posEsq = { x: 0, y: 0 };
   let posDir = { x: 0, y: 0 };

   document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
   });

   function movePupilaSmooth(olho, pupila, pos) {
      const bounds = olho.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const angle = Math.atan2(dy, dx);

      const maxX = 10;
      const maxY = 20;
      const targetX = Math.cos(angle) * maxX;
      const targetY = Math.sin(angle) * maxY;

      // easing: aproxima aos poucos do destino
      pos.x += (targetX - pos.x) * 0.1;
      pos.y += (targetY - pos.y) * 0.1;

      pupila.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
   }

   function animate() {
      movePupilaSmooth(olhoEsq, pupilaEsq, posEsq);
      movePupilaSmooth(olhoDir, pupilaDir, posDir);
      requestAnimationFrame(animate);
   }

   animate();
});
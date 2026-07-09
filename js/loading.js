window.addEventListener("load", () => {
  const wave = document.getElementById("wavePath");
  const waveWrap = document.querySelector(".real-wave-wrap");
  const blackLine = document.querySelector(".black-line");
  const dot = document.querySelector(".dot");
  const percent = document.getElementById("percent");

  let progress = 0;

// 白線を描画（2.2秒）
const waveLength = wave.getTotalLength();

wave.style.strokeDasharray = waveLength;
wave.style.strokeDashoffset = waveLength;

waveWrap.style.opacity = 1;

setTimeout(() => {
  wave.style.transition = "stroke-dashoffset 2.2s ease-out";
  wave.style.strokeDashoffset = 0;
}, 200);

  // 白線完了後 → 黒線＆パーセント表示
  setTimeout(() => {
    blackLine.style.opacity = 1;
    percent.style.opacity = 1;

    const loadingTimer = setInterval(() => {
      progress++;
      percent.textContent = progress + "%";

      if (progress >= 100) {
        clearInterval(loadingTimer);
        // ローディング終了
        setTimeout(() => {
          document.getElementById("loading").style.opacity = "0";
          document.getElementById("loading").style.pointerEvents = "none";
          document.getElementById("loading").style.transition = "1s ease";
        }, 800);
      }
    }, 30); // ← パーセント速度ゆっくり見える

    // dot 移動 (4.5秒)
   dot.style.transition = "left 3s ease";
    dot.style.left = "100%";

  }, 2600);
});

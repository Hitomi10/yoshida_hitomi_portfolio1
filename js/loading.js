// 初回訪問時のみアニメーションを実行する（同じセッション内で再度 index.html に戻ってきた場合は
// index.html 側のインラインスクリプトで #loading を即非表示にしているため、ここでは何もしない）
if (!sessionStorage.getItem("seeLoadingShown")) {
  sessionStorage.setItem("seeLoadingShown", "1");

  window.addEventListener("load", () => {
  const wave = document.getElementById("wavePath");
  const waveWrap = document.querySelector(".real-wave-wrap");
  const blackLine = document.querySelector(".black-line");
  const dot = document.querySelector(".dot");
  const percent = document.getElementById("percent");

  let progress = 0;

// 白線を左→右へ描画（2.2秒、clip-pathのワイプで表示するので逆走しない）
waveWrap.style.opacity = 1;

setTimeout(() => {
  waveWrap.classList.add("is-drawn");
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
}

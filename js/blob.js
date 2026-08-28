document.addEventListener("DOMContentLoaded", () => {
  const blobWrapper = document.querySelector(".blob-wrapper");

  const aboutTitle = document.querySelector(".about-title");
  const worksTitle = document.querySelector(".works-title");
  const photoTitle = document.querySelector(".photo-title");

  if (!blobWrapper || !aboutTitle || !worksTitle || !photoTitle) return;

  // 400px以下だけ、セクション別に追加ズレ
  function getResponsiveShiftBySection(key) {
    if (window.innerWidth > 400) return { x: 0, y: 0 };

    const shift400 = {
      about: { x: 50, y: 25 },
      works: { x: 200, y: 30 },
      photo: { x: 5, y: 25 },
    };

    return shift400[key] || { x: 0, y: 0 };
  }

  // タイトルごとに position オフセットを設定（通常）
  const sections = [
    { key: "about", title: aboutTitle, offsetX: -80, offsetY: -50 },
    { key: "works", title: worksTitle, offsetX: -90, offsetY: -50 },
    { key: "photo", title: photoTitle, offsetX: 20, offsetY: -50 },
  ];

  let currentIndex = 0;

  function followCurrentTitle() {
    const s = sections[currentIndex];
    const rect = s.title.getBoundingClientRect();

    const shift = getResponsiveShiftBySection(s.key); // ★追加

    let pageX = rect.left + window.scrollX + s.offsetX + shift.x; // ★足す
    const pageY = rect.top + window.scrollY + s.offsetY + shift.y;  // ★足す

    // ▼スマホ版のみ：.blob-wrapperは親要素にposition指定が無く、position:absolute
    // の基準がビューポート（初期包含ブロック）になっているため、上のoffsetX/shift.x
    // 計算結果が画面幅を超えると、body側のoverflow-x:hiddenでは止まらずページ自体の
    // 横スクロール領域が広がり、縦スクロール中に左右へブレる原因になっていた。
    // デザイン（ブロブが見出しを追いかける動き）は変えず、実際に画面内に収まる
    // 範囲だけにX座標を収める。
    if (window.innerWidth <= 768) {
      const viewportWidth = document.documentElement.clientWidth;
      const maxX = Math.max(0, viewportWidth - blobWrapper.offsetWidth);
      pageX = Math.min(Math.max(pageX, 0), maxX);
    }

    blobWrapper.style.left = `${pageX}px`;
    blobWrapper.style.top = `${pageY}px`;
  }

  function updateBlobClass() {
    blobWrapper.classList.remove("pos-about", "pos-works", "pos-photo");
    blobWrapper.classList.add(`pos-${sections[currentIndex].key}`);
  }

  function onScroll() {
    const triggerY = window.innerHeight * 0.5;
    let newIndex = 0;

    sections.forEach((s, i) => {
      if (s.title.getBoundingClientRect().top <= triggerY) newIndex = i;
    });

    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateBlobClass();
      followCurrentTitle();
    }

    followCurrentTitle();
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onScroll);

  updateBlobClass();
  onScroll();
});

// ============================================================
// 第九報告書 — 共通スクリプト
// ============================================================

(function () {
  const body = document.body;
  const depth = parseInt(body.dataset.depth || "0", 10);
  const MAX_DEPTH = 7;
  document.documentElement.style.setProperty("--depth", (depth / MAX_DEPTH).toFixed(3));

  // ---- 環境音（white_noise1）: 最初のユーザー操作で再生開始 ----
  let ambient = null;
  function initAmbient(vol) {
    if (body.dataset.noAmbient === "true") return;
    ambient = new Audio("assets/audio/white_noise1.mp3");
    ambient.loop = true;
    ambient.volume = 0;
    const target = typeof vol === "number" ? vol : 0.12 + depth * 0.02;
    const start = () => {
      ambient.play().catch(() => {});
      let v = 0;
      const fade = setInterval(() => {
        v += 0.01;
        ambient.volume = Math.min(v, target);
        if (v >= target) clearInterval(fade);
      }, 80);
      window.removeEventListener("click", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
    };
    window.addEventListener("click", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    window.addEventListener("touchstart", start, { once: true });
  }

  function playSting(vol) {
    const s = new Audio("assets/audio/death_sound4.mp3");
    s.volume = typeof vol === "number" ? vol : 0.5;
    s.play().catch(() => {});
    return s;
  }

  window.NR = { initAmbient, playSting, depth };

  // ---- URLゲート：正解語を入力すると次のページのパスを提示する ----
  // 全角英数字→半角、前後・内部の余分な空白を除去してから比較する
  function normalize(s) {
    return (s || "")
      .replace(/[\uFF01-\uFF5E]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)) // 全角→半角
      .replace(/\u3000/g, " ") // 全角スペース→半角スペース
      .trim()
      .replace(/\s+/g, "")
      .toLowerCase();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-gate]").forEach((form) => {
      const answer = normalize(form.dataset.gate || "");
      const nextHref = form.dataset.next || "#";
      const input = form.querySelector("input");
      const container = form.closest(".gate") || form.parentElement;
      const result = container.querySelector(".gate-result");

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = normalize(input.value || "");
        if (val === answer) {
          result.innerHTML =
            '次の座標を確認しました。アドレスバーに直接入力してください：<br><code>' +
            nextHref + "</code>";
          result.style.color = "";
          input.disabled = true;
          form.querySelector("button").disabled = true;
        } else {
          result.textContent = "一致しません。もう一度、資料を読み直してください。";
          form.classList.remove("shake");
          void form.offsetWidth;
          form.classList.add("shake");
        }
      });
    });
  });
})();

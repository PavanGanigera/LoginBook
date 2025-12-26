const pages = document.querySelectorAll(".page");
const lastPageIndex = pages.length - 1;

/* 🔁 Core function – controls everything */
function flipToPage(targetIndex) {
  pages.forEach((page, index) => {
    if (index < targetIndex) {
      page.classList.add("flipped");
    } else {
      page.classList.remove("flipped");
    }
  });
  updateZIndex();
}

/* 📚 Maintain book stacking */
function updateZIndex() {
  pages.forEach((page, index) => {
    page.style.zIndex = page.classList.contains("flipped")
      ? index - 1
      : lastPageIndex - index;
  });
}

/* 👉 Flip button logic (book-style) */
pages.forEach((page, index) => {
  const flipBtn = page.querySelector(".flip-btn");

  if (!flipBtn) return;

  flipBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    // forward
    if (!page.classList.contains("flipped") && index < lastPageIndex) {
      page.classList.add("flipped");
    }
    // backward
    else if (page.classList.contains("flipped")) {
      page.classList.remove("flipped");
    }

    updateZIndex();
  });
});

/* 🔗 Navigation links */
document.getElementById("goSignUp")?.addEventListener("click", e => {
  e.preventDefault();
  flipToPage(2);
});

document.getElementById("goForgot")?.addEventListener("click", e => {
  e.preventDefault();
  flipToPage(3);
});

/* 🚀 Auto open first page */
window.addEventListener("load", () => {
  setTimeout(() => {
    flipToPage(1);
  }, 2000);
});

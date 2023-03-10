import calcScroll from "./calcScroll";

const images = () => {
  const imgPopup = document.createElement("div"),
    workSection = document.querySelector(".works"),
    bigImg = document.createElement("img"),
    scroll = calcScroll();

  imgPopup.classList.add("popup");

  imgPopup.style.cssText = `
    justify-content:center;
    align-items:center;
    display:none;
  `;

  bigImg.classList.add('works_phone');
  imgPopup.appendChild(bigImg);
  workSection.appendChild(imgPopup);

  workSection.addEventListener("click", (e) => {
    e.preventDefault();

    const target = e.target;

    if (target && target.classList.contains("preview")) {
      const path = target.parentNode.getAttribute("href");
      bigImg.setAttribute("src", path);

      bigImg.style.cssText = `
        border-radius: 10px;
      `;

      imgPopup.style.display = "flex";
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${scroll}px`;
    }

    if (target && target.matches("div.popup")) {
      imgPopup.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
    }
  });
};

export default images;

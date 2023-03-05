const modals = (state) => {
  function bindModals(
    triggerSelector,
    modalSelector,
    closeSelector,
    clickCloseOverlay = true
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        if (e.target.classList.contains("popup_calc_button")) {
          const inputWidth = document.querySelector("#width");
          const inputHeight = document.querySelector("#height");

          if (state.form === undefined) {
            alert("Пожалуйста, выберите форму балкона!");
            return;
          }

          if (!inputWidth.value || !inputHeight.value) {
            alert("Пожалуйста, введите желаемую ширину и высоту!");
            return;
          }
        }

        windows.forEach((window) => {
          window.style.display = "none";
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((window) => {
        window.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && clickCloseOverlay) {
        windows.forEach((window) => {
          window.style.display = "none";
        });

        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      document.querySelector(selector).style.display = "block";
      document.body.style.overflow = "hidden";
    }, time);
  }

  bindModals(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );

  bindModals(".phone_link", ".popup", ".popup .popup_close");
  bindModals(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
  bindModals(
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false
  );
  bindModals(
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false
  );

  //showModalByTime(".popup", 60000);
};

export default modals;

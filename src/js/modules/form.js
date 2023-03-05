import checkNumInputs from "./checkNumInputs";

const form = (state) => {
  const forms = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input");

  const messages = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с Вами свяжемся.",
    failure: "Извините! Что-то пошло не так...",
  };

  checkNumInputs('input[name="user_phone"]');

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = messages.loading;

    const res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      form.append(statusMessage);

      const formData = new FormData(form);
      if (form.getAttribute("data-calc") === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      postData("assets/server.php", formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = messages.success;
        })
        .catch(() => {
          statusMessage.textContent = messages.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();

            for (let key in state) {
              delete state[key];
            }

            const formParents =
              form.parentElement.parentElement.parentElement.parentElement;

            if (
              formParents.classList.contains("popup") ||
              formParents.classList.contains("popup_engineer") ||
              formParents.classList.contains("popup_calc_end")
            ) {
              formParents.style.display = "none";
              document.body.style.overflow = "";
            }
          }, 3000);
        });
    });
  });
};

export default form;

const notificationContainer = document.querySelector("#notificationContainer");
const buttonsContainer = document.querySelector("#buttons");
const customForm = document.querySelector("#customForm");
const buttonPaid = document.querySelector("#buttonPaid");
const buttonSent = document.querySelector("#buttonSent");
const buttonGet = document.querySelector("#buttonGet");

// success, info, error
const constructNotification = (title, text, type) => {
  const notification = `
  <div class="notification notification--${type}">
    <div class="notification__icon"><span class="material-symbols-rounded"> done </span></div>
    <div class="notification__data"> 
        <div class="notification__title"> ${title}</div>
        <div class="notification__text">${text} </div>
    </div>
    <span class="material-symbols-rounded notification__close" onclick="closeNotification(this)"> close_small </span>
  </div>
  `;
  return notification;
};

const closeNotification = (notification) => {
  console.log(notification);
  notification.parentElement.classList.add("notification--hidden");
  setTimeout(() => {
    notification.parentElement.remove();
  }, 300);
};

notificationContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("notification__close")) {
    closeNotification(e.target);
  }
});

function createOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Данные получены");
    }, 2000);
  });
}

function setButtonsState(isPaid, isSent) {
  buttonPaid.disabled = isPaid;
  buttonSent.disabled = !isPaid || isSent;
  buttonGet.disabled = !isPaid || !isSent;
}

customForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await createOrder();
  notificationContainer.classList.remove("notification-container__hidden");
  notificationContainer.insertAdjacentHTML(
    "beforeend",
    constructNotification(
      "Заказ создан",
      "ожидайте дальнейшей информации",
      "success",
    ),
  );
  buttonsContainer.classList.remove("buttons--hidden");

  setButtonsState(false, false);
});

buttonPaid.onclick = () => {
  notificationContainer.insertAdjacentHTML(
    "beforeend",
    constructNotification("Заказ оплачен ", "Ожидайте отправки", "info"),
  );

  setButtonsState(true, false);
};

buttonSent.onclick = () => {
  notificationContainer.insertAdjacentHTML(
    "beforeend",
    constructNotification("Заказ отправлен ", "Ожидайте курьера", "info"),
  );

  setButtonsState(true, true);
};

buttonGet.onclick = () => {
  notificationContainer.insertAdjacentHTML(
    "beforeend",
    constructNotification(
      "Заказ получен ",
      "благодарим за сотрудничество",
      "info",
    ),
  );

  buttonPaid.disabled = true;
  buttonSent.disabled = true;
  buttonGet.disabled = true;
};
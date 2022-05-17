class Chat {
  // TODO: add actual chat functionality
  constructor() {
    this.DOMChat = document.getElementById("chat");
    this.DOMMessageUl = document.getElementById("messages");
  }

  addMessage(message) {
    const messageElement = document.createElement("li");
    messageElement.innerHTML =
      `<p>${message.username}</p><p>${message.body}</p>`;
    this.DOMMessageUl.appendChild(messageElement);
  }
}

window.addEventListener("load", async () => {
  const chat = new Chat();
  chat.addMessage({ username: "salut", body: "salut" });

  document.getElementById("send-message-button").addEventListener(
    "click",
    async () => {
      const message = document.getElementById("message-input").value;

      fetch("/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": window.localStorage.getItem("token"),
        },
        body: JSON.stringify({
          message: message,
        }),
      });
      document.getElementById("message-input").value = "";
    },
  );
  const initSocketIO = async () => {
    const socket = io();

    socket.on("connect", () => {
      console.log("client side socket connection established");

      socket.on("chat_message", (message) => {
        chat.addMessage(message);
      });
    });
  };
  initSocketIO();
});

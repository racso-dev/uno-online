class Chat {
  // TODO: add actual chat functionality
  constructor() {
    this.DOMChat = document.getElementById("chat");
    this.DOMMessageUl = document.getElementById("messages");
  }

  onIncomingMessage(message) {
    const messageElement = document.createElement("li");
    messageElement.innerHTML = `<p>${message.username}</p><p>${message.body}</p>`;
    this.DOMMessageUl.appendChild(messageElement);
  }
}

window.addEventListener("load", async () => {
  const chat = new Chat();
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
  chat.onIncomingMessage({username: 'salut', body: 'salut'});
});

// Store the messages between users

const messages = [];

// Function to send a message
function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  
  if (message !== '') {
    // Create a new message object with sender, content, and type
    const newMessage = {
      sender: 'User 1',
      content: message,
      type: 'text',
      reactions: []
    };
    
    // Add the new message to the messages array
    messages.push(newMessage);
    
    // Clear the input field
    input.value = '';
    
    // Update the chat window
    updateChatWindow();
  }
}

// Function to handle attachment
function handleAttach() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click(); // Trigger file input click event
}

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const newMessage = {
        sender: 'User 1',
        content: event.target.result,
        type: getFileType(file),
        reactions: []
      };
      
      messages.push(newMessage);
      updateChatWindow();
    };
    
    reader.readAsDataURL(file);
    
    // Clear the file input
    event.target.value = '';
  }
});

// Function to get the file type
function getFileType(file) {
  const fileType = file.type.split('/')[0];
  
  if (fileType === 'image') {
    return 'image';
  } else if (fileType === 'video') {
    return 'video';
  } else if (fileType === 'application' && file.type === 'application/pdf') {
    return 'pdf';
  }
  
  return 'unknown';
}

// Function to update the chat window with the messages
function updateChatWindow() {
  const chatWindow = document.getElementById('chatWindow');
  
  // Clear the chat window
  chatWindow.innerHTML = '';
  
  // Iterate over the messages and create message elements
  messages.forEach((message, index) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    const senderElement = document.createElement('span');
    senderElement.classList.add('sender');
    senderElement.textContent = message.sender;
    
    const contentElement = document.createElement('span');
    contentElement.classList.add('content');
    
    if (message.type === 'text') {
      contentElement.textContent = message.content;
    } else if (message.type === 'image') {
      const imageElement = document.createElement('img');
      imageElement.src = message.content;
      contentElement.appendChild(imageElement);
    } else if (message.type === 'video') {
      const videoElement = document.createElement('video');
      videoElement.src = message.content;
      videoElement.controls = true;
      contentElement.appendChild(videoElement);
    } else if (message.type === 'pdf') {
      const pdfLinkElement = document.createElement('a');
      pdfLinkElement.href = message.content;
      pdfLinkElement.textContent = 'Open PDF';
      pdfLinkElement.target = '_blank';
      contentElement.appendChild(pdfLinkElement);
    }
    
    // Add click event listener to the message element
    messageElement.addEventListener('click', function () {
      displayEmojiList(messageElement, index);
    });
    
    // Add reactions to the message element
    message.reactions.forEach((emoji) => {
      const reactionElement = document.createElement('span');
      reactionElement.classList.add('emoji');
      reactionElement.textContent = emoji;
      messageElement.appendChild(reactionElement);
    });
    
    messageElement.appendChild(senderElement);
    messageElement.appendChild(contentElement);
    
    chatWindow.appendChild(messageElement);
  });
  
  // Scroll to the bottom of the chat window
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to display the emoji list for reactions
function displayEmojiList(messageElement, messageIndex) {
  // Check if emoji list is already displayed for the message
  const emojiList = messageElement.querySelector('.emoji-list');
  if (emojiList) {
    // Hide the emoji list
    emojiList.remove();
    return;
  }
  
  // Create the emoji list element
  const emojiListElement = document.createElement('div');
  emojiListElement.classList.add('emoji-list');
  
  // Add emojis to the list
  emojis.forEach((emoji) => {
    const emojiElement = document.createElement('span');
    emojiElement.classList.add('emoji');
    emojiElement.textContent = emoji;
    
    // Add click event listener to the emoji element
    emojiElement.addEventListener('click', function () {
      reactToMessage(messageIndex, emoji);
    });
    
    emojiListElement.appendChild(emojiElement);
  });
  
  // Append the emoji list to the message element
  messageElement.appendChild(emojiListElement);
}

// Function to react to a message with an emoji
function reactToMessage(messageIndex, emoji) {
  messages[messageIndex].reactions.push(emoji);
  updateChatWindow();
}

// Emoji list
const emojis = ['😄', '😍', '👍', '👎', '😊', '😂', '😎', '😜','🤣','😥','😭','😰'];

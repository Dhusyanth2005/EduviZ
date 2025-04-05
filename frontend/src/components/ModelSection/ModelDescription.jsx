import React, { useState, useEffect } from 'react';
import { bicycleData } from '../../bicycleData'; // Assuming this now imports the updated data with `description`
import styles from './ModelDescription.module.css';
import axios from 'axios';

function ModelDescription({ selectedPart, isDarkMode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (selectedPart) {
      setChat([]);
      const partInfo = bicycleData.parts[selectedPart] || {};
      const preloadData = async () => {
        try {
          await axios.post('http://localhost:8080/preload', {
            data: {
              item: partInfo.name || 'Unknown Part',
              details: partInfo.description || 'No description available.', // Use the new description field
            },
          });
          if (isChatOpen) {
            setChat([
              {
                sender: 'bot',
                text: "Hello! I'm EduViz AI, here to help you learn about bicycle parts. Type 'start' to get a fun overview, or ask me anything about the selected part!",
              },
            ]);
          }
        } catch (error) {
          console.error('Preload error:', error);
        }
      };
      preloadData();
    }
  }, [selectedPart]);

  useEffect(() => {
    if (isChatOpen && chat.length === 0 && selectedPart) {
      setChat([
        {
          sender: 'bot',
          text: "Hello! I'm EduViz AI, here to help you learn about bicycle parts. Type 'start' to get a fun overview, or ask me anything about the selected part!",
        },
      ]);
    }
  }, [isChatOpen, selectedPart]);

  const sendMessage = async () => {
    if (!message) return;

    setChat([...chat, { sender: 'user', text: message }]);

    try {
      const response = await axios.post('http://localhost:8080/chat', { message });
      const botReply = response.data.reply;

      if (typeof botReply === 'string') {
        setChat((prev) => [...prev, { sender: 'bot', text: botReply }]);
      } else if (botReply.detailedExplanation) {
        setChat((prev) => [
          ...prev,
          { sender: 'bot', text: `**Detailed Explanation:** ${botReply.detailedExplanation}` },
          { sender: 'bot', text: botReply.nextStep },
        ]);
      } else {
        setChat((prev) => [
          ...prev,
          { sender: 'bot', text: `**Description:** ${botReply.description}` },
          { sender: 'bot', text: `**Speech:** ${botReply.speech}` },
          { sender: 'bot', text: botReply.nextStep },
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChat((prev) => [...prev, { sender: 'bot', text: 'Oops, something went wrong!' }]);
    }

    setMessage('');
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  if (!selectedPart) {
    return (
      <div className={`${styles.descriptionContainer} ${isDarkMode ? styles.dark : ''}`}>
        <div className={styles.description}>
          <h2>Welcome to EduViz</h2>
          <p>Select a bicycle part from the drawer to learn about its description.</p>
          <button className={styles.chatButton} onClick={toggleChat}>
            💬
          </button>
          {isChatOpen && (
            <ChatUI
              chat={chat}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              toggleChat={toggleChat}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </div>
    );
  }

  const partInfo = bicycleData.parts[selectedPart] || {};
  const descriptionLines = partInfo.description
    ? partInfo.description.split('. ').map((line) => line.trim() + '.') // Split into sentences
    : [];

  return (
    <div className={`${styles.descriptionContainer} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.description}>
        {isChatOpen ? (
          <ChatUI
            chat={chat}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            toggleChat={toggleChat}
            isDarkMode={isDarkMode}
          />
        ) : (
          <>
            <h2>{partInfo.name || 'Unknown Part'}</h2>
            <h3>Description:</h3>
            <ol>
              {descriptionLines.length > 0
                ? descriptionLines.map((line, index) => (
                    <li key={index}>{line}</li> // Display each sentence as a list item
                  ))
                : <p>No description available.</p>}
            </ol>
            <h3>Usage:</h3>
            <p>
              This {partInfo.name?.toLowerCase() || 'part'} is a key component of the bicycle, contributing to its overall
              functionality and performance.
            </p>
            
            <button className={styles.chatButton} onClick={toggleChat}>
              💬
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ChatUI component remains unchanged
function ChatUI({ chat, message, setMessage, sendMessage, toggleChat, isDarkMode }) {
  const formatTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const groupedMessages = [];
  let currentGroup = null;

  chat.forEach((msg) => {
    if (!currentGroup || currentGroup.sender !== msg.sender) {
      currentGroup = {
        sender: msg.sender,
        messages: [{ ...msg, time: formatTime() }],
      };
      groupedMessages.push(currentGroup);
    } else {
      currentGroup.messages.push({ ...msg, time: formatTime() });
    }
  });

  return (
    <div className={`${styles.chatContainer} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.chatHeader}>
        <div>
          <h2>EduViz Assistant</h2>
          <div className={styles.userStatus}>online</div>
        </div>
        <button className={styles.chatCloseButton} onClick={toggleChat}>
          ✕
        </button>
      </div>
      <div className={styles.chatMessages}>
        {groupedMessages.map((group, groupIndex) => (
          <div 
            key={groupIndex} 
            className={`${styles.messageGroup} ${
              group.sender === 'user' ? styles.userGroup : styles.botGroup
            }`}
          >
            {group.messages.map((msg, msgIndex) => (
              <div 
                key={`${groupIndex}-${msgIndex}`} 
                className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
              >
                {msgIndex === 0 && (
                  <div className={styles.messageSender}>
                    {msg.sender === 'user' ? 'You' : 'EduViz AI'}
                  </div>
                )}
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                <div className={styles.messageTime}>
                  {msg.time}
                  {msg.sender === 'user' && (
                    <span className={`${styles.messageStatus} ${
                      msgIndex === group.messages.length - 1 && groupIndex === groupedMessages.length - 1 
                        ? styles.statusSent
                        : styles.statusRead
                    }`}></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={isDarkMode ? styles.chatInputDark : styles.chatInput}>
        <div className={`${styles.inputWrapper} ${isDarkMode ? styles.dark : ''}`}>
          <button className={styles.attachButton}>📎</button>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button className={styles.emojiButton}>😊</button>
        </div>
        <button className={styles.sendButton} onClick={sendMessage}>
          <div className={styles.sendButtonIcon}></div>
        </button>
      </div>
    </div>
  );
}

export default ModelDescription;
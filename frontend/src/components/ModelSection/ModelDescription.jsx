import React, { useState, useEffect } from 'react';
import { bicycleData } from '../../bicycleData';
import styles from './ModelDescription.module.css';
import axios from 'axios';

function ModelDescription({ selectedPart,isDarkMode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (selectedPart) {
      setChat([]);
      const partInfo = bicycleData.parts[selectedPart] || {};
      const preloadData = async () => {
        try {
          await axios.post('http://localhost:3001/preload', {
            data: {
              item: partInfo.name || 'Unknown Part',
              details: partInfo.manufacturing || 'No manufacturing info available.',
              materials: partInfo.materials || 'No material info available.',
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
      const response = await axios.post('http://localhost:3001/chat', { message });
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
          <p>Select a bicycle part from the drawer to learn about its manufacturing process and materials.</p>
          <button className={styles.chatButton} onClick={toggleChat}>
            💬
          </button>
        </div>
      </div>
    );
  }

  const partInfo = bicycleData.parts[selectedPart] || {};
  const manufacturingSteps = partInfo.manufacturing
    ? partInfo.manufacturing.split(/\. (?=\d+\.)/).map((step) => step.trim() + '.')
    : [];

  return (
    <div className={`${styles.descriptionContainer} dark`}>
      <div className={styles.description}>
        {isChatOpen ? (
          <ChatUI
            chat={chat}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            toggleChat={toggleChat}
          />
        ) : (
          <>
            <h2>{partInfo.name || 'Unknown Part'}</h2>
            <h3>How It’s Made:</h3>
            <ol>
              {manufacturingSteps.length > 0
                ? manufacturingSteps.map((step, index) => <li key={index}>{step.trim()}</li>)
                : <p>No manufacturing info available.</p>}
            </ol>
            <h3>Materials:</h3>
            <p>{partInfo.materials || 'No material info available.'}</p>
            <h3>Usage:</h3>
            <p>
              This {partInfo.name?.toLowerCase() || 'part'} is a key component of the bicycle, contributing to its overall
              functionality and performance.
            </p>
            <h3>Educational Note:</h3>
            <p>
              Understanding how this part is manufactured helps students appreciate the engineering and materials science
              behind everyday objects like bicycles.
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

function ChatUI({ chat, message, setMessage, sendMessage, toggleChat }) {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h2>EduViz AI</h2>
        <button className={styles.chatCloseButton} onClick={toggleChat}>
          ✕
        </button>
      </div>
      <div className={styles.chatMessages}>
        {chat.map((msg, index) => (
          <p key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <strong>{msg.sender}:</strong> <span dangerouslySetInnerHTML={{ __html: msg.text }} />
          </p>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type 'start' or ask anything..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ModelDescription;
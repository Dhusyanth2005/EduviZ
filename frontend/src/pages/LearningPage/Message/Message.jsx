import React, { useState, useEffect } from "react";
import styles from "./Message.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const [instructorInfo, setInstructorInfo] = useState({
    name: "Sarah Johnson",
    avatar: null,
    online: true,
    title: "Course Instructor",
    lastActive: "Active now"
  });

  useEffect(() => {
    // Load initial messages
    setLoading(true);
    const fetchMessages = async () => {
      try {
        // This would normally fetch from an API
        setMessages([
          {
            id: 1,
            sender: "instructor",
            text: "Hi Michael! Welcome to the bicycle mechanics course. How are you finding the 3D model exploration so far?",
            timestamp: "10:45 AM",
            read: true
          },
          {
            id: 2,
            sender: "user",
            text: "Thanks Sarah! The 3D model is really helpful. I'm trying to understand the relationship between the crankset and the rear derailleur.",
            timestamp: "10:52 AM",
            read: true
          },
          {
            id: 3,
            sender: "instructor",
            text: "That's a great focus area! The crankset transfers your pedaling power to the chain, which then moves through the rear derailleur. The derailleur's job is to guide the chain onto different sized cogs, changing your gear ratio.",
            timestamp: "11:05 AM",
            read: true
          },
          {
            id: 4,
            sender: "instructor",
            text: "Have you tried using the 'Dismantle' function on the 3D model? It lets you separate the components to see how they connect.",
            timestamp: "11:07 AM",
            read: true
          }
        ]);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [courseId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate instructor response after a delay
    setTimeout(() => {
      const instructorResponse = {
        id: messages.length + 2,
        sender: "instructor",
        text: "Thanks for your question! I'll get back to you shortly with more details about that specific component interaction.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setMessages(prevMessages => [...prevMessages, instructorResponse]);
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.messagingContainer}>
      {/* Instructor header */}
      <div className={styles.chatHeader}>
        <div className={styles.instructorProfile}>
          <div className={styles.instructorAvatar}>SI</div>
          <div className={styles.instructorInfo}>
            <h3 className={styles.instructorName}>{instructorInfo.name}</h3>
            <span className={styles.instructorTitle}>{instructorInfo.title}</span>
          </div>
        </div>
        <div className={styles.instructorStatus}>
          <span className={`${styles.statusIndicator} ${instructorInfo.online ? styles.online : styles.offline}`}></span>
          <span className={styles.statusText}>{instructorInfo.lastActive}</span>
        </div>
      </div>

      {/* Message list */}
      <div className={styles.messageList}>
        {loading ? (
          <div className={styles.loadingMessages}>Loading conversation...</div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`${styles.messageItem} ${message.sender === 'user' ? styles.userMessage : styles.instructorMessage}`}
            >
              {message.sender === 'instructor' && (
                <div className={styles.messageSenderAvatar}>SI</div>
              )}
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{message.text}</div>
                <div className={styles.messageTime}>{message.timestamp}</div>
              </div>
              {message.sender === 'user' && (
                <div className={styles.messageSenderAvatar}>You</div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Message input */}
      <div className={styles.messageInputContainer}>
        <div className={styles.messageComposer}>
          <textarea
            className={styles.messageInput}
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className={styles.messageControls}>
            <button className={styles.attachButton}>
              <span className={styles.attachIcon}>📎</span>
            </button>
            <button 
              className={styles.sendButton}
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
import React, { useState, useEffect } from "react";
import styles from "./InstructorMessaging.module.css";
import { useNavigate, useParams } from "react-router-dom";

const InstructorMessaging = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    // Load all student conversations
    setLoading(true);
    const fetchConversations = async () => {
      try {
        // This would normally fetch from an API
        const mockConversations = [
          {
            studentId: "s1",
            studentName: "Michael Brown",
            studentAvatar: null,
            courseId: "c101",
            courseName: "Bicycle Mechanics 101",
            lastMessage: "Thanks Sarah! The 3D model is really helpful. I'm trying to understand the relationship between the crankset and the rear derailleur.",
            timestamp: "10:52 AM",
            unread: false,
            messages: [
              {
                id: 1,
                sender: "instructor",
                text: "Hi Michael! Welcome to the bicycle mechanics course. How are you finding the 3D model exploration so far?",
                timestamp: "10:45 AM",
                read: true
              },
              {
                id: 2,
                sender: "student",
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
            ]
          },
          {
            studentId: "s2",
            studentName: "Emily Rodriguez",
            studentAvatar: null,
            courseId: "c101",
            courseName: "Bicycle Mechanics 101",
            lastMessage: "Hi Sarah, I'm struggling with the wheel truing exercise. The spoke tension seems uneven no matter what I do.",
            timestamp: "9:23 AM",
            unread: true,
            messages: [
              {
                id: 1,
                sender: "student",
                text: "Hi Sarah, I'm struggling with the wheel truing exercise. The spoke tension seems uneven no matter what I do.",
                timestamp: "9:23 AM",
                read: false
              }
            ]
          },
          {
            studentId: "s3",
            studentName: "David Kim",
            studentAvatar: null,
            courseId: "c205",
            courseName: "Advanced Cycling Techniques",
            lastMessage: "The cadence drill video was really helpful. Is there a recommended cadence range for climbing steep hills?",
            timestamp: "Yesterday",
            unread: true,
            messages: [
              {
                id: 1,
                sender: "student",
                text: "The cadence drill video was really helpful. Is there a recommended cadence range for climbing steep hills?",
                timestamp: "Yesterday",
                read: false
              }
            ]
          },
          {
            studentId: "s4",
            studentName: "Priya Patel",
            studentAvatar: null,
            courseId: "c302",
            courseName: "Bicycle Maintenance Masterclass",
            lastMessage: "I've completed the hydraulic brake bleeding assignment. Should I submit the video of the process?",
            timestamp: "2 days ago",
            unread: false,
            messages: [
              {
                id: 1,
                sender: "student",
                text: "I've completed the hydraulic brake bleeding assignment. Should I submit the video of the process?",
                timestamp: "2 days ago",
                read: true
              }
            ]
          }
        ];

        setConversations(mockConversations);

        // If a studentId was provided in the URL, set that as the active conversation
        if (studentId) {
          const selectedConversation = mockConversations.find(c => c.studentId === studentId);
          if (selectedConversation) {
            setActiveConversation(selectedConversation);
          }
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [studentId]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    
    // Mark conversation as read
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.studentId === conversation.studentId 
          ? { ...conv, unread: false } 
          : conv
      )
    );
    
    // Update URL without reloading
   
  };

  const handleSendMessage = () => {
    if (!activeConversation || newMessage.trim() === "") return;

    const message = {
      id: Math.max(...activeConversation.messages.map(m => m.id), 0) + 1,
      sender: "instructor",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    // Update the active conversation with the new message
    const updatedConversation = {
      ...activeConversation,
      lastMessage: newMessage,
      timestamp: message.timestamp,
      messages: [...activeConversation.messages, message]
    };

    setActiveConversation(updatedConversation);

    // Update the conversation in the list
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.studentId === activeConversation.studentId
          ? updatedConversation
          : conv
      )
    );

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get initials from a name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className={styles.messagingPageContainer}>
      {/* Sidebar with student list */}
      <div className={styles.conversationsSidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Student Messages</h2>
        </div>

        {loading ? (
          <div className={styles.loadingState}>Loading conversations...</div>
        ) : (
          <div className={styles.conversationsList}>
            {conversations.map((conversation) => (
              <div
                key={conversation.studentId}
                className={`${styles.conversationItem} ${
                  activeConversation?.studentId === conversation.studentId ? styles.activeConversation : ""
                } ${conversation.unread ? styles.unreadConversation : ""}`}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className={styles.studentAvatar}>
                  {getInitials(conversation.studentName)}
                </div>
                <div className={styles.conversationInfo}>
                  <div className={styles.conversationHeader}>
                    <h3 className={styles.studentName}>{conversation.studentName}</h3>
                    <span className={styles.timestamp}>{conversation.timestamp}</span>
                  </div>
                  <div className={styles.courseName}>{conversation.courseName}</div>
                  <p className={styles.messagePreview}>{conversation.lastMessage}</p>
                </div>
                {conversation.unread && <div className={styles.unreadIndicator}></div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main messaging area */}
      <div className={styles.messagingContainer}>
        {activeConversation ? (
          <>
            {/* Conversation header */}
            <div className={styles.chatHeader}>
              <div className={styles.studentProfile}>
                <div className={styles.studentAvatar}>
                  {getInitials(activeConversation.studentName)}
                </div>
                <div className={styles.studentInfo}>
                  <h3 className={styles.studentName}>{activeConversation.studentName}</h3>
                  <span className={styles.courseName}>{activeConversation.courseName}</span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button className={styles.viewProfileButton}>View Profile</button>
              </div>
            </div>

            {/* Message list */}
            <div className={styles.messageList}>
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.messageItem} ${
                    message.sender === 'instructor' ? styles.instructorMessage : styles.studentMessage
                  }`}
                >
                  {message.sender === 'student' && (
                    <div className={styles.messageSenderAvatar}>
                      {getInitials(activeConversation.studentName)}
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    <div className={styles.messageText}>{message.text}</div>
                    <div className={styles.messageTime}>{message.timestamp}</div>
                  </div>
                  {message.sender === 'instructor' && (
                    <div className={styles.messageSenderAvatar}>
                      You
                    </div>
                  )}
                </div>
              ))}
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
          </>
        ) : (
          <div className={styles.noConversationSelected}>
            <div className={styles.noConversationContent}>
              <h2>Select a conversation</h2>
              <p>Choose a student conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorMessaging;
import React, { useState, useEffect} from "react";
import styles from "./LearningPage.module.css";
import Message from "./Message/Message";
import img from "../../images/img.jpg"; // Default fallback image
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to get model ID from URL
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
const LearningPage = () => {
  const [activeSection, setActiveSection] = useState("modelContent");
  const [showChat, setShowChat] = useState(false);
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { modelId } = useParams(); // Get model ID from URL parameters
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  useEffect(() => {
    const fetchModelData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Replace with actual model ID or dynamic prop
          ; // Placeholder; replace with real ID or prop
          const response = await axios.get(`http://localhost:8080/api/models/${modelId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          const model = response.data;
          let imageUrl = img;
          if (model.modelCover && model.modelCover !== "default_cover.jpg") {
            try {
              const imageResponse = await fetch(
                `http://localhost:8080/model/${model.modelCover}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                  credentials: "include",
                }
              );
              if (imageResponse.ok) {
                const blob = await imageResponse.blob();
                imageUrl = URL.createObjectURL(blob);
              }
            } catch (error) {
              console.error(`Error fetching model cover for ID ${model.modelCover}:`, error);
            }
          }
          setModelData({ ...model, imageUrl });
        } catch (error) {
          console.error("Error fetching model data:", error);
          setModelData({ imageUrl: img, title: "Interactive 3D Bicycle Mechanics" }); // Fallback
        } finally {
          setLoading(false);
        }
      }
    };
    fetchModelData();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "modelContent":
        return <ModelContent modelData={modelData} loading={loading} navigate={navigate} />;
      case "messages":
        return <Message />;
      case "assessment":
        return <Assessment />;
      case "resources":
        return <Resources />;
      default:
        return <ModelContent modelData={modelData} loading={loading} />;
    }
  };

  return (
    <div className={styles.pageRoot}>
      <div className={styles.learningContainer}>
        <div className={styles.sidebar}>
          <h2 className={styles.courseTitle}>
            {modelData ? modelData.title : "Interactive 3D Bicycle Mechanics"}
          </h2>
          <nav className={styles.navMenu}>
            <button
              className={`${styles.navItem} ${activeSection === "modelContent" ? styles.active : ""}`}
              onClick={() => setActiveSection("modelContent")}
            >
              <span className={styles.navIcon}>📝</span>
              Model Content
            </button>
            <button
              className={`${styles.navItem} ${activeSection === "messages" ? styles.active : ""}`}
              onClick={() => setActiveSection("messages")}
            >
              <span className={styles.navIcon}>💬</span>
              Messages
            </button>
            <button
              className={`${styles.navItem} ${activeSection === "assessment" ? styles.active : ""}`}
              onClick={() => setActiveSection("assessment")}
            >
              <span className={styles.navIcon}>📊</span>
              Assessment
            </button>
            <button
              className={`${styles.navItem} ${activeSection === "resources" ? styles.active : ""}`}
              onClick={() => setActiveSection("resources")}
            >
              <span className={styles.navIcon}>📚</span>
              Resources
            </button>
          </nav>

          <div className={styles.moduleProgress}>
            <h3 className={styles.progressTitle}>Course Progress</h3>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: "45%" }}></div>
            </div>
            <p className={styles.progressText}>45% Complete</p>
          </div>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <h1 className={styles.sectionTitle}>
              {activeSection === "modelContent" && "Bicycle Mechanics: 3D Model Exploration"}
              {activeSection === "messages" && "Course Messages & Discussions"}
              {activeSection === "assessment" && "Module Assessments & Quizzes"}
              {activeSection === "resources" && "Learning Resources & Materials"}
            </h1>
            <div className={styles.contentMeta}>
              <span className={styles.moduleIndicator}>Module 3</span>
              <span className={styles.moduleType}>Interactive Learning</span>
            </div>
          </div>

          <div className={styles.mainContent}>{renderContent()}</div>
        </div>
      </div>

      {showChat ? (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <h3>EduViz Assistant</h3>
            <button className={styles.closeChat} onClick={() => setShowChat(false)}>
              ×
            </button>
          </div>
          <div className={styles.chatMessages}>
            <div className={styles.botMessage}>
              Hello! How can I help with your 3D bicycle mechanics learning today?
            </div>
          </div>
          <div className={styles.chatInput}>
            <input type="text" placeholder="Type your question here..." />
            <button className={styles.sendButton}>Send</button>
          </div>
        </div>
      ) : (
        <button className={styles.chatButton} onClick={() => setShowChat(true)}>
          <span className={styles.chatIcon}>💬</span>
        </button>
      )}
    </div>
  );
};

// Updated ModelContent Component
const ModelContent = ({ modelData, loading,navigate }) => {
    if (loading) {
        return <div className={styles.loadingContainer}>Loading model content...</div>;
      }
    
      const handleExplore = () => {
        if (modelData && modelData.id) {
          navigate(`/${modelData.id}`);
        }
      };
    
      return (
        <div className={styles.modelContentSection}>
          <div className={styles.modelViewerContainer}>
            <img
              src={modelData.imageUrl}
              alt={modelData.title || "3D Bicycle Model"}
              className={styles.modelCoverImage}
              onError={(e) => {
                e.target.src = img;
              }}
            />
          </div>
          <div className={styles.modelInfo}>
            <div className={styles.infoBox}>
              <h3 className={`${styles.infoTitle} ${styles.descriptionTitle}`}>Description</h3>
              <p className={styles.infoDescription}>
                {modelData.description ||
                  "This interactive 3D model explores the mechanics of a bicycle, focusing on the drivetrain system. Learn how the crankset, chain, derailleurs, and cassette work together to transfer power from the pedals to the wheels, enabling efficient propulsion. Rotate, zoom, and dismantle the model to understand each component's role."}
              </p>
            </div>
            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>What You Will Learn</h3>
              <div className={styles.learningSections}>
                <div className={styles.learningSection}>
                  <ul className={styles.componentList}>
                    <li className={styles.componentItem}>
                      <span className={styles.componentDot}></span>
                      The function of the drivetrain in bicycle mechanics.
                    </li>
                    <li className={styles.componentItem}>
                      <span className={styles.componentDot}></span>
                      How to identify and assemble key components like the crankset, chainrings, and derailleurs.
                    </li>
                    <li className={styles.componentItem}>
                      <span className={styles.componentDot}></span>
                      Techniques for troubleshooting common drivetrain issues.
                    </li>
                    <li className={styles.componentItem}>
                      <span className={styles.componentDot}></span>
                      The impact of gear ratios on pedaling efficiency.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.modelControls}>
            <h3 className={styles.controlsTitle}>Viewer Functionalities</h3>
            <div className={styles.controlsGrid}>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>🔍</span>
                Zoom
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>🔄</span>
                Rotate
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>🔧</span>
                Dismantle
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>⚙️</span>
                Assemble
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>🎬</span>
                Animate
              </button>
              <button className={styles.controlButton}>
                <span className={styles.controlIcon}>💬</span>
                Measure
              </button>
            </div>
            <button className={styles.exploreButton} onClick={handleExplore}>
              Explore on EduViz Viewer
            </button>
          </div>
        </div>
      );
    };

// const Messages = () => {
//   return (
//     <div className={styles.messagesSection}>
//       <div className={styles.messageFilters}>
//         <button className={`${styles.filterButton} ${styles.active}`}>All Messages</button>
//         <button className={styles.filterButton}>Announcements</button>
//         <button className={styles.filterButton}>Discussion</button>
//         <button className={styles.filterButton}>Questions</button>
//       </div>
      
//       <div className={styles.chatHeader}>
//         <h3 className={styles.chatTitle}>Course Discussion Thread: Bicycle Drivetrain Mechanics</h3>
//         <div className={styles.chatParticipants}>
//           <div className={styles.participantAvatars}>
//             <div className={styles.instructorAvatar}>SI</div>
//             <div className={styles.studentAvatar}>YS</div>
//           </div>
//           <span className={styles.onlineStatus}>2 Online</span>
//         </div>
//       </div>
      
//       <div className={styles.messageList}>
//         {/* Instructor announcement */}
//         <div className={styles.messageCard}>
//           <div className={styles.messageAuthor}>
//             <div className={styles.authorAvatar}></div>
//             <div className={styles.authorInfo}>
//               <h4>Instructor Sarah</h4>
//               <span className={styles.messageTime}>Yesterday at 3:45 PM</span>
//             </div>
//             <span className={styles.messageType}>Announcement</span>
//           </div>
//           <div className={styles.messageContent}>
//             <p>
//               Welcome to Module 3 of our Bicycle Mechanics course! This week we'll be focusing on the drivetrain system. Pay special attention to the relationship between the front and rear derailleurs. Remember to explore the 3D model thoroughly!
//             </p>
//           </div>
//           <div className={styles.messageActions}>
//             <button className={styles.actionButton}>
//               <span className={styles.actionIcon}>👍</span> Like
//             </button>
//             <button className={styles.actionButton}>
//               <span className={styles.actionIcon}>💬</span> Reply
//             </button>
//           </div>
//         </div>

//         {/* Student question */}
//         <div className={`${styles.messageCard} ${styles.studentMessage}`}>
//           <div className={styles.messageAuthor}>
//             <div className={`${styles.authorAvatar} ${styles.studentAvatar}`}></div>
//             <div className={styles.authorInfo}>
//               <h4>You (Michael K.)</h4>
//               <span className={styles.messageTime}>Today at 10:23 AM</span>
//             </div>
//             <span className={styles.messageType}>Question</span>
//           </div>
//           <div className={styles.messageContent}>
//             <p>
//               I'm having trouble understanding the relationship between gear ratios and pedaling efficiency. When I rotate the crankset in the 3D model, I notice the chain moves differently depending on which chainring and cog it's on. Could you explain how this affects real-world riding?
//             </p>
//           </div>
//           <div className={styles.messageActions}>
//             <button className={styles.actionButton}>
//               <span className={styles.actionIcon}>✏️</span> Edit
//             </button>
//             <button className={styles.actionButton}>
//               <span className={styles.actionIcon}>🗑️</span> Delete
//             </button>
//           </div>
//         </div>

//         {/* Instructor response */}
//         <div className={styles.messageCard}>
//           <div className={styles.messageAuthor}>
//             <div className={styles.authorAvatar}></div>
//             <div className={styles.authorInfo}>
//               <h4>Instructor Sarah</h4>
//               <span className={styles.messageTime}>Today at 11:05 AM</span>
//             </div>
//             <span className={styles.messageType}>Response</span>
//           </div>
//           <div className={styles.messageContent}>
//             <p>
//               Great question, Michael! Gear ratios are all about mechanical advantage. When you're in a larger chainring in front and a smaller cog in back, you get a higher gear ratio - meaning each pedal revolution makes the wheel rotate more times. This is efficient for flat roads and descents.
//             </p>
//             <p>
//               Conversely, a smaller chainring and larger rear cog gives you a lower gear ratio, making pedaling easier for climbs but covering less distance per revolution.
//             </p>
//             <p>
//               Try this in the 3D model: count how many rear wheel rotations you get from one complete pedal rotation in different gear combinations. You'll see the difference!
//             </p>
//             <div className={styles.attachmentPreview}>
//               <div className={styles.attachmentIcon}>📊</div>
//               <div className={styles.attachmentInfo}>
//                 <span className={styles.attachmentName}>gear-ratio-chart.pdf</span>
//                 <span className={styles.attachmentSize}>420 KB</span>
//               </div>
//               <button className={styles.downloadButton}>View</button>
//             </div>
//           </div>
//           <div className={styles.messageActions}>
//             <button className={styles.actionButton}>
//               <span className={styles.actionIcon}>👍</span> Like
//             </button>
//             <button className={styles.actionButton}>
//               <span className={styles.actionIcon}>💬</span> Reply
//             </button>
//           </div>
//         </div>

//         {/* Another student comment */}
//         <div className={styles.messageCard}>
//           <div className={styles.messageAuthor}>
//             <div className={`${styles.authorAvatar} ${styles.otherStudentAvatar}`}></div>
//             <div className={styles.authorInfo}>
//               <h4>Jamie T.</h4>
//               <span className={styles.messageTime}>Today at 11:32 AM</span>
//             </div>
//             <span className={styles.messageType}>Comment</span>
//           </div>
//           <div className={styles.messageContent}>
//             <p>
//               Adding to what Instructor Sarah said, I found it helpful to think about cadence too. With higher gear ratios, you might maintain speed but your legs work harder. Lower gear ratios let you maintain a comfortable cadence (~90 rpm is ideal for most people) even on steep climbs.
//             </p>
//           </div>
//           <div className={styles.messageActions}>
//             <button className={styles.actionButton}>
//               <span className={styles.actionIcon}>👍</span> Like
//             </button>
//             <button className={styles.actionButton}>
//               <span className={styles.actionIcon}>💬</span> Reply
//             </button>
//           </div>
//         </div>

//         {/* Your follow-up question */}
//         <div className={`${styles.messageCard} ${styles.studentMessage}`}>
//           <div className={styles.messageAuthor}>
//             <div className={`${styles.authorAvatar} ${styles.studentAvatar}`}></div>
//             <div className={styles.authorInfo}>
//               <h4>You (Michael K.)</h4>
//               <span className={styles.messageTime}>Just now</span>
//             </div>
//             <span className={styles.messageType}>Question</span>
//           </div>
//           <div className={styles.messageContent}>
//             <p>
//               Thanks for the explanations! I noticed in the 3D model that there's some diagonal alignment of the chain when using certain gear combinations. The model shows the chain looks strained in some positions. Is this something I should avoid in real riding?
//             </p>
//           </div>
//           <div className={styles.messageEditor}>
//             <textarea placeholder="Type your message here..."></textarea>
//             <div className={styles.editorControls}>
//               <button className={styles.formatButton}>B</button>
//               <button className={styles.formatButton}>I</button>
//               <button className={styles.formatButton}>
//                 <span className={styles.attachIcon}>📎</span>
//               </button>
//               <button className={styles.sendButton}>Send</button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className={styles.chatInput}>
//         <input type="text" placeholder="Type a new message..." />
//         <button className={styles.attachButton}>
//           <span className={styles.attachIcon}>📎</span>
//         </button>
//         <button className={styles.sendButton}>Send</button>
//       </div>
//     </div>
//   );
// };

const Assessment = () => {
  return (
    <div className={styles.assessmentSection}>
      <div className={styles.upcomingAssessments}>
        <h3 className={styles.assessmentSectionTitle}>Upcoming Assessments</h3>
        <div className={styles.assessmentCard}>
          <div className={styles.assessmentHeader}>
            <h4 className={styles.assessmentTitle}>Drivetrain Components Quiz</h4>
            <span className={styles.assessmentDue}>Due: April 18, 11:59 PM</span>
          </div>
          <div className={styles.assessmentDetails}>
            <p>Test your knowledge of bicycle drivetrain components and their functions.</p>
            <div className={styles.assessmentMeta}>
              <span className={styles.assessmentType}>Multiple Choice</span>
              <span className={styles.assessmentPoints}>15 Points</span>
              <span className={styles.assessmentTime}>30 Minutes</span>
            </div>
          </div>
          <button className={styles.startButton}>Start Quiz</button>
        </div>

        <div className={styles.assessmentCard}>
          <div className={styles.assessmentHeader}>
            <h4 className={styles.assessmentTitle}>Drivetrain Assembly Challenge</h4>
            <span className={styles.assessmentDue}>Due: April 25, 11:59 PM</span>
          </div>
          <div className={styles.assessmentDetails}>
            <p>Using the 3D model, assemble the bicycle drivetrain in the correct order.</p>
            <div className={styles.assessmentMeta}>
              <span className={styles.assessmentType}>Interactive</span>
              <span className={styles.assessmentPoints}>30 Points</span>
              <span className={styles.assessmentTime}>45 Minutes</span>
            </div>
          </div>
          <button className={styles.startButton}>Start Challenge</button>
        </div>
      </div>

      <div className={styles.completedAssessments}>
        <h3 className={styles.assessmentSectionTitle}>Completed Assessments</h3>
        <div className={`${styles.assessmentCard} ${styles.completedCard}`}>
          <div className={styles.assessmentHeader}>
            <h4 className={styles.assessmentTitle}>Bicycle Frame Quiz</h4>
            <span className={styles.assessmentScore}>Score: 92%</span>
          </div>
          <div className={styles.assessmentDetails}>
            <div className={styles.assessmentMeta}>
              <span className={styles.assessmentType}>Multiple Choice</span>
              <span className={styles.assessmentPoints}>15/15 Points</span>
              <span className={styles.assessmentDate}>Completed: April 5</span>
            </div>
          </div>
          <button className={styles.reviewButton}>Review Results</button>
        </div>
      </div>
    </div>
  );
};

const Resources = () => {
  return (
    <div className={styles.resourcesSection}>
      <div className={styles.resourceCategories}>
        <button className={`${styles.categoryButton} ${styles.active}`}>All Resources</button>
        <button className={styles.categoryButton}>Video Tutorials</button>
        <button className={styles.categoryButton}>Reading Materials</button>
        <button className={styles.categoryButton}>External Links</button>
        <button className={styles.categoryButton}>Downloads</button>
      </div>

      <div className={styles.resourcesList}>
        <div className={styles.resourceCard}>
          <div className={styles.resourceIcon}>📹</div>
          <div className={styles.resourceInfo}>
            <h4 className={styles.resourceTitle}>Understanding Bicycle Drivetrains</h4>
            <p className={styles.resourceDescription}>
              A comprehensive video walkthrough of bicycle drivetrain mechanics and maintenance.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceType}>Video Tutorial</span>
              <span className={styles.resourceDuration}>32 minutes</span>
            </div>
          </div>
          <button className={styles.viewResourceButton}>Watch</button>
        </div>

        <div className={styles.resourceCard}>
          <div className={styles.resourceIcon}>📄</div>
          <div className={styles.resourceInfo}>
            <h4 className={styles.resourceTitle}>Drivetrain Maintenance Guide</h4>
            <p className={styles.resourceDescription}>
              Step-by-step guide to maintaining and troubleshooting common drivetrain issues.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceType}>PDF Document</span>
              <span className={styles.resourceSize}>2.4 MB</span>
            </div>
          </div>
          <button className={styles.viewResourceButton}>Download</button>
        </div>

        <div className={styles.resourceCard}>
          <div className={styles.resourceIcon}>🔗</div>
          <div className={styles.resourceInfo}>
            <h4 className={styles.resourceTitle}>Sheldon Brown's Bicycle Technical Info</h4>
            <p className={styles.resourceDescription}>
              External resource with in-depth information about bicycle components and mechanics.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceType}>External Link</span>
            </div>
          </div>
          <button className={styles.viewResourceButton}>Visit</button>
        </div>

        <div className={styles.resourceCard}>
          <div className={styles.resourceIcon}>💻</div>
          <div className={styles.resourceInfo}>
            <h4 className={styles.resourceTitle}>Gear Ratio Calculator</h4>
            <p className={styles.resourceDescription}>
              Interactive tool to calculate and visualize gear ratios for different drivetrain setups.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceType}>Interactive Tool</span>
            </div>
          </div>
          <button className={styles.viewResourceButton}>Open</button>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
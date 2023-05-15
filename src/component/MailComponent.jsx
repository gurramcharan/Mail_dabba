import { useContext } from "react";
import { MailContext } from "../context/MailContext";
import { Link } from "react-router-dom";
import "../styles.css";

export const MailComponent = ({ mailFilter }) => {
  const {
    handleDeleteBtn,
    handleMarkAsUnreadBtn,
    handleSpamBtn,
    handleStarBtn
  } = useContext(MailContext);

  return (
    <>
      <h3>
        Unread:{" "}
        {mailFilter.reduce((acc, curr) => (curr.unread ? acc + 1 : acc), 0)}
      </h3>
      <ul type="none" className="mails-container">
        {mailFilter.map((mail) => (
          <li key={mail.mId} className="allMails">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Subject: {mail.subject}</h3>
              <button
                onClick={() => handleStarBtn(mail.mId)}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {mail.isStarred ? "Unstar" : "Star"}
              </button>
            </div>
            <p>{mail.content}</p>
            <div className="mail-link-buttons-container">
              <Link className="mail-link" to={`/mail/${mail.mId}`}>
                View Details
              </Link>
              <div className="mail-buttons-container">
                <button
                  onClick={() => handleDeleteBtn(mail.mId)}
                  className="mail-buttons"
                >
                  {mail.delete ? "Undo" : "Delete"}
                </button>
                <button
                  onClick={() => handleMarkAsUnreadBtn(mail.mId)}
                  className="mail-buttons"
                >
                  {mail.unread ? "Mark as Read" : "Mark as Unread"}
                </button>
                <button
                  onClick={() => handleSpamBtn(mail.mId)}
                  className="mail-buttons"
                >
                  {mail.spam ? "Not Spam" : "Report Spam"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

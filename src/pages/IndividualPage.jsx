import { useContext } from "react";
import { useParams } from "react-router-dom";

import { MailContext } from "../context/MailContext";

export const IndividualPage = () => {
  const { mailId } = useParams();

  const { filteredMails, handleStarBtn } = useContext(MailContext);

  const individualFilter = filteredMails.filter((item) => item.mId === mailId);

  return (
    <>
      <ul type="none" className="mails-container">
        {individualFilter.map((mail) => (
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
          </li>
        ))}
      </ul>
    </>
  );
};

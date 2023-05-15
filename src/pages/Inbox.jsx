import { useContext } from "react";
import { MailComponent } from "../component/MailComponent";
import { MailContext } from "../context/MailContext";
import "../styles.css";

export const InboxPage = () => {
  const { filteredMails } = useContext(MailContext);
  return (
    <>
      <MailComponent mailFilter={filteredMails} />
    </>
  );
};

import { useContext } from "react";
import { MailComponent } from "../component/MailComponent";
import { MailContext } from "../context/MailContext";

export const SpamPage = () => {
  const { filteredSpamMails } = useContext(MailContext);
  return (
    <>
      <MailComponent mailFilter={filteredSpamMails} />
    </>
  );
};

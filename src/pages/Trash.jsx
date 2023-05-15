import { useContext } from "react";
import { MailComponent } from "../component/MailComponent";
import { MailContext } from "../context/MailContext";

export const TrashPage = () => {
  const { filteredTrashMails } = useContext(MailContext);
  return (
    <>
      <MailComponent mailFilter={filteredTrashMails} />
    </>
  );
};

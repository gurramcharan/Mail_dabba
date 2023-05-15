import { createContext, useReducer } from "react";
import { mails } from "../data/data";

export const MailContext = createContext();

export const MailProvider = ({ children }) => {
  const initialState = {
    allMails: mails,
    filters: []
  };

  const mailReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_FILTER":
        const updatedFilters = state.filters.includes(action.payload)
          ? state.filters.filter((filter) => filter !== action.payload)
          : [...state.filters, action.payload];
        return { ...state, filters: updatedFilters };

      case "DELETE_ITEM":
        const updatedFilters1 = state.allMails.map((item) =>
          item.mId === action.payload ? { ...item, delete: !item.delete } : item
        );
        return { ...state, allMails: updatedFilters1 };

      case "MARK_AS_UNREAD_ITEM":
        const updatedFilters2 = state.allMails.map((item) =>
          item.mId === action.payload ? { ...item, unread: !item.unread } : item
        );
        return { ...state, allMails: updatedFilters2 };

      case "SPAM_ITEM":
        const updatedFilters3 = state.allMails.map((item) =>
          item.mId === action.payload ? { ...item, spam: !item.spam } : item
        );
        console.log(state.allMails);
        return { ...state, allMails: updatedFilters3 };

      case "STAR_ITEM":
        const updatedFilters4 = state.allMails.map((item) =>
          item.mId === action.payload
            ? { ...item, isStarred: !item.isStarred }
            : item
        );
        return { ...state, allMails: updatedFilters4 };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(mailReducer, initialState);

  const handleCheckBoxClick = (checkBoxType) => {
    dispatch({ type: "TOGGLE_FILTER", payload: checkBoxType });
  };

  const handleDeleteBtn = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  const handleMarkAsUnreadBtn = (id) => {
    dispatch({ type: "MARK_AS_UNREAD_ITEM", payload: id });
  };

  const handleSpamBtn = (id) => {
    dispatch({ type: "SPAM_ITEM", payload: id });
  };

  const handleStarBtn = (id) => {
    dispatch({ type: "STAR_ITEM", payload: id });
  };

  const filteredMails = state.allMails.filter((mail) =>
    state.filters.length === 0 && mail.spam !== true && mail.delete !== true
      ? true
      : state.filters.includes("unread") &&
        mail.unread === true &&
        mail.spam !== true &&
        mail.delete !== true
      ? true
      : state.filters.includes("starred") &&
        mail.isStarred === true &&
        mail.spam !== true &&
        mail.delete !== true
      ? true
      : false
  );

  const filteredSpamMails = state.allMails.filter((mail) =>
    state.filters.length === 0 && mail.spam === true && mail.delete !== true
      ? true
      : state.filters.includes("unread") &&
        mail.unread === true &&
        mail.spam === true
      ? true
      : state.filters.includes("starred") &&
        mail.isStarred === true &&
        mail.spam === true
      ? true
      : false
  );

  const filteredTrashMails = state.allMails.filter((mail) =>
    state.filters.length === 0 && mail.spam !== true && mail.delete === true
      ? true
      : state.filters.includes("unread") &&
        mail.unread === true &&
        mail.spam === true &&
        mail.delete === true
      ? true
      : state.filters.includes("starred") &&
        mail.isStarred === true &&
        mail.spam === true &&
        mail.delete === true
      ? true
      : false
  );

  return (
    <MailContext.Provider
      value={{
        handleCheckBoxClick,
        filteredMails,
        handleDeleteBtn,
        handleMarkAsUnreadBtn,
        handleSpamBtn,
        handleStarBtn,
        filteredSpamMails,
        filteredTrashMails
      }}
    >
      {children}
    </MailContext.Provider>
  );
};

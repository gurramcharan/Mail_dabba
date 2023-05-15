import { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { MailContext } from "./context/MailContext";
import { InboxPage } from "./pages/Inbox";
import { IndividualPage } from "./pages/IndividualPage";
import { SpamPage } from "./pages/Spam";
import { TrashPage } from "./pages/Trash";
import "./styles.css";

export default function App() {
  const { handleCheckBoxClick } = useContext(MailContext);
  const getActiveStyle = ({ isActive }) => ({
    borderRight: isActive ? "3px solid darkblue" : "none",
    color: isActive ? "red" : "grey"
  });
  return (
    <div className="App">
      <h1 className="center-items">Mail Dabba</h1>
      <div className=" main-container">
        <nav className="navigation">
          <NavLink exact to="/" className="nav-link" style={getActiveStyle}>
            Inbox
          </NavLink>
          <NavLink to="/spam" className="nav-link" style={getActiveStyle}>
            Spam
          </NavLink>
          <NavLink to="/trash" className="nav-link" style={getActiveStyle}>
            Trash
          </NavLink>
        </nav>
        <div className="pages-content">
          <fieldset>
            <legend>Filters</legend>
            <input
              type="checkbox"
              id="showUnread"
              value="unread"
              onClick={(e) => handleCheckBoxClick(e.target.value)}
            />
            <label for="showUnread">Show Unread mails</label>
            <input
              type="checkbox"
              id="showStarred"
              value="starred"
              onClick={(e) => handleCheckBoxClick(e.target.value)}
            />
            <label for="showStarred">Show starred mails</label>
          </fieldset>
          <Routes>
            <Route path="/" element={<InboxPage />} />
            <Route path="/spam" element={<SpamPage />} />
            <Route path="/trash" element={<TrashPage />} />
            <Route path="/mail/:mailId" element={<IndividualPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

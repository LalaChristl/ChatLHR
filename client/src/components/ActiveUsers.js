import "./../styles/ActiveUsers.css";
import { useContext } from "react";
import { Context } from "../Context";

function ActiveUsers() {
  const { messageArr } = useContext(Context);

  const writers = messageArr.map((el, i) => {
    return el.writer;
  });

  const activeUsers = [...new Set(writers)];

  return (
    <div className="active-users-container">
      <h1 className="side-header-primary">ChatLHR</h1>
      <h3 className="side-header-secondary">Active users</h3>

      <ul className="active-users-list">
        {activeUsers.map((el, i) => {
          return (
            <li className="active-user" key={i}>
              {" "}
              {el}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ActiveUsers;

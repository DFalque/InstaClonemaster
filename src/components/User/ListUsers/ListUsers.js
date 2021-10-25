import { useHistory } from "react-router";
import { Image } from "semantic-ui-react";

import "./ListUsers.css";

const ListUsers = (props) => {
  const { users, setShowModal } = props;
  const history = useHistory();

  const goToUser = (username) => {
    setShowModal(false);
    history.push(`/${username}`);
  };
  console.log(users);
  return (
    <div className="ListUsers">
      {users.length === 0 ? (
        <p className="ListUsers__not-users">No tiene Seguidores</p>
      ) : (
        users.map((user, index) => (
          <div key={index} onClick={() => goToUser(user.username)}>
            <p>{user.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ListUsers;

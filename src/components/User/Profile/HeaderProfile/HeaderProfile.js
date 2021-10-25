import { useMutation, useQuery } from "@apollo/client";
import { Button } from "semantic-ui-react";
import { FOLLOW, IS_FOLLOW, UN_FOLLOW } from "../../../../gql/follow";

const HeaderProfile = (props) => {
  const { username, auth, handlerModal, getUser } = props;

  const [follow] = useMutation(FOLLOW);
  const [unFollow] = useMutation(UN_FOLLOW);

  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: { username: getUser.username },
  });

  const onFollow = async () => {
    try {
      const result = await follow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onUnFollow = async () => {
    try {
      const result = await unFollow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonFollow = () => {
    if (data.isFollow) {
      console.log(data);
      return <Button onClick={() => onUnFollow()}>Dejar de Seguir</Button>;
    } else {
      console.log(data);
      return <Button onClick={() => onFollow()}>Seguir</Button>;
    }
  };

  console.log("ME CAGO EN LA PUTAAAA");

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{username}</h1>
      {username === auth.username ? (
        <Button onClick={() => handlerModal("settings")}>Ajustes</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
};

export default HeaderProfile;

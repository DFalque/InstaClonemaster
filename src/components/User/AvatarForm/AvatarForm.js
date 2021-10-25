import { useMutation } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";
import { DELETE_AVATAR, GET_USER, UPDATE_AVATAR } from "../../../gql/user";
import "./AvatarForm.css";

const AvatarForm = (props) => {
  const { setShowModal, auth } = props;
  const [loading, setLoading] = useState(false);

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      console.log(updateAvatar);
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: {
          username: auth.username,
        },
      });
      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: { getUser: { ...getUser, avatar: updateAvatar.urlAvatar } },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });
      cache.writeQuery({
        query: GET_USER,
        data: {
          getUser: {
            ...getUser,
            avatar: false,
          },
        },
      });
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    try {
      setLoading(true);
      const result = await updateAvatar({ variables: { file } });
      const { data } = result;
      if (!data.updateAvatar.status) {
        toast.warning("Error al actualizar el avatar");
        setLoading(false);
      } else {
        toast.warning("Todo funciona bien");
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accepted: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onDeleteAvatar = async () => {
    console.log("Eliminando Avatar");
    const result = await deleteAvatar();
    console.log(result);
    const { data } = result;
    if (!data.deleteAvatar) {
      return toast.warning("error Avatar");
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Cargar Foto
      </Button>
      <Button onClick={() => onDeleteAvatar()}>Eliminar foto</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
};

export default AvatarForm;

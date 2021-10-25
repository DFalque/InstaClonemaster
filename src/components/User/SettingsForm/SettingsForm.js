import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";

import "./SettingsForm.css";
const SettingsForm = (props) => {
  const { setShowModal } = props;
  const { logout } = useAuth();
  const history = useHistory();
  const client = useApolloClient();

  const onLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  return (
    <div className="SettingForm-container">
      <Button>Cambiar Contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripción</Button>
      <Button>Sitio Web</Button>
      <Button onClick={() => onLogout()}>Cerrar Sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;

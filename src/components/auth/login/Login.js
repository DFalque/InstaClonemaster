// LIBRARIES
import React from "react";
import { Formik } from "formik";
import { userLoginFunction } from "../../../gql/user";
import { useMutation } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";

// COMPONENTS
import { setToken, decodeToken } from "../../../utils/token";

const Login = (props) => {
  const { setLogin } = props;
  const [login] = useMutation(userLoginFunction);
  const { setUser } = useAuth();

  // HANDLE STATES

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const data = values;
          try {
            const response = await login({
              variables: {
                input: data,
              },
            });
            console.log(response);
            // Tenemos el token
            const { Token } = response.data.login;
            // Se guarda el Token
            setToken(Token);
            // Cambiamos el auth con el token decodificado
            setUser(decodeToken(Token));
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="Auth__Login" onSubmit={handleSubmit}>
            <h3>Hacer Login</h3>
            <input
              placeholder="Correo Electrónico"
              className="Auth__Input"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              placeholder="Contraseña"
              className="Auth__Input"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" value="Este botón no hace nada">
              Enviar
            </button>
            <p>
              ¿No tienes una cuenta?
              <span onClick={() => setLogin(false)}>Crea una cuenta</span>
            </p>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;

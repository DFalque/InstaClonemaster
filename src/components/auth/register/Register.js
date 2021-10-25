// LIBRARIES
import React from "react"
import "./Register.sass"
import { Formik } from "formik"
import * as Yup from "yup"
import { useMutation } from "@apollo/client"
import { userLoginFunction, userRegisterFunction } from "../../../gql/user"
import useAuth from "../../../hooks/useAuth"
import { decodeToken, setToken } from "../../../utils/token"

// COMPONENTES˙

const Register = (props) => {
	// STATE
	const { setLogin } = props
	const [register] = useMutation(userRegisterFunction)
	const [login] = useMutation(userLoginFunction)
	const { setUser } = useAuth()

	// RENDER

	const SignupValidation = Yup.object().shape({
		name: Yup.string().required("Tu nombre es Obligatorio"),
		username: Yup.string().required("Tu nombre es Obligatorio"),
		email: Yup.string().required(true),
		password: Yup.string().required(true),
		repeatPassword: Yup.string().required(true),
	})

	return (
		<>
			<Formik
				initialValues={{
					name: "",
					username: "",
					email: "",
					password: "",
					repeatPassword: "",
				}}
				validationSchema={SignupValidation}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						const data = values
						delete data.repeatPassword
						const result = await register({
							variables: {
								input: data,
							},
						})

						const dataLogin = values
						delete dataLogin.repeatPassword
						delete dataLogin.username
						delete dataLogin.name

						const response = await login({
							variables: {
								input: dataLogin,
							},
						})
						const { Token } = response.data.login
						setToken(Token)
						setUser(decodeToken(Token))
					} catch (e) {
						console.log(e)
						console.log("Error en register")
						console.log(e.message)
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
					validateSchema,
				}) => (
					<form className="Auth__Login" onSubmit={handleSubmit}>
						<h3>Hacer Login</h3>
						<input
							placeholder="Nombre"
							className="Auth__Input"
							name="name"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
						/>
						<input
							placeholder="username"
							className="Auth__Input"
							type="text"
							name="username"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.username}
						/>
						<input
							placeholder="Correo Electrónico"
							className="Auth__Input"
							type="email"
							name="email"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
						/>
						<input
							placeholder="Contraseña"
							className="Auth__Input"
							type="password"
							name="password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
						<input
							placeholder="Repear Password"
							className="Auth__Input"
							type="text"
							name="repeatPassword"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.repeatPassword}
						/>
						<button type="submit" value="Este botón no hace nada">
							Enviar
						</button>
						<p>
							¿Ya tienes una cuenta?
							<span onClick={() => setLogin(true)}>Inicia Sesión</span>
						</p>
					</form>
				)}
			</Formik>
		</>
	)
}

export default Register

//IMPORTS
import React, { useState, useEffect, useMemo } from "react"
import client from "./config/apollo"
import { ApolloProvider } from "@apollo/client/react"
import AuthContext from "./context/AuthContext"
//COMPONENTS
import Auth from "./pages/auth/Index"
import { getToken, decodeToken, removeToken, verifyToken } from "./utils/token"
import Navigation from "./routes/Navigation"

function App() {
	// Estado para obserar si el usuario está autorizado
	const [auth, setAuth] = useState(undefined)

	useEffect(() => {
		const token = getToken()
		if (!token) {
			setAuth(null)
		} else {
			const verification = verifyToken(decodeToken(token))
			verification ? setAuth(decodeToken(token)) : setAuth(null)
		}
	}, [])

	const logout = () => {
		console.log("Cerrar sesión")
		removeToken()
		setAuth(null)
	}
	const setUser = (user) => {
		setAuth(user)
		console.log("hemos cambiado el auth")
	}

	const authData = useMemo(
		() => ({
			auth: auth,
			logout,
			setUser,
		}),
		[auth]
	)

	// esto es importantre para que primero retorne null
	if (auth === undefined) return null

	return (
		<ApolloProvider client={client}>
			<AuthContext.Provider value={authData}>
				{!auth ? <Auth /> : <Navigation />}
			</AuthContext.Provider>
		</ApolloProvider>
	)
}

export default App

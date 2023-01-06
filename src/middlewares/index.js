const jwt = require('jsonwebtoken')
const {
	Message_Error_Validation_Token,
	Message_Error_Access,
} = require('../Message')

// middleware para validar que venga el token por header (rutas protegidas)
const verifyToken = (req, res, next) => {
	const { token } = req.query
	//const token = req.header('auth-token')
	if (!token) return res.status(401).json({ error: Message_Error_Access })
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		req.user = verified
		if(verified.status) {
			next() // vamos a la siguente ruta
		} else {
			res.status(400).json({ error: Message_Error_Access })
		}
	} catch (error) {
		res.status(400).json({ error: Message_Error_Validation_Token })
	}
}

const verifyTokenAdmin = (req, res, next) => {
	const { token } = req.query
	//const token = req.header('auth-token')
	if (!token) return res.status(401).json({ error: Message_Error_Access })
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		req.user = verified
		if(verified.role === "admin"){
			next()
		} else {
			res.status(400).json({ error: Message_Error_Access })
		}
 		// vamos a la siguente ruta
	} catch (error) {
		res.status(400).json({ error: Message_Error_Validation_Token })
	}
}



module.exports = {verifyToken, verifyTokenAdmin}

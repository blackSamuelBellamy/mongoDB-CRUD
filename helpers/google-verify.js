const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client()

const googleVerify = async (token = '') => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
  })
  const {
    email: correo, 
    name: nombre, 
    picture: img 
  } = ticket.getPayload()
  
  return { correo, nombre, img}

}
googleVerify().catch(console.error)

module.exports = googleVerify
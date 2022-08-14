var nodeMailer = require('nodemailer')


const generarContraseña = async (correo, nuevoContraseña, nombre) => {
    try {
        let transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "tortilleriarioazul66@gmail.com",
                pass: "cztwssuxdvlkaril"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: '"Tortilleria Rio Azul"',
            to: correo,
            subject: 'Recuperación de contraseña',
            // text: 'That was easy!',
            html: `
            <div> 
            <h3> Hola ${nombre} </h3>
            <p>Por este medio adjuntamos una contraseña temporal para poder ingresar al sistema </p>
            <p>te recomendamos ingresar una vez con la misma y posteriormente cambiarla desde la aplicación</p>
            <p> <b> Contraseña temporal:  ${nuevoContraseña}</b> </p>
            </div>
            `
        }
        await transporter.sendMail(mailOptions)

    } catch (error) {
        console.log("Correo", error.message)
        throw new Error(error.message)
    }
}

module.exports = { generarContraseña }
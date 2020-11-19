
//Se encarga de genrar un valor alfanumerico de 6 valores
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xx4xyx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

//Aqui comienza las peticiones 
const nodemailer = require("nodemailer");
const { Router } = require("express");
const router = Router();
const mensanje_general = new String("Tu codigo de ingreso es: ");
//se encarga de guardar el codigo generado por la funcion
const guardador = generateUUID();
const codigo = guardador;

//hace las peticiones al servidor 
router.post("/send-email", (req, res) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
      user: "GMAIL",
      pass: "PASSWORD"

    }

  });
  var mailOptions = {
    form: "Remitente",
    to: "GMAIL destino",
    subject: "Envios de prueba",
    text: mensanje_general.concat(guardador)

  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
      console.log("Error en el envio");

    } else {
      console.log("email enviado");
      res.status(200).jsonp(req.body);
    }
  })
}

);
module.exports = router;
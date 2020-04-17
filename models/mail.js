const nodemailer = require('nodemailer');

var mailOptions = {};

var mail_settings = require('../settings').mail_settings;

exports.send_data = function (id,href,u_mail) {
    const transporter = nodemailer.createTransport(mail_settings);
    mailOptions = {
        from: 'My Site',
        to: u_mail,
        subject: 'Сообщение с сайта',
        text: 'Подтверждение заказа',
        html: `<b>Номер вашего заказа на сайте B&B: <b> ${id};<br>
               <b>Для его подтверждения пройдите по ссылке: <b> ${href}<br>
               <b>Если вы ничего не заказывали, не реагируйте на это сообщение<b>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            console.log(error);
        transporter.close();
    });
};


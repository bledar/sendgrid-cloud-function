const escapeHtml = require('escape-html');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY);

exports.sendgrid = (req, res) => {
    const to = process.env.MAIL_TO || 'info@sigja.com';
    const from = process.env.MAIL_FROM || 'contact@sigja.com';
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    if(name&&email&&message){
        const msg = {
            to,
            from,
            subject: `New message from ${name} in sigja.com website!`,
            text: `Name: ${name}
            Email: ${email}
            Message: ${message}
            `,
            html: `
            <ul>
                <li><strong>Name: <strong> ${name}</li>
                <li><strong>Email: <strong> ${email}</li>
                <li><strong>Message: <strong> ${message}</li>
            </ul>
            `,
        };
        sgMail.send(msg);
        res.send(`Success!`);
    }else{
        res.status(422).send({
            message: 'Some fields are missing or not correct!'
        });
    }
};

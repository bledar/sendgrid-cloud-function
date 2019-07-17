const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY);

exports.sendgrid = (req, res) => {
    const to = process.env.MAIL_TO || 'info@sigja.com';
    const from = process.env.MAIL_FROM || 'contact@sigja.com';
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else{
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
                    <li><strong>Name: </strong> ${name}</li>
                    <li><strong>Email: </strong> <a href='mailto:${email}'>${email}</a></li>
                    <li><strong>Message: </strong> ${message}</li>
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
    }
};

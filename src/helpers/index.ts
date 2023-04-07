import path from 'path';
import nodemailer from 'nodemailer';
import ejs from 'ejs';

export const notify = (template: string) => {
  const rootDir = path.resolve(__dirname, '../..');

  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  ejs.renderFile(
    rootDir + `/templates/${template}.ejs`,
    { receiver: 'john', content: 'just testing', currentDate: new Date().getFullYear() },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let mailOptions = {
          from: `Сидена колл-центр автосервис ${process.env.SENDER_EMAIL}`,
          to: process.env.RECEIVER_EMAIL,
          subject: 'Новое уведомление от колл-центра Сирены',
          html: data,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return console.log(error);
          }

          console.log('Message sent ' + info.response);
        });
      }
    },
  );
};

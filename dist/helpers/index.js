"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = void 0;
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const notify = (template, templateData) => {
    const rootDir = path_1.default.resolve(__dirname, '../..');
    let transporter = nodemailer_1.default.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    ejs_1.default.renderFile(rootDir + `/templates/${template}.ejs`, { receiver: 'john', content: 'just testing', currentDate: new Date().getFullYear(), templateData }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            let mailOptions = {
                from: `Сидена колл-центр автосервис ${process.env.SENDER_EMAIL}`,
                to: templateData.email,
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
    });
};
exports.notify = notify;
//# sourceMappingURL=index.js.map
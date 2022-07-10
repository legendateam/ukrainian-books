import { EmailEnum } from '../enums';
import { emailTemplate, transporter } from '../configs';
import { emailConstant } from '../constants';

export class EmailService {
    public async sendEmail(email: string, type: EmailEnum, context: object) {
        const { subject, template } = emailConstant[type];

        const html = await emailTemplate.render(template, context);

        await transporter.sendMail({
            from: 'Перевірка',
            to: email,
            subject,
            html,
        });
    }
}
export const emailService = new EmailService();

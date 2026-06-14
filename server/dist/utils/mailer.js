"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.sendWelcomeEmail = sendWelcomeEmail;
exports.sendNewsEmail = sendNewsEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const i18next_1 = __importDefault(require("i18next"));
const config_1 = require("../config");
const logger_1 = __importDefault(require("./logger"));
const transporter = nodemailer_1.default.createTransport({
    host: config_1.config.mail.host,
    port: config_1.config.mail.port,
    secure: config_1.config.mail.secure,
    auth: config_1.config.mail.user
        ? { user: config_1.config.mail.user, pass: config_1.config.mail.pass || '' }
        : undefined,
    tls: { rejectUnauthorized: false }
});
const defaultFrom = config_1.config.mail.from;
function renderHtmlTemplate(title, intro, buttonText, buttonUrl, footer) {
    return `
    <html>
      <body style="font-family: Arial, sans-serif; background:#f4f6f9; margin:0; padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center" style="padding:20px 0;">
              <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 0 20px rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding:24px; text-align:center; background:#072439; color:#ffffff;">
                    <h1 style="margin:0; font-size:24px;">${title}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px; color:#2c3e50; font-size:16px; line-height:1.5;">
                    <p>${intro}</p>
                    <p style="text-align:center; margin:24px 0;">
                      <a href="${buttonUrl}" style="background:#ff8c00; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; display:inline-block;">${buttonText}</a>
                    </p>
                    <p style="color:#7f8c8d; font-size:14px;">${footer}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
}
async function sendMail(to, subject, text, html) {
    const isDev = config_1.config.env === 'development';
    const hasHost = !!config_1.config.mail.host;
    // إذا لم يتم تحديد ملقم SMTP في بيئة التطوير، نكتفي بالتسجيل في السجلات
    if (!hasHost && isDev) {
        logger_1.default.info(`📧 [DEV MODE] Email skip (No SMTP Host). Target: ${to}`);
        logger_1.default.info(`🔗 Content:\nSubject: ${subject}\nText: ${text}`);
        return;
    }
    try {
        await transporter.sendMail({ from: defaultFrom, to, subject, text, html });
    }
    catch (error) {
        if (isDev) {
            logger_1.default.warn(`📧 Email failed to ${to} (${error.message}), but continuing registration.`);
            logger_1.default.info(`🔗 Fallback Content:\nSubject: ${subject}\nText: ${text}`);
            return;
        }
        // في الإنتاج، نلقي الخطأ لضمان سلامة عملية التفعيل
        throw error;
    }
}
async function sendVerificationEmail(to, link, lng = 'ar') {
    const t = (key) => i18next_1.default.t(key, { lng });
    const subject = t('auth:email_verify_subject');
    const text = `${t('auth:email_verify_intro')} ${link}`;
    const html = renderHtmlTemplate(t('auth:email_verify_subject'), t('auth:email_verify_intro'), t('auth:email_verify_button'), link, t('auth:email_footer_contact'));
    await sendMail(to, subject, text, html);
}
async function sendPasswordResetEmail(to, link, lng = 'ar') {
    const t = (key) => i18next_1.default.t(key, { lng });
    const subject = t('auth:email_reset_subject');
    const text = `${t('auth:email_reset_intro')} ${link}`;
    const html = renderHtmlTemplate(t('auth:email_reset_subject'), t('auth:email_reset_intro'), t('auth:email_reset_button'), link, t('auth:email_footer_default'));
    await sendMail(to, subject, text, html);
}
async function sendWelcomeEmail(to, fullName, lng = 'ar') {
    const t = (key, options) => i18next_1.default.t(key, { lng, ...options });
    const subject = t('auth:email_welcome_subject');
    const text = t('auth:email_welcome_intro', { name: fullName });
    const html = renderHtmlTemplate(t('auth:email_welcome_subject'), t('auth:email_welcome_intro', { name: fullName }), t('auth:email_welcome_button'), config_1.config.urls.frontend, t('auth:email_welcome_footer'));
    await sendMail(to, subject, text, html);
}
async function sendNewsEmail(to, subject, message, lng = 'ar') {
    const t = (key) => i18next_1.default.t(key, { lng });
    const html = renderHtmlTemplate(t('auth:email_news_subject'), message, t('auth:email_news_button'), config_1.config.urls.frontend, t('auth:email_news_footer'));
    await sendMail(to, subject, message, html);
}

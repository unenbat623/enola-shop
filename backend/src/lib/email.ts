import nodemailer from 'nodemailer'

interface SendEmailOptions {
  email: string
  subject: string
  message: string
  html: string
}

export const sendEmail = async (options: SendEmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"Enola Shop" <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  }

  await transporter.sendMail(mailOptions)
}

export const sendResetPasswordEmail = async (email: string, resetUrl: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #1a202c; text-align: center;">Нууц үг сэргээх</h2>
      <p style="color: #4a5568; font-size: 16px;">Сайн байна уу,</p>
      <p style="color: #4a5568; font-size: 16px;">Та нууц үгээ сэргээх хүсэлт илгээсэн байна. Доорх товчлуур дээр дарж нууц үгээ шинэчилнэ үү. Энэхүү холбоос нь 10 минутын дараа хүчингүй болно.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #1a202c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Нууц үг шинэчлэх</a>
      </div>
      <p style="color: #718096; font-size: 14px;">Хэрэв та энэхүү хүсэлтийг илгээгээгүй бол энэ имэйлийг үл тоомсорлож болно.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
      <p style="color: #a0aec0; font-size: 12px; text-align: center;">Enola Shop &copy; 2024</p>
    </div>
  `

  await sendEmail({
    email,
    subject: 'Нууц үг сэргээх хүсэлт - Enola Shop',
    message: `Нууц үгээ дараах холбоосоор орж шинэчилнэ үү: ${resetUrl}`,
    html,
  })
}

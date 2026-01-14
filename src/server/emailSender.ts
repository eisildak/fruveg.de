import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text: string; html: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Fruveg Market <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      text: text,
      html: html,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      throw error;
    }

    console.log(`✅ Email sent to ${to} via Resend (ID: ${data?.id})`);
    return data;
  } catch (error) {
    console.error('❌ Failed to send email via Resend:', error);
    throw error;
  }
}

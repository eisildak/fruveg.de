import { sendEmail } from './emailSender';
import type { User } from 'wasp/entities';

// Test email gönderme fonksiyonu
export async function testResendEmail(user: User) {
  try {
    await sendEmail({
      to: user.email,
      subject: '✅ Resend Test - Fruveg Market',
      text: 'Bu bir test emailidir. Resend entegrasyonu çalışıyor!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #16a34a;">✅ Resend Test Başarılı!</h1>
          <p>Merhaba,</p>
          <p>Bu email Resend API kullanılarak gönderildi.</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px;">Fruveg Market - ${new Date().toLocaleString('de-DE')}</p>
        </div>
      `,
    });
    return { success: true, message: 'Test email sent via Resend!' };
  } catch (error) {
    console.error('Test email failed:', error);
    return { success: false, error: String(error) };
  }
}

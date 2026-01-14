import { sendEmail } from './emailSender';

export const userSignupFields = {
  email: (data: any) => data.email,
  isEmailVerified: () => true  // Otomatik doğrulama aktif
};

// Kayıt sonrası Resend ile hoşgeldin emaili gönder
export const onAfterSignup = async ({ user }: any) => {
  try {
    await sendEmail({
      to: user.email,
      subject: '🎉 Hoşgeldiniz - Fruveg Market',
      text: `Merhaba! Fruveg Market'e hoş geldiniz. Hesabınız başarıyla oluşturuldu.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #16a34a;">🎉 Hoşgeldiniz!</h1>
          <p>Merhaba,</p>
          <p>Fruveg Market'e kaydınız başarıyla tamamlandı!</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p>Artık taze meyve ve sebzelere kolayca ulaşabilirsiniz.</p>
          <a href="http://localhost:3000/urunler" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Ürünleri Görüntüle</a>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px;">Fruveg Market © ${new Date().getFullYear()}</p>
        </div>
      `,
    });
    console.log(`✅ Hoşgeldin emaili gönderildi: ${user.email}`);
  } catch (error) {
    console.error('❌ Hoşgeldin emaili gönderilemedi:', error);
  }
};

export const getVerificationEmailContent = ({ verificationLink }: { verificationLink: string }) => {
  return {
    subject: 'Fruveg Market - E-Mail bestätigen',
    text: `Willkommen bei Fruveg Market! Bitte bestätigen Sie Ihre E-Mail-Adresse: ${verificationLink}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Willkommen bei Fruveg Market!</h2>
        <p>Vielen Dank für Ihre Registrierung. Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf den folgenden Link klicken:</p>
        <a href="${verificationLink}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">E-Mail bestätigen</a>
        <p>Oder kopieren Sie diesen Link in Ihren Browser:</p>
        <p style="color: #666; word-break: break-all;">${verificationLink}</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px;">Wenn Sie sich nicht bei Fruveg Market registriert haben, ignorieren Sie diese E-Mail bitte.</p>
      </div>
    `,
  };
};

export const getPasswordResetEmailContent = ({ passwordResetLink }: { passwordResetLink: string }) => {
  return {
    subject: 'Fruveg Market - Passwort zurücksetzen',
    text: `Passwort zurücksetzen: ${passwordResetLink}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Passwort zurücksetzen</h2>
        <p>Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts erhalten. Klicken Sie auf den folgenden Link:</p>
        <a href="${passwordResetLink}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">Passwort zurücksetzen</a>
        <p>Oder kopieren Sie diesen Link in Ihren Browser:</p>
        <p style="color: #666; word-break: break-all;">${passwordResetLink}</p>
        <p style="color: #dc2626; margin-top: 20px;">⚠️ Dieser Link ist nur 24 Stunden gültig.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px;">Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail bitte.</p>
      </div>
    `,
  };
};

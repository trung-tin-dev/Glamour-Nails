import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, email, subject, message } = data;

    // Chuẩn hóa số điện thoại cho link WhatsApp
    const rawPhone = (phone || '').replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.startsWith('0') ? '84' + rawPhone.slice(1) : rawPhone;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      `Chào bạn ${name}, Glamour Nails & Spa đã nhận được yêu cầu tư vấn: "${subject}" của bạn. Chúng tôi xin phép được hỗ trợ bạn đặt lịch nhé!`
    )}`;

    const formattedTime = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Các đường dẫn ảnh icon dạng nét mảnh (Outline) chất lượng cao từ CDN
    const iconPin = 'https://img.icons8.com/ios/100/e07a7c/marker.png';
    const iconPhone = 'https://img.icons8.com/ios/100/e07a7c/phone.png';
    const iconMail = 'https://img.icons8.com/ios/100/e07a7c/mail.png';
    const iconSparkle = 'https://img.icons8.com/ios/100/e07a7c/sparkles.png';
    const iconClock = 'https://img.icons8.com/ios/100/e07a7c/clock.png';

    // Icon nút hành động nhanh (màu trắng)
    const iconPhoneWhite = 'https://img.icons8.com/ios/100/ffffff/phone.png';
    const iconWhatsappWhite = 'https://img.icons8.com/ios/100/ffffff/whatsapp.png';

    // Icon mạng xã hội cho footer (màu trắng)
    const iconInsta = 'https://img.icons8.com/ios/100/ffffff/instagram-new.png';
    const iconFB = 'https://img.icons8.com/ios/100/ffffff/facebook-new.png';
    const iconTikTok = 'https://img.icons8.com/ios/100/ffffff/tiktok.png';

    // Gửi email
    await resend.emails.send({
      from: 'Glamour Nails Concierge <onboarding@resend.dev>',
      to: process.env.MY_RECEIVE_EMAIL || 'your_email@gmail.com',
      subject: `[KHÁCH HÀNG] ${name} - ${subject}`,
      html: `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Khách Hàng Mới - Glamour Nails</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5EBDD; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F5EBDD; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Khung chính email -->
        <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(61, 35, 20, 0.08); border: 1px solid #E8DAC7;">
          
          <!-- 1. Header Banner -->
          <tr>
            <td align="center" style="background-color: #2D1B12; padding: 32px 20px; border-bottom: 3px solid #9E2A2B;">
              <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #FAF6F0; text-transform: uppercase;">
                GLAMOUR<span style="color: #E07A7C;">.</span>NAILS
              </span>
              <p style="margin: 4px 0 0 0; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #C4A48A;">
                Luxury Beauty &amp; Spa Studio
              </p>
            </td>
          </tr>

          <!-- 2. Thẻ Trạng Thái -->
          <tr>
            <td style="padding: 30px 30px 10px 30px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF4ED; border-radius: 12px; padding: 14px 18px; border-left: 4px solid #9E2A2B;">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #9E2A2B; display: block;">
                      ✦ NEW CLIENT LEAD RECEIVED
                    </span>
                    <span style="font-size: 14px; color: #3D2314; font-weight: 600; margin-top: 2px; display: block;">
                      Yêu cầu tư vấn mới từ Website
                    </span>
                  </td>
                  <td align="right" style="font-size: 11px; color: #8A6E5E; white-space: nowrap; font-family: Georgia, serif; font-style: italic;">
                    ${formattedTime}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3. Bảng Chi Tiết Khách Hàng -->
          <tr>
            <td style="padding: 20px 30px 10px 30px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                
                <!-- Họ và tên -->
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px dashed #E8DAC7; font-size: 13px; color: #7A5F4E; width: 35%;">
                    Họ và tên khách:
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px dashed #E8DAC7; font-size: 15px; font-weight: bold; color: #3D2314; font-family: Georgia, serif;">
                    ${name}
                  </td>
                </tr>

                <!-- Số điện thoại -->
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px dashed #E8DAC7; font-size: 13px; color: #7A5F4E;">
                    Số điện thoại:
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px dashed #E8DAC7; font-size: 14px; font-weight: bold;">
                    <a href="tel:${phone}" style="color: #9E2A2B; text-decoration: none; background-color: #FAF4ED; padding: 4px 10px; border-radius: 8px; border: 1px solid #E8DAC7; display: inline-flex; align-items: center;">
                      <img src="${iconPhone}" width="14" height="14" style="vertical-align: middle; margin-right: 4px;" alt="Phone" /> ${phone}
                    </a>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px dashed #E8DAC7; font-size: 13px; color: #7A5F4E;">
                    Địa chỉ Email:
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px dashed #E8DAC7; font-size: 14px; color: #3D2314;">
                    ${email ? `<a href="mailto:${email}" style="color: #3D2314; text-decoration: underline;">${email}</a>` : '<span style="color: #A8907E; font-style: italic;">Không cung cấp</span>'}
                  </td>
                </tr>

                <!-- Nhu cầu tư vấn -->
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E8DAC7; font-size: 13px; color: #7A5F4E;">
                    Chủ đề quan tâm:
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E8DAC7; font-size: 13px; font-weight: 600; color: #9E2A2B;">
                    <span style="background-color: #FBEAEB; color: #9E2A2B; padding: 4px 12px; border-radius: 20px; font-size: 12px; display: inline-block;">
                      <img src="${iconSparkle}" width="12" height="12" style="vertical-align: middle; margin-right: 4px; margin-top: -2px;" alt="Sparkle" /> ${subject}
                    </span>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- 4. Lời Nhắn -->
          <tr>
            <td style="padding: 15px 30px 25px 30px;">
              <span style="font-size: 11px; font-weight: bold; color: #3D2314; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">
                Nội dung lời nhắn:
              </span>
              <div style="background-color: #FAF6F0; border: 1px solid #E8DAC7; border-radius: 12px; padding: 16px 20px; font-size: 14px; color: #3D2314; line-height: 1.6; font-style: italic;">
                "${message.replace(/\n/g, '<br/>')}"
              </div>
            </td>
          </tr>

          <!-- 5. Nút Bấm Hành Động Nhanh (Sử dụng icon nét mảnh màu trắng) -->
          <tr>
            <td align="center" style="padding: 0 30px 30px 30px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Gọi điện -->
                  <td align="center" style="padding-right: 6px; width: 50%;">
                    <a href="tel:${phone}" style="display: block; background-color: #9E2A2B; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: bold; padding: 14px 15px; border-radius: 10px; text-align: center;">
                      <img src="${iconPhoneWhite}" width="15" height="14" style="vertical-align: middle; margin-right: 6px; margin-top: -2px;" alt="Phone" /> Gọi điện ngay
                    </a>
                  </td>
                  <!-- Chat WhatsApp -->
                  <td align="center" style="padding-left: 6px; width: 50%;">
                    <a href="${whatsappUrl}" target="_blank" style="display: block; background-color: #128C7E; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: bold; padding: 14px 15px; border-radius: 10px; text-align: center;">
                      <img src="${iconWhatsappWhite}" width="15" height="15" style="vertical-align: middle; margin-right: 6px; margin-top: -2px;" alt="WhatsApp" /> Mở WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 6. Footer Signature (Có icon nét mảnh liên hệ + mạng xã hội tròn) -->
          <tr>
            <td align="center" style="background-color: #FAF4ED; padding: 30px 20px; border-top: 1px solid #E8DAC7; font-size: 11px; color: #8A6E5E;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #3D2314; font-size: 12px; letter-spacing: 0.5px;">
                GLAMOUR NAILS &amp; SPA CONCIERGE
              </p>
              
              <!-- Cột thông tin liên hệ tối giản -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px; font-size: 12px; color: #7A5F4E;">
                <tr>
                  <td align="center" style="padding-bottom: 6px;">
                    <img src="${iconPin}" width="12" height="12" style="vertical-align: middle; margin-right: 4px;" alt="Pin" /> 123 Nguyen Hue Boulevard, District 1, HCMC
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <img src="${iconMail}" width="12" height="12" style="vertical-align: middle; margin-right: 4px;" alt="Mail" /> contact@glamournails.vn • <img src="${iconClock}" width="12" height="12" style="vertical-align: middle; margin-right: 4px; margin-left: 4px;" alt="Clock" /> 09:00 AM - 08:00 PM
                  </td>
                </tr>
              </table>

              <!-- CHÂN TRANG MẠNG XÃ HỘI (Tròn nét mảnh đồng bộ với Footer Website) -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <!-- Instagram -->
                  <td style="padding: 0 6px;">
                    <a href="https://instagram.com" target="_blank" style="display: block; width: 32px; height: 32px; border-radius: 50%; background-color: #3D251A; text-align: center; line-height: 32px; text-decoration: none;">
                      <img src="${iconInsta}" width="14" height="14" style="margin-top: 9px; vertical-align: top;" alt="Instagram" />
                    </a>
                  </td>
                  <!-- Facebook -->
                  <td style="padding: 0 6px;">
                    <a href="https://facebook.com" target="_blank" style="display: block; width: 32px; height: 32px; border-radius: 50%; background-color: #3D251A; text-align: center; line-height: 32px; text-decoration: none;">
                      <img src="${iconFB}" width="14" height="14" style="margin-top: 9px; vertical-align: top;" alt="Facebook" />
                    </a>
                  </td>
                  <!-- TikTok -->
                  <td style="padding: 0 6px;">
                    <a href="https://tiktok.com" target="_blank" style="display: block; width: 32px; height: 32px; border-radius: 50%; background-color: #3D251A; text-align: center; line-height: 32px; text-decoration: none;">
                      <img src="${iconTikTok}" width="14" height="14" style="margin-top: 9px; vertical-align: top;" alt="TikTok" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
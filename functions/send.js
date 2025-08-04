const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const COMPANY_NAME = process.env.COMPANY_NAME || 'Saurabh Jha Designs';
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'saurabhjhadesigns@gmail.com';
const COMPANY_CITY = process.env.COMPANY_CITY || 'Bangalore, India';
const COMPANY_PHONE = process.env.COMPANY_PHONE || '+91-9876543210';
const COMPANY_WEBSITE = process.env.COMPANY_WEBSITE || 'https://saurabh-jha-designs.netlify.app/';
const COMPANY_WHATSAPP = process.env.COMPANY_WHATSAPP || 'https://wa.me/919876543210';

const INSTAGRAM = process.env.SOCIAL_INSTAGRAM || 'https://www.instagram.com/saurabh_jha_designs/';
const LINKEDIN = process.env.SOCIAL_LINKEDIN || 'https://linkedin.com/in/saurabh-jha-designs/';
const FACEBOOK = process.env.SOCIAL_FACEBOOK || 'https://www.facebook.com/profile.php?id=61578668492659';
const BEHANCE = process.env.SOCIAL_BEHANCE || 'https://www.behance.net/saurabhjhadesigns';
const PINTEREST = process.env.SOCIAL_PINTEREST || 'https://in.pinterest.com/saurabhjhadesigns/';

function buildAttachmentsBase64() {
  const attachments = [];
  
  try {
    // Look for assets in netlify/assets directory first, then public directory
    const assetsDir = path.resolve('./netlify/assets');
    const publicDir = path.resolve('./public');
    
    // Logo handling
    const logoPath1 = path.join(assetsDir, 'logo.png');
    const logoPath2 = path.join(publicDir, 'logo.png');
    
    let logoPath = null;
    if (fs.existsSync(logoPath1)) {
      logoPath = logoPath1;
      console.log('Logo found in netlify/assets directory');
    } else if (fs.existsSync(logoPath2)) {
      logoPath = logoPath2;
      console.log('Logo found in public directory');
    } else {
      console.warn('Logo not found in either netlify/assets or public directory');
    }
    
    if (logoPath) {
      const logoBuffer = fs.readFileSync(logoPath);
      const logoBase64 = logoBuffer.toString('base64');
      attachments.push({
        filename: 'logo.png',
        content: logoBase64,
        encoding: 'base64',
        cid: 'logo@cid'
      });
      console.log('Logo loaded as base64');
    }

    // Signature handling
    const signaturePath1 = path.join(assetsDir, 'signature.png');
    const signaturePath2 = path.join(publicDir, 'signature.png');
    
    let signaturePath = null;
    if (fs.existsSync(signaturePath1)) {
      signaturePath = signaturePath1;
      console.log('Signature found in netlify/assets directory');
    } else if (fs.existsSync(signaturePath2)) {
      signaturePath = signaturePath2;
      console.log('Signature found in public directory');
    } else {
      console.warn('Signature not found in either netlify/assets or public directory');
    }
    
    if (signaturePath) {
      const signatureBuffer = fs.readFileSync(signaturePath);
      const signatureBase64 = signatureBuffer.toString('base64');
      attachments.push({
        filename: 'signature.png',
        content: signatureBase64,
        encoding: 'base64',
        cid: 'signature@cid'
      });
      console.log('Signature loaded as base64');
    }
    
  } catch (error) {
    console.warn('Could not load base64 attachments:', error.message);
    console.warn('Error details:', error);
  }

  console.log(`Total attachments loaded: ${attachments.length}`);
  return attachments;
}


function buildAttachments() {
  return buildAttachmentsBase64();
}

function buildAdminEmail(data) {
  const currentDate = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return {
    subject: `New Inquiry: ${data.projectType || data.service || 'General'} - ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Client Inquiry</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background-color: #f5f7fa; 
            margin: 0; 
            padding: 20px; 
          }
          .container { 
            max-width: 650px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
          }
          
          .header {
            background-color: #e6f0fa;
            padding: 30px;
            text-align: left;
            border-bottom: 3px solid #4a90e2;
          }
          .header-content {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .logo {
            width: 60px;
            height: 60px;
            flex-shrink: 0;
          }
          .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .header-text h1 {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 5px;
            font-weight: 600;
          }
          .header-text .tagline {
            font-size: 16px;
            color: #4a90e2;
            font-weight: 500;
          }
          .client-name {
            font-size: 20px;
            color: #2c3e50;
            font-weight: bold;
            margin-top: 15px;
            padding: 10px 15px;
            background: rgba(74, 144, 226, 0.1);
            border-radius: 5px;
            border-left: 4px solid #4a90e2;
          }
          
          .content {
            padding: 30px;
          }
          
          .form-section {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
            border: 1px solid #e9ecef;
          }
          .form-section h3 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 600;
            border-bottom: 2px solid #4a90e2;
            padding-bottom: 8px;
          }
          .form-row {
            display: table;
            width: 100%;
            margin-bottom: 15px;
            border-bottom: 1px solid #eee;
            padding-bottom: 12px;
          }
          .form-row:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }
          .form-label {
            display: table-cell;
            font-weight: 600;
            color: #495057;
            width: 140px;
            vertical-align: top;
            padding-right: 15px;
            font-size: 14px;
          }
          .form-value {
            display: table-cell;
            color: #2c3e50;
            vertical-align: top;
            font-size: 15px;
          }
          .form-value a {
            color: #4a90e2;
            text-decoration: none;
            font-weight: 500;
          }
          .form-value a:hover {
            text-decoration: underline;
          }
          
          .message-section {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-left: 4px solid #fdcb6e;
            padding: 20px;
            border-radius: 5px;
            margin: 25px 0;
          }
          .message-section h4 {
            color: #856404;
            margin-bottom: 12px;
            font-size: 16px;
          }
          .message-content {
            color: #856404;
            line-height: 1.6;
            font-size: 15px;
            background: rgba(255,255,255,0.5);
            padding: 15px;
            border-radius: 4px;
          }
          
          .timestamp {
            text-align: center;
            font-size: 13px;
            color: #6c757d;
            font-style: italic;
            margin: 20px 0;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 4px;
            border: 1px solid #dee2e6;
          }
          
          .cta-section {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 25px 0;
          }
          .cta-section h3 {
            margin-bottom: 15px;
            font-size: 18px;
            font-weight: 600;
          }
          .cta-button {
            display: inline-block;
            background: white;
            color: #28a745;
            padding: 12px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            margin: 5px 10px;
            transition: transform 0.2s, box-shadow 0.2s;
            font-size: 14px;
          }
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
          
          .footer {
            background: #2c3e50;
            padding: 20px 30px;
            text-align: center;
            color: white;
          }
          .footer h4 {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 500;
          }
          .footer p {
            margin: 5px 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .footer a {
            color: #74b9ff;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-content">
              <div class="logo">
                <img src="cid:logo@cid" alt="${COMPANY_NAME} Logo">
              </div>
              <div class="header-text">
                <h1>New Inquiry Received</h1>
                <div class="tagline">Client Contact Information</div>
              </div>
            </div>
            <div class="client-name">
              <strong>From: ${data.name}</strong>
            </div>
          </div>
          
          <div class="content">
            <div class="form-section">
              <h3>📋 Client Details</h3>
              <div class="form-row">
                <div class="form-label">Full Name:</div>
                <div class="form-value">${data.name}</div>
              </div>
              <div class="form-row">
                <div class="form-label">Email Address:</div>
                <div class="form-value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              ${data.phone ? `
              <div class="form-row">
                <div class="form-label">Phone Number:</div>
                <div class="form-value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              ` : ''}
              <div class="form-row">
                <div class="form-label">Project Type:</div>
                <div class="form-value">${data.projectType || data.service || 'Not specified'}</div>
              </div>
              ${data.budget ? `
              <div class="form-row">
                <div class="form-label">Budget Range:</div>
                <div class="form-value">${data.budget}</div>
              </div>
              ` : ''}
            </div>
            
            <div class="message-section">
              <h4>💬 Client Message:</h4>
              <div class="message-content">
                ${data.message ? data.message.replace(/\n/g, '<br>') : 'No message provided.'}
              </div>
            </div>
            
            <div class="timestamp">
              📅 Inquiry Received: ${currentDate} (IST)
            </div>
            
            <div class="cta-section">
              <h3>Quick Actions</h3>
              <a href="mailto:${data.email}" class="cta-button">📧 Reply Instantly</a>
              ${data.phone ? `<a href="tel:${data.phone}" class="cta-button">📞 Call Now</a>` : ''}
              ${data.phone ? `<a href="https://wa.me/${data.phone}" class="cta-button">💬 WhatsApp</a>` : ''}
            </div>
          </div>
          
          <div class="footer">
            <h4>${COMPANY_NAME}</h4>
            <p>${COMPANY_CITY}</p>
            <p>Phone: ${COMPANY_PHONE} | Email: <a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a></p>
            <p><a href="${COMPANY_WEBSITE}">${COMPANY_WEBSITE}</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

function buildClientEmail(data) {
  return {
    subject: `Thank you ${data.name}! We've received your ${data.projectType || data.service || 'design'} inquiry`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Inquiry</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background-color: #f5f7fa; 
            margin: 0; 
            padding: 20px; 
          }
          .container { 
            max-width: 650px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
          }
          
          .header {
            background-color: #e6f0fa;
            padding: 30px;
            text-align: center;
            border-bottom: 3px solid #4a90e2;
          }
          .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
          }
          .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .header h1 {
            font-size: 28px;
            color: #2c3e50;
            margin-bottom: 8px;
            font-weight: 600;
          }
          .tagline {
            font-size: 18px;
            color: #4a90e2;
            font-weight: 500;
            font-style: italic;
          }
          
          .content {
            padding: 40px 30px;
            line-height: 1.7;
          }
          
          .greeting {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 25px;
            font-weight: 500;
          }
          
          .thank-you-box {
            background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
            text-align: center;
            box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
          }
          .thank-you-box h3 {
            font-size: 20px;
            margin-bottom: 12px;
            font-weight: 600;
          }
          .thank-you-box p {
            font-size: 16px;
            margin: 0;
            opacity: 0.95;
          }
          
          .content p {
            margin: 18px 0;
            font-size: 16px;
            color: #495057;
            text-align: justify;
          }
          
          .confirmation-section {
            background: #e8f5e8;
            border: 1px solid #c3e6c3;
            border-left: 4px solid #28a745;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
          }
          .confirmation-section h4 {
            color: #155724;
            margin-bottom: 12px;
            font-size: 16px;
            font-weight: 600;
          }
          .confirmation-section p {
            color: #155724;
            margin: 0;
            font-size: 15px;
          }
          
          .signature-section {
            margin: 40px 0;
            padding: 25px;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: left;
          }
          .signature-section .regards {
            font-size: 16px;
            color: #2c3e50;
            margin-bottom: 15px;
            font-weight: 500;
          }
          .signature-section img {
            max-height: 80px;
            margin: 10px 0;
          }
          .signature-name {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            margin-top: 8px;
          }
          .signature-title {
            font-size: 14px;
            color: #6c757d;
            font-style: italic;
          }
          
          .footer {
            background: #2c3e50;
            padding: 30px;
            color: white;
            text-align: center;
          }
          
          .social-links {
            margin: 20px 0;
            text-align: center;
          }
          .social-icon {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin: 0 8px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            padding: 8px;
            transition: all 0.3s ease;
            text-decoration: none;
            vertical-align: middle;
          }
          .social-icon:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-2px);
          }
          .social-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: brightness(0) invert(1);
          }
          
          .footer-logo {
            width: 50px;
            height: 50px;
            margin: 15px auto;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            padding: 10px;
          }
          .footer-logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: brightness(0) invert(1);
          }
          .footer-logo a {
            display: block;
            text-decoration: none;
          }
          
          .footer h4 {
            font-size: 20px;
            margin: 15px 0 10px;
            font-weight: 500;
          }
          .footer p {
            margin: 5px 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .footer a {
            color: #74b9ff;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          
          .disclaimer {
            font-size: 12px;
            opacity: 0.7;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.2);
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="cid:logo@cid" alt="${COMPANY_NAME} Logo">
            </div>
            <h1>Thank You!</h1>
            <div class="tagline">Thank you for reaching out to Saurabh Jha Designs!</div>
          </div>
          
          <div class="content">
            <div class="greeting">Dear ${data.name},</div>
            
            <div class="thank-you-box">
              <h3>🎉 We've Received Your Inquiry!</h3>
              <p>Thank you for choosing ${COMPANY_NAME} for your ${data.projectType || data.service || 'design'} project. We're excited about the opportunity to bring your vision to life.</p>
            </div>
            
            <p>We appreciate you taking the time to reach out to us. Your inquiry is important to us, and we want to ensure we provide you with the best possible service and attention to detail that your project deserves.</p>
            
            <div class="confirmation-section">
              <h4>✅ What Happens Next?</h4>
              <p>Our experienced design team will carefully review your project requirements and prepare a customized proposal. You can expect to hear from us within 24 hours during business days with next steps and to schedule a detailed consultation.</p>
            </div>
            
            <p>In the meantime, feel free to explore our portfolio on our website or connect with us on social media to see our latest projects and design inspirations. We're passionate about creating spaces that perfectly blend functionality with aesthetic appeal.</p>
            
            <div class="signature-section">
              <div class="regards">Warm regards,</div>
              <img src="cid:signature@cid" alt="Saurabh Jha Signature">
              <div class="signature-name">Saurabh Jha</div>
              <div class="signature-title">Founder & Lead Designer</div>
            </div>
          </div>
          
          <div class="footer">
            <div class="social-links">
              <a href="${COMPANY_WHATSAPP}" class="social-icon" title="WhatsApp">
                <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="WhatsApp">
              </a>
              <a href="${INSTAGRAM}" class="social-icon" title="Instagram">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram">
              </a>
              <a href="${LINKEDIN}" class="social-icon" title="LinkedIn">
                <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn">
              </a>
              <a href="${FACEBOOK}" class="social-icon" title="Facebook">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
              </a>
              <a href="${BEHANCE}" class="social-icon" title="Behance">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733544.png" alt="Behance">
              </a>
              <a href="${PINTEREST}" class="social-icon" title="Pinterest">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733569.png" alt="Pinterest">
              </a>
            </div>
            
            <div class="footer-logo">
              <a href="${COMPANY_WEBSITE}">
                <img src="cid:logo@cid" alt="${COMPANY_NAME} Logo">
              </a>
            </div>
            
            <h4>${COMPANY_NAME}</h4>
            <p>${COMPANY_CITY}</p>
            <p>Phone: ${COMPANY_PHONE} | Email: <a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a></p>
            <p><a href="${COMPANY_WEBSITE}">Visit Our Website</a></p>
            
            <div class="disclaimer">
              This is an automated confirmation email. We'll personally respond to your inquiry within 24 hours during business days. Thank you for your interest in our design services.
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    console.log('Processing inquiry from:', data.name, data.email);

    // Enhanced validation
    if (!data.name || !data.email || !(data.projectType || data.service) || !data.message) {
      console.log('Validation failed - missing required fields');
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: name, email, projectType/service, and message are required' 
        }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log('Email validation failed for:', data.email);
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'Please provide a valid email address' 
        }),
      };
    }

    // Check for spam/test content
    const suspiciousKeywords = ['test', 'testing', 'spam', 'demo'];
    const isTestMessage = suspiciousKeywords.some(keyword => 
      data.message.toLowerCase().includes(keyword) && data.message.length < 20
    );

    console.log('Creating email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER || COMPANY_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    console.log('Building attachments...');
    const attachments = buildAttachments();
    console.log('Attachments found:', attachments.length);
    
    console.log('Building email templates...');
    const admin = buildAdminEmail(data);
    const client = buildClientEmail(data);

    console.log('Sending admin email...');
    // Send Admin Email
    await transporter.sendMail({
      from: `"${COMPANY_NAME}" <${COMPANY_EMAIL}>`,
      to: process.env.ADMIN_EMAIL || COMPANY_EMAIL,
      replyTo: data.email,
      subject: admin.subject,
      html: admin.html,
      attachments,
    });
    console.log('Admin email sent successfully');

    // Send Client Email (skip if suspected test)
    if (!isTestMessage) {
      console.log('Sending client confirmation email...');
      await transporter.sendMail({
        from: `"${COMPANY_NAME}" <${COMPANY_EMAIL}>`,
        to: data.email,
        subject: client.subject,
        html: client.html,
        attachments,
      });
      console.log('Client email sent successfully');
    } else {
      console.log('Skipping client email - suspected test message');
    }

    console.log('Email process completed successfully');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Thank you for your inquiry! We\'ll get back to you within 24 hours.'
      }),
    };
  } catch (error) {
    console.error('Email send error:', error);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to send email. Please try again later or contact us directly.' 
      }),
    };
  }
};
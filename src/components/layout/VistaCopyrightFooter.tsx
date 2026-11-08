import React from 'react';

export const VistaCopyrightFooter: React.FC = () => (
  <footer className="vista-official-footer glass" role="contentinfo">
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <span className="vista-badge">
        <span
          className="status-led"
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--lg-success)',
            boxShadow: '0 0 8px var(--lg-success)',
          }}
        />
        شرکت شبکه هوشمند ابتکار ویستا
      </span>
      <span>
        طراحی، معماری سامانه و توسعه هوش مصنوعی توسط <strong>«شرکت شبکه هوشمند ابتکار ویستا»</strong> — کلیه حقوق مادی، معنوی و مالکیت فکری این پلتفرم محفوظ و متعلق به شرکت شبکه هوشمند ابتکار ویستا می‌باشد © ۱۴۰۵
      </span>
    </div>
    <div dir="ltr" style={{ fontSize: '10.5px', color: 'var(--lg-muted)', fontWeight: 500 }}>
      Architected &amp; Powered by <strong>Vista Innovation Smart Network Co.</strong> · All Rights Reserved © 2026
    </div>
  </footer>
);

export default VistaCopyrightFooter;

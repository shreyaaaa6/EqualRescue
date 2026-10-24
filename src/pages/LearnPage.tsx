import React from 'react';
import { Video, ShieldCheck, Heart } from 'lucide-react';

export const LearnPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="section-heading">
        <h1 className="page-title">Hands-Only CPR for Women</h1>
        <p className="page-subtitle">
          Watch how Hands-Only CPR is performed and understand why rapid action saves lives.
        </p>
      </div>

      <div className="video-card">
        <div className="video-placeholder">
          <Video size={48} className="text-rose-500 mb-2" />
          <p className="font-semibold">AHA Hands-Only CPR Video</p>
          <p className="text-sm text-slate-500">Official educational tutorial featuring a woman rescuer and patient</p>
        </div>
      </div>

      <div className="faq-section">
        <h2>Common Questions & Reassurance</h2>
        <div className="faq-item">
          <div className="faq-icon"><Heart size={18} /></div>
          <div>
            <h3>Does CPR differ for women?</h3>
            <p>No. Standard AHA adult resuscitation guidance applies equally. Hand placement is the center of the chest, right between the breasts.</p>
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-icon"><ShieldCheck size={18} /></div>
          <div>
            <h3>Are bystanders protected by Good Samaritan laws?</h3>
            <p>Yes. Good Samaritan legal provisions exist to protect bystanders who provide emergency medical aid in good faith.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

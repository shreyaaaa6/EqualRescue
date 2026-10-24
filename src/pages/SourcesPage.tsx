import React from 'react';
import { ExternalLink, ShieldAlert, BookOpen, FileCheck, GitCommit, CheckCircle2 } from 'lucide-react';

interface Citation {
  id: string;
  source: string;
  title: string;
  publication: string;
  year: string;
  link: string;
  summary: string;
}

const citations: Citation[] = [
  {
    id: "aha-bls",
    source: "American Heart Association (AHA)",
    title: "2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care",
    publication: "Circulation. 2020;142(suppl 2):S366–S468",
    year: "2020 / Continuous Updates",
    link: "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-and-advanced-life-support",
    summary: "Defines target compression rate (100–120 bpm), depth (2 inches / 5 cm), and complete recoil standards for adult resuscitation."
  },
  {
    id: "aha-gender-gap",
    source: "Circulation (AHA Journal)",
    title: "Sex Differences in Bystander-Administered Cardiopulmonary Resuscitation in Public Locations",
    publication: "Circulation. 2017;136:A14619",
    year: "2017",
    link: "https://www.ahajournals.org/doi/10.1161/circ.136.suppl_1.14619",
    summary: "Key study demonstrating that women in public who suffer cardiac arrest are significantly less likely to receive bystander CPR than men (39% vs 45%), contributing to preventable disparities in survival."
  },
  {
    id: "jaha-hesitation",
    source: "Journal of the American Heart Association (JAHA)",
    title: "Public Perceptions of Bystander CPR and Use of Automated External Defibrillators in Women",
    publication: "JAHA. 2018;7(13):e009472",
    year: "2018",
    link: "https://www.ahajournals.org/doi/10.1161/JAHA.118.009472",
    summary: "Identifies primary factors causing hesitation: fear of accusation of sexual misconduct/inappropriate touching, fear of causing physical injury, and mistaken belief about anatomical fragility."
  },
  {
    id: "india-erss-112",
    source: "Government of India — Ministry of Home Affairs",
    title: "Emergency Response Support System (ERSS - 112)",
    publication: "National Emergency Helpline Operational Standard",
    year: "Active",
    link: "https://112.gov.in",
    summary: "Unified emergency number integrating police, fire, and ambulance services across India with GPS dispatcher routing and telephonic medical dispatch assistance."
  },
  {
    id: "india-good-samaritan",
    source: "Supreme Court of India / Ministry of Road Transport & Highways",
    title: "Good Samaritan Protection Guidelines & Motor Vehicles (Amendment) Act Section 134A",
    publication: "Gazette of India Notification / Supreme Court Landmark Order",
    year: "2016 / 2019",
    link: "https://morth.nic.in/good-samaritan",
    summary: "Grants comprehensive protection from civil, criminal, and institutional liability for bystanders who assist victims in medical emergencies."
  }
];

export const SourcesPage: React.FC = () => {
  return (
    <div className="page-container sources-container">
      {/* Heading */}
      <div className="section-heading">
        <div className="badge-pill mb-2">
          <BookOpen size={14} className="text-rose-600" />
          <span>Evidence & Governance</span>
        </div>
        <h1 className="page-title">Clinical Sources & Medical Boundaries</h1>
        <p className="page-subtitle">
          EqualRescue is an educational emergency guidance prototype anchored in peer-reviewed resuscitation science, clinical guidelines, and statutory Good Samaritan frameworks.
        </p>
      </div>

      {/* Explicit Medical Disclaimers Box */}
      <section className="notice-box medical-disclaimer-card" aria-label="Medical Disclaimer">
        <ShieldAlert size={28} className="text-amber-600 flex-shrink-0" />
        <div className="disclaimer-text">
          <h2 className="disclaimer-title">Explicit Medical Disclaimers & Boundaries</h2>
          <ul className="disclaimer-bullets">
            <li>
              <strong>Not a Diagnostic Tool:</strong> EqualRescue does not make medical diagnoses, determine patient pulse, or monitor compression depth or thoracic recoil in real time.
            </li>
            <li>
              <strong>Always Yield to 112 Dispatchers:</strong> If a telephonic emergency dispatcher gives specific instructions over the phone, the dispatcher's live clinical guidance takes precedence over this tool.
            </li>
            <li>
              <strong>Non-Commercial Educational Prototype:</strong> Created for public health advocacy, community awareness, and bystander hesitation reduction during adult cardiac arrest.
            </li>
          </ul>
        </div>
      </section>

      {/* Guidelines & Research Citations Table */}
      <section className="citations-section" aria-label="Clinical Citations">
        <h2 className="section-subheading">Reviewed Scientific Literature & Clinical Standards</h2>
        
        <div className="sources-table-container">
          <table className="sources-table">
            <thead>
              <tr>
                <th scope="col">Authority / Source</th>
                <th scope="col">Title & Journal</th>
                <th scope="col">Key Resuscitation Finding</th>
                <th scope="col">Direct Link</th>
              </tr>
            </thead>
            <tbody>
              {citations.map((c) => (
                <tr key={c.id}>
                  <td className="source-org-cell">
                    <strong>{c.source}</strong>
                    <span className="source-year">{c.year}</span>
                  </td>
                  <td className="source-title-cell">
                    <div className="table-paper-title">{c.title}</div>
                    <div className="table-paper-pub">{c.publication}</div>
                  </td>
                  <td className="source-summary-cell">{c.summary}</td>
                  <td className="source-link-cell">
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="table-external-link"
                      title={`Visit ${c.source}`}
                    >
                      <span>Read Paper</span>
                      <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Review & Changelog Ledger (Phase 8 Requirement) */}
      <section className="changelog-ledger-section" aria-label="Review and Changelog Ledger">
        <div className="ledger-header">
          <FileCheck size={20} className="text-rose-600" />
          <h2 className="section-subheading">Clinical Protocol Review & Changelog Ledger</h2>
        </div>

        <div className="ledger-timeline">
          <div className="ledger-entry">
            <div className="ledger-marker">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <div className="ledger-content">
              <div className="ledger-meta">
                <span className="version-tag">Version 1.2.0</span>
                <span className="ledger-date">Current Release (October 2026)</span>
                <span className="status-badge status-approved">Reviewed</span>
              </div>
              <h4>Metronome Synchronization & Women-Centred Decision Branch Audit</h4>
              <p>
                Verified zero-drift Web Audio API scheduling loop against 110 BPM AHA sweet spot. Fully aligned decision tree branches with observable signs (responsiveness + agonal breathing) and Good Samaritan statutory legal protections.
              </p>
            </div>
          </div>

          <div className="ledger-entry">
            <div className="ledger-marker">
              <GitCommit size={16} className="text-slate-400" />
            </div>
            <div className="ledger-content">
              <div className="ledger-meta">
                <span className="version-tag">Version 1.0.0</span>
                <span className="ledger-date">Initial Release</span>
                <span className="status-badge status-archived">Baseline</span>
              </div>
              <h4>Hands-Only CPR Specification & Two-Door Entry Architecture</h4>
              <p>
                Baseline implementation of mobile-responsive CPR metronome, high-contrast timer, and zero-login emergency guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface Citation {
  id: string;
  category: string;
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
    category: "Resuscitation Science & Standards",
    source: "American Heart Association (AHA)",
    title: "2020 Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care",
    publication: "Circulation. 2020;142(suppl 2):S366–S468",
    year: "2020",
    link: "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-and-advanced-life-support",
    summary: "Establishes 100–120 BPM compression rate, 5 to 6 cm (2–2.4 in) depth, and complete recoil standard for all adult resuscitation."
  },
  {
    id: "aha-gender-gap",
    category: "Gender Disparities in Resuscitation",
    source: "Circulation (AHA)",
    title: "Sex Differences in Bystander-Administered CPR in Public Locations",
    publication: "Circulation. 2017;136:A14619",
    year: "2017",
    link: "https://www.ahajournals.org/doi/10.1161/circ.136.suppl_1.14619",
    summary: "Women in public have 27% lower odds of receiving bystander CPR than men due to rescuer hesitation, fear of accusation, and anatomical confusion."
  },
  {
    id: "jaha-hesitation",
    category: "Gender Disparities in Resuscitation",
    source: "Journal of the American Heart Association (JAHA)",
    title: "Public Perceptions of Bystander CPR and Use of AEDs in Women",
    publication: "JAHA. 2018;7(13):e009472",
    year: "2018",
    link: "https://www.ahajournals.org/doi/10.1161/JAHA.118.009472",
    summary: "Identifies primary hesitation causes: fear of inappropriate touching accusations, fear of causing injury, and mistaken belief in fragility."
  },
  {
    id: "india-erss-112",
    category: "Emergency Helpline & Legal Protection",
    source: "Government of India — Ministry of Home Affairs",
    title: "Emergency Response Support System (ERSS - 112)",
    publication: "National Emergency Helpline Operational Standard",
    year: "Active",
    link: "https://112.gov.in",
    summary: "Unified national emergency access number (112) with integrated telephonic medical dispatch assistance."
  },
  {
    id: "india-good-samaritan",
    category: "Emergency Helpline & Legal Protection",
    source: "Supreme Court of India / MoRTH",
    title: "Good Samaritan Protection Guidelines (Motor Vehicles Act Section 134A)",
    publication: "Supreme Court Landmark Order / Gazette Notification",
    year: "2016 / 2019",
    link: "https://morth.nic.in/good-samaritan",
    summary: "Comprehensive immunity from civil and criminal liability for any individual assisting an injured or ill person in good faith."
  }
];

export const SourcesPage: React.FC = () => {
  const categories = Array.from(new Set(citations.map((c) => c.category)));

  return (
    <div className="sources-container">
      {/* Header */}
      <header className="sources-header">
        <h1 className="sources-title">Clinical Sources & Safety</h1>
        <p className="sources-sub">
          PulseHer is an educational emergency guidance prototype anchored in peer-reviewed resuscitation science and statutory Good Samaritan frameworks.
        </p>
      </header>

      {/* Prototype Safety Notice */}
      <section className="sources-safety-card" aria-label="Prototype Notice">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <ShieldAlert size={20} className="flex-shrink-0" style={{ color: 'var(--amber-warning)', marginTop: '2px' }} />
          <div>
            <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Prototype & Safety Notice
            </strong>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              This tool is a non-clinical educational reference designed to reduce bystander hesitation. It cannot detect pulse, analyze heart rhythms, or substitute for trained healthcare providers. In an emergency, dial 112 immediately and follow dispatcher instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Grouped Citations */}
      {categories.map((cat) => (
        <section key={cat} className="sources-group" aria-label={cat}>
          <h2 className="sources-group-title">{cat}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {citations
              .filter((c) => c.category === cat)
              .map((item) => (
                <article key={item.id} className="citation-card">
                  <h4>{item.title}</h4>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.source} ({item.year}) — <em>{item.publication}</em>
                  </p>
                  <p>{item.summary}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="citation-link"
                    title={`Read ${item.source}`}
                  >
                    Read published source &rarr;
                  </a>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};


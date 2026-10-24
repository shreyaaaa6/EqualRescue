import React from 'react';
import { Heart, ShieldCheck, CheckCircle2, Users, AlertCircle } from 'lucide-react';

export const WomenHesitationsPanel: React.FC = () => {
  return (
    <section className="hesitations-panel-card" aria-label="Helping a woman in a cardiac emergency">
      <div className="hesitations-panel-header">
        <div className="panel-title-group">
          <Heart size={22} className="text-rose-600 fill-rose-100" />
          <h2 className="panel-title">Helping a woman in a cardiac emergency</h2>
        </div>
        <span className="badge-clinical-reassurance">Evidence-Based Rescuer Guidance</span>
      </div>

      <p className="hesitations-lead">
        Research reveals bystanders often hesitate to help women during a cardiac arrest due to concerns about modesty, fear of inappropriate contact, or fear of injury. Overcome hesitation with these vital facts:
      </p>

      <div className="hesitations-points-list">
        {/* Point 1 */}
        <article className="hesitation-point-item">
          <div className="point-icon-box point-icon-green">
            <CheckCircle2 size={20} />
          </div>
          <div className="point-content">
            <h3 className="point-heading">Identical Technique</h3>
            <p className="point-description">
              The basic adult CPR technique is not different simply because the person is a woman.
            </p>
          </div>
        </article>

        {/* Point 2 */}
        <article className="hesitation-point-item">
          <div className="point-icon-box point-icon-rose">
            <ShieldCheck size={20} />
          </div>
          <div className="point-content">
            <h3 className="point-heading">Do Not Delay Care</h3>
            <p className="point-description">
              Do not delay life-saving assistance because you are worried about touching a woman's chest.
            </p>
          </div>
        </article>

        {/* Point 3 */}
        <article className="hesitation-point-item">
          <div className="point-icon-box point-icon-blue">
            <AlertCircle size={20} />
          </div>
          <div className="point-content">
            <h3 className="point-heading">Clothing & Bras</h3>
            <p className="point-description">
              You do not need to remove a woman's bra or expose her chest to begin chest compressions.
            </p>
          </div>
        </article>

        {/* Point 4 */}
        <article className="hesitation-point-item">
          <div className="point-icon-box point-icon-amber">
            <ShieldCheck size={20} />
          </div>
          <div className="point-content">
            <h3 className="point-heading">AED Use & Dignity</h3>
            <p className="point-description">
              If an AED is available, expose the chest only as needed to apply the pads correctly, preserve privacy where possible, and follow the AED's prompts. Do not delay CPR while looking for an AED.
            </p>
          </div>
        </article>

        {/* Point 5 */}
        <article className="hesitation-point-item">
          <div className="point-icon-box point-icon-purple">
            <Users size={20} />
          </div>
          <div className="point-content">
            <h3 className="point-heading">Team Coordination</h3>
            <p className="point-description">
              Ask someone nearby to call emergency services and bring an AED while you help, if possible.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

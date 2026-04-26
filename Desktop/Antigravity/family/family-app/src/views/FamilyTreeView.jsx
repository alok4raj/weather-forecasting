import { useFamily } from "../context/FamilyContext";
import MemberCard from "../components/MemberCard";

export default function FamilyTreeView({ searchResults, onMemberClick }) {
  const members = searchResults;

  // Group by generation in order
  const genOrder = ['gp', 'par', 'sib', 'kid'];
  const genLabels = {
    gp: '🌳 The Roots — Grandparents',
    par: '🏛️ The Pillars — Parents & Spouses',
    sib: '⚡ The Energy — Siblings, Cousins & Spouses',
    kid: '🌱 The Future — Kids',
  };

  const grouped = genOrder
    .map(gen => ({
      gen,
      label: genLabels[gen],
      members: members.filter(m => m.gen === gen),
    }))
    .filter(g => g.members.length > 0);

  if (members.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p>No family members found.</p>
      </div>
    );
  }

  return (
    <div className="family-tree-view">
      {grouped.map((group, idx) => (
        <div key={group.gen}>
          {/* Connector line between generations */}
          {idx > 0 && (
            <div className="tree-connector">
              <div className="tree-line-vertical" />
              <div className="tree-arrow">▼</div>
            </div>
          )}

          <div className="gen-band">
            <div className="gen-label">{group.label}</div>

            {/* Pair up couples side by side */}
            <div className="members-grid-tree">
              {group.members.map((member, i) => (
                <div key={member.id} className="tree-member-wrap">
                  <MemberCard member={member} onClick={onMemberClick} index={i} />
                  {/* Show a small "married to" connector for in-laws next to their spouse */}
                  {member.inlaw && i > 0 && group.members[i - 1] && !group.members[i - 1].inlaw && (
                    <div className="couple-connector">💍</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

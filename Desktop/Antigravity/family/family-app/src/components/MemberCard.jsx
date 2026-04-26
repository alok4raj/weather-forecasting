import { RELATIONS } from "../data/initialData";

const GEN_COLORS = {
  gp:  { bg: "var(--gen-gp-bg)",  text: "var(--gen-gp-text)" },
  par: { bg: "var(--gen-par-bg)", text: "var(--gen-par-text)" },
  sib: { bg: "var(--gen-sib-bg)", text: "var(--gen-sib-text)" },
  kid: { bg: "var(--gen-kid-bg)", text: "var(--gen-kid-text)" },
};
const INLAW_COLOR = { bg: "var(--gen-inlaw-bg)", text: "var(--gen-inlaw-text)" };

const isBirthdayToday = (dob) => {
  if (!dob) return false;
  const today = new Date();
  const d = new Date(dob);
  // Match month and date
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
};

export default function MemberCard({ member, onClick, index = 0 }) {
  const rel = RELATIONS[member.rel] || { hi: member.rel, en: member.rel };
  
  const colors = member.rel === "me"
    ? { bg: "var(--gen-me-bg)", text: "var(--gen-me-text)" }
    : member.inlaw ? INLAW_COLOR : (GEN_COLORS[member.gen] || GEN_COLORS.kid);

  const isBirthday = isBirthdayToday(member.dob);

  return (
    <div
      className={`member-card ${member.inlaw ? "inlaw" : ""} ${isBirthday ? "birthday-today" : ""}`}
      onClick={() => onClick(member)}
      style={{ animationDelay: `${index * 40}ms` }}
      tabIndex={0}
      role="button"
      aria-label={`View ${member.name}'s details`}
    >
      <div
        className="member-avatar"
        style={{ background: colors.bg, color: colors.text }}
      >
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="member-photo" />
        ) : (
          <span className="member-initials">{member.initials}</span>
        )}
      </div>
      <div className="member-name">{member.name}</div>
      <div className="member-rel-hi">{rel.hi}</div>
      <div className="member-rel-en">{rel.en}</div>
      <div className="member-city">📍 {member.city}</div>
      <div className="member-age">{member.age} yrs</div>
    </div>
  );
}

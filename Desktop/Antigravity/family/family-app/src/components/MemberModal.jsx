import { useState, useRef } from "react";
import { RELATIONS, GENERATIONS } from "../data/initialData";
import { useFamily } from "../context/FamilyContext";

const GEN_LABELS = {
  gp: "Grandparents", par: "Parents Generation",
  sib: "Siblings & Cousins", kid: "Kids",
};

export default function MemberModal({ member, onClose, onEdit }) {
  const { deleteMember, setPhoto } = useFamily();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileRef = useRef(null);

  if (!member) return null;

  const rel = RELATIONS[member.rel] || { hi: member.rel, en: member.rel };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Photo must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(member.id, reader.result);
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      deleteMember(member.id);
      onClose();
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const genColor = member.inlaw
    ? "var(--gen-inlaw-bg)"
    : `var(--gen-${member.gen}-bg)`;
  const genTextColor = member.inlaw
    ? "var(--gen-inlaw-text)"
    : `var(--gen-${member.gen}-text)`;

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-avatar-wrap">
          <div
            className="modal-avatar"
            style={{ background: genColor, color: genTextColor }}
            onClick={() => fileRef.current?.click()}
            title="Click to upload photo"
          >
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="modal-photo" />
            ) : (
              <span>{member.initials}</span>
            )}
            <div className="modal-avatar-overlay">📷</div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: "none" }}
          />
        </div>

        <h2 className="modal-name">{member.name}</h2>
        <div className="modal-rel-hi">{rel.hi}</div>
        <div className="modal-rel-en">{rel.en}</div>

        <div className="modal-details">
          <div className="modal-detail">
            <span className="modal-detail-icon">🎂</span>
            <span>Age: {member.age} years</span>
          </div>
          {member.dob && (
            <div className="modal-detail">
              <span className="modal-detail-icon">📅</span>
              <span>Born: {new Date(member.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          )}
          <div className="modal-detail">
            <span className="modal-detail-icon">📍</span>
            <span>City: {member.city}</span>
          </div>
        </div>

        <div className="modal-badge" style={{ background: genColor, color: genTextColor }}>
          {GEN_LABELS[member.gen] || member.gen}
          {member.inlaw && " • In-Law"}
        </div>

        <div className="modal-actions">
          <button className="btn btn-edit" onClick={() => onEdit(member)}>
            ✏️ Edit
          </button>
          <button
            className={`btn btn-delete ${confirmDelete ? "confirm" : ""}`}
            onClick={handleDelete}
          >
            {confirmDelete ? "⚠️ Confirm Delete?" : "🗑️ Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

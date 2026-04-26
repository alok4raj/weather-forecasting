import { useState, useRef, useEffect } from "react";
import { RELATIONS, generateInitials, generateId } from "../data/initialData";
import { useFamily } from "../context/FamilyContext";

const REL_OPTIONS = Object.entries(RELATIONS).map(([key, val]) => ({
  value: key,
  label: `${val.hi} — ${val.en}`,
}));

const GEN_OPTIONS = [
  { value: "gp", label: "Grandparents" },
  { value: "par", label: "Parents Generation" },
  { value: "sib", label: "Siblings & Cousins" },
  { value: "kid", label: "Kids" },
];

export default function AddMemberForm({ onClose, editingMember }) {
  const { addMember, editMember } = useFamily();
  const fileRef = useRef(null);
  const isEdit = !!editingMember;

  const [form, setForm] = useState({
    name: "",
    rel: "son",
    age: "",
    city: "",
    dob: "",
    gen: "kid",
    inlaw: false,
    photo: null,
  });

  useEffect(() => {
    if (editingMember) {
      setForm({
        name: editingMember.name,
        rel: editingMember.rel,
        age: editingMember.age,
        city: editingMember.city,
        dob: editingMember.dob || "",
        gen: editingMember.gen,
        inlaw: editingMember.inlaw || false,
        photo: editingMember.photo || null,
      });
    }
  }, [editingMember]);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Photo must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => handleChange("photo", reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.age) return;

    const memberData = {
      ...form,
      age: parseInt(form.age, 10),
      initials: generateInitials(form.name),
    };

    if (isEdit) {
      editMember({ ...memberData, id: editingMember.id });
    } else {
      addMember({ ...memberData, id: generateId() });
    }
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <h2 className="form-title">{isEdit ? "✏️ Edit Member" : "➕ Add New Member"}</h2>

        <form onSubmit={handleSubmit} className="member-form">
          {/* Photo */}
          <div className="form-photo-section">
            <div
              className="form-photo-preview"
              onClick={() => fileRef.current?.click()}
            >
              {form.photo ? (
                <img src={form.photo} alt="Preview" />
              ) : (
                <span className="form-photo-placeholder">📷<br />Upload</span>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              style={{ display: "none" }}
            />
          </div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="member-name">Name *</label>
            <input
              id="member-name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Age & City row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="member-age">Age *</label>
              <input
                id="member-age"
                type="number"
                min="0"
                max="120"
                value={form.age}
                onChange={(e) => handleChange("age", e.target.value)}
                placeholder="Age"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="member-city">City *</label>
              <input
                id="member-city"
                type="text"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
                required
              />
            </div>
          </div>

          {/* DOB */}
          <div className="form-group">
            <label htmlFor="member-dob">Birth Date (Optional)</label>
            <input
              id="member-dob"
              type="date"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>

          {/* Relation */}
          <div className="form-group">
            <label htmlFor="member-rel">Relation</label>
            <select
              id="member-rel"
              value={form.rel}
              onChange={(e) => handleChange("rel", e.target.value)}
            >
              {REL_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Generation */}
          <div className="form-group">
            <label htmlFor="member-gen">Generation</label>
            <select
              id="member-gen"
              value={form.gen}
              onChange={(e) => handleChange("gen", e.target.value)}
            >
              {GEN_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>

          {/* In-law toggle */}
          <div className="form-group form-checkbox">
            <label>
              <input
                type="checkbox"
                checked={form.inlaw}
                onChange={(e) => handleChange("inlaw", e.target.checked)}
              />
              <span>This person is an in-law</span>
            </label>
          </div>

          <button type="submit" className="btn btn-submit">
            {isEdit ? "Save Changes" : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
}

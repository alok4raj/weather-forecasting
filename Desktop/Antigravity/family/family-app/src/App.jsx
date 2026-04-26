import { useState, useMemo } from "react";
import { useFamily } from "./context/FamilyContext";
import { RELATIONS } from "./data/initialData";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import NavTabs from "./components/NavTabs";
import MemberModal from "./components/MemberModal";
import AddMemberForm from "./components/AddMemberForm";
import FamilyTreeView from "./views/FamilyTreeView";
import GalleryView from "./views/GalleryView";
import TimelineView from "./views/TimelineView";
import AllRelationsView from "./views/AllRelationsView";
import MapView from "./views/MapView";
import BirthdayView from "./views/BirthdayView";

export default function App() {
  const { members } = useFamily();
  const [activeTab, setActiveTab] = useState("tree");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return members;
    const q = searchQuery.toLowerCase();
    return members.filter((m) => {
      const rel = RELATIONS[m.rel] || { hi: "", en: "" };
      return (
        m.name.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        rel.en.toLowerCase().includes(q) ||
        rel.hi.includes(q)
      );
    });
  }, [members, searchQuery]);

  const handleMemberClick = (member) => setSelectedMember(member);

  const handleEdit = (member) => {
    setSelectedMember(null);
    setEditingMember(member);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingMember(null);
  };

  const renderView = () => {
    switch (activeTab) {
      case "tree":
        return <FamilyTreeView searchResults={searchResults} onMemberClick={handleMemberClick} />;
      case "gallery":
        return <GalleryView searchResults={searchResults} onMemberClick={handleMemberClick} />;
      case "timeline":
        return <TimelineView />;
      case "relations":
        return <AllRelationsView searchResults={searchResults} onMemberClick={handleMemberClick} />;
      case "map":
        return <MapView searchResults={searchResults} />;
      case "birthdays":
        return <BirthdayView />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <StatCards />

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "var(--gen-gp-bg)", borderColor: "var(--gen-gp-text)" }} />
          Grandparents
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "var(--gen-par-bg)", borderColor: "var(--gen-par-text)" }} />
          Parents
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "var(--gen-me-bg)", borderColor: "var(--gen-me-text)" }} />
          Myself
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "var(--gen-sib-bg)", borderColor: "var(--gen-sib-text)" }} />
          Siblings/Cousins
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "var(--gen-kid-bg)", borderColor: "var(--gen-kid-text)" }} />
          Kids
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "var(--gen-inlaw-bg)", borderColor: "var(--gen-inlaw-text)" }} />
          In-Laws
        </div>
      </div>

      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-heart">♥</div>
        <p>{members.length} Hearts • One Family • Forever Together</p>
        <p className="footer-hint">Click any member card to view details</p>
      </footer>

      {/* FAB — Add Member */}
      <button
        className="fab"
        onClick={() => setShowAddForm(true)}
        aria-label="Add new family member"
        title="Add Member"
      >
        <span>+</span>
      </button>

      {/* Modals */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onEdit={handleEdit}
        />
      )}
      {showAddForm && (
        <AddMemberForm
          onClose={handleCloseForm}
          editingMember={editingMember}
        />
      )}
    </div>
  );
}

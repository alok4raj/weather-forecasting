const TABS = [
  { id: "tree", label: "Family Tree", icon: "🌳" },
  { id: "map", label: "Family Map", icon: "🗺️" },
  { id: "gallery", label: "Gallery", icon: "📸" },
  { id: "timeline", label: "Timeline", icon: "⌛" },
  { id: "birthdays", label: "Birthdays", icon: "🎂" },
  { id: "relations", label: "All Relations", icon: "👥" },
];

export default function NavTabs({ activeTab, onTabChange }) {
  return (
    <nav className="nav-tabs" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          id={`tab-${tab.id}`}
        >
          <span className="nav-tab-icon">{tab.icon}</span>
          <span className="nav-tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

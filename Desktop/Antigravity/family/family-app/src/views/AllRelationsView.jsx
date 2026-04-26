import { useState, useMemo } from "react";
import FilterBar from "../components/FilterBar";
import MemberCard from "../components/MemberCard";
import BirthdayWidget from "../components/BirthdayWidget";

export default function AllRelationsView({ searchResults, onMemberClick, query }) {
  const [activeGen, setActiveGen] = useState(null);
  const [activeCity, setActiveCity] = useState(null);
  const [activeRel, setActiveRel] = useState(null);
  const [sortBy, setSortBy] = useState("name");

  let filtered = searchResults;
  if (activeGen) filtered = filtered.filter((m) => m.gen === activeGen);
  if (activeCity) filtered = filtered.filter((m) => m.city === activeCity);
  if (activeRel) filtered = filtered.filter((m) => m.rel === activeRel);

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "age") return a.age - b.age;
    if (sortBy === "city") return a.city.localeCompare(b.city);
    return 0;
  });

  return (
    <div className="all-relations-view">
      {!query && <BirthdayWidget />}
      
      <FilterBar
        members={searchResults}
        activeGen={activeGen}
        setActiveGen={setActiveGen}
        activeCity={activeCity}
        setActiveCity={setActiveCity}
        activeRel={activeRel}
        setActiveRel={setActiveRel}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="filter-result-count">
        Showing {filtered.length} of {searchResults.length} members
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>No members match the selected filters.</p>
        </div>
      ) : (
        <div className="members-grid">
          {filtered.map((m, i) => (
            <MemberCard key={m.id} member={m} onClick={onMemberClick} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

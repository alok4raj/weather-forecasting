import { RELATIONS } from "../data/initialData";

export default function FilterBar({
  members,
  activeGen,
  setActiveGen,
  activeCity,
  setActiveCity,
  activeRel,
  setActiveRel,
  sortBy,
  setSortBy,
}) {
  const gens = [...new Set(members.map((m) => m.gen))];
  const cities = [...new Set(members.map((m) => m.city))].sort();
  const rels = [...new Set(members.map((m) => m.rel))];

  const genLabels = { gp: "Grandparents", par: "Parents", sib: "Siblings", kid: "Kids" };

  return (
    <div className="filter-bar">
      {/* Generation filters */}
      <div className="filter-group">
        <span className="filter-label">Generation</span>
        <div className="filter-chips">
          <button
            className={`filter-chip ${!activeGen ? "active" : ""}`}
            onClick={() => setActiveGen(null)}
          >All</button>
          {gens.map((g) => (
            <button
              key={g}
              className={`filter-chip ${activeGen === g ? "active" : ""}`}
              onClick={() => setActiveGen(activeGen === g ? null : g)}
            >
              {genLabels[g] || g}
            </button>
          ))}
        </div>
      </div>

      {/* City filters */}
      <div className="filter-group">
        <span className="filter-label">City</span>
        <div className="filter-chips">
          <button
            className={`filter-chip ${!activeCity ? "active" : ""}`}
            onClick={() => setActiveCity(null)}
          >All</button>
          {cities.map((c) => (
            <button
              key={c}
              className={`filter-chip ${activeCity === c ? "active" : ""}`}
              onClick={() => setActiveCity(activeCity === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Relation filters */}
      <div className="filter-group">
        <span className="filter-label">Relation</span>
        <div className="filter-chips">
          <button
            className={`filter-chip ${!activeRel ? "active" : ""}`}
            onClick={() => setActiveRel(null)}
          >All</button>
          {rels.map((r) => {
            const rel = RELATIONS[r] || { hi: r, en: r };
            return (
              <button
                key={r}
                className={`filter-chip ${activeRel === r ? "active" : ""}`}
                onClick={() => setActiveRel(activeRel === r ? null : r)}
              >
                {rel.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="filter-group">
        <span className="filter-label">Sort by</span>
        <div className="filter-chips">
          {["name", "age", "city"].map((s) => (
            <button
              key={s}
              className={`filter-chip ${sortBy === s ? "active" : ""}`}
              onClick={() => setSortBy(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

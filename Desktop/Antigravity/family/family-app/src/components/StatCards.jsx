import { useEffect, useRef } from "react";
import { useFamily } from "../context/FamilyContext";

function AnimatedNumber({ target, duration = 1500 }) {
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 30)));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      if (ref.current) ref.current.textContent = start;
      if (start >= target) clearInterval(timer);
    }, 30);
    return () => {
      clearInterval(timer);
      if (ref.current) ref.current.textContent = 0;
    };
  }, [target, duration]);

  return <span ref={ref} className="stat-number">0</span>;
}

export default function StatCards() {
  const { members } = useFamily();

  const total = members.length;
  const generations = new Set(members.map((m) => m.gen)).size;
  const cities = new Set(members.map((m) => m.city)).size;
  const relations = new Set(members.map((m) => m.rel)).size;

  const stats = [
    { value: total, label: "Total Members", icon: "👨‍👩‍👧‍👦", color: "var(--accent-red)" },
    { value: generations, label: "Generations", icon: "🌳", color: "var(--accent-orange)" },
    { value: cities, label: "Cities", icon: "🏙️", color: "var(--accent-green)" },
    { value: relations, label: "Relation Types", icon: "🤝", color: "var(--accent-blue)" },
  ];

  return (
    <div className="stat-cards">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-icon">{s.icon}</div>
          <AnimatedNumber target={s.value} />
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

import { TIMELINE_DATA } from "../data/initialData";

export default function TimelineView() {
  return (
    <div className="timeline-view">
      <div className="timeline">
        {TIMELINE_DATA.map((item, i) => (
          <div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="timeline-dot">{item.emoji}</div>
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-card">
                <p className="timeline-event">{item.event}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

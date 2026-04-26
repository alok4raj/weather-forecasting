import React, { useMemo } from 'react';
import { useFamily } from '../context/FamilyContext';

export default function BirthdayWidget() {
  const { members } = useFamily();

  const birthdayData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const processed = members
      .filter(m => m.dob)
      .map(m => {
        const dob = new Date(m.dob);
        let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        
        if (nextBirthday < today) {
          nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const diffTime = nextBirthday.getTime() - today.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        
        return { ...m, diffDays, nextBirthday };
      })
      .sort((a, b) => a.diffDays - b.diffDays);

    const todayBDays = processed.filter(m => m.diffDays === 0);
    const upcomingBDays = processed.filter(m => m.diffDays > 0 && m.diffDays <= 31);

    return { todayBDays, upcomingBDays };
  }, [members]);

  const { todayBDays, upcomingBDays } = birthdayData;

  if (todayBDays.length === 0 && upcomingBDays.length === 0) return null;

  return (
    <div className="birthday-widget-container">
      {/* Today's Special Spotlight */}
      {todayBDays.length > 0 && (
        <div className="birthday-today-spotlight">
          <div className="spotlight-content">
            <div className="spotlight-icon">🎉</div>
            <div className="spotlight-text">
              <h4>Happy Birthday!</h4>
              <div className="celebrants">
                {todayBDays.map(m => (
                  <span key={m.id} className="celebrant-name">
                    {m.name} {todayBDays.length > 1 ? "• " : ""}
                  </span>
                ))}
              </div>
              <p>Wishing you a wonderful day filled with joy and laughter!</p>
            </div>
            <div className="spotlight-confetti">✨🎊🎈</div>
          </div>
        </div>
      )}

      {/* Upcoming List */}
      {upcomingBDays.length > 0 && (
        <div className="birthday-widget">
          <div className="widget-header">
            <h3>📅 Upcoming Birthdays</h3>
            <span className="month-tag">{new Date().toLocaleDateString('en-GB', { month: 'long' })}</span>
          </div>
          <div className="birthday-list">
            {upcomingBDays.map(m => (
              <div key={m.id} className="birthday-card">
                <div className="bday-avatar">
                  {m.photo ? <img src={m.photo} alt={m.name} /> : <span>{m.initials}</span>}
                </div>
                <div className="bday-info">
                  <span className="bday-name">{m.name}</span>
                  <span className="bday-date">
                    🎂 {new Date(m.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <div className="bday-days">
                  {m.diffDays === 1 ? "Tomorrow" : `in ${m.diffDays} days`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

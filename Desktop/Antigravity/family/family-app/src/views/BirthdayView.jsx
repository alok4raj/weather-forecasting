import React, { useMemo } from 'react';
import { useFamily } from '../context/FamilyContext';

export default function BirthdayView() {
  const { members } = useFamily();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const groupedBirthdays = useMemo(() => {
    const groups = months.map((month, index) => ({
      name: month,
      index,
      birthdays: []
    }));

    members.filter(m => m.dob).forEach(m => {
      const dob = new Date(m.dob);
      const monthIndex = dob.getMonth();
      groups[monthIndex].birthdays.push({
        ...m,
        day: dob.getDate(),
        month: months[monthIndex]
      });
    });

    // Sort birthdays within each month by day
    groups.forEach(g => {
      g.birthdays.sort((a, b) => a.day - b.day);
    });

    return groups.filter(g => g.birthdays.length > 0);
  }, [members]);

  return (
    <div className="birthday-view">
      <header className="view-header">
        <h2>🎂 Family Birthdays</h2>
        <p>A full calendar of celebrations across the year.</p>
      </header>

      <div className="birthday-months-grid">
        {groupedBirthdays.map(group => (
          <div key={group.name} className="month-section">
            <h3 className="month-title">{group.name}</h3>
            <div className="month-birthdays">
              {group.birthdays.map(bday => (
                <div key={bday.id} className="bday-row">
                  <span className="bday-day-circle">{bday.day}</span>
                  <div className="bday-row-info">
                    <span className="bday-row-name">{bday.name}</span>
                    <span className="bday-row-rel">{bday.city}</span>
                  </div>
                  <span className="bday-row-age">{bday.age}y</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import fs from 'fs';

let content = fs.readFileSync('src/data/initialData.js', 'utf-8');

const currentYear = new Date().getFullYear(); // 2026

content = content.replace(/age:\s*(\d+)(.*?)\s*}/g, (match, age, rest) => {
  if (match.includes('dob:')) return match;
  
  const birthYear = currentYear - parseInt(age);
  let month = Math.floor(Math.random() * 12) + 1;
  let day = Math.floor(Math.random() * 28) + 1;
  
  const m = month.toString().padStart(2, '0');
  const d = day.toString().padStart(2, '0');
  const dobStr = birthYear + '-' + m + '-' + d;
  
  return 'age: ' + age + rest + ', dob: "' + dobStr + '" }';
});

// Force Alok to have a birthday in 5 days
const today = new Date();
today.setDate(today.getDate() + 5);
const alokDob = (2026 - 26) + '-' + (today.getMonth()+1).toString().padStart(2,'0') + '-' + today.getDate().toString().padStart(2,'0');
content = content.replace(/(name: "Alok".*?)dob: "\d{4}-\d{2}-\d{2}"/, '$1dob: "' + alokDob + '"');

fs.writeFileSync('src/data/initialData.js', content, 'utf-8');
console.log('DOB added successfully');

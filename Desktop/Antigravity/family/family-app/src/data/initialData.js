// Relations map — Hindi + English
export const RELATIONS = {
  grandfather: { hi: "दादा जी", en: "Grandfather" },
  grandmother: { hi: "दादी जी", en: "Grandmother" },
  father: { hi: "पिता जी", en: "Father" },
  mother: { hi: "माता जी", en: "Mother" },
  wife: { hi: "पत्नी", en: "Wife" },
  husband: { hi: "पति", en: "Husband" },
  uncle_tau: { hi: "ताऊ जी", en: "Uncle (Elder)" },
  aunt_tai: { hi: "ताई जी", en: "Aunt (Elder's Wife)" },
  uncle_chacha: { hi: "चाचा जी", en: "Uncle (Younger)" },
  aunt_chachi: { hi: "चाची जी", en: "Aunt (Younger's Wife)" },
  bua: { hi: "बुआ जी", en: "Aunt (Father's Sister)" },
  fufa: { hi: "फूफा जी", en: "Uncle (Father's Sister's Husband)" },
  bhaiya: { hi: "भैया", en: "Bhaiya" },
  brother: { hi: "भाई", en: "Bhai" },
  sister: { hi: "बहन", en: "Bahan" },
  bhabhi: { hi: "भाभी", en: "Bhabhi" },
  jija: { hi: "जीजा जी", en: "Jija" },
  devar: { hi: "देवर", en: "Devar" },
  nanad: { hi: "ननद", en: "Nanad" },
  sala: { hi: "साला", en: "Sala" },
  sali: { hi: "साली", en: "Sali" },
  bahu: { hi: "बहू", en: "Bahu" },
  damad: { hi: "दामाद", en: "Damad" },
  cousin_bhai: { hi: "भाई", en: "Bhai" },
  cousin_behen: { hi: "बहन", en: "Bahan" },
  son: { hi: "बेटा", en: "Son" },
  daughter: { hi: "बेटी", en: "Daughter" },
  nephew: { hi: "भतीजा / भांजा", en: "Nephew" },
  niece: { hi: "भतीजी / भांजी", en: "Niece" },
  bhatija: { hi: "भतीजा", en: "Nephew" },
  bhatiji: { hi: "भतीजी", en: "Niece" },
  bhanja: { hi: "भांजा", en: "Nephew" },
  bhanji: { hi: "भांजी", en: "Niece" },
  bade_papa: { hi: "बड़े पापा", en: "Bade Papa" },
  badi_mummy: { hi: "बड़ी मम्मी", en: "Badi Mummy" },
  nuncha: { hi: "नूंचा", en: "Uncle (Nuncha)" },
  me: { hi: "मैं", en: "Me" },
};

// Generation config
export const GENERATIONS = {
  gp: { label: "The Roots — Grandparents", order: 0 },
  par: { label: "The Pillars — Parents & Spouses", order: 1 },
  sib: { label: "The Energy — Siblings, Cousins & Spouses", order: 2 },
  kid: { label: "The Future — Kids", order: 3 },
};

// Initial family members — Modi-Barnwal Family

// City Coordinates for Map
export const CITY_COORDINATES = {
  "Chano": [24.2704, 85.8691],
  "Muraidih": [23.77, 86.25],
  "Tamluk": [22.29, 87.92],
  "Jhumri Telaiya": [24.43, 85.53],
  "Ranchi": [23.34, 85.30],
  "New Delhi": [28.61, 77.20],
  "Asansol": [23.67, 86.95],
  "Kolkata": [22.57, 88.36],
  "Gurgaon": [28.45, 77.02],
  "Dhanbad": [23.79, 86.43]
};

export const INITIAL_MEMBERS = [
  // ═══ Grandparents ═══
  { id: "m1", name: "Bhuneshwar Modi", rel: "grandfather", age: 92, city: "Chano", initials: "BM", gen: "gp", photo: null, dob: "1934-01-01", spouseId: "m2" },
  { id: "m2", name: "Chameli Devi", rel: "grandmother", age: 89, city: "Chano", initials: "CD", gen: "gp", photo: null, dob: "1937-01-01", spouseId: "m1" },

  // ═══ Parents Generation ═══
  // Kedar Modi & Tara Devi
  { id: "m3", name: "Kedar Modi", rel: "bade_papa", age: 66, city: "Chano", initials: "KM", gen: "par", photo: null, dob: "1960-01-01", spouseId: "m4", parents: ["m1", "m2"] },
  { id: "m4", name: "Tara Devi", rel: "badi_mummy", age: 63, city: "Chano", initials: "TD", gen: "par", photo: null, inlaw: true, dob: "1963-01-01", spouseId: "m3" },

  // Mahendra Modi & Leela Kant
  { id: "m5", name: "Mahendra Modi", rel: "father", age: 58, city: "Muraidih", initials: "MM", gen: "par", photo: null, dob: "1968-10-24", spouseId: "m6", parents: ["m1", "m2"] },
  { id: "m6", name: "Leela Kant", rel: "mother", age: 52, city: "Muraidih", initials: "LK", gen: "par", photo: null, inlaw: true, dob: "1974-06-14", spouseId: "m5" },

  // Binod Barnwal & Guddi Barnwal
  { id: "m8", name: "Binod Barnwal", rel: "uncle_chacha", age: 54, city: "Muraidih", initials: "BB", gen: "par", photo: null, dob: "1972-01-01", spouseId: "m7", parents: ["m1", "m2"] },
  { id: "m7", name: "Guddi Barnwal", rel: "aunt_chachi", age: 48, city: "Muraidih", initials: "GB", gen: "par", photo: null, inlaw: true, dob: "1978-01-01", spouseId: "m8" },

  // Santosh Barnwal & Savita Barnwal
  { id: "m9", name: "Santosh Barnwal", rel: "uncle_chacha", age: 48, city: "Tamluk", initials: "SB", gen: "par", photo: null, dob: "1978-08-10", spouseId: "m10", parents: ["m1", "m2"] },
  { id: "m10", name: "Savita Barnwal", rel: "aunt_chachi", age: 40, city: "Tamluk", initials: "SV", gen: "par", photo: null, inlaw: true, dob: "1986-02-20", spouseId: "m9" },

  // Vinay Barnwal & Sanju Barnwal
  { id: "m11", name: "Vinay Barnwal", rel: "nuncha", age: 42, city: "Jhumri Telaiya", initials: "VB", gen: "par", photo: null, dob: "1984-08-05", spouseId: "m12", parents: ["m1", "m2"] },
  { id: "m12", name: "Sanju Barnwal", rel: "aunt_chachi", age: 37, city: "Jhumri Telaiya", initials: "SJ", gen: "par", photo: null, inlaw: true, dob: "1989-10-15", spouseId: "m11" },

  // ═══ Siblings & Cousins Generation ═══
  { id: "m13", name: "Sandeep Surya", rel: "bhaiya", age: 40, city: "Ranchi", initials: "SS", gen: "sib", photo: null, dob: "1986-09-03", spouseId: "m14", parents: ["m3", "m4"] },
  { id: "m14", name: "Neelam Barnwal", rel: "bhabhi", age: 35, city: "Ranchi", initials: "NB", gen: "sib", photo: null, inlaw: true, dob: "1991-01-20", spouseId: "m13" },
  { id: "m15", name: "Rajnesh Ranjan", rel: "bhaiya", age: 37, city: "Jhumri Telaiya", initials: "RR", gen: "sib", photo: null, dob: "1989-06-16", spouseId: "m16", parents: ["m3", "m4"] },
  { id: "m16", name: "Soni Kumari", rel: "bhabhi", age: 32, city: "Jhumri Telaiya", initials: "SK", gen: "sib", photo: null, inlaw: true, dob: "1994-08-06", spouseId: "m15" },
  { id: "m17", name: "Nitish Nirala", rel: "bhaiya", age: 34, city: "New Delhi", initials: "NN", gen: "sib", photo: null, dob: "1992-09-11", spouseId: "m18", parents: ["m3", "m4"] },
  { id: "m18", name: "Sonam Barnwal", rel: "bhabhi", age: 30, city: "New Delhi", initials: "SM", gen: "sib", photo: null, inlaw: true, dob: "1996-01-01", spouseId: "m17" },
  { id: "m19", name: "Roshni Vikrant", rel: "sister", age: 32, city: "Asansol", initials: "RV", gen: "sib", photo: null, dob: "1994-05-28", spouseId: "m20", parents: ["m3", "m4"] },
  { id: "m20", name: "Niraj Barnwal", rel: "jija", age: 36, city: "Asansol", initials: "NR", gen: "sib", photo: null, inlaw: true, dob: "1990-01-01", spouseId: "m19" },
  { id: "m21", name: "Rashmi Vikrant", rel: "sister", age: 29, city: "Kolkata", initials: "RK", gen: "sib", photo: null, dob: "1997-08-11", spouseId: "m22", parents: ["m3", "m4"] },
  { id: "m22", name: "Rajan Kumar", rel: "jija", age: 32, city: "Kolkata", initials: "RJ", gen: "sib", photo: null, inlaw: true, dob: "1994-01-05", spouseId: "m21" },
  { id: "m23", name: "Alok", rel: "me", age: 26, city: "Gurgaon", initials: "AK", gen: "sib", photo: null, dob: "2000-05-26", parents: ["m5", "m6"] },
  { id: "m24", name: "Pritam", rel: "cousin_bhai", age: 23, city: "New Delhi", initials: "PT", gen: "sib", photo: null, dob: "2003-07-22", parents: ["m8", "m7"] },
  { id: "m25", name: "Priyanshu", rel: "cousin_bhai", age: 20, city: "Kolkata", initials: "PY", gen: "sib", photo: null, dob: "2006-04-18", parents: ["m8", "m7"] },
  { id: "m26", name: "Princy", rel: "cousin_behen", age: 18, city: "Dhanbad", initials: "PC", gen: "sib", photo: null, dob: "2008-07-13", parents: ["m8", "m7"] },
  { id: "m27", name: "Nayanshi", rel: "cousin_behen", age: 17, city: "Tamluk", initials: "NY", gen: "sib", photo: null, dob: "2009-01-21", parents: ["m9", "m10"] },
  { id: "m28", name: "Jayshree", rel: "cousin_bhai", age: 14, city: "Tamluk", initials: "JY", gen: "sib", photo: null, dob: "2012-01-16", parents: ["m9", "m10"] },
  { id: "m29", name: "Aditya", rel: "cousin_bhai", age: 14, city: "Jhumri Telaiya", initials: "AD", gen: "sib", photo: null, dob: "2012-10-24", parents: ["m11", "m12"] },
  { id: "m30", name: "Naman", rel: "cousin_bhai", age: 11, city: "Jhumri Telaiya", initials: "NM", gen: "sib", photo: null, dob: "2015-01-01", parents: ["m11", "m12"] },

  // ═══ Kids Generation ═══
  { id: "m31", name: "Rishika", rel: "bhatiji", age: 14, city: "Ranchi", initials: "RI", gen: "kid", photo: null, dob: "2012-12-08", parents: ["m13", "m14"] },
  { id: "m32", name: "Parth", rel: "bhatija", age: 9, city: "Ranchi", initials: "PA", gen: "kid", photo: null, dob: "2017-03-01", parents: ["m13", "m14"] },
  { id: "m33", name: "Shivanya", rel: "bhanji", age: 5, city: "Asansol", initials: "SY", gen: "kid", photo: null, dob: "2021-12-08", parents: ["m19", "m20"] },
  { id: "m34", name: "Shivansh", rel: "bhatija", age: 8, city: "Jhumri Telaiya", initials: "SH", gen: "kid", photo: null, dob: "2018-01-01", parents: ["m15", "m16"] },
  { id: "m35", name: "Babu", rel: "bhatiji", age: 3, city: "Jhumri Telaiya", initials: "BA", gen: "kid", photo: null, dob: "2023-01-01", parents: ["m15", "m16"] },
];

// Timeline milestones
export const TIMELINE_DATA = [
  // 1950s - 1970s
  { year: "1959", event: "Bhuneshwar Modi & Chameli Devi got married — the family began.", emoji: "💍" },
  { year: "1960", event: "Kedar Modi born — the first child arrives.", emoji: "👶" },
  { year: "1968", event: "Mahendra Modi born — second son joins the family.", emoji: "👶" },
  { year: "1973", event: "Binod Barnwal born — third son joins the family.", emoji: "👶" },
  { year: "1978", event: "Santosh Barnwal born — fourth son joins the family.", emoji: "👶" },

  // 1980s
  { year: "1980", event: "Kedar Modi & Tara Devi got married.", emoji: "💍" },
  { year: "1984", event: "Vinay Barnwal born — the youngest of the five.", emoji: "👶" },
  { year: "1986", event: "Sandeep Surya born — first grandchild!", emoji: "🌟" },
  { year: "1989", event: "Mahendra Modi & Leela Kant got married.", emoji: "💍" },
  { year: "1989", event: "Rajnish Ranjan born.", emoji: "👶" },

  // 1990s
  { year: "1992", event: "Nitish Nirala born.", emoji: "👶" },
  { year: "1994", event: "Roshni Vikrant born.", emoji: "👶" },
  { year: "1997", event: "Rashmi Vikrant born.", emoji: "👶" },
  { year: "1998", event: "Binod Barnwal & Guddi Barnwal got married.", emoji: "💍" },

  // 2000s
  { year: "2000", event: "Alok born — the millennium baby!", emoji: "🌟" },
  { year: "2003", event: "Pritam born.", emoji: "👶" },
  { year: "2006", event: "Priyanshu born.", emoji: "👶" },
  { year: "2008", event: "Princy born.", emoji: "👶" },
  { year: "2008", event: "Santosh Barnwal & Savita Barnwal got married.", emoji: "💍" },
  { year: "2009", event: "Nayanshi born.", emoji: "👶" },

  // 2010s
  { year: "2010", event: "Vinay Barnwal & Sanju Barnwal got married.", emoji: "💍" },
  { year: "2011", event: "Sandeep Surya & Neelam Barnwal got married.", emoji: "💍" },
  { year: "2011", event: "Aditya & Jayshree born — Two in one year!", emoji: "🎉" },
  { year: "2013", event: "Rishika born — next generation begins.", emoji: "👶" },
  { year: "2015", event: "Naman born.", emoji: "👶" },
  { year: "2016", event: "Rajnesh Ranjan & Soni Kumari got married.", emoji: "💍" },
  { year: "2017", event: "Parth born.", emoji: "🌟" },
  { year: "2018", event: "Roshni Vikrant & Niraj Barnwal got married.", emoji: "💍" },
  { year: "2018", event: "Shivansh born.", emoji: "👶" },

  // 2020s
  { year: "2021", event: "Shivanya born.", emoji: "👶" },
  { year: "2023", event: "Rashmi Vikrant & Rajan Kumar got married.", emoji: "💍" },
  { year: "2023", event: "Babu born — youngest member of the family.", emoji: "🍼" },
  { year: "2025", event: "Nitish Nirala & Sonam Barnwal got married.", emoji: "💍" },

  // Present
  { year: "2026", event: "35 members strong — our digital family tree lives forever.", emoji: "🌳" },
];

// Helper: generate initials from name
export function generateInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Helper: generate unique ID
export function generateId() {
  return "m" + Date.now() + Math.random().toString(36).slice(2, 6);
}

// Data version — bump this to force localStorage reset when data changes
export const DATA_VERSION = 27;

// General Family Photos (Group photos, memories, etc.)
export const GALLERY_PHOTOS = [
  { id: "p1", src: "/2000memory.jpg", caption: "Family Memory 2000" },
  { id: "p2", src: "/2002_photos_of_mahenra_family.jpg", caption: "Mahendra Family (2002)" },
  { id: "p3", src: "/chathpuja2006.jpg", caption: "Chhath Puja 2006" },
  { id: "p4", src: "/roshniEngagement2018.jpg", caption: "Roshni's Engagement (2018)" },
  { id: "p5", src: "/2019Karwachauth.jpg", caption: "Karwa Chauth 2019" },
  { id: "p6", src: "/2019march.jpg", caption: "Family Memory (March 2019)" },
  { id: "p7", src: "/2019priyanshubirthday.jpg", caption: "Priyanshu's Birthday 2019" },
  { id: "p8", src: "/2021 chitahi dham.jpg", caption: "Chitahi Dham Trip 2021" },
  { id: "p9", src: "/chahthpuja2021 3.jpg", caption: "Chhath Puja 2021" },
  { id: "p10", src: "/chath2021.jpg", caption: "Chhath Puja 2021" },
  { id: "p11", src: "/chathpuja2021.jpg", caption: "Chhath Puja 2021" },
  { id: "p12", src: "/chathpuja_2021 (2).jpg", caption: "Chhath Puja 2021" },
  { id: "p13", src: "/chathpuja_2021.jpg", caption: "Chhath Puja 2021" },
  { id: "p14", src: "/nayanshibirthday21 an.jpg", caption: "Nayanshi's Birthday 2021" },
  { id: "p15", src: "/roshniandshivanya.jpg", caption: "Roshni & Shivanya" },
  { id: "p16", src: "/roshniengagement.jpg", caption: "Roshni's Engagement" },
  { id: "p17", src: "/rashmiemgagement.jpg", caption: "Rashmi's Engagement" },
  { id: "p18", src: "/rashmiemgagement2.jpg", caption: "Rashmi's Engagement (2)" },
  { id: "p19", src: "/rashmiemgagement3.jpg", caption: "Rashmi's Engagement (3)" },
  { id: "p20", src: "/rashmiemgagement4.jpg", caption: "Rashmi's Engagement (4)" },
  { id: "p21", src: "/rashmiemgagement5.jpg", caption: "Rashmi's Engagement (5)" },
  { id: "p22", src: "/rashmiemgagement6.jpg", caption: "Rashmi's Engagement (6)" },
  { id: "p23", src: "/rashmi marriage.jpg", caption: "Rashmi's Marriage" },
  { id: "p24", src: "/2023holi.jpg", caption: "Holi Celebration 2023" },
  { id: "p25", src: "/NitishEngagement.jpg", caption: "Nitish's Engagement" },
  { id: "p26", src: "/2025picnic.jpg", caption: "Family Picnic 2025" },
  { id: "p27", src: "/durgapuja2025.jpg", caption: "Durga Puja 2025" },
  { id: "p28", src: "/fullfamily.jpg", caption: "Full Family Gathering" },
  { id: "p29", src: "/fullfamily (2).jpg", caption: "Full Family Gathering (2)" },
  { id: "p30", src: "/chano.jpg", caption: "Memories at Chano" },
  { id: "p31", src: "/mahilamandal.jpg", caption: "Mahila Mandal Gathering" },
];

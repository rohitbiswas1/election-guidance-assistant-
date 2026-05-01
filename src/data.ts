// Knowledge base for the Election Assistant
// Focused on Indian elections (ECI) — first-time voter persona

export const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry", "Chandigarh",
];

export type FAQ = {
  q: string;
  a: string;
  tags: string[];
};

export const FAQS: FAQ[] = [
  {
    q: "What is the minimum age to vote in India?",
    a: "You must be 18 years or older on the qualifying date (1st January of the year of revision of the electoral roll) to register and vote.",
    tags: ["age", "eligibility", "registration"],
  },
  {
    q: "What is a Voter ID / EPIC card?",
    a: "EPIC stands for Elector Photo Identity Card. It is issued by the Election Commission of India (ECI) and serves as proof of identity for voting. Each card has a unique 10-character EPIC number.",
    tags: ["epic", "voter id", "card"],
  },
  {
    q: "How do I register as a voter online?",
    a: "Visit the National Voters' Service Portal (voters.eci.gov.in), create an account, and submit Form 6 along with proof of age, identity, and address. You will receive a reference ID to track your application.",
    tags: ["registration", "form 6", "online"],
  },
  {
    q: "Can I vote without a Voter ID card?",
    a: "Yes. If your name is on the electoral roll, you can vote using any ECI-approved alternative ID such as Aadhaar, Passport, Driving Licence, PAN, or MGNREGA Job Card.",
    tags: ["voter id", "alternative", "voting"],
  },
  {
    q: "How can I check if my name is on the electoral roll?",
    a: "Go to electoralsearch.eci.gov.in and search by EPIC number, mobile, or your details (name, DOB, state, district).",
    tags: ["roll", "check", "search"],
  },
  {
    q: "What is Form 6, 7, 8?",
    a: "Form 6 — New voter registration. Form 7 — Objection / deletion of name. Form 8 — Correction of details, shifting within constituency, replacement EPIC, marking as PwD.",
    tags: ["forms", "registration"],
  },
  {
    q: "What is NOTA?",
    a: "None Of The Above (NOTA) is the last option on every EVM, allowing you to formally reject all candidates while still casting your vote.",
    tags: ["nota", "evm", "voting"],
  },
  {
    q: "Can I vote if I'm working in another city?",
    a: "Currently, you must vote in the constituency where you are registered. You can either travel back, or shift your registration using Form 8 if you have moved permanently.",
    tags: ["migration", "shifting", "form 8"],
  },
  {
    q: "What is a postal ballot?",
    a: "Service voters (armed forces, government employees on election duty), senior citizens above 85, and PwD voters can apply for postal ballots through Form 12 / 12D.",
    tags: ["postal", "ballot", "absentee"],
  },
  {
    q: "How long does voter registration take?",
    a: "Typically 2–4 weeks after submission. You can track status on voters.eci.gov.in using your reference ID.",
    tags: ["timeline", "registration"],
  },
  {
    q: "Is linking Aadhaar with Voter ID mandatory?",
    a: "No, it is voluntary. You can link via Form 6B on the voters portal, but refusal does not affect your voter status.",
    tags: ["aadhaar", "linking", "form 6b"],
  },
  {
    q: "Can NRIs vote?",
    a: "Yes. NRIs can register as overseas electors using Form 6A. They must vote in person at their registered constituency in India.",
    tags: ["nri", "overseas", "form 6a"],
  },
];

export type Document = {
  name: string;
  description: string;
  category: "identity" | "age" | "address";
  required: boolean;
};

export const REGISTRATION_DOCS: Document[] = [
  { name: "Aadhaar Card", description: "Most accepted ID & address proof", category: "identity", required: false },
  { name: "Passport", description: "Valid for identity, age & address", category: "identity", required: false },
  { name: "Birth Certificate", description: "Strongest age proof", category: "age", required: false },
  { name: "Class 10 Marksheet", description: "Accepted as age proof", category: "age", required: false },
  { name: "PAN Card", description: "Identity + age proof", category: "identity", required: false },
  { name: "Driving Licence", description: "Identity + address proof", category: "identity", required: false },
  { name: "Utility Bill (last 1 year)", description: "Electricity/water/gas/telephone bill", category: "address", required: false },
  { name: "Bank Passbook", description: "With photo, accepted as address proof", category: "address", required: false },
  { name: "Rent Agreement", description: "Registered, for address proof", category: "address", required: false },
  { name: "Recent Passport-size Photo", description: "White background, color, JPEG <2MB", category: "identity", required: true },
];

export const POLLING_DAY_DOCS = [
  "EPIC (Voter ID) — preferred",
  "Aadhaar Card",
  "Passport",
  "Driving Licence",
  "PAN Card",
  "Service Identity Card (Govt/PSU)",
  "MGNREGA Job Card",
  "Health Insurance Smart Card (Ministry of Labour)",
  "Pension Document with photo",
  "Smart Card issued by RGI under NPR",
];

export type TimelineEvent = {
  phase: string;
  title: string;
  description: string;
  daysBefore: number; // approx days before polling day
  icon: string;
};

export const ELECTION_TIMELINE: TimelineEvent[] = [
  { phase: "Announcement", title: "Election Schedule Announced", description: "ECI declares the election dates and Model Code of Conduct comes into effect.", daysBefore: 60, icon: "📢" },
  { phase: "Notification", title: "Gazette Notification Issued", description: "Official notification calling for nominations is published.", daysBefore: 35, icon: "📜" },
  { phase: "Nomination", title: "Nominations Filed", description: "Candidates file nomination papers with the Returning Officer.", daysBefore: 28, icon: "📝" },
  { phase: "Scrutiny", title: "Scrutiny of Nominations", description: "Returning Officer verifies nomination papers.", daysBefore: 27, icon: "🔍" },
  { phase: "Withdrawal", title: "Last Date for Withdrawal", description: "Candidates may withdraw their candidature.", daysBefore: 25, icon: "↩️" },
  { phase: "Campaign", title: "Campaigning Period", description: "Candidates campaign. Silence period begins 48 hrs before poll.", daysBefore: 14, icon: "📣" },
  { phase: "Polling", title: "Polling Day", description: "Voters cast their votes from 7 AM to 6 PM (varies).", daysBefore: 0, icon: "🗳️" },
  { phase: "Counting", title: "Counting of Votes", description: "Votes counted at designated centres; results declared.", daysBefore: -3, icon: "📊" },
];

export const VOTING_STEPS = [
  { title: "Reach the Polling Station", description: "Find your booth via voters.eci.gov.in. Carry your EPIC or any valid ID.", tip: "Avoid peak hours (9–11 AM, 4–6 PM) for shorter queues." },
  { title: "Stand in Queue", description: "Separate queues for men, women, and senior citizens / PwDs.", tip: "Senior citizens (65+), pregnant women, and PwDs get priority." },
  { title: "First Polling Officer — Verification", description: "Officer checks your ID against the electoral roll and confirms your identity.", tip: "Your serial number on the roll speeds this up — note it from voters.eci.gov.in." },
  { title: "Second Polling Officer — Indelible Ink", description: "A mark is applied on your left index finger.", tip: "This prevents double voting. The ink lasts ~15 days." },
  { title: "Third Polling Officer — Voter Slip & Signature", description: "You sign the register and receive a voter slip.", tip: "" },
  { title: "Cast Your Vote on the EVM", description: "Enter the booth, press the blue button next to your chosen candidate (or NOTA). A beep confirms your vote.", tip: "Take your time — the booth is private and there is no rush." },
  { title: "Verify on VVPAT", description: "A paper slip appears in the VVPAT for 7 seconds showing your choice, then drops into a sealed box.", tip: "If the slip doesn't match, immediately inform the Presiding Officer." },
  { title: "Done!", description: "Exit the booth. Your vote has been recorded.", tip: "Share a finger-inked selfie (outside the booth) to encourage others!" },
];

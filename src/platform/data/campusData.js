// Realistic mock dataset powering every module of Orbit — Smart Campus Hub.
// In production, each of these would be swapped for a real API / micro-frontend data source.

export const student = {
  id: 'stu_20481',
  name: 'Aanya Kapoor',
  program: 'B.Tech, Computer Science',
  year: '3rd Year · Semester 5',
  rollNo: 'CS21B0417',
  email: 'aanya.kapoor@orbit.edu',
  phone: '+91 98110 23456',
  avatarInitials: 'AK',
  campus: 'Orbit Institute of Technology',
  advisor: 'Dr. Meera Rao',
  hostel: 'Block C · Room 214',
};

export const overviewStats = [
  { id: 'cgpa', label: 'CGPA', value: 8.6, suffix: '', trend: '+0.2', trendDir: 'up', accent: 'violet' },
  { id: 'attendance', label: 'Attendance', value: 95, suffix: '%', trend: '+1.4%', trendDir: 'up', accent: 'teal' },
  { id: 'canteen', label: 'Canteen Wallet', value: 420, suffix: '', prefix: '₹', trend: '-60', trendDir: 'down', accent: 'amber' },
  { id: 'library', label: 'Books Issued', value: 3, suffix: '', trend: 'due in 4d', trendDir: 'neutral', accent: 'rose' },
];

export const gradeSummary = [
  { grade: 'A+', percent: 32, color: '#7C6CF6' },
  { grade: 'A', percent: 41, color: '#2DD8C4' },
  { grade: 'B+', percent: 19, color: '#FBBF5A' },
  { grade: 'B', percent: 8, color: '#F97C9B' },
];

export const subjects = [
  { id: 'sub1', name: 'Data Structures & Algorithms', code: 'CS301', credits: 4, grade: 'A+', score: 92, faculty: 'Dr. R. Iyer', trend: [78, 82, 85, 88, 92] },
  { id: 'sub2', name: 'Database Systems', code: 'CS302', credits: 3, grade: 'A', score: 88, faculty: 'Prof. S. Nair', trend: [80, 79, 84, 86, 88] },
  { id: 'sub3', name: 'Operating Systems', code: 'CS303', credits: 4, grade: 'A+', score: 91, faculty: 'Dr. Meera Rao', trend: [70, 75, 83, 87, 91] },
  { id: 'sub4', name: 'Computer Networks', code: 'CS304', credits: 3, grade: 'B+', score: 78, faculty: 'Prof. A. Khan', trend: [74, 72, 76, 75, 78] },
  { id: 'sub5', name: 'Software Engineering', code: 'CS305', credits: 3, grade: 'A', score: 85, faculty: 'Dr. P. Menon', trend: [81, 80, 82, 84, 85] },
  { id: 'sub6', name: 'Discrete Mathematics', code: 'MA301', credits: 3, grade: 'A+', score: 94, faculty: 'Dr. K. Bose', trend: [88, 90, 91, 93, 94] },
];

export const semesterHistory = [
  { sem: 'Sem 1', gpa: 7.8 },
  { sem: 'Sem 2', gpa: 8.1 },
  { sem: 'Sem 3', gpa: 8.0 },
  { sem: 'Sem 4', gpa: 8.4 },
  { sem: 'Sem 5', gpa: 8.6 },
];

export const attendanceOverview = {
  overall: 95,
  present: 19,
  absent: 1,
  late: 2,
  totalClasses: 22,
};

export const weeklyAttendance = [
  { week: 'Week 1', days: ['P', 'P', 'P', 'P', 'P'] },
  { week: 'Week 2', days: ['P', 'P', 'P', 'P', 'L'] },
  { week: 'Week 3', days: ['P', 'A', 'P', 'P', 'P'] },
  { week: 'Week 4', days: ['P', 'P', 'L', 'P', 'P'] },
  { week: 'Week 5', days: ['P', 'P', 'P', 'P', 'P'] },
];

export const attendanceBySubject = [
  { subject: 'Data Structures', percent: 97 },
  { subject: 'Database Systems', percent: 92 },
  { subject: 'Operating Systems', percent: 98 },
  { subject: 'Computer Networks', percent: 89 },
  { subject: 'Software Engineering', percent: 95 },
];

export const upcomingClasses = [
  { id: 'cl1', subject: 'Data Structures', room: 'AB1 · 204', time: '10:00 AM', faculty: 'Dr. R. Iyer', color: 'violet' },
  { id: 'cl2', subject: 'Operating Systems Lab', room: 'Lab 3', time: '01:30 PM', faculty: 'Dr. Meera Rao', color: 'teal' },
  { id: 'cl3', subject: 'Computer Networks', room: 'AB2 · 110', time: '03:00 PM', faculty: 'Prof. A. Khan', color: 'amber' },
];

export const canteenMenu = [
  { id: 'm1', name: 'Veg Burger', price: 90, category: 'Fast Food', popular: true, emoji: '🍔' },
  { id: 'm2', name: 'Paneer Wrap', price: 80, category: 'Fast Food', popular: true, emoji: '🌯' },
  { id: 'm3', name: 'Masala Fries', price: 60, category: 'Snacks', popular: false, emoji: '🍟' },
  { id: 'm4', name: 'Cold Coffee', price: 50, category: 'Beverages', popular: true, emoji: '🥤' },
  { id: 'm5', name: 'Idli Sambar', price: 45, category: 'South Indian', popular: false, emoji: '🍚' },
  { id: 'm6', name: 'Chole Bhature', price: 75, category: 'North Indian', popular: false, emoji: '🍛' },
];

export const canteenOrders = [
  { id: 'ord1', items: ['Veg Burger', 'Cold Coffee'], total: 140, status: 'Preparing', time: '12:42 PM' },
  { id: 'ord2', items: ['Paneer Wrap'], total: 80, status: 'Delivered', time: 'Yesterday · 1:10 PM' },
  { id: 'ord3', items: ['Masala Fries', 'Cold Coffee'], total: 110, status: 'Delivered', time: 'Yesterday · 5:20 PM' },
];

export const libraryBooks = [
  { id: 'b1', title: 'Database System Concepts', author: 'Silberschatz, Korth', issued: 'May 22, 2026', due: 'Jun 21, 2026', status: 'issued', cover: '#7C6CF6' },
  { id: 'b2', title: 'Clean Code', author: 'Robert C. Martin', issued: 'May 18, 2026', due: 'Jun 17, 2026', status: 'issued', cover: '#2DD8C4' },
  { id: 'b3', title: 'Operating System Principles', author: 'Silberschatz, Gagne', issued: 'May 12, 2026', due: 'Jun 11, 2026', status: 'issued', cover: '#FBBF5A' },
  { id: 'b4', title: 'Design Patterns', author: 'Gang of Four', issued: 'Jan 8, 2026', due: 'Feb 7, 2026', status: 'returned', cover: '#F97C9B' },
];

export const libraryRecommendations = [
  { id: 'r1', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', cover: '#7C6CF6' },
  { id: 'r2', title: 'Introduction to Algorithms', author: 'CLRS', cover: '#2DD8C4' },
  { id: 'r3', title: 'Computer Networking: A Top-Down Approach', author: 'Kurose & Ross', cover: '#FBBF5A' },
];

export const notifications = [
  { id: 'n1', type: 'grade', title: 'New grade posted', body: 'Operating Systems midterm graded — you scored 91/100.', time: '2h ago', unread: true },
  { id: 'n2', type: 'library', title: 'Book due soon', body: '"Database System Concepts" is due in 4 days.', time: '5h ago', unread: true },
  { id: 'n3', type: 'attendance', title: 'Attendance alert', body: 'Computer Networks attendance dropped to 89%.', time: '1d ago', unread: true },
  { id: 'n4', type: 'canteen', title: 'Order delivered', body: 'Your Paneer Wrap + Cold Coffee order was delivered.', time: '1d ago', unread: false },
  { id: 'n5', type: 'system', title: 'Timetable updated', body: 'OS Lab moved to Lab 3 for the rest of the semester.', time: '3d ago', unread: false },
];

export const announcements = [
  { id: 'a1', title: 'Campus Hackathon — Registrations Open', date: 'Jun 2', tag: 'Event' },
  { id: 'a2', title: 'Mid-sem break: Jun 14–18', date: 'May 30', tag: 'Academic' },
  { id: 'a3', title: 'Library extended hours during exams', date: 'May 28', tag: 'Library' },
];

export const achievements = [
  { id: 'ach1', label: 'Perfect Week', desc: '100% attendance for 5 days straight', icon: 'flame', unlocked: true },
  { id: 'ach2', label: 'Dean\u2019s List', desc: 'CGPA above 8.5 this semester', icon: 'award', unlocked: true },
  { id: 'ach3', label: 'Bookworm', desc: 'Issued 10+ books this year', icon: 'book', unlocked: false },
  { id: 'ach4', label: 'Early Bird', desc: 'Checked in before 9 AM, 10 times', icon: 'sunrise', unlocked: true },
];

// `defaultSize` seeds the widget's initial grid span the first time it's added
// (sm = 1 col, md = 2 col, lg = full width). Once a widget is resized by the user,
// its actual size lives in the saved layout (see useDashboardLayout), not here.
export const widgetCatalog = [
  { id: 'w_cgpa', name: 'CGPA Summary', module: 'grades', enabled: true, defaultSize: 'sm' },
  { id: 'w_attendance', name: 'Attendance Ring', module: 'attendance', enabled: true, defaultSize: 'sm' },
  { id: 'w_agenda', name: "Today's Agenda", module: 'schedule', enabled: true, defaultSize: 'sm' },
  { id: 'w_announcements', name: 'Announcements', module: 'campus', enabled: true, defaultSize: 'sm' },
  { id: 'w_canteen', name: 'Canteen Orders', module: 'canteen', enabled: true, defaultSize: 'md' },
  { id: 'w_library', name: 'Library Books', module: 'library', enabled: true, defaultSize: 'md' },
  { id: 'w_gradetrends', name: 'Grade Trends', module: 'grades', enabled: true, defaultSize: 'md' },
  { id: 'w_achievements', name: 'Achievements', module: 'gamification', enabled: true, defaultSize: 'md' },
  { id: 'w_insights', name: 'Study Insights', module: 'analytics', enabled: false, defaultSize: 'md' },
];

export const quickActions = [
  { id: 'qa1', label: 'Order Food', icon: 'utensils', path: '/canteen' },
  { id: 'qa2', label: 'Renew Book', icon: 'book-open', path: '/library' },
  { id: 'qa3', label: 'View Grades', icon: 'graduation-cap', path: '/grades' },
  { id: 'qa4', label: 'Mark Attendance', icon: 'check-circle', path: '/attendance' },
];

export const searchIndex = [
  { id: 's1', label: 'Data Structures & Algorithms', type: 'Subject', path: '/grades' },
  { id: 's2', label: 'Database System Concepts', type: 'Library Book', path: '/library' },
  { id: 's3', label: 'Attendance Overview', type: 'Module', path: '/attendance' },
  { id: 's4', label: 'Veg Burger', type: 'Canteen Item', path: '/canteen' },
  { id: 's5', label: 'Customize Dashboard', type: 'Settings', path: '/customize' },
  { id: 's6', label: 'Campus Hackathon', type: 'Announcement', path: '/dashboard' },
  { id: 's7', label: 'Profile & Account', type: 'Settings', path: '/profile' },
];

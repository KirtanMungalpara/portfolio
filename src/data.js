export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const SKILLS = [
  { name: 'HTML5', icon: '🌐', level: 92, category: 'Frontend' },
  { name: 'CSS3', icon: '🎨', level: 88, category: 'Frontend' },
  { name: 'JavaScript', icon: '⚡', level: 85, category: 'Frontend' },
  { name: 'React.js', icon: '⚛️', level: 80, category: 'Frontend' },
  { name: 'Node.js', icon: '🟩', level: 75, category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', level: 72, category: 'Database' },
]

export const TECH_ICONS = {
  'React.js': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  'Node.js': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  'MongoDB': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'Express.js': { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
  'OpenAI API': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'Tailwind CSS': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  'JWT': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  'REST API': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'Razorpay': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  'Redux': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
}

export const PROJECTS = [
  {
    id: 1,
    title: 'Class Cloud',
    tagline: 'Smart platform for managing classes, lectures, and student learning',
    description:
      'A full-stack web application designed to simplify online class management for students and instructors. It allows users to organize lectures, manage tasks, and stay connected through a centralized dashboard.',
    features: [
      'Upload and manage lecture videos (with duration control)',
      'To-do list for tracking assignments and tasks',
      'Community section for student interaction',
      'User authentication with secure login/signup',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS', 'JWT'],
    github: 'https://github.com/KirtanMungalpara/classcloudfronted',
    live: 'https://github.com/KirtanMungalpara/classcloudfronted',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    accentColor: 'text-violet-400',
    icon: '🎓',
    featured: true,
  },
  {
    id: 2,
    title: 'Agro Market',
    tagline: 'Connecting farmers to markets directly',
    description:
      'A comprehensive MERN stack agricultural marketplace that bridges the gap between farmers and buyers. Features real-time crop pricing, secure transactions, and an intuitive dashboard for both sellers and buyers.',
    features: [
      'Real-time crop price listing & bidding',
      'Farmer & buyer role-based dashboards',
      'Secure payment gateway integration',
      'Location-based market discovery',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'REST API', 'Razorpay', 'Redux'],
    github: 'https://github.com/kirtanmungalpara/agro-market-frontend',
    live: 'https://agro-market-frontend-aumn.vercel.app/',
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    accentColor: 'text-emerald-400',
    icon: '🌾',
    featured: false,
  },
]

export const SOCIAL_LINKS = {
  github: 'https://github.com/kirtanmungalpara',
  linkedin: 'https://www.linkedin.com/in/kirtan68/',
  email: 'kirtanmungalpara68@email.com',
}

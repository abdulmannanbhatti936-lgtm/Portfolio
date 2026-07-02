import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaNodeJs, FaBootstrap, FaDatabase, FaGitAlt, FaGithub, FaWordpress, FaPython, FaDocker, FaGoogle, FaRobot, FaCogs, FaProjectDiagram, FaBrain, FaNetworkWired } from 'react-icons/fa'
import { SiTailwindcss, SiAndroidstudio, SiFramer, SiLaravel, SiExpress, SiRedis, SiGmail } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

/** Official documentation URLs for marquee skill cards */
export const SKILL_TRACKS = [
  {
    id: 'core',
    marqueeClass: 'animate-marquee-ltr-fast',
    skills: [
      { name: 'HTML5', icon: 'html5', docUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS3', icon: 'css3', docUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { name: 'JavaScript', icon: 'javascript', docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'React', icon: 'react', docUrl: 'https://react.dev/learn' },
      { name: 'Tailwind CSS', icon: 'tailwind', docUrl: 'https://tailwindcss.com/docs' },
      { name: 'PHP', icon: 'php', docUrl: 'https://www.php.net/manual/en/' },
      { name: 'Laravel', icon: 'laravel', docUrl: 'https://laravel.com/docs' },
      { name: 'Python', icon: 'python', docUrl: 'https://docs.python.org/3/' },
      { name: 'Node.js', icon: 'nodejs', docUrl: 'https://nodejs.org/en/docs' },
      { name: 'Express.js', icon: 'express', docUrl: 'https://expressjs.com/' },
      { name: 'MySQL', icon: 'mysql', docUrl: 'https://dev.mysql.com/doc/' },
      { name: 'Redis', icon: 'redis', docUrl: 'https://redis.io/documentation' },
      { name: 'REST APIs', icon: 'restapi', docUrl: 'https://restfulapi.net/' },
      { name: 'Bootstrap', icon: 'bootstrap', docUrl: 'https://getbootstrap.com/docs/' },
    ],
  },
  {
    id: 'tools',
    marqueeClass: 'animate-marquee-ltr-slow',
    skills: [
      { name: 'VS Code', icon: 'vscode', docUrl: 'https://code.visualstudio.com/docs' },
      { name: 'Git & GitHub', icon: 'github', docUrl: 'https://docs.github.com/en' },
      { name: 'Docker', icon: 'docker', docUrl: 'https://docs.docker.com/' },
      { name: 'Google OAuth', icon: 'googleoauth', docUrl: 'https://developers.google.com/identity' },
      { name: 'Gmail API', icon: 'gmailapi', docUrl: 'https://developers.google.com/gmail/api' },
      { name: 'AI Agents', icon: 'aiagents', docUrl: 'https://en.wikipedia.org/wiki/Intelligent_agent' },
      { name: 'MCP', icon: 'mcp', docUrl: 'https://modelcontextprotocol.io/' },
      { name: 'n8n', icon: 'n8n', docUrl: 'https://docs.n8n.io/' },
      { name: 'Prompt Engineering', icon: 'prompteng', docUrl: 'https://www.promptingguide.ai/' },
      { name: 'WordPress', icon: 'wordpress', docUrl: 'https://developer.wordpress.org/' },
      { name: 'Android Studio', icon: 'androidstudio', docUrl: 'https://developer.android.com/studio/intro' },
      { name: 'Framer Motion', icon: 'framer', docUrl: 'https://motion.dev/docs' },
    ],
  },
]

const SKILL_ICON_MAP = {
  html5: { Icon: FaHtml5, color: 'text-orange-500' },
  css3: { Icon: FaCss3Alt, color: 'text-blue-500' },
  javascript: { Icon: FaJs, color: 'text-yellow-400' },
  react: { Icon: FaReact, color: 'text-blue-400' },
  tailwind: { Icon: SiTailwindcss, color: 'text-sky-400' },
  php: { Icon: FaPhp, color: 'text-indigo-500' },
  laravel: { Icon: SiLaravel, color: 'text-red-500' },
  python: { Icon: FaPython, color: 'text-blue-500' },
  nodejs: { Icon: FaNodeJs, color: 'text-green-500' },
  express: { Icon: SiExpress, color: 'text-gray-400' },
  mysql: { Icon: FaDatabase, color: 'text-blue-600' },
  redis: { Icon: SiRedis, color: 'text-red-600' },
  restapi: { Icon: FaNetworkWired, color: 'text-purple-500' },
  bootstrap: { Icon: FaBootstrap, color: 'text-purple-600' },
  vscode: { Icon: VscVscode, color: 'text-blue-500' },
  git: { Icon: FaGitAlt, color: 'text-orange-600' },
  github: { Icon: FaGithub, color: 'text-neutral-800' },
  docker: { Icon: FaDocker, color: 'text-blue-500' },
  googleoauth: { Icon: FaGoogle, color: 'text-blue-500' },
  gmailapi: { Icon: SiGmail, color: 'text-red-500' },
  aiagents: { Icon: FaRobot, color: 'text-indigo-500' },
  mcp: { Icon: FaCogs, color: 'text-gray-400' },
  n8n: { Icon: FaProjectDiagram, color: 'text-pink-500' },
  prompteng: { Icon: FaBrain, color: 'text-purple-400' },
  wordpress: { Icon: FaWordpress, color: 'text-sky-500' },
  androidstudio: { Icon: SiAndroidstudio, color: 'text-green-600' },
  framer: { Icon: SiFramer, color: 'text-purple-500' },
}

export function getSkillIcon(iconKey) {
  return SKILL_ICON_MAP[iconKey] ?? null
}

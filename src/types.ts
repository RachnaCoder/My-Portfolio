export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  description: string;
}

export interface PortfolioData {
  bio: string;
  skills: Skill[];
  projects: Project[];
  experience: ExperienceItem[];
}

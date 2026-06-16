import { skillsData, projects, services } from '../../utils/data';

describe('skillsData', () => {
  it('exports an array of skills', () => {
    expect(Array.isArray(skillsData)).toBe(true);
    expect(skillsData.length).toBeGreaterThan(0);
  });

  it('each skill has required fields', () => {
    skillsData.forEach((skill) => {
      expect(skill).toHaveProperty('name');
      expect(skill).toHaveProperty('percent');
      expect(skill).toHaveProperty('icon');
      expect(skill).toHaveProperty('color');
    });
  });

  it('percent values are between 0 and 100', () => {
    skillsData.forEach((skill) => {
      expect(skill.percent).toBeGreaterThanOrEqual(0);
      expect(skill.percent).toBeLessThanOrEqual(100);
    });
  });

  it('icon strings start with "fab fa-"', () => {
    skillsData.forEach((skill) => {
      expect(skill.icon).toMatch(/^fab fa-/);
    });
  });

  it('color strings are valid hex colors', () => {
    skillsData.forEach((skill) => {
      expect(skill.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

describe('projects', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has name, category, and bg', () => {
    projects.forEach((project) => {
      expect(project).toHaveProperty('name');
      expect(project).toHaveProperty('category');
      expect(project).toHaveProperty('bg');
      expect(typeof project.name).toBe('string');
      expect(typeof project.category).toBe('string');
      expect(project.bg).toMatch(/^https?:\/\//);
    });
  });
});

describe('services', () => {
  it('exports an array of services', () => {
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
  });

  it('each service has icon, title, and desc', () => {
    services.forEach((service) => {
      expect(service).toHaveProperty('icon');
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('desc');
      expect(typeof service.title).toBe('string');
      expect(typeof service.desc).toBe('string');
      expect(service.icon).toMatch(/^fas fa-/);
    });
  });
});

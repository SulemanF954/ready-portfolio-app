import { cvData } from '../../CV_DATA';

describe('cvData', () => {
  it('exports an object with all required sections', () => {
    expect(cvData).toHaveProperty('name');
    expect(cvData).toHaveProperty('title');
    expect(cvData).toHaveProperty('phone');
    expect(cvData).toHaveProperty('location');
    expect(cvData).toHaveProperty('email');
    expect(cvData).toHaveProperty('bio');
    expect(cvData).toHaveProperty('experience');
    expect(cvData).toHaveProperty('education');
    expect(cvData).toHaveProperty('skills');
    expect(cvData).toHaveProperty('softSkills');
  });

  it('has a valid email format', () => {
    expect(cvData.email).toMatch(/.+@.+\..+/);
  });

  it('bio is a non-empty array of strings', () => {
    expect(Array.isArray(cvData.bio)).toBe(true);
    expect(cvData.bio.length).toBeGreaterThan(0);
    cvData.bio.forEach((line) => {
      expect(typeof line).toBe('string');
    });
  });

  it('experience entries have required fields', () => {
    expect(Array.isArray(cvData.experience)).toBe(true);
    cvData.experience.forEach((exp) => {
      expect(exp).toHaveProperty('title');
      expect(exp).toHaveProperty('company');
      expect(exp).toHaveProperty('duration');
      expect(exp).toHaveProperty('responsibilities');
      expect(Array.isArray(exp.responsibilities)).toBe(true);
    });
  });

  it('education entries have required fields', () => {
    expect(Array.isArray(cvData.education)).toBe(true);
    cvData.education.forEach((edu) => {
      expect(edu).toHaveProperty('school');
      expect(edu).toHaveProperty('degree');
      expect(edu).toHaveProperty('year');
    });
  });

  it('skills is a non-empty array', () => {
    expect(Array.isArray(cvData.skills)).toBe(true);
    expect(cvData.skills.length).toBeGreaterThan(0);
  });

  it('softSkills is a non-empty array', () => {
    expect(Array.isArray(cvData.softSkills)).toBe(true);
    expect(cvData.softSkills.length).toBeGreaterThan(0);
  });
});

import { generateCV } from '../../utils/generateCV';

const mockDoc = {
  setFillColor: jest.fn(),
  rect: jest.fn(),
  addImage: jest.fn(),
  setFontSize: jest.fn(),
  setTextColor: jest.fn(),
  setFont: jest.fn(),
  text: jest.fn(),
  roundedRect: jest.fn(),
  splitTextToSize: jest.fn(() => ['line1', 'line2']),
  setDrawColor: jest.fn(),
  setLineWidth: jest.fn(),
  setLineDashPattern: jest.fn(),
  line: jest.fn(),
  save: jest.fn(),
  getTextWidth: jest.fn(() => 30),
  internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
};

jest.mock('jspdf', () => ({
  jsPDF: jest.fn(() => mockDoc),
}));

describe('generateCV', () => {
  let setLoading;

  beforeEach(() => {
    setLoading = jest.fn();
    jest.clearAllMocks();
  });

  it('calls setLoading(true) at the start', async () => {
    await generateCV(setLoading);
    expect(setLoading).toHaveBeenCalledWith(true);
  });

  it('calls setLoading(false) when done', async () => {
    await generateCV(setLoading);
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  it('creates a jsPDF instance', async () => {
    const { jsPDF } = require('jspdf');
    await generateCV(setLoading);
    expect(jsPDF).toHaveBeenCalledWith(
      expect.objectContaining({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    );
  });

  it('calls doc.save to produce the PDF', async () => {
    await generateCV(setLoading);
    expect(mockDoc.save).toHaveBeenCalledWith('Suleman_Farooq_Resume.pdf');
  });

  it('draws the page background', async () => {
    await generateCV(setLoading);
    expect(mockDoc.setFillColor).toHaveBeenCalled();
    expect(mockDoc.rect).toHaveBeenCalled();
  });

  it('writes the name to the PDF', async () => {
    await generateCV(setLoading);
    expect(mockDoc.text).toHaveBeenCalledWith('SULEMAN', expect.any(Number), expect.any(Number));
    expect(mockDoc.text).toHaveBeenCalledWith('FAROOQ', expect.any(Number), expect.any(Number));
  });

  it('writes section headers', async () => {
    await generateCV(setLoading);
    expect(mockDoc.text).toHaveBeenCalledWith('CONTACT', expect.any(Number), expect.any(Number));
    expect(mockDoc.text).toHaveBeenCalledWith('EDUCATION', expect.any(Number), expect.any(Number));
    expect(mockDoc.text).toHaveBeenCalledWith('SKILLS', expect.any(Number), expect.any(Number));
    expect(mockDoc.text).toHaveBeenCalledWith('EXPERIENCES', expect.any(Number), expect.any(Number));
    expect(mockDoc.text).toHaveBeenCalledWith('SOFT SKILLS', expect.any(Number), expect.any(Number));
  });
});

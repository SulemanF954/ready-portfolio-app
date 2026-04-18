import { jsPDF } from 'jspdf';

export const generateCV = async (setLoading) => {
  try {
    setLoading(true);
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Professional color scheme
    const beigeBackground = [250, 245, 235]
    const darkBrown = [139, 115, 85]
    const brownText = [102, 77, 45]
    const sectionBg = [155, 130, 105]
    const textColor = [70, 70, 70]
    const white = [255, 255, 255]

    // Page background
    doc.setFillColor(...beigeBackground)
    doc.rect(0, 0, 210, 297, 'F')

    // Top decorative section
    doc.setFillColor(220, 195, 155)
    doc.rect(0, 0, 210, 100, 'F')

    // Profile Image
    try {
      const imgUrl = '/portfolio-cv-photo.jpg'
      doc.addImage(imgUrl, 'PNG', 35, 12, 50, 60)
    } catch (imgError) {
      console.log('Profile image could not be loaded')
    }

    // Name
    doc.setFontSize(34)
    doc.setTextColor(...brownText)
    doc.setFont(undefined, 'bold')
    doc.text('SULEMAN', 90, 30)
    doc.text('FAROOQ', 90, 40)

    // Professional title box (same as before)
    doc.setFillColor(...sectionBg);
    doc.roundedRect(90, 46, 70, 12, 2, 2, 'F');
    doc.setFontSize(12);
    doc.setTextColor(...white);
    doc.setFont(undefined, 'normal');
    const title = 'Frontend Web Developer | Student';
    const centerX = 90 + 70 / 2;
    const centerY = 48 + 6;
    doc.text(title, centerX, centerY, { align: 'center' });

    // ========== BIO SECTION (FIRST) ==========
    let currentY = 80; // starting Y position for bio (below the title box)
    doc.setFontSize(12);
    doc.setTextColor(...textColor);
    doc.setFont(undefined, 'normal');
    const bioText = 'Second-year student and aspiring Frontend Web Developer with strong skills in modern web technologies. Passionate about building responsive, user-friendly applications using React and Next.js. Eager to gain hands-on experience in a professional development environment.';
    const bioLines = doc.splitTextToSize(bioText, 170);
    doc.text(bioLines, 20, currentY);
    currentY += (bioLines.length * 5) + 3; // move below bio

    // ========== DIVIDER LINE (SECOND) ==========
    doc.setDrawColor(...darkBrown);
    doc.setLineWidth(0.8);
    doc.setLineDashPattern([3, 1], 0);
    doc.line(20, currentY, 190, currentY);
    doc.setLineDashPattern([], 0);
    currentY += 5; // space after divider

    // ========== ALL OTHER CONTENT (CONTACT, EDUCATION, SKILLS, EXPERIENCES, SOFT SKILLS) ==========
    let yPosLeft = currentY;
    let yPosRight = currentY;

    // LEFT COLUMN - CONTACT Section
    doc.setFillColor(...sectionBg);
    doc.roundedRect(20, yPosLeft, 80, 8, 1.5, 1.5, 'F');
    doc.setTextColor(...white);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('CONTACT', 25, yPosLeft + 5.5);

    yPosLeft += 12;
    doc.setFontSize(8.5);
    doc.setTextColor(...brownText);

    // Phone icon + number
    try {
      doc.addImage('/phone-icon.png', 'PNG', 25, yPosLeft, 3.5, 3.5);
    } catch (e) { /* fallback to text */ doc.text('📞', 25, yPosLeft); }
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // gray
    doc.text('+92307-6315295', 31, yPosLeft + 2.5);
    yPosLeft += 6;

    // Location icon + address
    try {
      doc.addImage('/location-icon.png', 'PNG', 25, yPosLeft, 3.5, 3.5);
    } catch (e) { doc.text('📍', 25, yPosLeft); }
    doc.text('Multan, Pakistan', 31, yPosLeft + 2.5);
    yPosLeft += 6;

    // Email icon + address
    try {
      doc.addImage('/email-icon.png', 'PNG', 25, yPosLeft, 3.5, 3.5);
    } catch (e) { doc.text('✉️', 25, yPosLeft); }
    doc.text('sulemanfarooq954@gmail.com', 31, yPosLeft + 2.5);


    // EDUCATION Section
    yPosLeft += 12
    doc.setFillColor(...sectionBg)
    doc.roundedRect(20, yPosLeft, 80, 8, 1.5, 1.5, 'F')
    doc.setTextColor(...white)
    doc.setFont(undefined, 'bold')
    doc.setFontSize(11)
    doc.text('EDUCATION', 25, yPosLeft + 5.5)

    yPosLeft += 14
    doc.setTextColor(...brownText)
    doc.setFont(undefined, 'bold')
    doc.text('Nishat College', 25, yPosLeft)
    yPosLeft += 6
    doc.setFont(undefined, 'normal')
    doc.setTextColor(...textColor)
    doc.text('Second Year Student', 25, yPosLeft)
    yPosLeft += 5
    doc.text("Bachelor's Degree (In Progress)", 25, yPosLeft)

    // SKILLS Section
    yPosLeft += 12;
    doc.setFillColor(...sectionBg);
    doc.roundedRect(20, yPosLeft, 80, 8, 1.5, 1.5, 'F');
    doc.setTextColor(...white);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11)
    doc.text('SKILLS', 25, yPosLeft + 5.5);

    yPosLeft += 15; // extra space after header

    const categories = [
      { t: 'Frontend:', i: 'HTML, CSS, Tailwind CSS, Bootstrap' },
      { t: 'Languages:', i: 'JavaScript, TypeScript' },
      { t: 'Frameworks:', i: 'React.js, Next.js' },
      { t: 'Tools:', i: 'Git, GitHub, VS Code' }
    ];

    categories.forEach((cat, index) => {
      // Category title (bold, brown)
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...brownText);
      doc.text(cat.t, 25, yPosLeft);

      // Items on next line with indentation and bullet
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...textColor);
      doc.text('• ' + cat.i, 32, yPosLeft + 5); // indented 7mm, 5mm below title

      // Move down for next category: 5mm (item line) + 4mm gap = 9mm
      yPosLeft += 9;
    });

    // RIGHT COLUMN - EXPERIENCES Section
    doc.setFillColor(...sectionBg)
    doc.roundedRect(110, yPosRight, 75, 8, 1.5, 1.5, 'F')
    doc.setTextColor(...white)
    doc.setFont(undefined, 'bold')
    doc.setFontSize(11)
    doc.text('EXPERIENCES', 115, yPosRight + 5.5)

    yPosRight += 14;

    // Job title (brown, bold)
    doc.setTextColor(...brownText);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('Web Developer & Designer', 115, yPosRight);
    yPosRight += 5;

    // Company name (brown, bold) and date range (gray, normal)
    doc.setFontSize(9);

    // "Autofixia" in brown + bold
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...brownText);
    doc.text('Autofixia', 115, yPosRight);

    // Date range (gray, normal weight)
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...textColor);
    doc.text(' | Aug 2024 - Present (1.5 years)', 117 + doc.getTextWidth('Autofixia'), yPosRight);

    yPosRight += 8
    const exps = [
      'Designed and developed responsive websites using HTML, CSS, Tailwind, JS, TS',
      'Built interactive web applications using React.js and Next.js',
      'Collaborated with design team for UI/UX interfaces',
      'Implemented cross-browser compatibility and mobile optimization',
      'Maintained version control using Git/GitHub',
      'Focused on clean code and performance optimization'
    ]

    exps.forEach(exp => {
      const lines = doc.splitTextToSize('• ' + exp, 80)
      doc.text(lines, 115, yPosRight)
      yPosRight += (lines.length * 4) + 1
    })


    yPosRight += 0;
    doc.setFillColor(...sectionBg);
    doc.roundedRect(110, yPosRight, 75, 8, 1.5, 1.5, 'F');
    doc.setTextColor(...white);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('SOFT SKILLS', 115, yPosRight + 5.5);

    yPosRight += 15;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...textColor);

    const softSkills = ['Quick learner', 'Problem Solving', 'Team work', 'Good communication'];
    softSkills.forEach(skill => {
      doc.text('• ' + skill, 115, yPosRight);
      yPosRight += 5;
    });



    // Footer
    doc.setFontSize(10)
    doc.setTextColor(8, 18, 8)
    doc.text('© Suleman Farooq - Professional Portfolio', 20, 285)

    doc.save('Suleman_Farooq_Resume.pdf');
  } catch (error) {
    console.error('Error generating CV:', error);
    alert('Failed to generate CV. Error: ' + error.message);
  } finally {
    setLoading(false);
  }
};
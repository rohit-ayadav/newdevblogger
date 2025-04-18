'use client';
import { marked } from 'marked';

// Simple PDF generator (fallback version)
export const generateSimplePdf = async (options) => {
  const { default: jsPDF } = await import('jspdf');

  const {
    title,
    content,
    isMarkdown = true,
    author = '',
    date = new Date().toLocaleDateString(),
    logoUrl = 'https://www.devblogger.in/default-thumbnail.png',
    filename = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`
  } = options;

  try {
    const pdf = new jsPDF();
    const parser = new DOMParser();

    pdf.setProperties({
      title,
      subject: `DevBlogger: ${title}`,
      author: author || 'DevBlogger',
      creator: 'DevBlogger.in'
    });

    // Page dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);

    // First page with logo and title
    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = logoUrl;
      });

      const logoWidth = 60;
      const aspectRatio = img.width / img.height;
      const logoHeight = logoWidth / aspectRatio;

      const logoX = (pageWidth - logoWidth) / 2;
      pdf.addImage(img, 'PNG', logoX, 30, logoWidth, logoHeight);
    } catch (err) {
      // Continue without logo
    }

    // Add title centered and large
    pdf.setFontSize(22);
    pdf.setTextColor(40, 60, 80);
    pdf.setFont('helvetica', 'bold');
    const titleLines = pdf.splitTextToSize(title, contentWidth);
    pdf.text(titleLines, pageWidth / 2, 100, { align: 'center' });

    // Add author and date
    pdf.setFontSize(12);
    pdf.setTextColor(90, 90, 90);
    pdf.setFont('helvetica', 'normal');

    if (author) {
      pdf.text(`By: ${author}`, pageWidth / 2, 120 + (titleLines.length * 10), { align: 'center' });
    }

    if (date) {
      pdf.text(`Date: ${date}`, pageWidth / 2, 130 + (titleLines.length * 10), { align: 'center' });
    }

    // Add DevBlogger footer
    pdf.setFontSize(10);
    pdf.text('DevBlogger.in', pageWidth / 2, pageHeight - 20, { align: 'center' });

    // Start content on second page
    pdf.addPage();

    // Process markdown content
    let textContent = content;
    if (isMarkdown) {
      const html = marked.parse(content);
      const doc = parser.parseFromString(html, 'text/html');
      textContent = doc.body.textContent || '';
    }

    // Content formatting
    let currentY = margin;
    pdf.setFontSize(11);
    pdf.setTextColor(50, 50, 50);
    pdf.setFont('helvetica', 'normal');

    // Process content in sections
    const sections = splitTextIntoSections(textContent);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      if (section.type === 'heading') {
        // Check for page break before heading
        if (currentY > pageHeight - 50) {
          pdf.addPage();
          currentY = margin;
        }

        // Heading size based on level
        let fontSize = 16;
        if (section.level === 2) fontSize = 14;
        if (section.level === 3) fontSize = 12;

        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(40, 60, 80);

        const headingLines = pdf.splitTextToSize(section.text, contentWidth);
        pdf.text(headingLines, margin, currentY);
        currentY += (headingLines.length * (fontSize / 2)) + 5;
      }
      else if (section.type === 'paragraph') {
        // Check for page break
        if (currentY > pageHeight - 30) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(50, 50, 50);

        const lines = pdf.splitTextToSize(section.text, contentWidth);
        pdf.text(lines, margin, currentY);
        currentY += (lines.length * 6) + 5;
      }
      else if (section.type === 'code') {
        // Check for page break
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = margin;
        }

        // Code block styling
        pdf.setFillColor(245, 245, 245);
        pdf.setTextColor(80, 80, 80);

        const codeLines = pdf.splitTextToSize(section.text.trim(), contentWidth - 10);
        const codeHeight = (codeLines.length * 5) + 10;

        // Draw background
        pdf.roundedRect(margin - 5, currentY - 5, contentWidth + 10, codeHeight, 2, 2, 'F');

        // Add code text
        pdf.setFont('courier', 'normal');
        pdf.setFontSize(9);
        pdf.text(codeLines, margin, currentY);
        currentY += codeHeight + 10;

        // Reset to normal text style
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(50, 50, 50);
      }
      else if (section.type === 'list') {
        // Handle lists
        if (currentY > pageHeight - 30) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');

        const items = section.text.split('\n');
        for (let j = 0; j < items.length; j++) {
          const item = items[j].trim();
          if (!item) continue;

          if (currentY > pageHeight - 20) {
            pdf.addPage();
            currentY = margin;
          }

          const bulletLines = pdf.splitTextToSize(`• ${item}`, contentWidth - 5);
          pdf.text(bulletLines, margin + 5, currentY);
          currentY += (bulletLines.length * 6) + 3;
        }
      }
    }

    // Add page numbers and footer to all pages
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);
      pdf.setTextColor(120, 120, 120);

      if (i > 1) { // Only add content page footer on content pages
        pdf.text('Generated from DevBlogger.in', margin, pageHeight - 10);
        pdf.text(`Page ${i - 1} of ${pageCount - 1}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      }
    }

    pdf.save(filename);
    return { success: true, filename };
  } catch (error) {
    console.error('Simple PDF generation failed:', error);
    throw new Error(`PDF generation failed: ${error.message || 'Unknown error'}`);
  }
};

// Helper function to parse sections from text
function splitTextIntoSections(text) {
  const lines = text.split('\n');
  const sections = [];
  let currentSection = { type: 'paragraph', text: '' };
  let inCodeBlock = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect heading
    if (line.match(/^#{1,6}\s+/) && !inCodeBlock) {
      // Save previous section if not empty
      if (currentSection.text.trim()) {
        sections.push(currentSection);
      }

      // Extract heading level and text
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        sections.push({
          type: 'heading',
          level: match[1].length,
          text: match[2].trim()
        });
      }

      currentSection = { type: 'paragraph', text: '' };
      inList = false;
      continue;
    }

    // Detect code block start/end
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        // Start of code block
        if (currentSection.text.trim()) {
          sections.push(currentSection);
        }
        currentSection = { type: 'code', text: '' };
        inCodeBlock = true;
        inList = false;
      } else {
        // End of code block
        sections.push(currentSection);
        currentSection = { type: 'paragraph', text: '' };
        inCodeBlock = false;
      }
      continue;
    }

    // Inside code block
    if (inCodeBlock) {
      currentSection.text += line + '\n';
      continue;
    }

    // Detect list items
    if (line.trim().match(/^[*-+•]\s+/) || line.trim().match(/^\d+\.\s+/)) {
      if (!inList) {
        // Start of list
        if (currentSection.text.trim()) {
          sections.push(currentSection);
        }
        currentSection = { type: 'list', text: line.trim() + '\n' };
        inList = true;
      } else {
        // Continue list
        currentSection.text += line.trim() + '\n';
      }
      continue;
    }

    // Empty line ends a list
    if (line.trim() === '' && inList) {
      sections.push(currentSection);
      currentSection = { type: 'paragraph', text: '' };
      inList = false;
      continue;
    }

    // Regular paragraph content
    if (currentSection.type === 'paragraph') {
      if (line.trim() === '') {
        // Empty line in paragraph
        if (currentSection.text.trim()) {
          sections.push(currentSection);
          currentSection = { type: 'paragraph', text: '' };
        }
      } else {
        // Add space between lines in same paragraph
        if (currentSection.text && !currentSection.text.endsWith('\n')) {
          currentSection.text += ' ';
        }
        currentSection.text += line;
      }
    } else {
      // Not in a paragraph but encountered normal text
      if (currentSection.text.trim()) {
        sections.push(currentSection);
      }
      currentSection = { type: 'paragraph', text: line };
    }
  }

  // Add the last section if not empty
  if (currentSection.text.trim()) {
    sections.push(currentSection);
  }

  return sections;
}
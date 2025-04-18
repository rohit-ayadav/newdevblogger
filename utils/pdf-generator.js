'use client';
import { detectContentType } from '@/lib/detectContentType';
import { marked } from 'marked';

export const generateSimplePdf = async (options) => {
  const { default: jsPDF } = await import('jspdf');

  const {
    title,
    content,
    isMarkdown = true,
    author = '',
    date = new Date().toLocaleDateString(),
    thumbnailUrl = 'https://www.devblogger.in/default-thumbnail.png',
    subtitle = '',
    filename = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`
  } = options;

  try {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Set PDF properties
    pdf.setProperties({
      title,
      subject: `DevBlogger: ${title}`,
      author: author || 'DevBlogger',
      creator: 'DevBlogger.in'
    });

    // Add background color
    pdf.setFillColor(245, 245, 245); // Light gray
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Add thumbnail centered
    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = thumbnailUrl;
      });

      const imgWidth = 100;
      const aspectRatio = img.width / img.height;
      const imgHeight = imgWidth / aspectRatio;
      const imgX = (pageWidth - imgWidth) / 2;

      pdf.addImage(img, 'PNG', imgX, 30, imgWidth, imgHeight);
    } catch (err) {
      // Continue without thumbnail
    }

    // Title
    pdf.setFontSize(26);
    pdf.setTextColor(40, 60, 90);
    pdf.setFont('helvetica', 'bold');
    const titleLines = pdf.splitTextToSize(title, contentWidth);
    pdf.text(titleLines, pageWidth / 2, 100 + 50, { align: 'center' });

    // Optional Subtitle
    if (subtitle) {
      pdf.setFontSize(16);
      pdf.setTextColor(80, 80, 80);
      pdf.setFont('helvetica', 'italic');
      const subtitleLines = pdf.splitTextToSize(subtitle, contentWidth);
      pdf.text(subtitleLines, pageWidth / 2, 115 + 50, { align: 'center' });
    }

    // Author and Date
    const metaY = 140 + 50;
    pdf.setFontSize(12);
    pdf.setFont('times', 'italic');
    pdf.setTextColor(90, 90, 90);
    pdf.text(`Written by: ${author || 'DevBlogger'} | Published on: ${date}`, pageWidth / 2, metaY, { align: 'center' });

    // Decorative line
    pdf.setDrawColor(180, 180, 180);
    pdf.setLineWidth(0.3);
    pdf.line(margin, metaY + 10, pageWidth - margin, metaY + 10);

    // DevBlogger footer / slogan
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(120, 120, 120);
    pdf.text('Empowering devs, one blog at a time – DevBlogger.in', pageWidth / 2, pageHeight - 20, { align: 'center' });

    pdf.addPage();

    // The content area

    let textContent = content;
    if (isMarkdown) {
      const html = marked.parse(content);
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      textContent = doc.body.textContent || '';
    }

    // Content formatting
    let currentY = margin;
    pdf.setFontSize(11);
    pdf.setTextColor(50, 50, 50);
    pdf.setFont('helvetica', 'normal');

    // Process content in sections
    const sections = formatContentToSections(textContent);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      if (section.type === 'heading') {
        console.log(`Heading detected: ${section.text} level: ${section.level}`);
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

    const pageCount = pdf.internal.getNumberOfPages();
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);

    for (let i = 2; i <= pageCount; i++) {
      pdf.setPage(i);

      pdf.setTextColor(130, 130, 130);
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

      // Footer left
      pdf.text('Published via DevBlogger.in', margin, pageHeight - 8);

      // Footer right, for content pages only
      if (i > 1) {
        pdf.text(`Page ${i - 1} of ${pageCount - 1}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
      }
    }
    // Save the PDF
    pdf.save(filename);
    return { success: true, filename };
  } catch (error) {
    console.error('Simple PDF generation failed:', error);
    throw new Error(`PDF generation failed: ${error.message || 'Unknown error'}`);
  }
};

function splitTextIntoSections(text) {
  const lines = text.split('\n');
  const sections = [];
  let currentSection = { type: 'paragraph', text: '' };
  let inCodeBlock = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Toggle code block (``` or ```lang)
    if (/^```/.test(trimmed)) {
      if (!inCodeBlock) {
        if (currentSection.text.trim()) sections.push(currentSection);
        currentSection = { type: 'code', text: '' };
        inCodeBlock = true;
      } else {
        sections.push(currentSection);
        currentSection = { type: 'paragraph', text: '' };
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      currentSection.text += line + '\n';
      continue;
    }

    // Heading
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      if (currentSection.text.trim()) sections.push(currentSection);
      sections.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim()
      });
      currentSection = { type: 'paragraph', text: '' };
      inList = false;
      continue;
    }

    // List item
    const listMatch = /^(\d+\.\s+|[-+*•]\s+)/.exec(trimmed);
    if (listMatch) {
      if (!inList) {
        if (currentSection.text.trim()) sections.push(currentSection);
        currentSection = { type: 'list', text: trimmed + '\n' };
        inList = true;
      } else {
        currentSection.text += trimmed + '\n';
      }
      continue;
    }

    // End of list on blank line
    if (trimmed === '' && inList) {
      sections.push(currentSection);
      currentSection = { type: 'paragraph', text: '' };
      inList = false;
      continue;
    }

    // Paragraph handling
    if (trimmed === '') {
      if (currentSection.text.trim()) {
        sections.push(currentSection);
        currentSection = { type: 'paragraph', text: '' };
      }
    } else {
      if (currentSection.type !== 'paragraph') {
        if (currentSection.text.trim()) sections.push(currentSection);
        currentSection = { type: 'paragraph', text: '' };
      }

      currentSection.text += (currentSection.text ? ' ' : '') + trimmed;
    }
  }

  if (currentSection.text.trim()) {
    sections.push(currentSection);
  }

  return sections;
}

function formatContentToSections(rawContent) {
  const contentType = detectContentType(rawContent);
  if (!rawContent) return [];
  let processedText = rawContent;

  if (contentType === 'html') {
    // Option 1: Convert to markdown-like plain text
    processedText = htmlToText(rawContent, {
      wordwrap: false,
      selectors: [
        { selector: 'h1', format: 'heading', options: { uppercase: false } },
        { selector: 'h2', format: 'heading' },
        { selector: 'ul', format: 'list' },
        { selector: 'pre', format: 'code' },
        { selector: 'code', format: 'inlineCode' }
      ]
    });
  }

  return splitTextIntoSections(processedText);
}
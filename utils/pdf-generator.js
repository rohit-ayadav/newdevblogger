'use client';
import { detectContentType } from '@/lib/detectContentType';
import { marked } from 'marked';

export const generateSimplePdf = async (options) => {
  // const { default: jsPDF } = await import('jspdf');

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
      console.log('Image loaded:', img.src + ' and Source: ' + thumbnailUrl);

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
    let sections = [];

    if (isMarkdown) {
      const html = marked.parse(content);

      sections = processHtmlContent(html);
    } else {
      sections = formatContentToSections(content);
    }

    let currentY = margin;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      if (section.type === 'heading') {
        // Check for page break before heading
        if (currentY > pageHeight - 50) {
          pdf.addPage();
          currentY = margin;
        }

        // Heading size based on level
        let fontSize = 20;  // H1
        if (section.level === 2) fontSize = 18;
        if (section.level === 3) fontSize = 16;
        if (section.level === 4) fontSize = 14;
        if (section.level >= 5) fontSize = 12;

        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(40, 60, 80);

        const headingLines = pdf.splitTextToSize(section.text, contentWidth);
        pdf.text(headingLines, margin, currentY);

        // Add more space after headings
        currentY += (headingLines.length * (fontSize / 2)) + 8;
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

        // Add proper spacing between paragraphs
        currentY += (lines.length * 7) + 10;
      }
      else if (section.type === 'code') {
        // Check for page break
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = margin;
        }

        // Code block styling
        pdf.setFillColor(240, 240, 240);
        pdf.setTextColor(60, 60, 60);

        const codeLines = pdf.splitTextToSize(section.text.trim(), contentWidth - 10);
        const codeHeight = (codeLines.length * 6) + 10;

        // Draw background
        pdf.roundedRect(margin - 5, currentY - 5, contentWidth + 10, codeHeight, 2, 2, 'F');

        // Add code text
        pdf.setFont('courier', 'normal');
        pdf.setFontSize(9);
        pdf.text(codeLines, margin, currentY);
        currentY += codeHeight + 12;

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
        pdf.setTextColor(50, 50, 50);

        const items = section.items || [];
        const listIndent = 5;

        for (let j = 0; j < items.length; j++) {
          const item = items[j];
          if (!item) continue;

          if (currentY > pageHeight - 20) {
            pdf.addPage();
            currentY = margin;
          }

          const bulletLines = pdf.splitTextToSize(item, contentWidth - 15);

          // Draw bullet or number
          const bulletChar = section.ordered ? `${j + 1}.` : '•';
          pdf.text(bulletChar, margin + 2, currentY);

          // Draw list item text with indent
          pdf.text(bulletLines, margin + listIndent + 8, currentY);

          // Add proper spacing between list items
          currentY += (bulletLines.length * 6) + 5;
        }

        // Add extra space after list
        currentY += 5;
      }
      else if (section.type === 'image') {
        // Handle images (placeholder for now)
        if (currentY > pageHeight - 60) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(100, 100, 100);
        pdf.text(`[Image: ${section.alt || 'Figure'}]`, margin, currentY);
        currentY += 20;
      }
      else if (section.type === 'table') {
        // Handle tables
        if (currentY > pageHeight - 50) {
          pdf.addPage();
          currentY = margin;
        }

        if (section.rows && section.rows.length > 0) {
          const rows = section.rows;
          const cellPadding = 5;
          const lineHeight = 7;
          const columnCount = rows[0].length;
          const columnWidth = contentWidth / columnCount;

          // Draw header row
          pdf.setFont('helvetica', 'bold');
          pdf.setFillColor(240, 240, 240);

          let rowY = currentY;
          let maxRowHeight = 0;

          // Draw header cells
          for (let c = 0; c < columnCount; c++) {
            const cellText = rows[0][c] || '';
            const cellLines = pdf.splitTextToSize(cellText, columnWidth - (2 * cellPadding));
            const cellHeight = (cellLines.length * lineHeight) + (2 * cellPadding);
            maxRowHeight = Math.max(maxRowHeight, cellHeight);

            // Draw cell background
            pdf.rect(margin + (c * columnWidth), rowY, columnWidth, cellHeight, 'F');

            // Draw cell text
            pdf.text(cellLines, margin + (c * columnWidth) + cellPadding, rowY + cellPadding + 4);
          }

          rowY += maxRowHeight;

          // Draw data rows
          pdf.setFont('helvetica', 'normal');

          for (let r = 1; r < rows.length; r++) {
            maxRowHeight = 0;

            // Draw cell backgrounds with alternating colors
            if (r % 2 === 0) {
              pdf.setFillColor(248, 248, 248);
            } else {
              pdf.setFillColor(255, 255, 255);
            }

            for (let c = 0; c < columnCount; c++) {
              const cellText = rows[r][c] || '';
              const cellLines = pdf.splitTextToSize(cellText, columnWidth - (2 * cellPadding));
              const cellHeight = (cellLines.length * lineHeight) + (2 * cellPadding);
              maxRowHeight = Math.max(maxRowHeight, cellHeight);

              // Draw cell background
              pdf.rect(margin + (c * columnWidth), rowY, columnWidth, cellHeight, 'F');

              // Draw cell text
              pdf.text(cellLines, margin + (c * columnWidth) + cellPadding, rowY + cellPadding + 4);
            }

            rowY += maxRowHeight;

            // Check if we need a page break
            if (rowY > pageHeight - 30 && r < rows.length - 1) {
              pdf.addPage();
              rowY = margin;
            }
          }

          currentY = rowY + 10;
        }
      }
      else if (section.type === 'horizontal-rule') {
        // Handle horizontal rules
        if (currentY > pageHeight - 30) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.setDrawColor(180, 180, 180);
        pdf.setLineWidth(0.5);
        pdf.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 15;
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

// New function to process HTML content properly
function processHtmlContent(html) {
  const sections = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Process the DOM to extract structured content
  processNode(doc.body, sections);

  return sections;
}

// Helper function to process DOM nodes recursively
function processNode(node, sections, currentListItems = null) {
  if (!node) return;

  // Skip empty text nodes
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    if (text && !currentListItems && sections.length > 0 &&
      sections[sections.length - 1].type === 'paragraph') {
      // Append to the last paragraph if this is continued text
      sections[sections.length - 1].text += ' ' + text;
    } else if (text && !currentListItems) {
      sections.push({ type: 'paragraph', text });
    }
    return;
  }

  // Process element nodes
  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagName = node.tagName.toLowerCase();

    // Handle different element types
    if (tagName.match(/^h[1-6]$/)) {
      // Headings
      const level = parseInt(tagName.substring(1));
      sections.push({
        type: 'heading',
        level,
        text: node.textContent.trim()
      });
    }
    else if (tagName === 'p') {
      // Paragraphs
      const text = node.textContent.trim();
      if (text) {
        sections.push({ type: 'paragraph', text });
      }
    }
    else if (tagName === 'pre') {
      // Code blocks
      const codeNode = node.querySelector('code');
      const code = codeNode ? codeNode.textContent : node.textContent;
      if (code.trim()) {
        sections.push({ type: 'code', text: code });
      }
    }
    else if (tagName === 'code' && node.parentElement.tagName.toLowerCase() !== 'pre') {
      // Inline code - handled within paragraph text
      return;
    }
    else if (tagName === 'ul' || tagName === 'ol') {
      // Lists
      const items = [];
      const listType = { type: 'list', items, ordered: tagName === 'ol' };

      // Process list items
      const listItems = node.querySelectorAll('li');
      listItems.forEach(li => {
        items.push(li.textContent.trim());
      });

      if (items.length > 0) {
        sections.push(listType);
      }
    }
    else if (tagName === 'li' && currentListItems) {
      // List items - handled in the parent list processing
      currentListItems.push(node.textContent.trim());
    }
    else if (tagName === 'img') {
      // Images
      sections.push({
        type: 'image',
        alt: node.getAttribute('alt') || '',
        src: node.getAttribute('src') || ''
      });
    }
    else if (tagName === 'table') {
      // Tables
      const rows = [];
      const tableRows = node.querySelectorAll('tr');

      tableRows.forEach(tr => {
        const cells = [];
        const tableCells = tr.querySelectorAll('th, td');

        tableCells.forEach(cell => {
          cells.push(cell.textContent.trim());
        });

        if (cells.length > 0) {
          rows.push(cells);
        }
      });

      if (rows.length > 0) {
        sections.push({ type: 'table', rows });
      }
    }
    else if (tagName === 'hr') {
      // Horizontal rules
      sections.push({ type: 'horizontal-rule' });
    }
    else if (tagName === 'blockquote') {
      // Blockquotes - treat as special paragraphs
      const text = node.textContent.trim();
      if (text) {
        sections.push({
          type: 'paragraph',
          text: `"${text}"`,
          isBlockquote: true
        });
      }
    }
    else {
      // Process children for other elements
      const childNodes = node.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        processNode(childNodes[i], sections, currentListItems);
      }
    }
  }
}

function splitTextIntoSections(text) {
  const lines = text.split('\n');
  const sections = [];
  let currentSection = { type: 'paragraph', text: '' };
  let inCodeBlock = false;
  let inList = false;
  let listItems = [];

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
    const listMatch = /^(\d+\.\s+|[-+*•]\s+)(.+)$/.exec(trimmed);
    if (listMatch) {
      if (!inList) {
        if (currentSection.text.trim()) sections.push(currentSection);
        listItems = [listMatch[2].trim()];
        inList = true;
      } else {
        listItems.push(listMatch[2].trim());
      }
      continue;
    }

    // End of list on blank line
    if (trimmed === '' && inList) {
      sections.push({
        type: 'list',
        items: listItems,
        ordered: listItems.length > 0 && /^\d+\./.test(lines[i - listItems.length].trim())
      });
      listItems = [];
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

      // Add newlines between paragraphs instead of spaces
      if (currentSection.text) {
        currentSection.text += '\n' + trimmed;
      } else {
        currentSection.text = trimmed;
      }
    }
  }

  // Handle any remaining list
  if (inList && listItems.length > 0) {
    sections.push({
      type: 'list',
      items: listItems,
      ordered: /^\d+\./.test(lines[lines.length - listItems.length].trim())
    });
  }
  // Handle any remaining section
  else if (currentSection.text.trim()) {
    sections.push(currentSection);
  }

  return sections;
}

function formatContentToSections(rawContent) {
  const contentType = detectContentType(rawContent);
  if (!rawContent) return [];

  return splitTextIntoSections(rawContent);
}
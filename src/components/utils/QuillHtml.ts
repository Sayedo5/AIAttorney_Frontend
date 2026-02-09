// Quill HTML utilities for document editor

export const sanitizeQuillHtml = (html: string): string => {
  // Remove Quill-specific classes that might cause issues
  return html
    .replace(/class="ql-[^"]*"/g, "")
    .replace(/<p><br><\/p>/g, "<p></p>")
    .replace(/<p>\s*<\/p>/g, "");
};

export const convertQuillToDocx = (html: string): string => {
  // Convert Quill HTML to a format suitable for DOCX export
  let docxHtml = html;

  // Convert strong to b for better Word compatibility
  docxHtml = docxHtml.replace(/<strong>/g, "<b>").replace(/<\/strong>/g, "</b>");

  // Convert em to i
  docxHtml = docxHtml.replace(/<em>/g, "<i>").replace(/<\/em>/g, "</i>");

  // Handle lists
  docxHtml = docxHtml.replace(/<ul>/g, '<ul style="margin-left: 20px;">');
  docxHtml = docxHtml.replace(/<ol>/g, '<ol style="margin-left: 20px;">');

  return docxHtml;
};

export const convertQuillToPdf = (html: string): string => {
  // Convert Quill HTML to a format suitable for PDF export
  let pdfHtml = html;

  // Add default styling for PDF
  pdfHtml = `
    <style>
      body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; }
      h1 { font-size: 18pt; font-weight: bold; margin-bottom: 12pt; }
      h2 { font-size: 16pt; font-weight: bold; margin-bottom: 10pt; }
      h3 { font-size: 14pt; font-weight: bold; margin-bottom: 8pt; }
      p { margin-bottom: 8pt; text-align: justify; }
      ul, ol { margin-left: 20pt; margin-bottom: 8pt; }
      blockquote { margin-left: 20pt; font-style: italic; border-left: 2pt solid #ccc; padding-left: 10pt; }
    </style>
    ${pdfHtml}
  `;

  return pdfHtml;
};

export const extractTextFromQuillHtml = (html: string): string => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

export const countWords = (html: string): number => {
  const text = extractTextFromQuillHtml(html);
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const countCharacters = (html: string, includeSpaces: boolean = true): number => {
  const text = extractTextFromQuillHtml(html);
  return includeSpaces ? text.length : text.replace(/\s/g, "").length;
};

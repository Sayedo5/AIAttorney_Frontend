// Dummy text for testing and placeholders

export const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

export const legalLoremIpsum = `WHEREAS the parties hereto desire to enter into this Agreement for the purpose of setting forth their respective rights and obligations; and WHEREAS the parties have agreed to the terms and conditions set forth herein; NOW, THEREFORE, in consideration of the mutual covenants and agreements hereinafter set forth, the parties agree as follows:`;

export const shortLegalText = `This Agreement shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of laws principles.`;

export const disclaimerText = `The information provided herein is for general informational purposes only and should not be construed as legal advice. For specific legal matters, please consult with a qualified legal professional.`;

export const sampleCaseText = `In the matter of PLD 2023 Supreme Court 123, the Honorable Court held that the fundamental rights enshrined in the Constitution are to be interpreted in a manner that gives effect to their true purpose and intent. The Court further observed that procedural technicalities should not be allowed to defeat the ends of justice.`;

export const generateParagraphs = (count: number): string[] => {
  const paragraphs = [
    loremIpsum,
    legalLoremIpsum,
    shortLegalText,
    disclaimerText,
    sampleCaseText,
  ];
  
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(paragraphs[i % paragraphs.length]);
  }
  return result;
};

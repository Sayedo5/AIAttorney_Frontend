// Case-related helper utilities

export interface CaseReference {
  citation: string;
  year: number;
  court: string;
  volume?: string;
  page?: number;
}

export const parseCitation = (citation: string): CaseReference | null => {
  // Pattern: PLD 2023 Supreme Court 123 or 2023 SCMR 456
  const pldPattern = /^(PLD|MLD|CLC|SCMR|PCrLJ|YLR|PLJ)\s+(\d{4})\s+(.+?)\s+(\d+)$/i;
  const match = citation.match(pldPattern);

  if (match) {
    return {
      citation,
      volume: match[1].toUpperCase(),
      year: parseInt(match[2], 10),
      court: match[3],
      page: parseInt(match[4], 10),
    };
  }

  return null;
};

export const formatCitation = (ref: CaseReference): string => {
  if (ref.volume) {
    return `${ref.volume} ${ref.year} ${ref.court} ${ref.page}`;
  }
  return ref.citation;
};

export const getCaseStatusColor = (
  status: string
): { bg: string; text: string } => {
  const statusMap: Record<string, { bg: string; text: string }> = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
    ongoing: { bg: "bg-blue-100", text: "text-blue-800" },
    decided: { bg: "bg-green-100", text: "text-green-800" },
    disposed: { bg: "bg-gray-100", text: "text-gray-800" },
    urgent: { bg: "bg-red-100", text: "text-red-800" },
  };

  return statusMap[status.toLowerCase()] || { bg: "bg-gray-100", text: "text-gray-800" };
};

export const getPriorityColor = (
  priority: string
): { bg: string; text: string } => {
  const priorityMap: Record<string, { bg: string; text: string }> = {
    high: { bg: "bg-red-100", text: "text-red-800" },
    medium: { bg: "bg-yellow-100", text: "text-yellow-800" },
    low: { bg: "bg-green-100", text: "text-green-800" },
  };

  return priorityMap[priority.toLowerCase()] || { bg: "bg-gray-100", text: "text-gray-800" };
};

export const sortCasesByDate = <T extends { date: Date | string }>(
  cases: T[],
  ascending: boolean = true
): T[] => {
  return [...cases].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const filterCasesByStatus = <T extends { status: string }>(
  cases: T[],
  status: string
): T[] => {
  if (status === "all") return cases;
  return cases.filter((c) => c.status.toLowerCase() === status.toLowerCase());
};

export const groupCasesByCourt = <T extends { court: string }>(
  cases: T[]
): Record<string, T[]> => {
  return cases.reduce((groups, caseItem) => {
    const court = caseItem.court;
    if (!groups[court]) {
      groups[court] = [];
    }
    groups[court].push(caseItem);
    return groups;
  }, {} as Record<string, T[]>);
};

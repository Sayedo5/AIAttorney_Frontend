export interface DrafterTemplate {
  id: string;
  title: string;
  titleUrdu?: string;
  category: string;
  description: string;
  fields: TemplateField[];
  content: string;
}

export interface TemplateField {
  id: string;
  label: string;
  labelUrdu?: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export const drafterCategories = [
  { id: 'all', label: 'All', labelUrdu: 'تمام' },
  { id: 'agreement', label: 'Agreement/Contract', labelUrdu: 'معاہدہ' },
  { id: 'application', label: 'Application/Petition', labelUrdu: 'درخواست' },
  { id: 'business', label: 'Business/Commercial', labelUrdu: 'کاروباری' },
  { id: 'email', label: 'Email/Letter', labelUrdu: 'خط' },
  { id: 'general', label: 'General', labelUrdu: 'عمومی' },
  { id: 'property', label: 'Property', labelUrdu: 'جائیداد' },
  { id: 'family', label: 'Family', labelUrdu: 'خاندانی' },
  { id: 'criminal', label: 'Criminal', labelUrdu: 'فوجداری' },
  { id: 'civil', label: 'Civil', labelUrdu: 'دیوانی' },
];

export const drafterTemplates: DrafterTemplate[] = [
  {
    id: 'rental-agreement',
    title: 'Rental Agreement',
    titleUrdu: 'کرایہ نامہ',
    category: 'agreement',
    description: 'Standard rental/lease agreement for residential or commercial property',
    fields: [
      { id: 'landlordName', label: 'Landlord Name', labelUrdu: 'مالک مکان کا نام', type: 'text', required: true },
      { id: 'tenantName', label: 'Tenant Name', labelUrdu: 'کرایہ دار کا نام', type: 'text', required: true },
      { id: 'propertyAddress', label: 'Property Address', labelUrdu: 'جائیداد کا پتہ', type: 'textarea', required: true },
      { id: 'monthlyRent', label: 'Monthly Rent (PKR)', labelUrdu: 'ماہانہ کرایہ', type: 'number', required: true },
      { id: 'securityDeposit', label: 'Security Deposit (PKR)', labelUrdu: 'سیکیورٹی ڈپازٹ', type: 'number', required: true },
      { id: 'leaseStartDate', label: 'Lease Start Date', labelUrdu: 'کرایہ شروع ہونے کی تاریخ', type: 'date', required: true },
      { id: 'leaseDuration', label: 'Lease Duration', labelUrdu: 'مدت کرایہ', type: 'select', options: ['6 Months', '1 Year', '2 Years', '3 Years'], required: true },
    ],
    content: `RENTAL AGREEMENT

This Rental Agreement is made on {{leaseStartDate}} between:

LANDLORD: {{landlordName}}
TENANT: {{tenantName}}

PROPERTY: {{propertyAddress}}

TERMS:
1. Monthly Rent: PKR {{monthlyRent}}/-
2. Security Deposit: PKR {{securityDeposit}}/-
3. Duration: {{leaseDuration}} from {{leaseStartDate}}

_______________________          _______________________
Landlord                              Tenant`,
  },
  {
    id: 'power-of-attorney',
    title: 'Power of Attorney',
    titleUrdu: 'مختار نامہ',
    category: 'general',
    description: 'General or special power of attorney document',
    fields: [
      { id: 'principalName', label: 'Principal Name', type: 'text', required: true },
      { id: 'agentName', label: 'Agent Name', type: 'text', required: true },
      { id: 'powers', label: 'Powers Granted', type: 'textarea', required: true },
      { id: 'executionDate', label: 'Date', type: 'date', required: true },
    ],
    content: `POWER OF ATTORNEY

I, {{principalName}}, hereby appoint {{agentName}} as my Attorney with the following powers:

{{powers}}

Executed on {{executionDate}}.

_______________________
Principal Signature`,
  },
  {
    id: 'bail-application',
    title: 'Bail Application',
    titleUrdu: 'ضمانت کی درخواست',
    category: 'application',
    description: 'Application for bail before magistrate or sessions court',
    fields: [
      { id: 'courtName', label: 'Court Name', type: 'text', required: true },
      { id: 'applicantName', label: 'Applicant Name', type: 'text', required: true },
      { id: 'firNo', label: 'FIR Number', type: 'text', required: true },
      { id: 'policeStation', label: 'Police Station', type: 'text', required: true },
      { id: 'sections', label: 'Sections', type: 'text', required: true },
      { id: 'grounds', label: 'Grounds for Bail', type: 'textarea', required: true },
    ],
    content: `IN THE {{courtName}}

BAIL APPLICATION

Applicant: {{applicantName}}
FIR No: {{firNo}}
Police Station: {{policeStation}}
Sections: {{sections}}

GROUNDS FOR BAIL:
{{grounds}}

PRAYER: Grant bail to the applicant.

_______________________
Applicant/Counsel`,
  },
  {
    id: 'legal-notice',
    title: 'Legal Notice',
    titleUrdu: 'قانونی نوٹس',
    category: 'email',
    description: 'Formal legal notice template',
    fields: [
      { id: 'senderName', label: 'Sender Name', type: 'text', required: true },
      { id: 'recipientName', label: 'Recipient Name', type: 'text', required: true },
      { id: 'subject', label: 'Subject', type: 'text', required: true },
      { id: 'facts', label: 'Facts', type: 'textarea', required: true },
      { id: 'demand', label: 'Demand', type: 'textarea', required: true },
    ],
    content: `LEGAL NOTICE

From: {{senderName}}
To: {{recipientName}}
Subject: {{subject}}

FACTS:
{{facts}}

DEMAND:
{{demand}}

Comply within 15 days or face legal action.

_______________________
Advocate`,
  },
  {
    id: 'affidavit',
    title: 'General Affidavit',
    titleUrdu: 'عام حلف نامہ',
    category: 'general',
    description: 'General purpose sworn statement',
    fields: [
      { id: 'deponentName', label: 'Deponent Name', type: 'text', required: true },
      { id: 'statements', label: 'Statements', type: 'textarea', required: true },
      { id: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    content: `AFFIDAVIT

I, {{deponentName}}, do hereby affirm:

{{statements}}

Purpose: {{purpose}}

_______________________
DEPONENT`,
  },
];

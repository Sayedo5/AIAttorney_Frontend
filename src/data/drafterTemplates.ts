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
  // Agreement/Contract Templates
  {
    id: 'rental-agreement',
    title: 'Rental Agreement',
    titleUrdu: 'کرایہ نامہ',
    category: 'agreement',
    description: 'Standard rental/lease agreement for residential or commercial property',
    fields: [
      { id: 'landlordName', label: 'Landlord Name', labelUrdu: 'مالک مکان کا نام', type: 'text', required: true },
      { id: 'landlordCnic', label: 'Landlord CNIC', labelUrdu: 'مالک مکان کا شناختی کارڈ', type: 'text', required: true },
      { id: 'landlordAddress', label: 'Landlord Address', labelUrdu: 'مالک مکان کا پتہ', type: 'textarea', required: true },
      { id: 'tenantName', label: 'Tenant Name', labelUrdu: 'کرایہ دار کا نام', type: 'text', required: true },
      { id: 'tenantCnic', label: 'Tenant CNIC', labelUrdu: 'کرایہ دار کا شناختی کارڈ', type: 'text', required: true },
      { id: 'tenantAddress', label: 'Tenant Address', labelUrdu: 'کرایہ دار کا پتہ', type: 'textarea', required: true },
      { id: 'propertyAddress', label: 'Property Address', labelUrdu: 'جائیداد کا پتہ', type: 'textarea', required: true },
      { id: 'monthlyRent', label: 'Monthly Rent (PKR)', labelUrdu: 'ماہانہ کرایہ', type: 'number', required: true },
      { id: 'securityDeposit', label: 'Security Deposit (PKR)', labelUrdu: 'سیکیورٹی ڈپازٹ', type: 'number', required: true },
      { id: 'leaseStartDate', label: 'Lease Start Date', labelUrdu: 'کرایہ شروع ہونے کی تاریخ', type: 'date', required: true },
      { id: 'leaseDuration', label: 'Lease Duration', labelUrdu: 'مدت کرایہ', type: 'select', options: ['6 Months', '1 Year', '2 Years', '3 Years'], required: true },
    ],
    content: `RENTAL AGREEMENT

This Rental Agreement is made and executed on this {{leaseStartDate}} between:

LANDLORD:
Name: {{landlordName}}
CNIC: {{landlordCnic}}
Address: {{landlordAddress}}
(Hereinafter referred to as the "Landlord")

AND

TENANT:
Name: {{tenantName}}
CNIC: {{tenantCnic}}
Address: {{tenantAddress}}
(Hereinafter referred to as the "Tenant")

PROPERTY DETAILS:
{{propertyAddress}}

TERMS AND CONDITIONS:

1. RENT: The Tenant agrees to pay a monthly rent of PKR {{monthlyRent}}/- (Rupees {{monthlyRent}} only) payable in advance by the 5th of each month.

2. SECURITY DEPOSIT: The Tenant has paid a security deposit of PKR {{securityDeposit}}/- (Rupees {{securityDeposit}} only), refundable at the end of tenancy subject to deductions for damages.

3. DURATION: This agreement shall be valid for {{leaseDuration}} from {{leaseStartDate}}.

4. UTILITIES: All utility bills shall be paid by the Tenant.

5. MAINTENANCE: Minor repairs up to PKR 5,000/- shall be borne by the Tenant. Major repairs shall be the responsibility of the Landlord.

6. TERMINATION: Either party may terminate this agreement with 30 days written notice.

IN WITNESS WHEREOF, the parties have signed this agreement.

_______________________          _______________________
Landlord Signature                    Tenant Signature

WITNESSES:
1. _______________________
2. _______________________`,
  },
  {
    id: 'sale-deed',
    title: 'Sale Deed',
    titleUrdu: 'فروخت نامہ',
    category: 'property',
    description: 'Property sale deed for transfer of ownership',
    fields: [
      { id: 'sellerName', label: 'Seller Name', type: 'text', required: true },
      { id: 'sellerCnic', label: 'Seller CNIC', type: 'text', required: true },
      { id: 'sellerAddress', label: 'Seller Address', type: 'textarea', required: true },
      { id: 'buyerName', label: 'Buyer Name', type: 'text', required: true },
      { id: 'buyerCnic', label: 'Buyer CNIC', type: 'text', required: true },
      { id: 'buyerAddress', label: 'Buyer Address', type: 'textarea', required: true },
      { id: 'propertyDescription', label: 'Property Description', type: 'textarea', required: true },
      { id: 'salePrice', label: 'Sale Price (PKR)', type: 'number', required: true },
      { id: 'saleDate', label: 'Sale Date', type: 'date', required: true },
    ],
    content: `SALE DEED

This Sale Deed is executed on {{saleDate}} between:

SELLER:
{{sellerName}}
CNIC: {{sellerCnic}}
Address: {{sellerAddress}}

BUYER:
{{buyerName}}
CNIC: {{buyerCnic}}
Address: {{buyerAddress}}

PROPERTY DESCRIPTION:
{{propertyDescription}}

CONSIDERATION:
The total sale price agreed upon is PKR {{salePrice}}/- (Rupees {{salePrice}} only).

TERMS:
1. The Seller hereby transfers all rights, title, and interest in the property to the Buyer.
2. The Seller warrants clear and marketable title.
3. All dues up to the date of sale have been cleared by the Seller.

SIGNATURES:

_______________________
Seller

_______________________
Buyer

WITNESSES:
1. _______________________
2. _______________________`,
  },
  {
    id: 'power-of-attorney',
    title: 'Power of Attorney',
    titleUrdu: 'مختار نامہ',
    category: 'general',
    description: 'General or special power of attorney document',
    fields: [
      { id: 'principalName', label: 'Principal Name', type: 'text', required: true },
      { id: 'principalCnic', label: 'Principal CNIC', type: 'text', required: true },
      { id: 'principalAddress', label: 'Principal Address', type: 'textarea', required: true },
      { id: 'agentName', label: 'Agent/Attorney Name', type: 'text', required: true },
      { id: 'agentCnic', label: 'Agent CNIC', type: 'text', required: true },
      { id: 'agentAddress', label: 'Agent Address', type: 'textarea', required: true },
      { id: 'powers', label: 'Powers Granted', type: 'textarea', required: true },
      { id: 'executionDate', label: 'Execution Date', type: 'date', required: true },
    ],
    content: `POWER OF ATTORNEY

Know all men by these presents that I, {{principalName}}, CNIC: {{principalCnic}}, residing at {{principalAddress}}, do hereby constitute and appoint:

{{agentName}}, CNIC: {{agentCnic}}, residing at {{agentAddress}}

as my true and lawful Attorney to act on my behalf with the following powers:

{{powers}}

This Power of Attorney shall remain in force until revoked in writing.

Executed on {{executionDate}}.

_______________________
Principal Signature

WITNESSES:
1. _______________________
2. _______________________`,
  },
  {
    id: 'employment-contract',
    title: 'Employment Contract',
    titleUrdu: 'ملازمت کا معاہدہ',
    category: 'business',
    description: 'Standard employment agreement template',
    fields: [
      { id: 'companyName', label: 'Company Name', type: 'text', required: true },
      { id: 'companyAddress', label: 'Company Address', type: 'textarea', required: true },
      { id: 'employeeName', label: 'Employee Name', type: 'text', required: true },
      { id: 'employeeCnic', label: 'Employee CNIC', type: 'text', required: true },
      { id: 'position', label: 'Position/Designation', type: 'text', required: true },
      { id: 'salary', label: 'Monthly Salary (PKR)', type: 'number', required: true },
      { id: 'startDate', label: 'Start Date', type: 'date', required: true },
      { id: 'probationPeriod', label: 'Probation Period', type: 'select', options: ['1 Month', '3 Months', '6 Months'], required: true },
    ],
    content: `EMPLOYMENT CONTRACT

This Employment Contract is entered into on {{startDate}} between:

EMPLOYER:
{{companyName}}
{{companyAddress}}

EMPLOYEE:
{{employeeName}}
CNIC: {{employeeCnic}}

TERMS OF EMPLOYMENT:

1. POSITION: {{position}}
2. SALARY: PKR {{salary}}/- per month
3. PROBATION: {{probationPeriod}}
4. WORKING HOURS: 9:00 AM to 6:00 PM, Monday to Friday
5. LEAVE: As per company policy

SIGNATURES:

_______________________          _______________________
Employer                              Employee`,
  },
  {
    id: 'partnership-deed',
    title: 'Partnership Deed',
    titleUrdu: 'شراکت نامہ',
    category: 'business',
    description: 'Partnership agreement between business partners',
    fields: [
      { id: 'partner1Name', label: 'First Partner Name', type: 'text', required: true },
      { id: 'partner1Cnic', label: 'First Partner CNIC', type: 'text', required: true },
      { id: 'partner1Share', label: 'First Partner Share (%)', type: 'number', required: true },
      { id: 'partner2Name', label: 'Second Partner Name', type: 'text', required: true },
      { id: 'partner2Cnic', label: 'Second Partner CNIC', type: 'text', required: true },
      { id: 'partner2Share', label: 'Second Partner Share (%)', type: 'number', required: true },
      { id: 'businessName', label: 'Business Name', type: 'text', required: true },
      { id: 'businessNature', label: 'Nature of Business', type: 'text', required: true },
      { id: 'capital', label: 'Total Capital (PKR)', type: 'number', required: true },
      { id: 'startDate', label: 'Partnership Start Date', type: 'date', required: true },
    ],
    content: `PARTNERSHIP DEED

This Partnership Deed is made on {{startDate}} between:

PARTNER 1:
{{partner1Name}}, CNIC: {{partner1Cnic}}
Share: {{partner1Share}}%

PARTNER 2:
{{partner2Name}}, CNIC: {{partner2Cnic}}
Share: {{partner2Share}}%

BUSINESS DETAILS:
Name: {{businessName}}
Nature: {{businessNature}}
Total Capital: PKR {{capital}}/-

TERMS:
1. Profits and losses shall be shared according to the above percentages.
2. All major decisions require mutual consent.
3. Books of accounts shall be maintained and audited annually.

SIGNATURES:

_______________________          _______________________
Partner 1                              Partner 2`,
  },
  // Application/Petition Templates
  {
    id: 'bail-application',
    title: 'Bail Application',
    titleUrdu: 'ضمانت کی درخواست',
    category: 'application',
    description: 'Application for bail before magistrate or sessions court',
    fields: [
      { id: 'courtName', label: 'Court Name', type: 'text', required: true },
      { id: 'applicantName', label: 'Applicant Name', type: 'text', required: true },
      { id: 'fatherName', label: 'Father\'s Name', type: 'text', required: true },
      { id: 'cnic', label: 'CNIC', type: 'text', required: true },
      { id: 'address', label: 'Address', type: 'textarea', required: true },
      { id: 'firNo', label: 'FIR Number', type: 'text', required: true },
      { id: 'policeStation', label: 'Police Station', type: 'text', required: true },
      { id: 'sections', label: 'Sections/Offences', type: 'text', required: true },
      { id: 'dateOfArrest', label: 'Date of Arrest', type: 'date', required: true },
      { id: 'grounds', label: 'Grounds for Bail', type: 'textarea', required: true },
    ],
    content: `IN THE {{courtName}}

BAIL APPLICATION

In the matter of:
{{applicantName}} s/o {{fatherName}}
CNIC: {{cnic}}
Address: {{address}}
...Applicant

Versus

The State
...Respondent

FIR No: {{firNo}}
Police Station: {{policeStation}}
Sections: {{sections}}
Date of Arrest: {{dateOfArrest}}

RESPECTFULLY SHEWETH:

1. The applicant has been arrested in the above-mentioned FIR.

2. GROUNDS FOR BAIL:
{{grounds}}

3. The applicant is ready to furnish bail bonds to the satisfaction of this Honorable Court.

PRAYER:
It is most respectfully prayed that the applicant may kindly be released on bail.

_______________________
Applicant/Counsel`,
  },
  {
    id: 'writ-petition',
    title: 'Writ Petition',
    titleUrdu: 'رٹ پٹیشن',
    category: 'application',
    description: 'Constitutional petition for High Court',
    fields: [
      { id: 'petitionerName', label: 'Petitioner Name', type: 'text', required: true },
      { id: 'petitionerAddress', label: 'Petitioner Address', type: 'textarea', required: true },
      { id: 'respondent1', label: 'Respondent 1', type: 'text', required: true },
      { id: 'respondent2', label: 'Respondent 2', type: 'text' },
      { id: 'fundamentalRight', label: 'Fundamental Right Violated', type: 'text', required: true },
      { id: 'facts', label: 'Brief Facts', type: 'textarea', required: true },
      { id: 'relief', label: 'Relief Sought', type: 'textarea', required: true },
    ],
    content: `IN THE HIGH COURT OF [PROVINCE]

WRIT PETITION NO. _____ OF 20__

{{petitionerName}}
{{petitionerAddress}}
...Petitioner

Versus

1. {{respondent1}}
2. {{respondent2}}
...Respondents

PETITION UNDER ARTICLE 199 OF THE CONSTITUTION

1. INTRODUCTION:
This petition is filed for enforcement of fundamental rights under Article {{fundamentalRight}} of the Constitution.

2. FACTS:
{{facts}}

3. RELIEF SOUGHT:
{{relief}}

_______________________
Petitioner/Advocate`,
  },
  {
    id: 'legal-notice',
    title: 'Legal Notice',
    titleUrdu: 'قانونی نوٹس',
    category: 'email',
    description: 'Formal legal notice template',
    fields: [
      { id: 'senderName', label: 'Sender Name', type: 'text', required: true },
      { id: 'senderAddress', label: 'Sender Address', type: 'textarea', required: true },
      { id: 'recipientName', label: 'Recipient Name', type: 'text', required: true },
      { id: 'recipientAddress', label: 'Recipient Address', type: 'textarea', required: true },
      { id: 'subject', label: 'Subject', type: 'text', required: true },
      { id: 'facts', label: 'Facts of the Case', type: 'textarea', required: true },
      { id: 'demand', label: 'Demand/Relief', type: 'textarea', required: true },
      { id: 'deadline', label: 'Response Deadline (Days)', type: 'number', required: true },
    ],
    content: `LEGAL NOTICE

From:
{{senderName}}
{{senderAddress}}

To:
{{recipientName}}
{{recipientAddress}}

Subject: {{subject}}

Under Instructions from my client, I hereby serve upon you the following Legal Notice:

FACTS:
{{facts}}

DEMAND:
{{demand}}

You are hereby called upon to comply with the above demand within {{deadline}} days of receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you at your risk and cost.

_______________________
Advocate for the Sender`,
  },
  {
    id: 'affidavit',
    title: 'General Affidavit',
    titleUrdu: 'عام حلف نامہ',
    category: 'general',
    description: 'General purpose sworn statement',
    fields: [
      { id: 'deponentName', label: 'Deponent Name', type: 'text', required: true },
      { id: 'fatherName', label: 'Father\'s Name', type: 'text', required: true },
      { id: 'cnic', label: 'CNIC', type: 'text', required: true },
      { id: 'address', label: 'Address', type: 'textarea', required: true },
      { id: 'statements', label: 'Statements (one per line)', type: 'textarea', required: true },
      { id: 'purpose', label: 'Purpose of Affidavit', type: 'text', required: true },
    ],
    content: `AFFIDAVIT

I, {{deponentName}} s/o {{fatherName}}, CNIC: {{cnic}}, resident of {{address}}, do hereby solemnly affirm and declare as under:

{{statements}}

This affidavit is made for the purpose of {{purpose}}.

I verify that the contents of this affidavit are true and correct to the best of my knowledge and belief.

_______________________
DEPONENT

VERIFICATION:
Verified on oath at _____________ on this ___ day of _________, 20__.

_______________________
Oath Commissioner`,
  },
  {
    id: 'divorce-deed',
    title: 'Divorce Deed (Talaq Nama)',
    titleUrdu: 'طلاق نامہ',
    category: 'family',
    description: 'Divorce deed under Muslim Family Laws',
    fields: [
      { id: 'husbandName', label: 'Husband Name', type: 'text', required: true },
      { id: 'husbandCnic', label: 'Husband CNIC', type: 'text', required: true },
      { id: 'husbandAddress', label: 'Husband Address', type: 'textarea', required: true },
      { id: 'wifeName', label: 'Wife Name', type: 'text', required: true },
      { id: 'wifeCnic', label: 'Wife CNIC', type: 'text', required: true },
      { id: 'wifeAddress', label: 'Wife Address', type: 'textarea', required: true },
      { id: 'marriageDate', label: 'Date of Marriage', type: 'date', required: true },
      { id: 'divorceDate', label: 'Date of Divorce', type: 'date', required: true },
      { id: 'dowerAmount', label: 'Dower Amount (PKR)', type: 'number', required: true },
    ],
    content: `DIVORCE DEED (TALAQ NAMA)

This deed is executed on {{divorceDate}} for dissolution of marriage.

HUSBAND:
{{husbandName}}
CNIC: {{husbandCnic}}
Address: {{husbandAddress}}

WIFE:
{{wifeName}}
CNIC: {{wifeCnic}}
Address: {{wifeAddress}}

MARRIAGE DETAILS:
Date of Marriage: {{marriageDate}}

DIVORCE:
The husband hereby pronounces divorce (Talaq) in accordance with Islamic Shariat and Muslim Family Laws Ordinance, 1961.

DOWER:
The husband agrees to pay the dower amount of PKR {{dowerAmount}}/-.

IDDAT:
The wife shall observe iddat as per Islamic law.

NOTICE:
A copy of this deed shall be sent to the Chairman, Arbitration Council as required by law.

_______________________          _______________________
Husband                              Wife

WITNESSES:
1. _______________________
2. _______________________`,
  },
  {
    id: 'nikkah-nama',
    title: 'Marriage Contract (Nikkah Nama)',
    titleUrdu: 'نکاح نامہ',
    category: 'family',
    description: 'Islamic marriage contract template',
    fields: [
      { id: 'groomName', label: 'Groom Name', type: 'text', required: true },
      { id: 'groomFatherName', label: 'Groom Father\'s Name', type: 'text', required: true },
      { id: 'groomCnic', label: 'Groom CNIC', type: 'text', required: true },
      { id: 'brideName', label: 'Bride Name', type: 'text', required: true },
      { id: 'brideFatherName', label: 'Bride Father\'s Name', type: 'text', required: true },
      { id: 'brideCnic', label: 'Bride CNIC', type: 'text', required: true },
      { id: 'mehrAmount', label: 'Mehr Amount (PKR)', type: 'number', required: true },
      { id: 'nikkahDate', label: 'Nikkah Date', type: 'date', required: true },
    ],
    content: `MARRIAGE CONTRACT (NIKKAH NAMA)

Date of Nikkah: {{nikkahDate}}

GROOM:
Name: {{groomName}}
S/o: {{groomFatherName}}
CNIC: {{groomCnic}}

BRIDE:
Name: {{brideName}}
D/o: {{brideFatherName}}
CNIC: {{brideCnic}}

MEHR:
The Mehr amount agreed upon is PKR {{mehrAmount}}/- (Rupees {{mehrAmount}} only).

This marriage is solemnized in accordance with Islamic Shariat.

_______________________          _______________________
Groom                                  Bride

NIKAH KHWAN: _______________________

WITNESSES:
1. _______________________
2. _______________________`,
  },
  {
    id: 'fir-complaint',
    title: 'FIR Complaint',
    titleUrdu: 'ایف آئی آر درخواست',
    category: 'criminal',
    description: 'First Information Report complaint template',
    fields: [
      { id: 'complainantName', label: 'Complainant Name', type: 'text', required: true },
      { id: 'complainantCnic', label: 'Complainant CNIC', type: 'text', required: true },
      { id: 'complainantAddress', label: 'Complainant Address', type: 'textarea', required: true },
      { id: 'accusedName', label: 'Accused Name(s)', type: 'text', required: true },
      { id: 'incidentDate', label: 'Date of Incident', type: 'date', required: true },
      { id: 'incidentPlace', label: 'Place of Incident', type: 'text', required: true },
      { id: 'incidentDetails', label: 'Details of Incident', type: 'textarea', required: true },
      { id: 'policeStation', label: 'Police Station', type: 'text', required: true },
    ],
    content: `APPLICATION FOR REGISTRATION OF FIR

To:
The Station House Officer
{{policeStation}}

COMPLAINANT:
{{complainantName}}
CNIC: {{complainantCnic}}
Address: {{complainantAddress}}

ACCUSED:
{{accusedName}}

DETAILS OF INCIDENT:
Date: {{incidentDate}}
Place: {{incidentPlace}}

{{incidentDetails}}

PRAYER:
It is requested that an FIR may kindly be registered against the accused under relevant sections of Pakistan Penal Code.

_______________________
Complainant Signature`,
  },
  {
    id: 'civil-suit',
    title: 'Civil Suit Plaint',
    titleUrdu: 'دیوانی مقدمہ',
    category: 'civil',
    description: 'Civil suit plaint for recovery or declaration',
    fields: [
      { id: 'courtName', label: 'Court Name', type: 'text', required: true },
      { id: 'plaintiffName', label: 'Plaintiff Name', type: 'text', required: true },
      { id: 'plaintiffAddress', label: 'Plaintiff Address', type: 'textarea', required: true },
      { id: 'defendantName', label: 'Defendant Name', type: 'text', required: true },
      { id: 'defendantAddress', label: 'Defendant Address', type: 'textarea', required: true },
      { id: 'suitValue', label: 'Suit Value (PKR)', type: 'number', required: true },
      { id: 'causeOfAction', label: 'Cause of Action', type: 'textarea', required: true },
      { id: 'relief', label: 'Relief Sought', type: 'textarea', required: true },
    ],
    content: `IN THE {{courtName}}

CIVIL SUIT NO. _____ OF 20__

{{plaintiffName}}
{{plaintiffAddress}}
...Plaintiff

Versus

{{defendantName}}
{{defendantAddress}}
...Defendant

SUIT FOR RECOVERY/DECLARATION

Value of Suit: PKR {{suitValue}}/-

1. PARTIES:
[Details of parties]

2. CAUSE OF ACTION:
{{causeOfAction}}

3. RELIEF SOUGHT:
{{relief}}

PRAYER:
It is most respectfully prayed that this Honorable Court may be pleased to:
[List specific prayers]

_______________________
Plaintiff/Advocate`,
  },
];

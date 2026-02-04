import { DrafterTemplate } from './drafterTemplates';

export const newPakistaniTemplates: DrafterTemplate[] = [
  {
    id: 'cheque-dishonor-notice',
    title: 'Cheque Dishonor Notice',
    titleUrdu: 'چیک کی عدم ادائیگی کا نوٹس',
    category: 'email',
    description: 'Legal notice under Section 489-F PPC for dishonored cheque',
    fields: [
      { id: 'senderName', label: 'Complainant Name', labelUrdu: 'شکایت کنندہ کا نام', type: 'text', required: true },
      { id: 'senderCnic', label: 'Complainant CNIC', labelUrdu: 'شکایت کنندہ کا شناختی کارڈ', type: 'text', required: true },
      { id: 'senderAddress', label: 'Complainant Address', labelUrdu: 'شکایت کنندہ کا پتہ', type: 'textarea', required: true },
      { id: 'recipientName', label: 'Drawer Name', labelUrdu: 'چیک جاری کرنے والے کا نام', type: 'text', required: true },
      { id: 'recipientCnic', label: 'Drawer CNIC', labelUrdu: 'چیک جاری کرنے والے کا شناختی کارڈ', type: 'text', required: true },
      { id: 'recipientAddress', label: 'Drawer Address', labelUrdu: 'چیک جاری کرنے والے کا پتہ', type: 'textarea', required: true },
      { id: 'chequeNo', label: 'Cheque Number', labelUrdu: 'چیک نمبر', type: 'text', required: true },
      { id: 'chequeDate', label: 'Cheque Date', labelUrdu: 'چیک کی تاریخ', type: 'date', required: true },
      { id: 'chequeAmount', label: 'Cheque Amount (PKR)', labelUrdu: 'چیک کی رقم', type: 'number', required: true },
      { id: 'bankName', label: 'Bank Name', labelUrdu: 'بینک کا نام', type: 'text', required: true },
      { id: 'branchName', label: 'Branch Name', labelUrdu: 'برانچ کا نام', type: 'text', required: true },
      { id: 'dishonorDate', label: 'Date of Dishonor', labelUrdu: 'عدم ادائیگی کی تاریخ', type: 'date', required: true },
      { id: 'dishonorReason', label: 'Reason for Dishonor', labelUrdu: 'عدم ادائیگی کی وجہ', type: 'select', options: ['Insufficient Funds', 'Account Closed', 'Payment Stopped', 'Signature Mismatch', 'Other'], required: true },
    ],
    content: `LEGAL NOTICE UNDER SECTION 489-F PPC
(CHEQUE DISHONOR NOTICE)

Date: ______________

From:
{{senderName}}
CNIC: {{senderCnic}}
{{senderAddress}}
(Through Counsel)

To:
{{recipientName}}
CNIC: {{recipientCnic}}
{{recipientAddress}}

Subject: LEGAL NOTICE FOR DISHONOR OF CHEQUE NO. {{chequeNo}} DATED {{chequeDate}} FOR PKR {{chequeAmount}}/- UNDER SECTION 489-F PPC

Sir/Madam,

Under instructions from and on behalf of my client, I hereby serve upon you the following Legal Notice:

1. That you issued Cheque No. {{chequeNo}} dated {{chequeDate}} for an amount of PKR {{chequeAmount}}/- (Rupees {{chequeAmount}} only) drawn on {{bankName}}, {{branchName}} in favor of my client.

2. That when the said cheque was presented for encashment on {{dishonorDate}}, the same was returned/dishonored by the bank with the remarks "{{dishonorReason}}".

3. That the dishonor of the said cheque constitutes a criminal offense punishable under Section 489-F of the Pakistan Penal Code, 1860, which provides for imprisonment up to three years, or with fine, or with both.

4. That you are hereby called upon to make payment of the said amount of PKR {{chequeAmount}}/- within fifteen (15) days from the receipt of this notice, failing which my client shall be constrained to initiate criminal proceedings against you under Section 489-F PPC before the competent court of law.

5. That in addition to criminal proceedings, my client reserves the right to initiate civil proceedings for recovery of the said amount along with costs, interest, and damages.

6. That all costs incurred in connection with this matter shall be recoverable from you.

Take this notice seriously and govern yourself accordingly.

_______________________
ADVOCATE
Counsel for the Complainant

Copy to:
1. {{recipientName}} - by Registered Post A.D.
2. Office Record`,
  },
  {
    id: 'succession-certificate',
    title: 'Succession Certificate Application',
    titleUrdu: 'وراثت سرٹیفکیٹ کی درخواست',
    category: 'application',
    description: 'Application for succession certificate under Succession Act 1925',
    fields: [
      { id: 'courtName', label: 'Court Name', labelUrdu: 'عدالت کا نام', type: 'text', required: true },
      { id: 'applicantName', label: 'Applicant Name', labelUrdu: 'درخواست گزار کا نام', type: 'text', required: true },
      { id: 'applicantCnic', label: 'Applicant CNIC', labelUrdu: 'درخواست گزار کا شناختی کارڈ', type: 'text', required: true },
      { id: 'applicantAddress', label: 'Applicant Address', labelUrdu: 'درخواست گزار کا پتہ', type: 'textarea', required: true },
      { id: 'relationWithDeceased', label: 'Relation with Deceased', labelUrdu: 'مرحوم سے رشتہ', type: 'text', required: true },
      { id: 'deceasedName', label: 'Deceased Name', labelUrdu: 'مرحوم کا نام', type: 'text', required: true },
      { id: 'deceasedCnic', label: 'Deceased CNIC', labelUrdu: 'مرحوم کا شناختی کارڈ', type: 'text', required: true },
      { id: 'dateOfDeath', label: 'Date of Death', labelUrdu: 'وفات کی تاریخ', type: 'date', required: true },
      { id: 'placeOfDeath', label: 'Place of Death', labelUrdu: 'وفات کی جگہ', type: 'text', required: true },
      { id: 'lastResidence', label: 'Last Residence of Deceased', labelUrdu: 'مرحوم کی آخری رہائش', type: 'textarea', required: true },
      { id: 'assetsDescription', label: 'Description of Assets/Debts', labelUrdu: 'اثاثوں/قرضوں کی تفصیل', type: 'textarea', required: true },
      { id: 'legalHeirs', label: 'List of Legal Heirs', labelUrdu: 'قانونی وارثین کی فہرست', type: 'textarea', required: true },
    ],
    content: `IN THE {{courtName}}

SUCCESSION PETITION NO. _____ OF 20__

IN THE MATTER OF:
Application for Succession Certificate under Section 372 of the Succession Act, 1925

{{applicantName}}
CNIC: {{applicantCnic}}
{{applicantAddress}}
Relation: {{relationWithDeceased}}
...Petitioner

PETITION FOR GRANT OF SUCCESSION CERTIFICATE

RESPECTFULLY SHEWETH:

1. That the petitioner is the {{relationWithDeceased}} of the deceased {{deceasedName}}, CNIC: {{deceasedCnic}}, who expired on {{dateOfDeath}} at {{placeOfDeath}}.

2. That the deceased was permanently residing at {{lastResidence}} at the time of death.

3. That the deceased died intestate without leaving any Will.

4. That the deceased has left behind the following movable properties/debts:
{{assetsDescription}}

5. That the following are the legal heirs of the deceased:
{{legalHeirs}}

6. That the petitioner is filing this petition for grant of Succession Certificate to collect the movable property/debts due to the deceased.

7. That no other petition for Succession Certificate or Letters of Administration has been filed in any court regarding the estate of the deceased.

8. That the petitioner undertakes to indemnify the court against any claim that may arise.

9. That this Honorable Court has territorial jurisdiction to entertain and try this petition.

PRAYER:

It is, therefore, most respectfully prayed that this Honorable Court may graciously be pleased to:

(a) Grant Succession Certificate in favor of the petitioner for the collection of movable properties/debts of the deceased;
(b) Any other relief deemed fit and proper.

_______________________
PETITIONER

VERIFICATION:

I, {{applicantName}}, the petitioner above named, do hereby solemnly verify that the contents of the above petition are true and correct to the best of my knowledge and belief.

Verified at _____________ on this ___ day of _________, 20__.

_______________________
PETITIONER`,
  },
  {
    id: 'khula-petition',
    title: 'Khula Petition',
    titleUrdu: 'خلع کی درخواست',
    category: 'family',
    description: "Petition for dissolution of marriage at wife's instance (Khula)",
    fields: [
      { id: 'courtName', label: 'Court Name', labelUrdu: 'عدالت کا نام', type: 'text', required: true },
      { id: 'wifeName', label: 'Wife/Petitioner Name', labelUrdu: 'بیوی/درخواست گزار کا نام', type: 'text', required: true },
      { id: 'wifeCnic', label: 'Wife CNIC', labelUrdu: 'بیوی کا شناختی کارڈ', type: 'text', required: true },
      { id: 'wifeAddress', label: 'Wife Address', labelUrdu: 'بیوی کا پتہ', type: 'textarea', required: true },
      { id: 'wifeFatherName', label: "Wife's Father Name", labelUrdu: 'بیوی کے والد کا نام', type: 'text', required: true },
      { id: 'husbandName', label: 'Husband/Respondent Name', labelUrdu: 'شوہر/مدعا علیہ کا نام', type: 'text', required: true },
      { id: 'husbandCnic', label: 'Husband CNIC', labelUrdu: 'شوہر کا شناختی کارڈ', type: 'text', required: true },
      { id: 'husbandAddress', label: 'Husband Address', labelUrdu: 'شوہر کا پتہ', type: 'textarea', required: true },
      { id: 'marriageDate', label: 'Date of Marriage', labelUrdu: 'نکاح کی تاریخ', type: 'date', required: true },
      { id: 'dowerAmount', label: 'Dower (Haq Mehr) Amount', labelUrdu: 'حق مہر کی رقم', type: 'text', required: true },
      { id: 'childrenDetails', label: 'Children Details (if any)', labelUrdu: 'بچوں کی تفصیلات', type: 'textarea' },
      { id: 'groundsForKhula', label: 'Grounds for Khula', labelUrdu: 'خلع کی وجوہات', type: 'textarea', required: true },
    ],
    content: `IN THE {{courtName}}

SUIT NO. _____ OF 20__

IN THE MATTER OF:
Dissolution of Marriage at the Instance of Wife (Khula)
Under Section 10 of the Dissolution of Muslim Marriages Act, 1939

{{wifeName}} d/o {{wifeFatherName}}
CNIC: {{wifeCnic}}
{{wifeAddress}}
...Petitioner/Wife

Versus

{{husbandName}}
CNIC: {{husbandCnic}}
{{husbandAddress}}
...Respondent/Husband

PETITION FOR KHULA

RESPECTFULLY SHEWETH:

1. That the petitioner is a Muslim female and was married to the respondent on {{marriageDate}} according to Muslim rites and ceremonies.

2. That the Dower (Haq Mehr) was fixed at {{dowerAmount}} at the time of Nikah.

3. That the following children were born out of the wedlock:
{{childrenDetails}}

4. GROUNDS FOR KHULA:
{{groundsForKhula}}

5. That it has become impossible for the petitioner to live with the respondent within the limits prescribed by Allah. The petitioner apprehends that if forced to continue living with the respondent, she will not be able to follow the injunctions of Islam.

6. That the petitioner is ready and willing to return/forgo the Dower (Haq Mehr) in consideration of Khula as per Islamic law.

7. That the petitioner has made several attempts at reconciliation but all efforts have failed.

8. That this Honorable Court has territorial jurisdiction to entertain and try this petition.

PRAYER:

It is, therefore, most respectfully prayed that this Honorable Court may graciously be pleased to:

(a) Dissolve the marriage between the petitioner and respondent by way of Khula;
(b) Direct the respondent to execute Khula Nama;
(c) Any other relief deemed fit and proper in the circumstances.

_______________________
PETITIONER/ADVOCATE

VERIFICATION:

I, {{wifeName}}, the petitioner above named, do hereby solemnly verify that the contents of paragraphs 1 to 8 are true and correct to the best of my knowledge and belief.

Verified at _____________ on this ___ day of _________, 20__.

_______________________
PETITIONER`,
  },
  {
    id: 'maintenance-application',
    title: 'Maintenance Application',
    titleUrdu: 'نان نفقہ کی درخواست',
    category: 'family',
    description: 'Application for maintenance of wife and children',
    fields: [
      { id: 'courtName', label: 'Court Name', labelUrdu: 'عدالت کا نام', type: 'text', required: true },
      { id: 'applicantName', label: 'Applicant Name', labelUrdu: 'درخواست گزار کا نام', type: 'text', required: true },
      { id: 'applicantCnic', label: 'Applicant CNIC', labelUrdu: 'درخواست گزار کا شناختی کارڈ', type: 'text', required: true },
      { id: 'applicantAddress', label: 'Applicant Address', labelUrdu: 'درخواست گزار کا پتہ', type: 'textarea', required: true },
      { id: 'respondentName', label: 'Respondent (Husband) Name', labelUrdu: 'مدعا علیہ کا نام', type: 'text', required: true },
      { id: 'respondentCnic', label: 'Respondent CNIC', labelUrdu: 'مدعا علیہ کا شناختی کارڈ', type: 'text', required: true },
      { id: 'respondentAddress', label: 'Respondent Address', labelUrdu: 'مدعا علیہ کا پتہ', type: 'textarea', required: true },
      { id: 'marriageDate', label: 'Date of Marriage', labelUrdu: 'نکاح کی تاریخ', type: 'date', required: true },
      { id: 'childrenDetails', label: 'Children Details', labelUrdu: 'بچوں کی تفصیلات', type: 'textarea', required: true },
      { id: 'respondentIncome', label: "Respondent's Approximate Income", labelUrdu: 'مدعا علیہ کی تقریباً آمدنی', type: 'number', required: true },
      { id: 'maintenanceAmount', label: 'Maintenance Amount Claimed (PKR)', labelUrdu: 'مطلوبہ نان نفقہ کی رقم', type: 'number', required: true },
    ],
    content: `IN THE {{courtName}}

APPLICATION NO. _____ OF 20__

IN THE MATTER OF:
Application for Maintenance under Section 9 of the Muslim Family Laws Ordinance, 1961

{{applicantName}}
CNIC: {{applicantCnic}}
{{applicantAddress}}
...Applicant

Versus

{{respondentName}}
CNIC: {{respondentCnic}}
{{respondentAddress}}
...Respondent

APPLICATION FOR MAINTENANCE

RESPECTFULLY SHEWETH:

1. That the applicant was married to the respondent on {{marriageDate}} according to Muslim rites and ceremonies.

2. That the following children were born out of the wedlock:
{{childrenDetails}}

3. That the respondent has willfully neglected and failed to provide maintenance to the applicant and the minor children despite having sufficient means.

4. That the respondent is earning approximately PKR {{respondentIncome}}/- per month and is fully capable of providing maintenance.

5. That the applicant has no independent source of income and is completely dependent on the respondent for her livelihood.

6. That the applicant requires a monthly maintenance of PKR {{maintenanceAmount}}/- for herself and the minor children for their food, clothing, shelter, education, and other basic necessities.

7. That despite repeated requests, the respondent has refused to provide any maintenance.

8. That this Honorable Court has territorial jurisdiction to entertain this application.

PRAYER:

It is, therefore, most respectfully prayed that this Honorable Court may graciously be pleased to:

(a) Direct the respondent to pay monthly maintenance of PKR {{maintenanceAmount}}/- to the applicant and children;
(b) Direct payment of past maintenance from the date of refusal;
(c) Any other relief deemed fit and proper.

_______________________
APPLICANT/ADVOCATE

VERIFICATION:

I, {{applicantName}}, do hereby verify that the contents of this application are true and correct to the best of my knowledge and belief.

Verified at _____________ on this ___ day of _________, 20__.

_______________________
APPLICANT`,
  },
  {
    id: 'guardianship-petition',
    title: 'Guardianship Petition',
    titleUrdu: 'سرپرستی کی درخواست',
    category: 'family',
    description: 'Petition for appointment as guardian of minor under Guardian and Wards Act',
    fields: [
      { id: 'courtName', label: 'Court Name', labelUrdu: 'عدالت کا نام', type: 'text', required: true },
      { id: 'petitionerName', label: 'Petitioner Name', labelUrdu: 'درخواست گزار کا نام', type: 'text', required: true },
      { id: 'petitionerCnic', label: 'Petitioner CNIC', labelUrdu: 'درخواست گزار کا شناختی کارڈ', type: 'text', required: true },
      { id: 'petitionerAddress', label: 'Petitioner Address', labelUrdu: 'درخواست گزار کا پتہ', type: 'textarea', required: true },
      { id: 'relationWithMinor', label: 'Relation with Minor', labelUrdu: 'نابالغ سے رشتہ', type: 'text', required: true },
      { id: 'minorName', label: "Minor's Name", labelUrdu: 'نابالغ کا نام', type: 'text', required: true },
      { id: 'minorDob', label: "Minor's Date of Birth", labelUrdu: 'نابالغ کی تاریخ پیدائش', type: 'date', required: true },
      { id: 'minorGender', label: "Minor's Gender", labelUrdu: 'نابالغ کی جنس', type: 'select', options: ['Male', 'Female'], required: true },
      { id: 'fatherStatus', label: "Father's Status", labelUrdu: 'والد کی حیثیت', type: 'select', options: ['Deceased', 'Alive', 'Unknown'], required: true },
      { id: 'motherStatus', label: "Mother's Status", labelUrdu: 'والدہ کی حیثیت', type: 'select', options: ['Deceased', 'Alive', 'Unknown'], required: true },
      { id: 'minorProperty', label: "Minor's Property Details", labelUrdu: 'نابالغ کی جائیداد کی تفصیل', type: 'textarea' },
      { id: 'grounds', label: 'Grounds for Guardianship', labelUrdu: 'سرپرستی کی وجوہات', type: 'textarea', required: true },
    ],
    content: `IN THE {{courtName}}

GUARDIANSHIP PETITION NO. _____ OF 20__

IN THE MATTER OF:
Appointment of Guardian under Section 7 of the Guardians and Wards Act, 1890

{{petitionerName}}
CNIC: {{petitionerCnic}}
{{petitionerAddress}}
...Petitioner

IN THE MATTER OF:
{{minorName}} (Minor)
Date of Birth: {{minorDob}}
Gender: {{minorGender}}

PETITION FOR APPOINTMENT AS GUARDIAN

RESPECTFULLY SHEWETH:

1. That the petitioner is the {{relationWithMinor}} of the minor {{minorName}}, born on {{minorDob}}.

2. That the natural father of the minor is {{fatherStatus}}.

3. That the natural mother of the minor is {{motherStatus}}.

4. That the minor is in possession of the following property:
{{minorProperty}}

5. GROUNDS FOR GUARDIANSHIP:
{{grounds}}

6. That it is in the best interest and welfare of the minor that the petitioner be appointed as the guardian of the person and property of the minor.

7. That the petitioner is of sound mind, good character, and is fully capable of taking care of the minor and managing the minor's property.

8. That no previous application for guardianship of the said minor has been made in any court.

9. That this Honorable Court has territorial jurisdiction as the minor ordinarily resides within the jurisdiction of this court.

PRAYER:

It is, therefore, most respectfully prayed that this Honorable Court may graciously be pleased to:

(a) Appoint the petitioner as the guardian of the person and property of the minor {{minorName}};
(b) Grant such other and further relief as deemed just and proper.

_______________________
PETITIONER/ADVOCATE

VERIFICATION:

I, {{petitionerName}}, do hereby solemnly verify that the contents of this petition are true and correct to the best of my knowledge and belief.

Verified at _____________ on this ___ day of _________, 20__.

_______________________
PETITIONER`,
  },
  {
    id: 'fir-application-detailed',
    title: 'FIR Application (Detailed)',
    titleUrdu: 'ایف آئی آر درج کرانے کی درخواست',
    category: 'criminal',
    description: 'Detailed application for registration of First Information Report',
    fields: [
      { id: 'sho', label: 'SHO/Station Name', labelUrdu: 'ایس ایچ او/تھانہ کا نام', type: 'text', required: true },
      { id: 'complainantName', label: 'Complainant Name', labelUrdu: 'شکایت کنندہ کا نام', type: 'text', required: true },
      { id: 'complainantCnic', label: 'Complainant CNIC', labelUrdu: 'شکایت کنندہ کا شناختی کارڈ', type: 'text', required: true },
      { id: 'complainantAddress', label: 'Complainant Address', labelUrdu: 'شکایت کنندہ کا پتہ', type: 'textarea', required: true },
      { id: 'complainantPhone', label: 'Complainant Phone', labelUrdu: 'شکایت کنندہ کا فون', type: 'text', required: true },
      { id: 'accusedName', label: 'Accused Name(s)', labelUrdu: 'ملزم کا نام', type: 'text', required: true },
      { id: 'accusedAddress', label: 'Accused Address', labelUrdu: 'ملزم کا پتہ', type: 'textarea' },
      { id: 'incidentDate', label: 'Date of Incident', labelUrdu: 'واقعہ کی تاریخ', type: 'date', required: true },
      { id: 'incidentTime', label: 'Time of Incident', labelUrdu: 'واقعہ کا وقت', type: 'text', required: true },
      { id: 'incidentPlace', label: 'Place of Incident', labelUrdu: 'واقعہ کی جگہ', type: 'textarea', required: true },
      { id: 'incidentDetails', label: 'Details of Incident', labelUrdu: 'واقعہ کی تفصیل', type: 'textarea', required: true },
      { id: 'sections', label: 'Applicable Sections', labelUrdu: 'قابل اطلاق دفعات', type: 'text' },
    ],
    content: `APPLICATION FOR REGISTRATION OF FIR

To,
The Station House Officer,
{{sho}}

Subject: Application for Registration of FIR

Respected Sir,

I, {{complainantName}} s/o/d/o/w/o _____________, CNIC: {{complainantCnic}}, resident of {{complainantAddress}}, Contact: {{complainantPhone}}, most respectfully submit as under:

ACCUSED:
{{accusedName}}
Address: {{accusedAddress}}

DATE & TIME OF INCIDENT:
{{incidentDate}} at {{incidentTime}}

PLACE OF INCIDENT:
{{incidentPlace}}

DETAILS OF INCIDENT:
{{incidentDetails}}

APPLICABLE SECTIONS:
{{sections}}

PRAYER:

In view of the above facts and circumstances, it is most respectfully requested that an FIR may kindly be registered against the above-named accused under the applicable sections of law and appropriate legal action may be taken against them.

I shall be highly obliged.

Dated: ______________

_______________________
Complainant Signature

Name: {{complainantName}}
CNIC: {{complainantCnic}}`,
  },
  {
    id: 'anticipatory-bail',
    title: 'Anticipatory/Pre-Arrest Bail',
    titleUrdu: 'قبل از گرفتاری ضمانت کی درخواست',
    category: 'application',
    description: 'Application for anticipatory bail under Section 498 CrPC',
    fields: [
      { id: 'courtName', label: 'Court Name', labelUrdu: 'عدالت کا نام', type: 'text', required: true },
      { id: 'applicantName', label: 'Applicant Name', labelUrdu: 'درخواست گزار کا نام', type: 'text', required: true },
      { id: 'fatherName', label: "Father's Name", labelUrdu: 'والد کا نام', type: 'text', required: true },
      { id: 'cnic', label: 'CNIC', labelUrdu: 'شناختی کارڈ نمبر', type: 'text', required: true },
      { id: 'address', label: 'Address', labelUrdu: 'پتہ', type: 'textarea', required: true },
      { id: 'firNo', label: 'FIR Number (if registered)', labelUrdu: 'ایف آئی آر نمبر', type: 'text' },
      { id: 'policeStation', label: 'Police Station', labelUrdu: 'تھانہ', type: 'text', required: true },
      { id: 'sections', label: 'Sections/Offences', labelUrdu: 'دفعات/جرائم', type: 'text', required: true },
      { id: 'apprehensionReason', label: 'Reason for Apprehension of Arrest', labelUrdu: 'گرفتاری کے خدشے کی وجہ', type: 'textarea', required: true },
      { id: 'grounds', label: 'Grounds for Bail', labelUrdu: 'ضمانت کی وجوہات', type: 'textarea', required: true },
    ],
    content: `IN THE {{courtName}}

CRIMINAL MISC. APPLICATION NO. _____ OF 20__

IN THE MATTER OF:
Application for Pre-Arrest/Anticipatory Bail under Section 498 Cr.P.C.

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

APPLICATION FOR ANTICIPATORY BAIL

RESPECTFULLY SHEWETH:

1. That the applicant apprehends arrest in connection with the above-mentioned FIR/case.

2. REASON FOR APPREHENSION:
{{apprehensionReason}}

3. GROUNDS FOR BAIL:
{{grounds}}

4. That the applicant is a respectable citizen with no previous criminal record.

5. That the applicant is ready to cooperate with the investigation and shall appear before the investigating officer as and when required.

6. That the applicant undertakes not to tamper with evidence or influence witnesses.

7. That the applicant is ready to furnish bail bonds/surety to the satisfaction of this Honorable Court.

PRAYER:

It is most respectfully prayed that this Honorable Court may graciously be pleased to:

(a) Grant anticipatory/pre-arrest bail to the applicant;
(b) Direct that in the event of arrest, the applicant be released on bail;
(c) Any other relief deemed fit and proper.

_______________________
APPLICANT/ADVOCATE

VERIFICATION:

I, {{applicantName}}, do hereby verify that the contents of this application are true and correct to the best of my knowledge and belief.

Verified at _____________ on this ___ day of _________, 20__.

_______________________
APPLICANT`,
  },
  {
    id: 'rent-eviction-notice',
    title: 'Rent Eviction Notice',
    titleUrdu: 'کرایہ دار کے اخراج کا نوٹس',
    category: 'property',
    description: 'Notice for eviction of tenant under rent laws',
    fields: [
      { id: 'landlordName', label: 'Landlord Name', labelUrdu: 'مالک مکان کا نام', type: 'text', required: true },
      { id: 'landlordAddress', label: 'Landlord Address', labelUrdu: 'مالک مکان کا پتہ', type: 'textarea', required: true },
      { id: 'tenantName', label: 'Tenant Name', labelUrdu: 'کرایہ دار کا نام', type: 'text', required: true },
      { id: 'tenantAddress', label: 'Property Address', labelUrdu: 'جائیداد کا پتہ', type: 'textarea', required: true },
      { id: 'monthlyRent', label: 'Monthly Rent (PKR)', labelUrdu: 'ماہانہ کرایہ', type: 'number', required: true },
      { id: 'arrears', label: 'Rent Arrears (PKR)', labelUrdu: 'واجب الادا کرایہ', type: 'number' },
      { id: 'evictionGround', label: 'Ground for Eviction', labelUrdu: 'اخراج کی وجہ', type: 'select', options: ['Non-payment of Rent', 'Personal Need', 'Subletting', 'Misuse of Premises', 'Expiry of Lease', 'Other'], required: true },
      { id: 'evictionDetails', label: 'Details of Ground', labelUrdu: 'وجہ کی تفصیل', type: 'textarea', required: true },
      { id: 'vacationPeriod', label: 'Period to Vacate (Days)', labelUrdu: 'خالی کرنے کی مدت', type: 'number', required: true },
    ],
    content: `NOTICE FOR EVICTION

Date: ______________

From:
{{landlordName}}
{{landlordAddress}}
(Landlord/Lessor)

To:
{{tenantName}}
{{tenantAddress}}
(Tenant/Lessee)

Subject: NOTICE FOR EVICTION OF RENTED PREMISES

Dear Sir/Madam,

Under instructions from my client, I hereby serve upon you the following notice:

1. That you are occupying the premises situated at {{tenantAddress}} as a tenant of my client at a monthly rent of PKR {{monthlyRent}}/-.

2. GROUND FOR EVICTION: {{evictionGround}}

3. DETAILS:
{{evictionDetails}}

4. RENT ARREARS (if applicable): PKR {{arrears}}/-

5. You are hereby called upon to:
   (a) Vacate and hand over peaceful possession of the said premises to my client within {{vacationPeriod}} days from the receipt of this notice;
   (b) Clear all outstanding rent arrears, utility bills, and other dues;
   (c) Hand over the premises in the same condition as received.

6. In case of failure to comply with this notice, my client shall be constrained to initiate ejectment proceedings before the Rent Controller/competent court at your risk and cost.

7. All costs incurred shall be recoverable from you.

Take this notice seriously and govern yourself accordingly.

_______________________
ADVOCATE
Counsel for the Landlord

Copy to:
1. {{tenantName}} - by Registered Post A.D.
2. Office Record`,
  },
  {
    id: 'gift-deed',
    title: 'Gift Deed (Hiba Nama)',
    titleUrdu: 'ہبہ نامہ',
    category: 'property',
    description: 'Deed of gift for transfer of property without consideration',
    fields: [
      { id: 'donorName', label: 'Donor Name', labelUrdu: 'ہبہ کنندہ کا نام', type: 'text', required: true },
      { id: 'donorCnic', label: 'Donor CNIC', labelUrdu: 'ہبہ کنندہ کا شناختی کارڈ', type: 'text', required: true },
      { id: 'donorAddress', label: 'Donor Address', labelUrdu: 'ہبہ کنندہ کا پتہ', type: 'textarea', required: true },
      { id: 'doneeName', label: 'Donee Name', labelUrdu: 'موہوب لہ کا نام', type: 'text', required: true },
      { id: 'doneeCnic', label: 'Donee CNIC', labelUrdu: 'موہوب لہ کا شناختی کارڈ', type: 'text', required: true },
      { id: 'doneeAddress', label: 'Donee Address', labelUrdu: 'موہوب لہ کا پتہ', type: 'textarea', required: true },
      { id: 'relation', label: 'Relation between Parties', labelUrdu: 'فریقین کا رشتہ', type: 'text', required: true },
      { id: 'propertyDescription', label: 'Property Description', labelUrdu: 'جائیداد کی تفصیل', type: 'textarea', required: true },
      { id: 'giftDate', label: 'Date of Gift', labelUrdu: 'ہبہ کی تاریخ', type: 'date', required: true },
    ],
    content: `GIFT DEED (HIBA NAMA)

This Gift Deed is executed on {{giftDate}}

BETWEEN:

DONOR:
{{donorName}}
CNIC: {{donorCnic}}
Address: {{donorAddress}}
(Hereinafter called the "DONOR" / "WAHIB")

AND

DONEE:
{{doneeName}}
CNIC: {{doneeCnic}}
Address: {{doneeAddress}}
(Hereinafter called the "DONEE" / "MAUHUB LAH")

RELATION: The Donee is the {{relation}} of the Donor.

WHEREAS the Donor is the absolute owner of the property described herein and is competent to make this gift.

NOW THIS DEED WITNESSETH AS FOLLOWS:

1. PROPERTY DESCRIPTION:
{{propertyDescription}}

2. That the Donor, out of natural love and affection for the Donee, hereby gifts, grants, and transfers absolutely and forever the above-described property to the Donee without any consideration.

3. That the Donor hereby declares that:
   (a) The Donor is the absolute owner of the property with full rights to dispose of the same;
   (b) The property is free from all encumbrances, liens, mortgages, and claims;
   (c) This gift is made voluntarily without coercion or undue influence;
   (d) The Donor is of sound mind and understands the consequences of this gift.

4. That the Donee hereby accepts this gift.

5. That the possession of the property has been delivered to the Donee.

6. That from this day forward, the Donee shall be the absolute owner of the property with full rights to possess, enjoy, mortgage, sell, or dispose of the same.

IN WITNESS WHEREOF, the parties have signed this Gift Deed on the date first above written.

_______________________          _______________________
DONOR                                 DONEE

WITNESSES:
1. Name: _______________ CNIC: _______________ Signature: _______________
2. Name: _______________ CNIC: _______________ Signature: _______________`,
  },
  {
    id: 'will-wasiyat',
    title: 'Will (Wasiyat Nama)',
    titleUrdu: 'وصیت نامہ',
    category: 'general',
    description: 'Last Will and Testament under Islamic/Pakistani law',
    fields: [
      { id: 'testatorName', label: 'Testator Name', labelUrdu: 'موصی کا نام', type: 'text', required: true },
      { id: 'testatorCnic', label: 'Testator CNIC', labelUrdu: 'موصی کا شناختی کارڈ', type: 'text', required: true },
      { id: 'testatorFatherName', label: "Testator's Father Name", labelUrdu: 'موصی کے والد کا نام', type: 'text', required: true },
      { id: 'testatorAddress', label: 'Testator Address', labelUrdu: 'موصی کا پتہ', type: 'textarea', required: true },
      { id: 'executorName', label: 'Executor Name', labelUrdu: 'وصی کا نام', type: 'text', required: true },
      { id: 'executorCnic', label: 'Executor CNIC', labelUrdu: 'وصی کا شناختی کارڈ', type: 'text', required: true },
      { id: 'legalHeirs', label: 'List of Legal Heirs', labelUrdu: 'قانونی وارثین کی فہرست', type: 'textarea', required: true },
      { id: 'bequests', label: 'Specific Bequests', labelUrdu: 'مخصوص وصایا', type: 'textarea', required: true },
      { id: 'debts', label: 'Outstanding Debts (if any)', labelUrdu: 'واجب الادا قرضے', type: 'textarea' },
    ],
    content: `LAST WILL AND TESTAMENT (WASIYAT NAMA)

I, {{testatorName}} s/o {{testatorFatherName}}, CNIC: {{testatorCnic}}, resident of {{testatorAddress}}, being of sound mind and disposing memory, do hereby make, publish, and declare this as my Last Will and Testament, revoking all previous wills and codicils.

APPOINTMENT OF EXECUTOR:

I hereby appoint {{executorName}}, CNIC: {{executorCnic}}, as the Executor of this Will with full powers to administer my estate.

MY LEGAL HEIRS:

{{legalHeirs}}

DEBTS AND LIABILITIES:

I direct that my just debts, funeral expenses, and testamentary expenses be paid first from my estate before any distribution.
{{debts}}

BEQUESTS (WASAYA):

Subject to Islamic Law limitation of one-third (1/3) of the estate for bequests to non-heirs:
{{bequests}}

RESIDUARY ESTATE:

After payment of debts and specific bequests, the residue of my estate shall be distributed among my legal heirs according to Islamic Law of Inheritance (Faraid).

DECLARATIONS:

1. I am making this Will of my own free will without any coercion.
2. I am of sound mind and understand the nature and consequences of this Will.
3. I have not been influenced by any person in making this Will.
4. I understand that under Islamic Law, bequests cannot exceed one-third of the estate and cannot be made in favor of legal heirs.

IN WITNESS WHEREOF, I have hereunto set my hand this ___ day of _________, 20__.

_______________________
TESTATOR

WITNESSES (who shall not be beneficiaries):

1. Name: _______________ CNIC: _______________ Signature: _______________
2. Name: _______________ CNIC: _______________ Signature: _______________`,
  },
];

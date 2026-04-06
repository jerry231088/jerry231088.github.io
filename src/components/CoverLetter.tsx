 import React from 'react';
 import { Page, Text, View, Document, StyleSheet, Font, Link, PDFDownloadLink } from '@react-pdf/renderer';
 import { Button } from '@/components/ui/button';

 // --- Use the same Roboto font for consistency ---
 const baseUrl = 'https://jerry231088.github.io';
 Font.register({
   family: 'Roboto',
   fonts: [
     { src: `${baseUrl}/fonts/Roboto-Regular.ttf` },
     { src: `${baseUrl}/fonts/Roboto-Bold.ttf`, fontWeight: 'bold' },
   ],
 });

 // --- Type Definitions ---
 interface CoverLetterDocumentProps {
   data: {
     name: string;
     phone: string;
     email: string;
     linkedin: string;
     github: string;
     date: string;
   };
 }

 interface CoverLetterDownloadLinkProps {
   style?: React.CSSProperties;
   className?: string;
 }

 // --- Stylesheet for the Cover Letter ---
 const styles = StyleSheet.create({
   page: { fontFamily: 'Roboto', fontSize: 11, lineHeight: 1.5, padding: '1in' },
   header: { textAlign: 'center', marginBottom: 30 },
   name: { fontSize: 22, fontWeight: 'bold' },
   contactInfo: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', fontSize: 10, color: '#333' },
   separator: { marginHorizontal: 5 },
   link: { color: '#0000FF', textDecoration: 'none' },
   body: { textAlign: 'justify' },
   paragraph: { marginBottom: 12 },
   salutation: { marginBottom: 20 },
   closing: { marginTop: 20, marginBottom: 8 },
   signature: { fontSize: 11, lineHeight: 1.4 }
 });

 // --- The PDF Document Component ---
 const CoverLetterDocument = ({ data }: CoverLetterDocumentProps) => (
   <Document author={data.name} title="Cover Letter">
     <Page size="A4" style={styles.page}>

       <View style={styles.header}>
         <Text style={styles.name}>{data.name.toUpperCase()}</Text>
       </View>

       <View style={styles.body}>
         <Text style={styles.paragraph}>Date: {data.date}</Text>
         <Text style={styles.paragraph}>Dear Hiring Manager,</Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
           I am excited to apply for the AWS Data Engineer position at your company. With 11+ years in software engineering and ~7 years of hands-on AWS experience, I bring deep expertise in architecting and delivering scalable, secure, and cost-optimized cloud data platforms — backed by 8 AWS certifications including AWS Certified Solutions Architect – Professional, AWS Certified Generative AI Developer – Professional, and AWS Certified Data Engineer – Associate.
         </Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
           In my current and previous roles, I have led cross-functional teams to design and deliver highly available, business-driven data solutions. My expertise spans the modern AWS data stack, including:
         </Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
             • Compute & Serverless: Lambda, Batch, ECS, Fargate, API Gateway{'\n'}
             • Data Processing & Streaming: Glue, SQS, Kinesis, MSK/Kafka, Amazon Data Firehose{'\n'}
             • Storage & Databases: S3, DynamoDB, Neptune, Redshift{'\n'}
             • Gen-AI & AI/ML: Amazon Bedrock (Claude Opus, Claude Sonnet), vLLM GPU platforms{'\n'}
             • Data Governance & Analytics: Lake Formation, Athena, Power BI, QuickSight{'\n'}
             • Infrastructure as Code (IaC): Terraform | DevOps: GitHub, Jenkins, Atlantis, CI/CD
         </Text>
         <Text style={styles.paragraph}>Some of my key career accomplishments include:</Text>

         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
             • Architected a greenfield hybrid defense platform (AWS + on-premises) from scratch for an Israel–Germany bilateral military program, delivering the full product across 2 sprints of 3 weeks each.{'\n'}
             • Led the design and production deployment of a GDPR-compliant GenAI Intelligent Document Processing Application using AWS Bedrock (Claude Opus), extracting and structuring German medical insurance data at scale.{'\n'}
             • Architected a GenAI workflow on AWS Bedrock (Claude Sonnet) to automate generation of complex BPMN 2.0 models for mission-critical defense workflows.{'\n'}
             • Developed real-time streaming pipelines with Kinesis/MSK to process millions of sports events, ensuring data accuracy and availability.{'\n'}
             • Designed and deployed cost-effective serverless data platforms on AWS using Terraform, with multiple pipelines operating reliably under $10/month.
         </Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
           I am a proactive technical leader recognized for architectural ownership, cross-functional collaboration, and delivering data solutions that improve quality, scalability, and business outcomes. I look forward to applying my expertise in AWS data engineering and Gen-AI to contribute meaningfully in a dynamic environment like yours.
         </Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
           Thank you for your time and consideration. I have attached my resume for your review and would welcome the opportunity to discuss how my experience can add value to your organization.
         </Text>
         <Text style={[styles.closing, { marginTop: 0 }]}>Sincerely,</Text>
         <View style={styles.signature}>
             <Text>Neeraj Kumar Singh</Text>
             <Text>{data.email} | {data.phone}</Text>
             <View style={{ flexDirection: 'row' }}>
                 <Link style={styles.link} src={data.linkedin}>LinkedIn</Link>
                 <Text style={styles.separator}>|</Text>
                 <Link style={styles.link} src={data.github}>GitHub</Link>
             </View>
         </View>
       </View>
     </Page>
   </Document>
 );

 export const CoverLetterDownloadLink = ({ style, className }: CoverLetterDownloadLinkProps) => {
     // Your personal data to be included in the cover letter
     const userData = {
         name: 'Neeraj Kumar Singh',
         phone: '+91-9611724567',
         email: 'jerry231088@gmail.com',
         linkedin: 'https://www.linkedin.com/in/neerajksingh231088/',
         github: 'https://jerry231088.github.io/',
     };

     // Function to get the current date in dd-mm-yyyy format
     const getFormattedDate = () => {
         const today = new Date();
         const day = String(today.getDate()).padStart(2, '0');
         const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
         const year = today.getFullYear();
         return `${day}-${month}-${year}`;
     };

     const formattedDate = getFormattedDate();

     // Combine your static data with the dynamic date
     const documentData = {
         ...userData,
         date: formattedDate,
     };

     // Default styling to match the "Download Resume" button on your portfolio
     const defaultClassName = "bg-gray-800 text-white font-bold py-2 px-4 rounded-full inline-flex items-center hover:bg-gray-700 transition-colors";

     return (
         <PDFDownloadLink
             document={<CoverLetterDocument data={documentData} />}
             fileName={`Cover_Letter_Neeraj_Kumar_Singh_AWS_Data_Engineer_${formattedDate}.pdf`}
         >
             {({ loading }) => (
                 <Button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full inline-flex items-center hover:bg-gray-700 transition-colors">
                     {loading ? (
                         'Loading...'
                     ) : (
                         <>
                             <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                             </svg>
                             <span>Cover Letter</span>
                         </>
                     )}
                 </Button>
             )}
         </PDFDownloadLink>
     );
 };
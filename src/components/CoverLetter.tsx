import React from 'react';
// Corrected the import to use a CDN for web compatibility
import { Page, Text, View, Document, StyleSheet, Font, Link, PDFDownloadLink } from 'https://cdn.skypack.dev/@react-pdf/renderer';

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
        <View style={styles.contactInfo}>
          <Text>{data.phone}</Text>
          <Text style={styles.separator}>|</Text>
          <Link style={styles.link} src={`mailto:${data.email}`}>{data.email}</Link>
          <Text style={styles.separator}>|</Text>
          <Link style={styles.link} src={data.linkedin}>LinkedIn</Link>
          <Text style={styles.separator}>|</Text>
          <Link style={styles.link} src={data.github}>GitHub</Link>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.paragraph}>{data.date}</Text>
        <Text style={styles.paragraph}>Dear Hiring Manager,</Text>
        <Text style={styles.paragraph}>
          I am writing to express my keen interest in the AWS Data Engineer position in your Company, which I discovered on LinkedIn/Naukri. With over a decade in technology and 6+ years architecting and deploying robust data ecosystems on AWS, I am confident that my skills and experience are an excellent match for the requirements of this role.
        </Text>
        <Text style={styles.paragraph}>
          In my previous roles, I have successfully led cross-functional teams in delivering highly available, scalable, and business-driven data solutions. My technical expertise spans the modern data stack, particularly within the AWS ecosystem, including:
        </Text>
        <Text style={styles.paragraph}>
            • Compute & Serverless: Lambda, Batch, ECS, Fargate, API Gateway{'\n'}
            • Data Processing & Streaming: Glue, SQS, Kinesis, MSK/Kafka{'\n'}
            • Storage & Databases: S3, DynamoDB, Neptune, Redshift{'\n'}
            • Data Governance & Analytics: Lake Formation, Athena{'\n'}
            • Infrastructure as Code (IaC): Terraform
        </Text>
        <Text style={styles.paragraph}>Some of my key career accomplishments include:</Text>
         <Text style={styles.paragraph}>
            • Architecting and deploying a scalable, modular, and 100% reproducible AWS cloud infrastructure from the ground up using Terraform.{'\n'}
            • Engineering a GenAI workflow utilizing AWS Bedrock to automate complex business processes, demonstrating innovation and efficiency.{'\n'}
            • Developing real-time streaming pipelines with Kinesis/MSK capable of handling millions of sports events, ensuring data timeliness and availability.{'\n'}
            • Designing and implementing cost-effective, serverless data pipelines for automated reporting, significantly reducing operational overhead.
        </Text>
        <Text style={styles.paragraph}>
          I am a proactive leader recognized for designing solutions that not only enhance data accuracy but also unlock critical insights that drive organizational growth. I am eager to bring my blend of technical leadership and hands-on data engineering skills to a new and challenging environment like yours.
        </Text>
        <Text style={styles.paragraph}>
          Thank you for your time and consideration. My resume is attached for your review, and I look forward to the opportunity to discuss how my experience can benefit [Company Name].
        </Text>
        <Text style={styles.closing}>Sincerely,</Text>
        <View style={styles.signature}>
            <Text>Neeraj Kumar Singh</Text>
            <Text>{data.email} | {data.phone}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Link style={styles.link} src={data.linkedin}>LinkedIn Profile</Link>
                <Text style={styles.separator}>|</Text>
                <Link style={styles.link} src={data.github}>GitHub Portfolio</Link>
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
            fileName={`CoverLetter_Neeraj_Kumar_Singh_AWS_Data_Engineer_${formattedDate}.pdf`}
            style={style}
            className={className || defaultClassName}
        >
            {({ loading }) =>
                loading ? (
                    'Generating...'
                ) : (
                    <>
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        <span>Download Cover Letter</span>
                    </>
                )
            }
        </PDFDownloadLink>
    );
};

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Image } from '@react-pdf/renderer';

// --- Type Definitions for Props ---
interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  projects: { name: string; details: string[] }[];
}
interface SkillCategory {
  category: string;
  skills: string[];
}
interface Education {
  degree: string;
  institution: string;
  period: string;
}
interface Certification {
  title: string;
  imageUrl: string;
}
interface ResumeDocumentProps {
  data: {
    sortedExperiences: Experience[];
    skillCategories: SkillCategory[];
    education: Education[];
    certifications: Certification[];
  };
}


// --- Stylesheet for the PDF ---
const styles = StyleSheet.create({
  page: { fontSize: 9.5, lineHeight: 1.4, backgroundColor: '#FFFFFF', padding: '0.4in 0.5in' },
  header: { textAlign: 'center', marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 12, color: '#4A4A4A' },
  mainSection: { flexDirection: 'row' },
  leftColumn: { width: '33%', paddingRight: 15 },
  rightColumn: { width: '67%' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#D3D3D3', paddingBottom: 2, marginBottom: 8 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  contactIcon: { width: 10, height: 10, marginRight: 6 },
  contactText: { color: '#0000FF', textDecoration: 'none' },
  skillCategoryTitle: { fontSize: 10, fontWeight: 'bold', marginBottom: 2 },
  skillText: { color: '#333' },
  educationText: { fontSize: 9.5 },
  jobTitle: { fontSize: 11, fontWeight: 'bold' },
  companyInfo: { fontSize: 9.5, color: '#555555', marginBottom: 5 },
  bulletPoint: { flexDirection: 'row', marginBottom: 3, paddingRight: 15 },
  bullet: { width: 10, fontSize: 10 },
  bulletText: { flex: 1 },
});


// --- The PDF Document Component ---
export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
  <Document author="Neeraj Kumar Singh" title="Resume">
    <Page size="A4" style={styles.page}>

      <View style={styles.header}>
        <Text style={styles.name}>NEERAJ KUMAR SINGH</Text>
        <Text style={styles.subtitle}>AWS Certified Solutions Architect - Professional | AWS Certified Data Engineer</Text>
      </View>

      <View style={styles.mainSection}>
        {/* LEFT COLUMN */}
        <View style={styles.leftColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Details</Text>

            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src="https://jerry231088.github.io/icons/phone.png" />
              <Text>+91-9611724567</Text>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src="https://jerry231088.github.io/icons/email.png" />
              <Link style={styles.contactText} src="mailto:jerry231088@gmail.com">jerry231088@gmail.com</Link>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src="https://jerry231088.github.io/icons/linkedin.png" />
              <Link style={styles.contactText} src="https://linkedin.com/in/neerajksingh231088">neeraj-singh</Link>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src="https://jerry231088.github.io/icons/github.png" />
              <Link style={styles.contactText} src="https://jerry231088.github.io/">Github Portfolio</Link>
            </View>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>Technical Skills</Text>
             {data.skillCategories.map((cat, idx) => (
                <View key={idx} style={{ marginBottom: 6 }}>
                    <Text style={styles.skillCategoryTitle}>{cat.category}</Text>
                    <Text style={styles.skillText}>{cat.skills.join(', ')}</Text>
                </View>
             ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, idx) => (
                <View key={idx}>
                    <Text style={styles.educationText}>{edu.degree}</Text>
                    <Text style={styles.educationText}>{edu.institution}</Text>
                    <Text style={styles.educationText}>{edu.period}</Text>
                </View>
            ))}
          </View>
        </View>

        {/* RIGHT COLUMN */}
        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text>Seasoned Data Engineer with over a decade of experience in technology, including 6+ years architecting and deploying robust data ecosystems on AWS. He specializes in leading cross-functional teams to tackle complex architectural challenges and consistently delivers highly available, scalable, and business-driven data solutions. Recognized for innovation and designing ground-up architectures that enhance data accuracy, unlock insights, and accelerate organizational growth.</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.sortedExperiences.map((job, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.jobTitle}>{job.role}</Text>
                <Text style={styles.companyInfo}>{job.company} | {job.location} | {job.period}</Text>
                {job.projects.flatMap(p => p.details).map((detail, i) => (
                   <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{detail}</Text>
                   </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
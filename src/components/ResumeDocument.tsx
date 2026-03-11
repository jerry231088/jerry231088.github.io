import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Image, Font } from '@react-pdf/renderer';

const baseUrl = 'https://jerry231088.github.io';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: `${baseUrl}/fonts/Roboto-Regular.ttf` },
    { src: `${baseUrl}/fonts/Roboto-Bold.ttf`, fontWeight: 'bold' },
  ],
});

// --- Type Definitions for Props ---
interface Experience {
  designation: string;
  company: string;
  location: string;
  period: string;
  projects: {
    role: string;
    name: string;
    details: string[];
    youtubeUrl?: string;
  }[];
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
  publicUrl: string;
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
  page: { fontFamily: 'Roboto', fontSize: 8.5, lineHeight: 1.3, backgroundColor: '#FFFFFF', padding: '0.3in 0.4in' },
  header: { textAlign: 'center', marginBottom: 12 },
  badgeContainer: { flexDirection: 'row', justifyContent: 'center', gap: 2, flexWrap: 'wrap', marginBottom: 5 },
  badge: { width: 34, height: 34 },
  name: { fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 10, color: '#4A4A4A' },
  mainSection: { flexDirection: 'row' },
  leftColumn: { width: '28%', paddingRight: 10 },
  rightColumn: { width: '72%' },
  section: { marginBottom: 10 },
  sectionTitle: { fontSize: 11, fontFamily: 'Roboto', fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#D3D3D3', paddingBottom: 2, marginBottom: 5 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  contactIcon: { width: 8, height: 8, marginRight: 5 },
  contactText: { color: '#0000FF', textDecoration: 'none' },
  skillCategoryTitle: { fontSize: 8.5, fontFamily: 'Roboto', fontWeight: 'bold', marginBottom: 1 },
  skillText: { color: '#333' },
  educationText: { fontSize: 9.5 },
  certText: { fontSize: 8.5 },
  companyInfo: { fontSize: 10, fontFamily: 'Roboto', fontWeight: 'bold' },
  jobTitle: { fontSize: 8.5, color: '#555555', marginBottom: 3 },
  projectTitle: { fontSize: 9, fontFamily: 'Roboto', fontWeight: 'bold', color: '#333333', marginBottom: 1 },
  bulletPoint: { flexDirection: 'row', marginBottom: 2, paddingRight: 10 },
  bullet: { width: 8, fontSize: 8.5 },
  bulletText: { flex: 1 },
});


// --- The PDF Document Component ---
export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
  <Document author="Neeraj Kumar Singh" title="Resume">
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
      {/* 3. UPDATE: Add the loop to render clickable certification badges */}
      <View style={styles.badgeContainer}>
        {data.certifications.map((cert, idx) => (
          <Link key={idx} src={cert.publicUrl}>
            <Image style={styles.badge} src={`${baseUrl}${cert.imageUrl}`} />
          </Link>
        ))}
      </View>

      <View style={{ marginBottom: 4 }}>
          <Text style={styles.name}>NEERAJ KUMAR SINGH</Text>
      </View>
      <View>
          <Text style={styles.subtitle}>AWS Solutions Architect | AWS Data Engineer | Senior Data Engineer</Text>
      </View>
    </View>

      <View style={styles.mainSection}>
        {/* LEFT COLUMN */}
        <View style={styles.leftColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Details</Text>

            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={`${baseUrl}/icons/mobile.png`} />
              <Text>+91-9611724567</Text>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={`${baseUrl}/icons/email.png`} />
              <Link style={styles.contactText} src="mailto:jerry231088@gmail.com">jerry231088@gmail.com</Link>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={`${baseUrl}/icons/linkedin.png`} />
              <Link style={styles.contactText} src="https://linkedin.com/in/neerajksingh231088">neeraj-singh</Link>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={`${baseUrl}/icons/portfolio.png`} />
              <Link style={styles.contactText} src="https://jerry231088.github.io/">Github Portfolio</Link>
            </View>
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>Skills</Text>
             {data.skillCategories.map((cat, idx) => (
                <View key={idx} style={{ marginBottom: 6 }}>
                    <Text style={styles.skillCategoryTitle} hyphenationCallback={c => [c]}>{cat.category}</Text>
                    <Text style={styles.skillText} hyphenationCallback={word => [word]}>{cat.skills.join(', ')}</Text>
                </View>
             ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, idx) => (
                <View key={idx} style={{ marginBottom: 6 }}>
                    <Text style={styles.certText} hyphenationCallback={c => [c]}>{cert.title}</Text>
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
            <Text style={styles.sectionTitle} hyphenationCallback={p => [p]}>Professional Summary</Text>
            <Text>
              Technical Leader & AWS Data Engineer with 11+ years of overall software engineering experience and ~7 years of hands-on experience on AWS. Strong background as an AWS Solutions Architect, leading end-to-end design and delivery of highly available, secure, and cost-optimized cloud data platforms.
            </Text>

            <Text>{"\n"}</Text>

            <Text>
              Expert in architecting modern data lakes, streaming systems, and event-driven pipelines supporting analytics, AI/ML, and BI workloads. Hands-on experience delivering Gen-AI solutions using Amazon Bedrock, enabling intelligent data processing, knowledge retrieval, and AI-driven insights.
            </Text>

            <Text>{"\n"}</Text>

            <Text>
              Recognized for architectural ownership, technical leadership, and cross-functional collaboration, with a track record of designing ground-up AWS architectures that improve data quality, scalability, and business outcomes. Strong advocate of automation, IaC, AWS best practices, and mentoring engineers to drive innovation.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.sortedExperiences.map((job, idx) => (
              <View key={idx} style={{ marginBottom: 8 }}>
                <Text style={styles.companyInfo}>{job.company} | {job.location} | {job.period}</Text>
                <Text style={styles.jobTitle}>{job.role}</Text>
                {job.projects.map((project, pIdx) => (
                  <View key={pIdx} style={{ marginBottom: 4 }}>
                    <Text style={styles.projectTitle}>{project.name}</Text>
                    <Text style={styles.jobTitle}>{project.role}</Text>
                    {project.details.map((detail, i) => (
                      <View key={i} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText} hyphenationCallback={c => [c]}>{detail}</Text>
                      </View>
                    ))}
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
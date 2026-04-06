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

// --- Stylesheet ---
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    lineHeight: 1.3,
    backgroundColor: '#FFFFFF',
    padding: '0.3in 0.4in',
  },

  // Header
  header: { textAlign: 'center', marginBottom: 10 },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  badge: { width: 34, height: 34 },
  name: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: { fontSize: 9.5, color: '#4A4A4A', marginBottom: 2 },

  // Layout
  mainSection: { flexDirection: 'row' },
  leftColumn: { width: '28%', paddingRight: 10 },
  rightColumn: { width: '72%' },
  section: { marginBottom: 10 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingBottom: 2,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Contact
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  contactIcon: { width: 8, height: 8, marginRight: 5 },
  contactText: { color: '#0000FF', textDecoration: 'none', fontSize: 8 },

  // Skills — two-column table rows
  skillRow: {
    flexDirection: 'row',
    marginBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E8E8E8',
    paddingBottom: 3,
  },
  skillLabel: {
    width: '30%',
    fontSize: 8,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#333',
    paddingRight: 4,
  },
  skillValue: {
    width: '70%',
    fontSize: 8,
    color: '#444',
  },

  // Certifications
  certItem: { marginBottom: 4 },
  certText: { fontSize: 7.5, color: '#0000FF' },

  // Education
  educationDegree: { fontSize: 8.5, fontFamily: 'Roboto', fontWeight: 'bold' },
  educationMeta: { fontSize: 8, color: '#555' },

  // Experience
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  companyName: { fontSize: 9.5, fontFamily: 'Roboto', fontWeight: 'bold' },
  period: { fontSize: 8, color: '#555' },
  jobTitle: { fontSize: 8.5, color: '#555555', marginBottom: 4 },
  projectName: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#1F3864',
    marginTop: 3,
    marginBottom: 1,
  },
  projectRole: { fontSize: 8, color: '#666', marginBottom: 2, fontStyle: 'italic' },
  bulletPoint: { flexDirection: 'row', marginBottom: 2, paddingRight: 8 },
  bullet: { width: 8, fontSize: 8.5 },
  bulletText: { flex: 1 },

  // Summary
  summaryText: { fontSize: 8.5, marginBottom: 4 },

  // Divider
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCCCCC',
    marginBottom: 6,
    marginTop: 2,
  },
});

// --- The PDF Document Component ---
export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
  <Document author="Neeraj Kumar Singh" title="Resume">
    <Page size="A4" style={styles.page}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        {/* Clickable certification badges */}
        <View style={styles.badgeContainer}>
          {data.certifications.map((cert, idx) => (
            <Link key={idx} src={cert.publicUrl}>
              <Image style={styles.badge} src={`${baseUrl}${cert.imageUrl}`} />
            </Link>
          ))}
        </View>
        <Text style={styles.name}>NEERAJ KUMAR SINGH</Text>
        <Text style={styles.subtitle}>
          AWS Solutions Architect  ·  Senior Data Engineer  ·  GenAI Specialist
        </Text>
        <Text style={{ fontSize: 8, color: '#555' }}>
          +91-9611724567  |  jerry231088@gmail.com  |{' '}
          <Link src="https://linkedin.com/in/neerajksingh231088" style={{ color: '#0000FF' }}>
            linkedin.com/in/neeraj-singh
          </Link>
        </Text>
      </View>

      <View style={styles.mainSection}>

        {/* ── LEFT COLUMN ── */}
        <View style={styles.leftColumn}>

          {/* Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={`${baseUrl}/icons/mobile.png`} />
              <Text style={{ fontSize: 8 }}>+91-9611724567</Text>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={`${baseUrl}/icons/email.png`} />
              <Link style={styles.contactText} src="mailto:jerry231088@gmail.com">
                jerry231088@gmail.com
              </Link>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={`${baseUrl}/icons/linkedin.png`} />
              <Link style={styles.contactText} src="https://linkedin.com/in/neerajksingh231088">
                neeraj-singh
              </Link>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={`${baseUrl}/icons/portfolio.png`} />
              <Link style={styles.contactText} src="https://jerry231088.github.io/">
                Github Portfolio
              </Link>
            </View>
          </View>

          {/* Core Skills — table layout matching docx */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Skills</Text>
            {data.skillCategories.map((cat, idx) => (
              <View key={idx} style={styles.skillRow}>
                <Text style={styles.skillLabel} hyphenationCallback={c => [c]}>
                  {cat.category}
                </Text>
                <Text style={styles.skillValue} hyphenationCallback={word => [word]}>
                  {cat.skills.join(', ')}
                </Text>
              </View>
            ))}
          </View>

          {/* Certifications — all linked */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AWS Certifications (9 Active)</Text>
            {data.certifications.map((cert, idx) => (
              <View key={idx} style={styles.certItem}>
                <Link src={cert.publicUrl}>
                  <Text style={styles.certText} hyphenationCallback={(c: string) => [c]}>
                    - {cert.title}
                  </Text>
                </Link>
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, idx) => (
              <View key={idx} style={{ marginBottom: 4 }}>
                <Text style={styles.educationDegree} hyphenationCallback={c => [c]}>
                  {edu.degree}
                </Text>
                <Text style={styles.educationMeta}>{edu.institution}</Text>
                <Text style={styles.educationMeta}>{edu.period}</Text>
              </View>
            ))}
          </View>

        </View>

        {/* ── RIGHT COLUMN ── */}
        <View style={styles.rightColumn}>

          {/* Professional Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>
              Technical leader and AWS Data Engineer with 11+ years of experience and ~7 years of
              deep AWS expertise. Proven track record architecting highly available, secure,
              cost-optimized data platforms at scale.
            </Text>
            <Text style={styles.summaryText}>
              Expert in data lakes, real-time streaming, event-driven pipelines, and GenAI on Amazon
              Bedrock — enabling intelligent document processing and AI-driven automation. AWS
              Certified across 9 domains including Solutions Architect Professional and Generative
              AI Developer.
            </Text>
            <Text style={styles.summaryText}>
              Recognized for architectural ownership, technical leadership, and cross-functional
              collaboration. Strong advocate of automation, IaC, AWS best practices, and mentoring
              engineers to drive innovation.
            </Text>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>

            {data.sortedExperiences.map((job, idx) => (
              <View key={idx} style={{ marginBottom: 9 }}>
                <View style={styles.companyRow}>
                  <Text style={styles.companyName}>{job.company}</Text>
                  <Text style={styles.period}>{job.period}</Text>
                </View>
                <Text style={styles.jobTitle}>
                  {job.designation}  ·  {job.location}
                </Text>

                {job.projects.map((project, pIdx) => (
                  <View key={pIdx} style={{ marginBottom: 4 }}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {project.role ? (
                      <Text style={styles.projectRole}>{project.role}</Text>
                    ) : null}
                    {project.details.map((detail, i) => (
                      <View key={i} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>-</Text>
                        <Text style={styles.bulletText} hyphenationCallback={c => [c]}>
                          {detail}
                        </Text>
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
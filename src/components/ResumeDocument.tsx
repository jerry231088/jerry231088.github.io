import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Image, Font } from '@react-pdf/renderer';

const baseUrl = 'https://jerry231088.github.io';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: `${baseUrl}/fonts/Roboto-Regular.ttf`, fontWeight: 'normal', fontStyle: 'normal' },
    { src: `${baseUrl}/fonts/Roboto-Bold.ttf`, fontWeight: 'bold', fontStyle: 'normal' },
    { src: `${baseUrl}/fonts/Roboto-Regular.ttf`, fontWeight: 'normal', fontStyle: 'italic' },
    { src: `${baseUrl}/fonts/Roboto-Bold.ttf`, fontWeight: 'bold', fontStyle: 'italic' },
  ],
});

// --- Type Definitions ---
interface Experience {
  designation: string;
  company: string;
  location: string;
  period: string;
  projects: {
    role: string;
    name: string;
    details: string[];
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

// --- Styles ---
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 8.5,
    lineHeight: 1.35,
    color: '#222222',
    backgroundColor: '#FFFFFF',
    paddingTop: 22,
    paddingBottom: 22,
    paddingHorizontal: 36,
  },

  // Header
  header: { alignItems: 'center', marginBottom: 8 },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 2,
    marginBottom: 4,
  },
  badge: { width: 32, height: 32 },
  name: {
    fontSize: 22,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 2,
  },
  subtitle: { fontSize: 9.5, color: '#444444', marginBottom: 3 },
  contactLine: { fontSize: 8, color: '#444444' },
  contactLink: { fontSize: 8, color: '#1155CC' },

  // Section
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 2,
    marginBottom: 5,
  },

  // Skills table
  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillLabelCell: { width: '18%', paddingRight: 6 },
  skillLabel: {
    fontSize: 8.5,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#222222',
  },
  skillValue: { width: '82%', fontSize: 8.5, color: '#444444' },

  // Summary
  summaryPara: { marginBottom: 4, fontSize: 8.5 },

  // Experience
  expBlock: { marginBottom: 8 },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  companyName: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#000000',
  },
  period: { fontSize: 8, color: '#666666' },
  designation: { fontSize: 8.5, color: '#444444', marginBottom: 3 },
  projectName: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#1F3864',
    marginTop: 4,
    marginBottom: 1,
  },
  projectRole: { fontSize: 8, color: '#666666', marginBottom: 2 },
  bulletRow: { flexDirection: 'row', marginBottom: 2, paddingRight: 4 },
  bulletDash: { width: 10, fontSize: 8.5, color: '#444444' },
  bulletText: { flex: 1, fontSize: 8.5 },

  // Certifications 2-col
  certGrid: { flexDirection: 'row' },
  certCol: { width: '50%' },
  certItem: { marginBottom: 3 },
  certText: { fontSize: 8, color: '#1155CC' },

  // Education
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  eduDegree: { fontSize: 9, fontFamily: 'Roboto', fontWeight: 'bold' },
  eduPeriod: { fontSize: 8, color: '#666666' },
  eduInstitution: { fontSize: 8.5, color: '#444444' },
});

// --- Bullet helper ---
const Bullet = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bulletDash}>-</Text>
    <Text style={styles.bulletText} hyphenationCallback={w => [w]}>{text}</Text>
  </View>
);

// --- Document ---
export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
  <Document author="Neeraj Kumar Singh" title="Resume - Neeraj Kumar Singh">
    <Page size="A4" style={styles.page}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          {data.certifications.map((cert, i) => (
            <Link key={i} src={cert.publicUrl}>
              <Image style={styles.badge} src={`${baseUrl}${cert.imageUrl}`} />
            </Link>
          ))}
        </View>
        <Text style={styles.name}>NEERAJ KUMAR SINGH</Text>
        <Text style={styles.subtitle}>
          AWS Solutions Architect  ·  Senior Data Engineer  ·  GenAI Specialist
        </Text>
        <Text style={styles.contactLine}>
          +91-9611724567{'  |  '}jerry231088@gmail.com{'  |  '}
          <Link src="https://www.linkedin.com/in/neerajksingh231088/" style={styles.contactLink}>
            linkedin.com/in/neeraj-singh
          </Link>
        </Text>
      </View>

      {/* ── PROFESSIONAL SUMMARY ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summaryPara}>
          Technical leader and AWS Data Engineer with 11+ years of experience and ~7 years of deep AWS expertise. Proven track record architecting highly available, secure, cost-optimized data platforms at scale.
        </Text>
        <Text style={styles.summaryPara}>
          Expert in data lakes, real-time streaming, event-driven pipelines, and GenAI on Amazon Bedrock — enabling intelligent document processing and AI-driven automation. AWS Certified across 9 domains including Solutions Architect Professional and Generative AI Developer.
        </Text>
        <Text style={styles.summaryPara}>
          Recognized for architectural ownership, technical leadership, and cross-functional collaboration. Strong advocate of automation, IaC, AWS best practices, and mentoring engineers to drive innovation.
        </Text>
      </View>

      {/* ── CORE TECHNICAL SKILLS ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Technical Skills</Text>
        {data.skillCategories.map((cat, i) => (
          <View key={i} style={styles.skillRow}>
            <View style={styles.skillLabelCell}>
              <Text style={styles.skillLabel} hyphenationCallback={w => [w]}>
                {cat.category}
              </Text>
            </View>
            <Text style={styles.skillValue} hyphenationCallback={w => [w]}>
              {cat.skills.join(', ')}
            </Text>
          </View>
        ))}
      </View>

      {/* ── PROFESSIONAL EXPERIENCE ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>

        {data.sortedExperiences.map((job, i) => (
          <View key={i} style={styles.expBlock}>
            <View style={styles.expHeaderRow}>
              <Text style={styles.companyName}>{job.company}</Text>
              <Text style={styles.period}>{job.period}</Text>
            </View>
            <Text style={styles.designation}>{job.designation}  ·  {job.location}</Text>

            {job.projects.map((project, j) => (
              <View key={j}>
                <Text style={styles.projectName} hyphenationCallback={w => [w]}>
                  {project.name}
                </Text>
                {project.role ? (
                  <Text style={styles.projectRole}>{project.role}</Text>
                ) : null}
                {project.details.map((detail, k) => (
                  <Bullet key={k} text={detail} />
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* ── AWS CERTIFICATIONS ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AWS Certifications (9 Active)</Text>
        <View style={styles.certGrid}>
          <View style={styles.certCol}>
            {data.certifications
              .filter((_, i) => i % 2 === 0)
              .map((cert, i) => (
                <View key={i} style={styles.certItem}>
                  <Link src={cert.publicUrl}>
                    <Text style={styles.certText} hyphenationCallback={w => [w]}>
                      - {cert.title}
                    </Text>
                  </Link>
                </View>
              ))}
          </View>
          <View style={styles.certCol}>
            {data.certifications
              .filter((_, i) => i % 2 !== 0)
              .map((cert, i) => (
                <View key={i} style={styles.certItem}>
                  <Link src={cert.publicUrl}>
                    <Text style={styles.certText} hyphenationCallback={w => [w]}>
                      - {cert.title}
                    </Text>
                  </Link>
                </View>
              ))}
          </View>
        </View>
      </View>

      {/* ── EDUCATION ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i}>
            <View style={styles.eduRow}>
              <Text style={styles.eduDegree} hyphenationCallback={w => [w]}>
                {edu.degree}
              </Text>
              <Text style={styles.eduPeriod}>{edu.period}</Text>
            </View>
            <Text style={styles.eduInstitution}>{edu.institution}</Text>
          </View>
        ))}
      </View>

    </Page>
  </Document>
);
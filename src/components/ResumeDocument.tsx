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
    backgroundColor: '#FFFFFF',
    paddingTop: '0.35in',
    paddingBottom: '0.35in',
    paddingLeft: '0.45in',
    paddingRight: '0.45in',
  },

  // ── Header ──
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
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
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    letterSpacing: 1,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 9,
    color: '#444444',
    marginBottom: 2,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#222222',
  },

  // ── Section ──
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    paddingBottom: 2,
    marginBottom: 5,
    marginTop: 8,
    letterSpacing: 0.8,
  },

  // ── Skills Table ──
  skillRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  skillLabel: {
    width: '18%',
    fontSize: 8.5,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    paddingRight: 6,
    color: '#111',
  },
  skillValue: {
    width: '82%',
    fontSize: 8.5,
    color: '#333',
  },

  // ── Experience ──
  expBlock: {
    marginBottom: 7,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  companyName: {
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  period: {
    fontSize: 8.5,
    color: '#444',
  },
  designation: {
    fontSize: 8.5,
    color: '#555',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#1A3C6E',
    marginTop: 4,
    marginBottom: 1,
  },
  projectRole: {
    fontSize: 8,
    color: '#555',
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingRight: 4,
  },
  bulletDash: {
    width: 10,
    fontSize: 8.5,
    color: '#333',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: '#222',
  },

  // ── Certifications 2-col grid ──
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  certItem: {
    width: '50%',
    marginBottom: 3,
    paddingRight: 8,
  },
  certLink: {
    fontSize: 8.5,
    color: '#1155CC',
    textDecoration: 'none',
  },

  // ── Education ──
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  eduPeriod: {
    fontSize: 8.5,
    color: '#444',
  },
  eduInstitution: {
    fontSize: 8.5,
    color: '#555',
  },

  // ── Summary ──
  summaryPara: {
    fontSize: 8.5,
    marginBottom: 4,
    color: '#222',
  },
});

// --- Component ---
export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
  <Document author="Neeraj Kumar Singh" title="Resume">
    <Page size="A4" style={styles.page}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          {data.certifications.map((cert, idx) => (
            <Link key={idx} src={cert.publicUrl}>
              <Image style={styles.badge} src={`${baseUrl}${cert.imageUrl}`} />
            </Link>
          ))}
        </View>
        <Text style={styles.name}>NEERAJ KUMAR SINGH</Text>
        <Text style={styles.subtitle}>AWS Solutions Architect  ·  Senior Data Engineer  ·  GenAI Specialist</Text>
        <Text style={styles.contactLine}>
          +91-9611724567  |  jerry231088@gmail.com  |  linkedin.com/in/neeraj-singh
        </Text>
      </View>

      {/* ── PROFESSIONAL SUMMARY ── */}
      <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
      <Text style={styles.summaryPara}>
        Technical leader and AWS Data Engineer with 11+ years of experience and ~7 years of deep AWS expertise. Proven track record architecting highly available, secure, cost-optimized data platforms at scale.
      </Text>
      <Text style={styles.summaryPara}>
        Expert in data lakes, real-time streaming, event-driven pipelines, and GenAI on Amazon Bedrock — enabling intelligent document processing and AI-driven automation. AWS Certified across 9 domains including Solutions Architect Professional and Generative AI Developer.
      </Text>
      <Text style={styles.summaryPara}>
        Recognized for architectural ownership, technical leadership, and cross-functional collaboration. Strong advocate of automation, IaC, AWS best practices, and mentoring engineers to drive innovation.
      </Text>

      {/* ── CORE TECHNICAL SKILLS ── */}
      <Text style={styles.sectionTitle}>CORE TECHNICAL SKILLS</Text>
      {data.skillCategories.map((cat, idx) => (
        <View key={idx} style={styles.skillRow}>
          <Text style={styles.skillLabel} hyphenationCallback={c => [c]}>{cat.category}</Text>
          <Text style={styles.skillValue} hyphenationCallback={w => [w]}>{cat.skills.join(', ')}</Text>
        </View>
      ))}

      {/* ── PROFESSIONAL EXPERIENCE ── */}
      <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
      {data.sortedExperiences.map((job, idx) => (
        <View key={idx} style={styles.expBlock}>
          <View style={styles.expHeader}>
            <Text style={styles.companyName}>{job.company}</Text>
            <Text style={styles.period}>{job.period}</Text>
          </View>
          <Text style={styles.designation}>{job.designation}  ·  {job.location}</Text>

          {job.projects.map((project, pIdx) => (
            <View key={pIdx}>
              <Text style={styles.projectName}>{project.name}</Text>
              {project.role ? (
                <Text style={styles.projectRole}>{project.role}</Text>
              ) : null}
              {project.details.map((detail, dIdx) => (
                <View key={dIdx} style={styles.bulletRow}>
                  <Text style={styles.bulletDash}>-</Text>
                  <Text style={styles.bulletText} hyphenationCallback={c => [c]}>{detail}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}

      {/* ── AWS CERTIFICATIONS ── */}
      <Text style={styles.sectionTitle}>AWS CERTIFICATIONS (9 ACTIVE)</Text>
      <View style={styles.certGrid}>
        {data.certifications.map((cert, idx) => (
          <View key={idx} style={styles.certItem}>
            <Link src={cert.publicUrl}>
              <Text style={styles.certLink} hyphenationCallback={c => [c]}>
                - {cert.title}
              </Text>
            </Link>
          </View>
        ))}
      </View>

      {/* ── EDUCATION ── */}
      <Text style={styles.sectionTitle}>EDUCATION</Text>
      {data.education.map((edu, idx) => (
        <View key={idx}>
          <View style={styles.eduRow}>
            <Text style={styles.eduDegree} hyphenationCallback={c => [c]}>{edu.degree}</Text>
            <Text style={styles.eduPeriod}>{edu.period}</Text>
          </View>
          <Text style={styles.eduInstitution}>{edu.institution}</Text>
        </View>
      ))}

    </Page>
  </Document>
);
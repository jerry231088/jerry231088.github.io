import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from '@react-pdf/renderer';

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

export interface ExperienceProject {
  role?: string;
  name: string;
  details: string[];
}

export interface Experience {
  designation: string;
  company: string;
  location: string;
  period: string;
  projects: ExperienceProject[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  title: string;
  imageUrl?: string;
  publicUrl?: string;
}

export interface ResumeData {
  fullName: string;
  titleLine: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string[];
  sortedExperiences: Experience[];
  skillCategories: SkillCategory[];
  education: Education[];
  certifications: Certification[];
}

interface ResumeDocumentProps {
  data: ResumeData;
}

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

  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
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

  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    paddingBottom: 2,
    marginBottom: 5,
    marginTop: 8,
    letterSpacing: 0.8,
  },

  summaryPara: {
    fontSize: 8.5,
    marginBottom: 4,
    color: '#222',
  },

  skillRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  skillLabel: {
    width: '18%',
    fontSize: 8.5,
    fontWeight: 'bold',
    paddingRight: 6,
    color: '#111',
  },
  skillValue: {
    width: '82%',
    fontSize: 8.5,
    color: '#333',
  },

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

  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  certItem: {
    width: '50%',
    marginBottom: 3,
    paddingRight: 8,
  },
  certText: {
    fontSize: 8.5,
    color: '#222',
  },
  certLink: {
    fontSize: 8.5,
    color: '#1155CC',
    textDecoration: 'none',
  },

  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  eduPeriod: {
    fontSize: 8.5,
    color: '#444',
  },
  eduInstitution: {
    fontSize: 8.5,
    color: '#555',
  },
});

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data }) => {
  return (
    <Document author={data.fullName} title={`${data.fullName} Resume`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName.toUpperCase()}</Text>
          <Text style={styles.subtitle}>{data.titleLine}</Text>
          <Text style={styles.contactLine}>
            {data.phone}  |  {data.email}  |  {data.linkedin}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
        {data.summary.map((item, idx) => (
          <Text key={idx} style={styles.summaryPara}>
            {item}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>CORE TECHNICAL SKILLS</Text>
        {data.skillCategories.map((cat, idx) => (
          <View key={idx} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{cat.category}</Text>
            <Text style={styles.skillValue}>{cat.skills.join(', ')}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
        {data.sortedExperiences.map((job, idx) => (
          <View key={idx} style={styles.expBlock} wrap={false}>
            <View style={styles.expHeader}>
              <Text style={styles.companyName}>{job.company}</Text>
              <Text style={styles.period}>{job.period}</Text>
            </View>

            <Text style={styles.designation}>
              {job.designation}  ·  {job.location}
            </Text>

            {job.projects.map((project, pIdx) => (
              <View key={pIdx}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.role ? (
                  <Text style={styles.projectRole}>{project.role}</Text>
                ) : null}

                {project.details.map((detail, dIdx) => (
                  <View key={dIdx} style={styles.bulletRow}>
                    <Text style={styles.bulletDash}>-</Text>
                    <Text style={styles.bulletText}>{detail}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>
          AWS CERTIFICATIONS ({data.certifications.length} ACTIVE)
        </Text>
        <View style={styles.certGrid}>
          {data.certifications.map((cert, idx) => (
            <View key={idx} style={styles.certItem}>
              {cert.publicUrl ? (
                <Link src={cert.publicUrl}>
                  <Text style={styles.certLink}>- {cert.title}</Text>
                </Link>
              ) : (
                <Text style={styles.certText}>- {cert.title}</Text>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {data.education.map((edu, idx) => (
          <View key={idx}>
            <View style={styles.eduRow}>
              <Text style={styles.eduDegree}>{edu.degree}</Text>
              <Text style={styles.eduPeriod}>{edu.period}</Text>
            </View>
            <Text style={styles.eduInstitution}>{edu.institution}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ResumeDocument;
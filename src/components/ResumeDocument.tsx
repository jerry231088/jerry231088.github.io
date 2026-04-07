import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
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

export type ExperienceProject = {
  role: string;
  name: string;
  details: string[];
  youtubeUrl?: string;
};

export type Experience = {
  designation: string;
  company: string;
  location: string;
  period: string;
  projects: ExperienceProject[];
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  location?: string;
};

export type Certification = {
  title: string;
  imageUrl?: string;
  publicUrl?: string;
};

export type ResumeData = {
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
};

export type ResumeDocumentProps = {
  data: ResumeData;
};

const noHyphenation = (word: string) => [word];

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 8.0,
    lineHeight: 1.1,
    backgroundColor: '#FFFFFF',
    paddingTop: 28,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },

  header: {
    alignItems: 'center',
    marginBottom: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    marginBottom: 5,
    lineHeight: 1.0,
  },
  subtitle: {
    fontSize: 10,
    color: '#444444',
    marginBottom: 5,
    lineHeight: 1.0,
    textAlign: 'center',
  },
  contactLine: {
    fontSize: 8.8,
    color: '#222222',
    lineHeight: 1.0,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    paddingBottom: 2,
    marginBottom: 5,
    marginTop: 10,
    letterSpacing: 0.8,
  },

  summaryPara: {
    fontSize: 8.4,
    marginBottom: 4,
    color: '#222',
    lineHeight: 1.0,
  },

  skillRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  skillLabel: {
    width: '28%',
    fontSize: 7.8,
    fontWeight: 'bold',
    paddingRight: 10,
    color: '#111',
    lineHeight: 1.0,
  },
  skillValue: {
    width: '72%',
    fontSize: 8.35,
    color: '#333',
    lineHeight: 1.0,
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
    fontSize: 9.2,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 8.3,
    color: '#444',
  },
  designation: {
    fontSize: 8.3,
    color: '#555',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#1A3C6E',
    marginTop: 4,
    marginBottom: 1,
  },
  projectRole: {
    fontSize: 8.0,
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
    fontSize: 8.0,
    color: '#333',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.0,
    color: '#222',
    lineHeight: 1.0,
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
    fontSize: 8.0,
    color: '#222',
  },
  certLink: {
    fontSize: 8.0,
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
    fontSize: 8.5,
    fontWeight: 'bold',
  },
  eduPeriod: {
    fontSize: 8.0,
    color: '#444',
  },
  eduInstitution: {
    fontSize: 8.0,
    color: '#555',
  },
});

const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data }) => {
  return (
    <Document author={data.fullName} title={`${data.fullName} Resume`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name} hyphenationCallback={noHyphenation}>
            {data.fullName.toUpperCase()}
          </Text>
          <Text style={styles.subtitle} hyphenationCallback={noHyphenation}>
            {data.titleLine}
          </Text>
          <Text style={styles.contactLine} hyphenationCallback={noHyphenation}>
            {data.phone}  |  {data.email}  |  {data.linkedin}
          </Text>
        </View>

        <Text style={styles.sectionTitle} hyphenationCallback={noHyphenation}>
          PROFESSIONAL SUMMARY
        </Text>
        {data.summary.map((item, idx) => (
          <Text key={idx} style={styles.summaryPara} hyphenationCallback={noHyphenation}>
            {item}
          </Text>
        ))}

        <Text style={styles.sectionTitle} hyphenationCallback={noHyphenation}>
          CORE TECHNICAL SKILLS
        </Text>
        {data.skillCategories.map((cat, idx) => (
          <View key={idx} style={styles.skillRow}>
            <Text style={styles.skillLabel} hyphenationCallback={noHyphenation}>
              {cat.category}
            </Text>
            <Text style={styles.skillValue} hyphenationCallback={noHyphenation}>
              {cat.skills.join(', ')}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle} hyphenationCallback={noHyphenation}>
          PROFESSIONAL EXPERIENCE
        </Text>
        {data.sortedExperiences.map((job, idx) => (
          <View key={idx} style={styles.expBlock}>
            <View style={styles.expHeader}>
              <Text style={styles.companyName} hyphenationCallback={noHyphenation}>
                {job.company}
              </Text>
              <Text style={styles.period} hyphenationCallback={noHyphenation}>
                {job.period}
              </Text>
            </View>

            <Text style={styles.designation} hyphenationCallback={noHyphenation}>
              {job.designation}  ·  {job.location}
            </Text>

            {job.projects.map((project, pIdx) => (
              <View key={pIdx}>
                {!!project.name && (
                  <Text style={styles.projectName} hyphenationCallback={noHyphenation}>
                    {project.name}
                  </Text>
                )}
                {!!project.role && (
                  <Text style={styles.projectRole} hyphenationCallback={noHyphenation}>
                    {project.role}
                  </Text>
                )}

                {project.details.map((detail, dIdx) => (
                  <View key={dIdx} style={styles.bulletRow}>
                    <Text style={styles.bulletDash} hyphenationCallback={noHyphenation}>
                      -
                    </Text>
                    <Text style={styles.bulletText} hyphenationCallback={noHyphenation}>
                      {detail}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle} hyphenationCallback={noHyphenation}>
          CERTIFICATIONS
        </Text>
        <View style={styles.certGrid}>
          {data.certifications.map((cert, idx) => (
            <View key={idx} style={styles.certItem}>
              {cert.publicUrl ? (
                <Link src={cert.publicUrl}>
                  <Text style={styles.certLink} hyphenationCallback={noHyphenation}>
                    - {cert.title}
                  </Text>
                </Link>
              ) : (
                <Text style={styles.certText} hyphenationCallback={noHyphenation}>
                  - {cert.title}
                </Text>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle} hyphenationCallback={noHyphenation}>
          EDUCATION
        </Text>
        {data.education.map((edu, idx) => (
          <View key={idx}>
            <View style={styles.eduRow}>
              <Text style={styles.eduDegree} hyphenationCallback={noHyphenation}>
                {edu.degree}
              </Text>
              <Text style={styles.eduPeriod} hyphenationCallback={noHyphenation}>
                {edu.period}
              </Text>
            </View>
            <Text style={styles.eduInstitution} hyphenationCallback={noHyphenation}>
              {edu.institution}{edu.location ? `  ·  ${edu.location}` : ''}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ResumeDocument;
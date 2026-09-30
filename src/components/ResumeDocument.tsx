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
  location?: string;
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

  skillGroupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillGroupBlock: {
    width: '48%',
    marginBottom: 7,
  },
  skillGroupTitle: {
    fontSize: 8.6,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
    lineHeight: 1.0,
  },
  skillGroupText: {
    fontSize: 8.0,
    color: '#333',
    lineHeight: 1.25,
  },

  expBlock: {
    marginBottom: 7,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 9.2,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 8.3,
    color: '#444',
  },
  projectName: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#1A3C6E',
    marginTop: 4,
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
            {data.phone}  |  {data.email}  |  {data.linkedin}{data.location ? `  |  ${data.location}` : ''}
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
          CORE SKILLS
        </Text>
        <View style={styles.skillGroupsGrid}>
          {data.skillCategories.map((cat, idx) => (
            <View key={idx} style={styles.skillGroupBlock}>
              <Text style={styles.skillGroupTitle} hyphenationCallback={noHyphenation}>
                {cat.category}
              </Text>
              <Text style={styles.skillGroupText} hyphenationCallback={noHyphenation}>
                {cat.skills.join(', ')}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle} hyphenationCallback={noHyphenation}>
          PROFESSIONAL EXPERIENCE
        </Text>
        {data.sortedExperiences.map((job, idx) => (
          <View key={idx} style={styles.expBlock}>
            <View style={styles.expHeader}>
              <Text style={styles.companyName} hyphenationCallback={noHyphenation}>
                {job.designation}  |  {job.company}
              </Text>
              <Text style={styles.period} hyphenationCallback={noHyphenation}>
                {job.period}  ·  {job.location}
              </Text>
            </View>

            {job.projects.map((project, pIdx) => (
              <View key={pIdx}>
                {!!project.name && (
                  <Text style={styles.projectName} hyphenationCallback={noHyphenation}>
                    &gt; {project.name}
                  </Text>
                )}

                {project.details.map((detail, dIdx) => (
                  <View key={dIdx} style={styles.bulletRow}>
                    <Text style={styles.bulletDash} hyphenationCallback={noHyphenation}>
                      &#8226;
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
                    &#8226; {cert.title}
                  </Text>
                </Link>
              ) : (
                <Text style={styles.certText} hyphenationCallback={noHyphenation}>
                  &#8226; {cert.title}
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
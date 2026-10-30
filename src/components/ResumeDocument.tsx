import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { boldSegments } from '@/lib/boldSegments';

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
  showProjectsInResume?: boolean;
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
  recognition?: string[];
};

export type ResumeDocumentProps = {
  data: ResumeData;
};

const noHyphenation = (word: string) => [word];

// Mirrors public/Neeraj_Kumar_Singh_Resume.docx: US Letter, 1in margins, left-aligned, black text.
// Helvetica is a built-in PDF font with true bold and italic, standing in for the docx's Calibri.
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    lineHeight: 1.2,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    padding: 72,
  },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  link: { color: '#0563C1', textDecoration: 'underline' },

  name: { fontSize: 14, fontWeight: 'bold', lineHeight: 1.4, marginBottom: 2 },
  titleLine: { fontSize: 11, fontWeight: 'bold', marginBottom: 4 },
  contactLine: { fontSize: 9, marginBottom: 6 },

  sectionHeading: { fontSize: 11, fontWeight: 'bold', marginTop: 4, marginBottom: 4 },
  paragraph: { marginBottom: 6 },

  jobHeading: { fontSize: 9, fontWeight: 'bold', marginTop: 2, marginBottom: 2 },
  jobMeta: { fontSize: 9, fontStyle: 'italic', marginBottom: 4 },
  projectLine: { fontSize: 9, marginBottom: 2 },

  list: { marginBottom: 6 },
  bulletRow: { flexDirection: 'row', paddingLeft: 18 },
  bullet: { width: 18 },
  bulletText: { flex: 1 },
});

const Rich: React.FC<{ text: string }> = ({ text }) => (
  <>
    {boldSegments(text).map((seg, i) => (
      <Text key={i} style={seg.bold ? styles.bold : undefined}>
        {seg.text}
      </Text>
    ))}
  </>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.bulletRow} wrap={false}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText} hyphenationCallback={noHyphenation}>
      {children}
    </Text>
  </View>
);

const SectionHeading: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.sectionHeading} minPresenceAhead={40}>
    {children}
  </Text>
);

// "Solutions Architect | Data Engineer | Backend Engineer" -> "Solutions Architect, Data Engineer & Backend Engineer"
const formatRole = (role: string) => {
  const parts = role.split('|').map((p) => p.trim()).filter(Boolean);
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} & ${parts[parts.length - 1]}` : parts[0] ?? '';
};

const EARLY_ADOPTER = ' Early Adopter';

// Shows "X (Early Adopter)" once instead of listing both the X badge and its Early Adopter badge.
const resumeCertifications = (certs: Certification[]) => {
  const titles = new Set(certs.map((c) => c.title));
  return certs
    .filter((c) => !titles.has(`${c.title}${EARLY_ADOPTER}`))
    .map((c) =>
      c.title.endsWith(EARLY_ADOPTER)
        ? { ...c, title: `${c.title.slice(0, -EARLY_ADOPTER.length)} (Early Adopter)` }
        : c
    );
};

const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data }) => {
  return (
    <Document author={data.fullName} title={`${data.fullName} Resume`}>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{data.fullName}</Text>
        <Text style={styles.titleLine}>{data.titleLine}</Text>
        <Text style={styles.contactLine} hyphenationCallback={noHyphenation}>
          {data.location ? `${data.location} · ` : ''}
          {data.email} · {data.phone} · LinkedIn: <Link src={data.linkedin} style={styles.link}>{data.linkedin}</Link>
        </Text>

        <SectionHeading>Professional Summary</SectionHeading>
        <Text style={styles.paragraph} hyphenationCallback={noHyphenation}>
          {data.summary.join(' ')}
        </Text>

        <SectionHeading>Core Competencies</SectionHeading>
        <View style={styles.list}>
          {data.skillCategories.map((cat) => (
            <Bullet key={cat.category}>
              <Text style={styles.bold}>{cat.category}:</Text> {cat.skills.join(', ')}
            </Bullet>
          ))}
        </View>

        <SectionHeading>Professional Experience</SectionHeading>
        {data.sortedExperiences.map((job) => (
          <View key={`${job.company}-${job.period}`}>
            <View wrap={false} minPresenceAhead={40}>
              <Text style={styles.jobHeading} hyphenationCallback={noHyphenation}>
                {job.designation} | {job.company}
              </Text>
              <Text style={styles.jobMeta}>
                {job.period} · {job.location.split(',')[0]}
              </Text>
            </View>

            {job.showProjectsInResume ? (
              job.projects.map((project) => (
                <View key={project.name} wrap={false}>
                  <Text style={styles.projectLine} hyphenationCallback={noHyphenation}>
                    <Text style={styles.bold}>{project.name}</Text> · <Text style={styles.italic}>{formatRole(project.role)}</Text>
                  </Text>
                  <View style={styles.list}>
                    {project.details.map((detail, i) => (
                      <Bullet key={i}>
                        <Rich text={detail} />
                      </Bullet>
                    ))}
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.list}>
                {job.projects.flatMap((project) =>
                  project.details.map((detail, i) => (
                    <Bullet key={`${project.name}-${i}`}>
                      <Rich text={detail} />
                    </Bullet>
                  ))
                )}
              </View>
            )}
          </View>
        ))}

        <SectionHeading>Certifications & Recognition</SectionHeading>
        <View style={styles.list}>
          {resumeCertifications(data.certifications).map((cert) => (
            <Bullet key={cert.title}>
              <Text style={styles.bold}>{cert.title}</Text>
              {cert.publicUrl ? (
                <>
                  {' · '}
                  <Link src={cert.publicUrl} style={styles.link}>Verify on Credly</Link>
                </>
              ) : null}
            </Bullet>
          ))}
          {data.recognition?.map((item) => (
            <Bullet key={item}>
              <Rich text={item} />
            </Bullet>
          ))}
        </View>

        <SectionHeading>Education</SectionHeading>
        {data.education.map((edu) => {
          const [degree, ...honors] = edu.degree.split(' (');
          return (
            <Text key={edu.degree} style={styles.paragraph} hyphenationCallback={noHyphenation}>
              <Text style={styles.bold}>{degree}</Text>
              {honors.length ? ` (${honors.join(' (')}` : ''}, {edu.period} · {edu.institution}
              {edu.location ? `, ${edu.location}` : ''}
            </Text>
          );
        })}
      </Page>
    </Document>
  );
};

export default ResumeDocument;

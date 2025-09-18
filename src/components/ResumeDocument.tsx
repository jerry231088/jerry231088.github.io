import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register your custom fonts (place them in /public/fonts)
Font.register({
  family: 'Lato',
  fonts: [
    { src: '/fonts/Lato-Regular.ttf' },
    { src: '/fonts/Lato-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Lato',
    fontSize: 10,
    lineHeight: 1.4,
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#4A4A4A',
  },
  mainSection: {
    flexDirection: 'row',
  },
  leftColumn: {
    width: '35%',
    paddingRight: 15,
  },
  rightColumn: {
    width: '65%',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingBottom: 3,
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  companyInfo: {
    fontSize: 10,
    color: '#555555',
    marginBottom: 5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
  },
});

export const ResumeDocument = ({ data }) => (
  <Document author="Neeraj Kumar Singh" title="Resume">
    <Page size="A4" style={styles.page}>

      <View style={styles.header}>
        [cite_start]<Text style={styles.name}>NEERAJ KUMAR SINGH [cite: 18]</Text>
        <Text style={styles.subtitle}>AWS Certified Solutions Architect - Professional | [cite_start]AWS Certified Data Engineer [cite: 19]</Text>
      </View>

      <View style={styles.mainSection}>
        <View style={styles.leftColumn}>
          {/* You can build out the left column sections here */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Details</Text>
            [cite_start]<Text>+91-9611724567 [cite: 45]</Text>
            [cite_start]<Text>jerry231088@gmail.com [cite: 46]</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {/* Map over your skills data here */}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text>
              [cite_start]Seasoned Data Engineer with over a decade of experience in technology, including 6+ years architecting and deploying robust data ecosystems on AWS. [cite: 21] [cite_start]He specializes in leading cross-functional teams to tackle complex architectural challenges and consistently delivers highly available, scalable, and business-driven data solutions. [cite: 22] [cite_start]Recognized for innovation and designing ground-up architectures that enhance data accuracy, unlock insights, and accelerate organizational growth. [cite: 23]
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.sortedExperiences.map((job, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.jobTitle}>{job.role}</Text>
                <Text style={styles.companyInfo}>{job.company} | {job.period}</Text>
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
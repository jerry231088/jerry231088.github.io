import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Image } from '@react-pdf/renderer';

const phoneIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAARlJREFUaEPtmNEVwyAMhL829Ekv9JJepJd6kl7sJo2BwcIQs2pMvG+BE/87s80u8CS/wJ8v4C8f4HkewL+PBE4EToBfCbiVyQbwDDwCLyB5l8kG8Bh4Ah4g/d/IBvASeAIOIF3AyAbwDHgCVyD9GcgG8BR4AlcgHQayAVwDrl2AdA8gG8Al4AqcgDRvIBvAteA2cAJSL4BsAIeAh8AVSH0g2QBOAsfAFTiD1D8gG8CR4D5wglIvQDYAl4D7wBWIfkCyARwBbgNXIM0LyAZwD7gNnIDUCpAN4AFwG7gCqX9ANoCzQBY4A6lXIBvAJeA+cAViH0A2gCOA28AVSMMDsgHcA+4DJyB1A8gGcAC4DVyB1AcgG8BJ4Ai8AVS/IDuQwUn/Ad/gDjiB1AsQ7oALgA0rSl/s5wAAAABJRU5ErkJggg==';
const emailIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAWFJREFUaEPtmNFVwyAMhL829JJepJd6kl7oJRrYFpQKFDXBxJ/zCMn+52ZnF3iSX+DPF/CTD3ieR+DvJ4ETgRPglwJuxWQDmAd+AU/A+l0mG8Aj4Am8Qfq/kQ3gJfAEnEC6gZEN4BnwBK5A+jOQDeAp8ASuQDoMZAM4Bly7AOkegWwAl4Ar8AakcQPZAK4Ft4ETkHoBsgEcAh4CVyD1gWQDmASOAStwBtJ/QDaAI8F94ASkXoBsAC8B94ErEP0AZAM4ArwG3IA0byAbwD3gNnACUisgG8AD4DZwCFL/gGwAZ4Es8AxIvQjZAC4B94ErEHsAsgEcAd4CVyANj8gGcA+4D5yA1A0gG8AB4DZwCFLfgGwAk4AT8A5Q/YLsQAcn/Qd8g28gk0vQn4ALgA1nE2XfNAAAAABJRU5ErkJggg==';
const linkedinIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAetJREFUaEPtmd1NwzAUhc/doBvgFMoG4AZoA7QBWgfYIToB2gDdIJygG6Qb4BSKCjh+KElVkvjPcyZH0v/khM1lVz6bkwLhA3H4gBj/cIDfTwInAifALwXcismGMAw8Aw8gPZfJBvAcPAD3kf4vZEN4CzQAB5AuwMgGcAy8ANdA+h+QDeAV8ACuQDoEZAMYBa7cgPQPIBsAE8AVeAHSvIFsANfArWABpF4A2QBOAwfAC0h9ANkAVoEDcAWk/gDZAJ4A94ETkHoAsgFcAu4DVyD6AcgGcAV4DVyANH8gG8A14FZgAlIrIBvAI+A2cAXS/4BsAGeBLPABpF6AbAAXgfvAFYh9ANkArgFvAVegDQfIBnAPuA2cgNQPIBsAA8BtcAHSF0A2gEvgCPACUv+A7IBu/8Y3yBvARpD6AWQ7XgZcABvYnSj93QAAAABJRU5ErkJggg==';
const githubIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAx9JREFUaEPtmmmoVFUUhp/PzGAmk4E8CgyKGAoVwcqIiCgKMiiDiIgo6kcUdZQiKogK8qUoD6IoCiKKoAiDggzKomYfD7MgAyqCCoqgeWz+/2v/n32z9zC/cO7Z57z/de+17z37Xg3iQfTwgPj+IYB/nwROBE6AXw24lZMN4DnwACRAei6TDeA58AJsI/1fyAZwBdgAHkD7gJEN4ClwA7cC0v+AbABvgC3QBqgRkAzgDLhyA9A8gWwAV4A2cAdScgOzAawCW8AKSL0A2QAegcPAC0h9ANkAngIOQBek+gDZAI4A94ETkHoBsgncBdwGrkD0A5BN4AvgNXAF0nwD2QDeAq5BElIrIJvAI+A2cAXS/4BsAmeBLLCD1AsgG8AF4D5wBWIfgGwA14C3gCvQBgfIBnAPuA2cgNQPIBsAA8BtcAHSF0A2gAvgCBwBSv8AdkC5W8NrkANgA6ReAGyPjwEXgBvL81H6XgL6wD3gK1AgHwO3gaPAU6BFw6k14E7Qn12Aew1Mh+s54CPwE4j7S2C+BmwE/hD8/j34/Q7G/wG50F0hO8B+oANMgGNAA/gCFAOfQAXgB/B6m7o8GgLhB5C/h90L4D0gA/wX6AWOgC5QoB0cAUeB/oBf89oE6s4G4QdwHdgM9AHjgB2Q5p+AzUChs7x/wQvgWKB/QvYg0H4gE4Hbgf5AgZ8nIB0cAgfAX6BRu2nN5wHlG8S1oAek4d4F+g+c7U8+7W02mXv1+v3+X6nQ5wG7gD5S8pYFngb8x/F/M+R88O7hHWBHkA30G4x/oANMB4dAJ3gW/0lB+vQ1mC4I2gN2a3i/wL6D8/h+VqBq6AnxL+X/h/hW0T9wD5B+y6d/T/2dE2eA9vAz4F2S/i8e7Yfng+9iXo/gYVAm/A6oP0/P9rV/3f82/NvgvL8V/L/yH9E7z35s0eA/Nn7v+f/n5l/w/bL/8A9gM585/gM1AoBwS5A/s+B/1f/n6d/wLwX9D/u/V/y/yX/Z/Bf4P+m/Wfk//J/h/R/2n4D/S/bPyH/l/0/Bv6T9F+m/5P+T9F/Sf/L/B/R/y3/L/yf8v/J/wFmXlW7l/uPmwAAAABJRU5ErkJggg==';

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
      <View style={{ marginBottom: 4 }}>
          <Text style={styles.name}>NEERAJ KUMAR SINGH</Text>
      </View>
      <View>
          <Text style={styles.subtitle}>AWS Certified Solutions Architect - Professional | AWS Certified Data Engineer</Text>
      </View>
    </View>

      <View style={styles.mainSection}>
        {/* LEFT COLUMN */}
        <View style={styles.leftColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Details</Text>

            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={phoneIcon} />
              <Text>+91-9611724567</Text>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={emailIcon} />
              <Link style={styles.contactText} src="mailto:jerry231088@gmail.com">jerry231088@gmail.com</Link>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={linkedinIcon} />
              <Link style={styles.contactText} src="https://linkedin.com/in/neerajksingh231088">neeraj-singh</Link>
            </View>
            <View style={styles.contactItem}>
              <Image style={styles.contactIcon} src={githubIcon} />
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
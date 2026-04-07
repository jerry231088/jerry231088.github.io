import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

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
  sortedExperiences: Experience[];
  skillCategories: SkillCategory[];
  education: Education[];
  certifications: Certification[];
};

export type ResumeDocumentProps = {
  data: ResumeData;
};

const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data }) => {
  return (
    <Document>
      <Page>
        <View>
          <Text>Resume</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumeDocument;
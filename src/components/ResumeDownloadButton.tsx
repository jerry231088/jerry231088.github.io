"use client";

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumeDocument } from '@/components/ResumeDocument';
import { Button } from '@/components/ui/button';

// --- UPDATED & SPECIFIC TYPE DEFINITIONS ---

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

interface ResumeDownloadButtonProps {
  data: {
    sortedExperiences: Experience[];
    skillCategories: SkillCategory[];
    education: Education[];
    certifications: Certification[];
  };
}


const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({ data }) => {
  return (
    <PDFDownloadLink
      // Remove the 'data' prop from this component
      document={<ResumeDocument />}
      fileName="Neeraj_Kumar_Singh_Senior_Data_Engineer_Resume.pdf"
    >
      {({ loading }) => (
        <Button className="bg-slate-100 text-slate-900 hover:bg-slate-300">
          {loading ? 'Download' : 'Download'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
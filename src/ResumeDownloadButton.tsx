"use client";

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumeDocument } from '@/components/ResumeDocument';
import { Button } from '@/components/ui/button';

// Define the types for the props this component will receive
interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  projects: { name: string; details: string[] }[];
}
// ... add other types if needed (SkillCategory, Education, etc.)

interface ResumeDownloadButtonProps {
  data: {
    sortedExperiences: Experience[];
    skillCategories: any[];
    education: any[];
    certifications: any[];
  };
}

const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<ResumeDocument data={data} />}
      fileName="Neeraj_Kumar_Singh_Senior_Data_Engineer_Resume.pdf"
    >
      {({ loading }) => (
        <Button className="bg-slate-100 text-slate-900 hover:bg-slate-300">
          {loading ? 'Generating PDF...' : 'Download Resume (PDF)'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
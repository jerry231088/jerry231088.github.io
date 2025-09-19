"use client";

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumeDocument } from '@/components/ResumeDocument';
import { Button } from '@/components/ui/button';

// --- Type Definitions ---
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
  publicUrl: string;
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
      document={<ResumeDocument data={data} />}
      fileName="Neeraj_Kumar_Singh_Senior_Data_Engineer_Resume.pdf"
    >
      {({ loading }) => (
        <Button className="bg-slate-100 text-slate-900 hover:bg-slate-300">
          {loading ? 'Loading...' : 'Download'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
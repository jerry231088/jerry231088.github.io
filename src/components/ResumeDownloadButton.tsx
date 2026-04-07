import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument from './ResumeDocument';
import { resumeData } from './resumeData';

const ResumeButton: React.FC = () => {
  return (
    <PDFDownloadLink
      document={<ResumeDocument data={resumeData} />}
      fileName="Neeraj_Kumar_Singh_Resume.pdf"
      style={{
        textDecoration: 'none',
        padding: '10px 18px',
        borderRadius: '8px',
        background: '#111827',
        color: '#ffffff',
        display: 'inline-block',
        fontWeight: 600,
      }}
    >
      {({ loading }) => (loading ? 'Generating Resume...' : 'Download Resume')}
    </PDFDownloadLink>
  );
};

export default ResumeButton;
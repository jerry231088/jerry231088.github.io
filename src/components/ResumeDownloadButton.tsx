import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument, { ResumeData } from './ResumeDocument';

export type ResumeDownloadButtonProps = {
  data: ResumeData;
};

const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<ResumeDocument data={data} />}
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

export default ResumeDownloadButton;
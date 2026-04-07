import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import ResumeDocument, { ResumeData } from './ResumeDocument';

export type ResumeDownloadButtonProps = {
  data: ResumeData;
};

const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<ResumeDocument data={data} />}
      fileName="Neeraj_Kumar_Singh_Resume.pdf"
      className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full inline-flex items-center hover:bg-gray-700 transition-colors"
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <>
          <Download className="h-5 w-5" />
          <span>{loading ? 'Generating Resume...' : 'Download Resume'}</span>
        </>
      )}
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
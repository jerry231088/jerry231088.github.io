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
      className="bg-zinc-800 border border-zinc-700 text-zinc-50 font-bold py-2 px-4 rounded-full inline-flex items-center hover:bg-zinc-700 transition-colors text-sm"
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <>
          <Download className="w-4 h-4 mr-2 text-sky-400" />
          <span>{loading ? 'Generating Resume...' : 'Resume'}</span>
        </>
      )}
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
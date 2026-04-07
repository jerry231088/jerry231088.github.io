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
      className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-700/60 px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-700/80"
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
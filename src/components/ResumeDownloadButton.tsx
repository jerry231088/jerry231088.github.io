import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument, { ResumeData } from './ResumeDocument';
import { Download } from 'lucide-react';

export type ResumeDownloadButtonProps = {
  data: ResumeData;
};

const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<ResumeDocument data={data} />}
      fileName="Neeraj_Kumar_Singh_Resume.pdf"
      className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-800/70 px-10 py-6 text-xl font-semibold text-white transition hover:bg-slate-700/80 min-w-[320px]"
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <>
          <Download className="h-7 w-7" />
          <span>{loading ? 'Generating Resume...' : 'Download Resume'}</span>
        </>
      )}
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
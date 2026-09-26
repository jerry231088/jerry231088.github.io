 import React, { useState } from 'react';
 import { createPortal } from 'react-dom';
 import { Page, Text, View, Document, StyleSheet, Font, Link, pdf } from '@react-pdf/renderer';
 import { Download, X } from 'lucide-react';

 // --- Use the same Roboto font for consistency ---
 const baseUrl = 'https://jerry231088.github.io';
 Font.register({
   family: 'Roboto',
   fonts: [
     { src: `${baseUrl}/fonts/Roboto-Regular.ttf` },
     { src: `${baseUrl}/fonts/Roboto-Bold.ttf`, fontWeight: 'bold' },
   ],
 });

 // --- Type Definitions ---
 interface CoverLetterDocumentProps {
   data: {
     name: string;
     phone: string;
     email: string;
     linkedin: string;
     github: string;
     date: string;
     jobPosition: string;
     companyName: string;
     location: string;
   };
 }

 interface CoverLetterDownloadLinkProps {
   style?: React.CSSProperties;
   className?: string;
 }

 // --- Stylesheet for the Cover Letter ---
 const styles = StyleSheet.create({
   page: { fontFamily: 'Roboto', fontSize: 10.5, lineHeight: 1.4, padding: '0.9in' },
   header: { textAlign: 'center', marginBottom: 24 },
   name: { fontSize: 20, fontWeight: 'bold' },
   contactInfo: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', fontSize: 10, color: '#333' },
   separator: { marginHorizontal: 5 },
   link: { color: '#0000FF', textDecoration: 'none' },
   body: { textAlign: 'justify' },
   paragraph: { marginBottom: 10 },
   salutation: { marginBottom: 14 },
   closing: { marginTop: 14, marginBottom: 6 },
   signature: { fontSize: 10.5, lineHeight: 1.3 }
 });

 // --- The PDF Document Component ---
 const CoverLetterDocument = ({ data }: CoverLetterDocumentProps) => (
   <Document author={data.name} title="Cover Letter">
     <Page size="A4" style={styles.page}>

       <View style={styles.header}>
         <Text style={styles.name}>{data.name.toUpperCase()}</Text>
       </View>

       <View style={styles.body}>
         <Text style={styles.paragraph}>Date: {data.date}</Text>
         <Text style={styles.paragraph}>Dear Hiring Manager,</Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
           I am writing to express my interest in the {data.jobPosition || 'Solutions Architect'} position at {data.companyName || 'your company'}{data.location ? ` in ${data.location}` : ''}. I am a technical leader with ~12 years of software engineering experience and ~8 years of hands-on AWS expertise spanning solutions architecture, data engineering, and applied Generative AI — backed by 10 AWS certifications, including AWS Certified Solutions Architect - Professional, AWS Certified Generative AI Developer - Professional, and AWS Certified Data Engineer - Associate.
         </Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
           As a Solutions Architect, I design secure, highly available, and cost-optimized AWS architectures using Terraform, covering compute (Lambda, ECS, Fargate), data and storage (S3, DynamoDB, Redshift, Neptune), and streaming (Kinesis, MSK). As a Data Engineer, I build and operate large-scale ETL and real-time pipelines that turn raw data into reliable, governed analytics. As a Gen-AI Developer, I design production Gen-AI workflows on Amazon Bedrock (Claude Opus and Sonnet) for intelligent document processing and workflow automation.
         </Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
           A few highlights from my recent work:{'\n'}
           • Architected a greenfield hybrid defense platform (AWS + on-premises) from scratch for an Israel-Germany bilateral military program.{'\n'}
           • Led design and production deployment of a GDPR-compliant Gen-AI document processing system on AWS Bedrock, structuring medical insurance data at scale.{'\n'}
           • Built real-time streaming pipelines with Kinesis/MSK processing millions of sports events with high accuracy and availability.
         </Text>
         <Text style={styles.paragraph} hyphenationCallback={word => [word]}>
           I am recognized for architectural ownership, cross-functional leadership, and delivering cloud and AI solutions that scale reliably at low cost. I would welcome the opportunity to bring this experience to {data.companyName || 'your team'} and discuss how I can contribute. Thank you for your time and consideration.
         </Text>
         <Text style={[styles.closing, { marginTop: 0 }]}>Sincerely,</Text>
         <View style={styles.signature}>
             <Text>Neeraj Kumar Singh</Text>
             <Text>{data.email} | {data.phone}</Text>
             <View style={{ flexDirection: 'row' }}>
                 <Link style={styles.link} src={data.linkedin}>LinkedIn</Link>
                 <Text style={styles.separator}>|</Text>
                 <Link style={styles.link} src={data.github}>GitHub</Link>
             </View>
         </View>
       </View>
     </Page>
   </Document>
 );

 export const CoverLetterDownloadLink = ({ style, className }: CoverLetterDownloadLinkProps) => {
     const [isOpen, setIsOpen] = useState(false);
     const [isGenerating, setIsGenerating] = useState(false);
     const [jobPosition, setJobPosition] = useState('');
     const [companyName, setCompanyName] = useState('');
     const [location, setLocation] = useState('');

     // Your personal data to be included in the cover letter
     const userData = {
         name: 'Neeraj Kumar Singh',
         phone: '+91-9611724567',
         email: 'jerry231088@gmail.com',
         linkedin: 'https://www.linkedin.com/in/neerajksingh231088/',
         github: 'https://jerry231088.github.io/',
     };

     // Function to get the current date in dd-mm-yyyy format
     const getFormattedDate = () => {
         const today = new Date();
         const day = String(today.getDate()).padStart(2, '0');
         const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
         const year = today.getFullYear();
         return `${day}-${month}-${year}`;
     };

     const handleGenerate = async () => {
         if (!jobPosition.trim() || !companyName.trim() || !location.trim()) {
             return;
         }

         setIsGenerating(true);
         try {
             const formattedDate = getFormattedDate();
             const documentData = {
                 ...userData,
                 date: formattedDate,
                 jobPosition: jobPosition.trim(),
                 companyName: companyName.trim(),
                 location: location.trim(),
             };

             const blob = await pdf(<CoverLetterDocument data={documentData} />).toBlob();
             const url = URL.createObjectURL(blob);
             const safeCompany = companyName.trim().replace(/[^a-z0-9]+/gi, '_');
             const link = document.createElement('a');
             link.href = url;
             link.download = `Cover_Letter_Neeraj_Kumar_Singh_${safeCompany}_${formattedDate}.pdf`;
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
             URL.revokeObjectURL(url);

             setIsOpen(false);
             setJobPosition('');
             setCompanyName('');
             setLocation('');
         } finally {
             setIsGenerating(false);
         }
     };

     return (
         <>
             <button
                 type="button"
                 onClick={() => setIsOpen(true)}
                 className={className || "bg-zinc-800 border border-zinc-700 text-zinc-50 font-bold py-2 px-4 rounded-full inline-flex items-center hover:bg-zinc-700 transition-colors text-sm"}
                 style={style}
             >
                 <Download className="w-4 h-4 mr-2 text-violet-400" />
                 <span>Cover Letter</span>
             </button>

             {isOpen && typeof document !== 'undefined' && createPortal(
                 <div
                     className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
                     onClick={() => !isGenerating && setIsOpen(false)}
                 >
                     <div
                         className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                         onClick={(e) => e.stopPropagation()}
                     >
                         <button
                             type="button"
                             onClick={() => !isGenerating && setIsOpen(false)}
                             className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                             aria-label="Close"
                         >
                             <X className="h-5 w-5" />
                         </button>

                         <h3 className="text-lg font-bold text-white mb-1">Generate Cover Letter</h3>
                         <p className="text-sm text-zinc-400 mb-5">
                             Tell me a bit about the role and I&apos;ll tailor the cover letter for it.
                         </p>

                         <div className="space-y-4">
                             <div>
                                 <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                                     Job Position
                                 </label>
                                 <input
                                     type="text"
                                     value={jobPosition}
                                     onChange={(e) => setJobPosition(e.target.value)}
                                     placeholder="e.g. AWS Solutions Architect"
                                     className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-400"
                                 />
                             </div>
                             <div>
                                 <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                                     Company Name
                                 </label>
                                 <input
                                     type="text"
                                     value={companyName}
                                     onChange={(e) => setCompanyName(e.target.value)}
                                     placeholder="e.g. Amazon Web Services"
                                     className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-400"
                                 />
                             </div>
                             <div>
                                 <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                                     Location
                                 </label>
                                 <input
                                     type="text"
                                     value={location}
                                     onChange={(e) => setLocation(e.target.value)}
                                     placeholder="e.g. Bengaluru, India"
                                     className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-400"
                                 />
                             </div>
                         </div>

                         <div className="flex gap-3 mt-6">
                             <button
                                 type="button"
                                 onClick={() => setIsOpen(false)}
                                 disabled={isGenerating}
                                 className="flex-1 bg-transparent border border-zinc-700 text-zinc-300 font-medium py-2 px-4 rounded-full hover:bg-white/5 transition-colors text-sm disabled:opacity-50"
                             >
                                 Cancel
                             </button>
                             <button
                                 type="button"
                                 onClick={handleGenerate}
                                 disabled={isGenerating || !jobPosition.trim() || !companyName.trim() || !location.trim()}
                                 className="flex-1 bg-white text-black font-bold py-2 px-4 rounded-full inline-flex items-center justify-center hover:bg-zinc-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                 {isGenerating ? (
                                     'Generating...'
                                 ) : (
                                     <>
                                         <Download className="w-4 h-4 mr-2" />
                                         Generate
                                     </>
                                 )}
                             </button>
                         </div>
                     </div>
                 </div>,
                 document.body
             )}
         </>
     );
 };
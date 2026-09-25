"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { Phone, Mail, Linkedin, Youtube, Compass, Clock, Cloud, Award, Briefcase, Cpu, Database, Code2, Layers, GitBranch, Activity, BarChart3, FileText, Calendar, MapPin, Hash, CheckCircle2, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

import type { ResumeDownloadButtonProps } from '@/components/ResumeDownloadButton';

const ResumeDownloadButton = dynamic<ResumeDownloadButtonProps>(
  () => import('@/components/ResumeDownloadButton'),
  { ssr: false }
);

const CoverLetterDownloadLink = dynamic(
  () => import('@/components/CoverLetter').then((mod) => mod.CoverLetterDownloadLink),
  { ssr: false }
);

type ExperienceJob = {
  designation: string;
  company: string;
  location: string;
  period: string;
  projects: {
    role: string;
    name: string;
    details: string[];
    youtubeUrl?: string;
  }[];
};

const EXPERIENCE_ACCENTS = [
  {
    card: "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    text: "text-sky-400",
    tag: "border-sky-500/40 text-sky-300 bg-sky-500/10",
    avatar: "bg-sky-500/10 border-sky-500/40 text-sky-300",
  },
  {
    card: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
    text: "text-emerald-400",
    tag: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    avatar: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300",
  },
  {
    card: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.12)] hover:border-violet-400/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
    text: "text-violet-400",
    tag: "border-violet-500/40 text-violet-300 bg-violet-500/10",
    avatar: "bg-violet-500/10 border-violet-500/40 text-violet-300",
  },
  {
    card: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.12)] hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
    text: "text-amber-400",
    tag: "border-amber-500/40 text-amber-300 bg-amber-500/10",
    avatar: "bg-amber-500/10 border-amber-500/40 text-amber-300",
  },
];

const ExperienceCard: React.FC<{
  job: ExperienceJob;
  idx: number;
  total: number;
  progress: MotionValue<number>;
}> = ({ job, idx, total, progress }) => {
  const accent = EXPERIENCE_ACCENTS[idx % EXPERIENCE_ACCENTS.length];
  const distance = useTransform(progress, (p) => Math.abs(p * (total - 1) - idx));
  const scale = useTransform(distance, [0, 1, 2], [1, 0.88, 0.8]);
  const opacity = useTransform(distance, [0, 1, 2], [1, 0.55, 0.35]);
  const zIndex = useTransform(distance, (d) => Math.round(Math.max(0, 20 - d * 15)));

  return (
    <motion.div
      className="w-[380px] flex-shrink-0"
      style={{ scale, opacity, zIndex }}
      whileHover={{ scale: 1.06, opacity: 1, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
    >
      <Card className={`h-[620px] flex flex-col hover:scale-100 ${accent.card}`}>
        <CardContent className="p-6 space-y-5 overflow-y-auto flex-1">
          <div className="flex items-start gap-4">
            <div className={`h-12 w-12 flex-none rounded-lg flex items-center justify-center border text-lg font-bold ${accent.avatar}`}>
              {job.company.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white leading-snug">{job.company}</h4>
              <p className={`font-mono text-xs ${accent.text}`}>&gt; {job.designation}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-sky-400" /> {job.period}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-rose-400" /> {job.location}
            </span>
          </div>

          <div className="space-y-5">
            {job.projects.map((project, pIdx) => (
              <div key={pIdx} className="border-t border-zinc-700 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-white text-sm">{project.name}</h5>
                  {project.youtubeUrl && (
                    <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" title="Watch PI Demo on YouTube" className="text-red-500 hover:text-red-400 transition-colors">
                      <Youtube className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.role.split('|').map((r, i) => (
                    <span key={i} className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border ${accent.tag}`}>
                      {r.trim()}
                    </span>
                  ))}
                </div>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 text-xs">
                  {project.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const experiences: {
    designation: string;
    company: string;
    location: string;
    period: string;
    projects: {
      role: string;
      name: string;
      details: string[];
      youtubeUrl?: string;
    }[];
  }[] = [
    {
      designation: "Senior Consultant",
      company: "msg Global Solutions India Pvt Ltd",
      location: "Bengaluru, India",
      period: "Aug 2023 - Present",
      projects: [
      {
         name: "Smash - Israel-Germany bilateral defense collaboration",
         role: "AWS Solutions Architect | Senior Data Engineer | Backend Engineer (Python & FastAPI) | Gen-AI Developer",
         details: [
           "Architected and built a greenfield hybrid defense platform (AWS + on-premises) from scratch for an Israel-Germany bilateral military program, delivering the full product across 2 sprints of 3 weeks each.",
           "Designed and developed geospatial microservices in Python & FastAPI from the ground up, enabling real-time target location resolution, MGRS-to-coordinate conversion, and proximity-based spatial analysis for mission-critical operations.",
           "Defined complete AWS infrastructure using Terraform from scratch - including VPCs, private subnets, IAM boundary policies, ECS/Fargate services, API Gateway, SQS, S3, and Secrets Manager - ensuring security and reproducibility.",
           "Designed async FastAPI polling and timeout patterns for time-sensitive geospatial routes, ensuring reliable response handling under real-time operational load.",
           "Collaborated directly with cross-national defense stakeholders (Israel & Germany) to translate operational requirements into scalable, compliant backend and cloud architecture."
         ]
        },
        {
          name: "Semantic Bridge",
          role: "AWS Solutions Architect | Senior Data Engineer",
          details: [
            "Defined and delivered the product's AWS cloud foundation using Terraform, enabling scalable, secure, and 100% reproducible infrastructure.",
            "Led the design and production deployment of a GDPR-compliant GenAI Intelligent Document Processing Application using AWS Bedrock (Claude Opus 4.5), extracting and structuring German medical insurance data (GOÄ/GOZ) at scale with full observability and security.",
            "Architected and delivered a GenAI workflow on AWS Bedrock (Claude Sonnet 4.0) to automate the generation of complex BPMN 2.0 models for mission-critical defense workflows.",
            "Established foundational AI/ML infrastructure on AWS, including a high-performance vLLM GPU platform and a secure CI/CD pipeline for sharing KMS-encrypted ECR images with third parties.",
          ]
        },
        {
          name: "ProfileMap",
          role: "AWS Solutions Architect | Senior Data Engineer",
          details: [
            "Designed and deployed a serverless user profile reminder system on AWS using Terraform, optimized for $3/month cost.",
            "Engineered automated daily reporting pipelines on AWS (Batch, Glue, S3, Athena), scaling reliably under $10/month.",
            "Developed a cost-effective candidate search request system via email on AWS with Terraform, enabling skill-based queries for under $5/month.",
            "Designed and operated a secure, data-centric AWS platform leveraging EventBridge, Batch, Glue, DynamoDB, S3, Cognito, and Athena, enforcing governance with IAM and Lake Formation and enabling Power BI reporting.",
            "Applied Gremlin-Python to model and retrieve complex relationships in Amazon Neptune.",
            "Received recognition from the Head of Product for innovative reporting architecture and a high-impact DynamoDB POC that improved attribute-level size accuracy and system performance.\n\n\n\n\n\n\n\n"
          ]
        }
      ]
    },
    {
      designation: "Senior Consultant",
      company: "EXL Services (Inductis India Pvt Ltd)",
      location: "Gurugram, India",
      period: "May 2023 - Aug 2023",
      projects: [
        {
          name: "Mettis",
          role: "AWS Data Engineer",
          details: [
            "Built a scalable batch ETL pipeline to ingest, clean, and transform CSV/JSON data, storing optimized Parquet datasets in Amazon S3 partitioned by year/month/day.",
            "Automated daily processing and analytics using AWS EventBridge and Athena, enabling reliable reporting and dashboards."
            ]
        }
      ]
    },
    {
      designation: "SE III",
      company: "Stats Perform",
      location: "Bengaluru, India",
      period: "Mar 2020 - May 2023",
      projects: [
        {
          name: "Gold Standard Data Platform",
          role: "AWS Data Engineer",
          details: [
            "Lead a small team of 4 data engineers to deliver high-impact results",
            "Developed real-time streaming pipelines with Kinesis/MSK to handle millions of sports events.",
            "Built ETL pipelines into S3, DynamoDB, and Redshift to support analytics and reporting.",
            "Promoted to Software Engineer III (2021-2022 Appraisal Cycle) for outstanding data engineering contributions.",
            "Received Global Recognition Award (Q1 2022) for exceptional contributions in data engineering, driving measurable business value."
          ]
        }
      ]
    },
     {
       designation: "Senior Software Engineer",
       company: "Saggezza - an Apexon Company (formerly: Saggezza India Pvt Ltd)",
       location: "Bengaluru, India",
       period: "Apr 2019 - Mar 2020",
       projects: [
         {
           name: "CW w/ Goldman Sachs",
           role: "AWS Data Engineer",
           details: [
             "Worked on serverless, event-driven data pipelines utilizing AWS Lambda for compute and S3 & DynamoDB for scalable storage.",
             "Worked on multi-language data transformation and validation logic (C#, SQL, Python) to ensure high data accuracy and consistency for the technical support business unit."
           ]
         }
       ]
     },
       {
         designation: "Software Developer",
         company: "Tradelab Technologies (formerly: Tradelab Software Pvt Ltd)",
         location: "Bengaluru, India",
         period: "Dec 2014 - Mar 2019",
         projects: [
           {
             name: "Stock Trading Dealer Application for OMS",
             role: "Software Developer",
             details: [
               "Independently owned the full product lifecycle of a financial trading platform - from eliciting and translating client requirements into technical specifications through to feature delivery and post-release bug resolution. Built real-time market data pipelines by integrating WebSocket APIs for live price streaming and REST APIs for order management and account operations. Implemented high-performance JSON serialization/deserialization using Newtonsoft.Json in C#/.NET, optimizing payload processing speed and ensuring robust data contract handling across all API layers.",
               "Trained a new team member on C# programming."
             ]
           },
           {
            name: "India's #1 Desktop Application - Zerodha PI",
            role: "Software Developer",
            youtubeUrl: "https://www.youtube.com/watch?v=BJZz0cwopTw",
            details: [
              "Engineered and delivered advanced technical charting features for a financial trading platform, including real-time price visualization, candlestick/OHLC rendering, and indicator overlays using C#. Resolved critical UI bugs affecting trade execution workflows, authored unit tests to validate chart data accuracy under high-frequency data loads, and improved rendering performance for large time-series datasets.",
            ]
          }
         ]
       }
  ];

  // THIS BLOCK AUTOMATICALLY SORT THE EXPERIENCES
  const sortedExperiences = [...experiences].sort((a, b) => {
    const getEndDate = (period: string): Date => {
      const endDateStr = period.split('-')[1].trim();
      if (endDateStr === 'Present') {
        // Use current date for "Present" to ensure it's always first
        return new Date();
      }
      return new Date(endDateStr);
    };

    const dateA = getEndDate(a.period);
    const dateB = getEndDate(b.period);

    // Sort in descending order (newest first)
    return dateB.getTime() - dateA.getTime();
  });

  const experienceTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: experienceScrollProgress } = useScroll({
    target: experienceTrackRef,
    offset: ["start start", "end end"],
  });
  const EXPERIENCE_CARD_STEP = 404; // 380px card width + 24px gap
  const experienceX = useTransform(
    experienceScrollProgress,
    [0, 1],
    ["0px", `-${(sortedExperiences.length - 1) * EXPERIENCE_CARD_STEP}px`]
  );

  const skillCategories = [
    {
      category: "Technical Skills",
      skills: ["Cloud Architecture & Infrastructure", "Amazon Web Services (AWS)", "Infrastructure as Code (IaC)", "Infrastructure Automation", "Terraform", "Data Ingestion", "Data Management", "Data Security", "Data Transformation", "Data Storage", "Code Development", "Code Deployment", "CICD", "Gen-AI", "AI"]
    },
    {
      category: "AWS Cloud",
      skills: [ "Bedrock", "Lambda", "Batch", "Elastic Container Service", "Elastic Kubernetes Service", "Fargate", "API Gateway", "DynamoDB", "Neptune", "S3", "Lake Formation", "Athena", "EventBridge", "IAM", "Secrets Manager", "SSM Parameter Store", "SES", "ECR", "Route53", "SNS", "SQS", "Cognito", "Glue", "Kinesis Data Streams", "Amazon Data Firehose", "MSK/Kafka", "Redshift" ]
    },
    {
      category: "Data Engineering",
      skills: [ "Data Lake", "Extract, Transform, Load (ETL)", "Extract, Load, Transform (ELT)", "Databases", "SQL", "NoSQL", "Data Warehousing", "Batch",  "Real-time Streaming", "Gremlin-Python", "Spark" ]
    },
    {
      category: "Programming & Scripting",
      skills: [ "Python", "Pandas", "SQL", "C#" ]
    },
    {
      category: "Infrastructure as Code (IaC)",
      skills: [ "Terraform", "CloudFormation" ]
    },
    {
      category: "DevOps",
      skills: [ "GitHub", "Bitbucket", "Jenkins", "Atlantis", "CI/CD" ]
    },
    {
      category: "Monitoring & Logging",
      skills: [ "CloudWatch", "Insights", "CloudTrail" ]
    },
    {
      category: "Visualization & BI",
      skills: [ "Power BI", "Athena", "QuickSight" ]
    },
    {
      category: "Design, Cost Optimization & Architecture",
      skills: [ "app.diagrams.net", "AWS Pricing Calculator", "Cost Explorer", "Budgets", "Service Quotas"]
    },
    {
      category: "Project Management & Documentation",
      skills: ["JIRA", "Confluence"]
    }
  ];

  const certifications = [
    {
      title: 'AWS Certified Generative AI Developer - Professional Early Adopter',
      publicUrl: 'https://www.credly.com/badges/8be08799-db29-4070-a561-e0c3350201f7/public_url',
      imageUrl: '/badges/aws-certified-generative-ai-developer-professional-early-adopter.png'
    },
    {
      title: 'AWS Certified Generative AI Developer - Professional',
      publicUrl: 'https://www.credly.com/badges/11b9bedf-3932-4d5e-96ef-2d412a4f37e8/public_url',
      imageUrl: '/badges/aws-certified-generative-ai-developer-professional.png'
    },
    {
      title: 'AWS Certified Solutions Architect - Professional',
      publicUrl: 'https://www.credly.com/badges/f8d87ba7-3bd8-428d-ad6b-adfba07567fe/public_url',
      imageUrl: '/badges/aws-sa-pro.png'
    },
    {
      title: 'AWS Certified Database - Specialty',
      publicUrl: 'https://www.credly.com/badges/84bf4cdc-addf-4a68-ba4c-29e36837ff0f/public_url',
      imageUrl: '/badges/aws-db-specialty.png'
    },
    {
      title: 'AWS Certified Machine Learning Engineer - Associate',
      publicUrl: 'https://www.credly.com/badges/3e01811e-137d-4143-99ad-ef4cc715a7c2/public_url',
      imageUrl: '/badges/aws-certified-machine-learning-engineer-associate.png'
    },
    {
      title: 'AWS Certified CloudOps Engineer - Associate',
      publicUrl: 'https://www.credly.com/badges/f9f45761-3640-406b-bbed-979cb867c332/public_url',
      imageUrl: '/badges/aws-certified-cloudops-engineer-associate.png'
    },
    {
      title: 'AWS Certified Data Engineer - Associate',
      publicUrl: 'https://www.credly.com/badges/3f7dca14-df8b-4595-a754-76d05d16e7c2/public_url',
      imageUrl: '/badges/aws-data-engineer.png'
    },
    {
      title: 'AWS Certified Solutions Architect - Associate',
      publicUrl: 'https://www.credly.com/badges/242d7b54-73d8-4f2f-a6ad-30ca997576ca/public_url',
      imageUrl: '/badges/aws-sa-assoc.png'
    },
    {
      title: 'AWS Certified Developer - Associate',
      publicUrl: 'https://www.credly.com/badges/42d63252-a37b-40e7-8445-9ef7c23b5e5c/public_url',
      imageUrl: '/badges/aws-dev-assoc.png'
    },
    {
      title: 'AWS Certified AI Practitioner Early Adopter',
      publicUrl: 'https://www.credly.com/badges/11d055b9-485b-4300-90b4-4cd0f64fa713/public_url',
      imageUrl: '/badges/aws-ai-practitioner-early-adopter.png'
    },
    {
      title: 'AWS Certified AI Practitioner',
      publicUrl: 'https://www.credly.com/badges/37e82c5e-3014-4cb1-a481-522c1cad8b18/public_url',
      imageUrl: '/badges/aws-ai-practitioner.png'
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      publicUrl: 'https://www.credly.com/badges/32aacb39-113c-4bd1-b69f-3120776bafcf/public_url',
      imageUrl: '/badges/aws-cloud-practitioner.png'
    },
    {
      title: 'HashiCorp Certified: Terraform Associate',
      publicUrl: 'https://www.credly.com/badges/9b7afd54-eb04-4272-8496-3bd77928b42f/public_url',
      imageUrl: '/badges/hashicorp-tf-assoc.png'
    }
  ];

  const education = [
      {
        degree: "Bachelor of Technology in Electronics and Communication Engineering",
        institution: "Shri Mata Vaishno Devi University",
        period: "2007 - 2011",
        location: "J&K, India",
      }
    ];

  const portfolioData = {
    fullName: 'Neeraj Kumar Singh',
    titleLine: 'AWS Solutions Architect  ·  Senior Data Engineer  ·  Gen-AI Developer',
    phone: '+91-9611724567',
    email: 'jerry231088@gmail.com',
    linkedin: 'linkedin.com/in/neeraj-singh',
    summary: [
      'Technical leader and AWS Data Engineer with ~12 years of overall software engineering experience and ~8 years of hands-on experience on AWS. Strong background as an AWS Solutions Architect, leading end-to-end design and delivery of highly available, secure, and cost-optimized cloud data platforms.',
      'Expert in architecting modern data lakes, streaming systems, and event-driven pipelines supporting analytics, AI/ML, and BI workloads. Hands-on experience delivering GenAI solutions using Amazon Bedrock, enabling intelligent data processing, knowledge retrieval, and AI-driven insights.',
      'Recognized for architectural ownership, technical leadership, and cross-functional collaboration, with a track record of designing ground-up AWS architectures that improve data quality, scalability, and business outcomes. Strong advocate of automation, IaC, AWS best practices, and mentoring engineers to drive innovation.',
    ],
    sortedExperiences,
    skillCategories,
    education,
    certifications,
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#certifications", label: "Certifications" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-700 bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-mono text-sm font-bold tracking-widest text-white border border-zinc-700 rounded-md px-2 py-1">
            NS
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ResumeDownloadButton data={portfolioData} />
            <CoverLetterDownloadLink />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="text-center py-24 px-6 border-b border-zinc-700">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Neeraj Kumar Singh
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-sky-500/40 text-sky-300 bg-sky-500/10 shadow-[0_0_18px_rgba(56,189,248,0.35)]">
            AWS Certified Solutions Architect - Professional
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-emerald-500/40 text-emerald-300 bg-emerald-500/10 shadow-[0_0_18px_rgba(16,185,129,0.35)]">
            AWS Certified Data Engineer
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-violet-500/40 text-violet-300 bg-violet-500/10 shadow-[0_0_18px_rgba(139,92,246,0.35)]">
            AWS Certified Generative AI Developer - Professional
          </span>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Cloud Architecture meets Data Engineering
        </h3>
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
        <p className="text-zinc-400 max-w-2xl mb-12">
          Designing secure, scalable AWS platforms and Gen-AI powered data systems for mission-critical workloads.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative bg-zinc-800/60 border border-sky-500/30 rounded-xl p-8 shadow-[0_0_35px_rgba(56,189,248,0.12)] transition-all hover:z-10 hover:scale-[1.01] hover:border-sky-400/60 hover:shadow-[0_0_45px_rgba(56,189,248,0.22)]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-4">
              <Compass className="h-4 w-4" /> Background &amp; Mission
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">
              ~12 years engineering scalable, secure cloud &amp; data platforms for defense, healthcare, and sports-tech clients.
            </h4>
            <div className="space-y-4 text-zinc-400 leading-relaxed mb-6">
              {portfolioData.summary.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="border-t border-zinc-700 pt-6">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
                Trusted Leadership At
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-zinc-700 rounded-lg px-3 py-2">
                  <p className="text-sm font-bold text-sky-400">msg Global Solutions</p>
                  <p className="text-xs text-zinc-500">Senior Consultant</p>
                </div>
                <div className="border border-zinc-700 rounded-lg px-3 py-2">
                  <p className="text-sm font-bold text-emerald-400">Stats Perform</p>
                  <p className="text-xs text-zinc-500">Software Engineer III</p>
                </div>
                <div className="border border-zinc-700 rounded-lg px-3 py-2">
                  <p className="text-sm font-bold text-violet-400">EXL Services</p>
                  <p className="text-xs text-zinc-500">Senior Consultant</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              {
                label: "Experience",
                icon: Clock,
                value: "~12 Yrs",
                caption: "Software Engineering",
                tagClass: "border-sky-500/40 text-sky-300 bg-sky-500/10",
                iconClass: "text-sky-400",
                cardClass: "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]",
              },
              {
                label: "AWS Expertise",
                icon: Cloud,
                value: "~8 Yrs",
                caption: "Hands-on AWS",
                tagClass: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
                iconClass: "text-emerald-400",
                cardClass: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
              },
              {
                label: "Credentials",
                icon: Award,
                value: `${certifications.length}`,
                caption: "AWS Certifications",
                tagClass: "border-amber-500/40 text-amber-300 bg-amber-500/10",
                iconClass: "text-amber-400",
                cardClass: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
                showBadges: true,
              },
              {
                label: "Delivery",
                icon: Briefcase,
                value: `${sortedExperiences.length}`,
                caption: "Companies & Programs",
                tagClass: "border-violet-500/40 text-violet-300 bg-violet-500/10",
                iconClass: "text-violet-400",
                cardClass: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-violet-400/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`relative overflow-hidden bg-zinc-800/60 border rounded-xl p-5 flex flex-col justify-between transition-all hover:z-10 hover:scale-[1.05] ${stat.cardClass}`}
              >
                <stat.icon className={`absolute -right-3 -bottom-3 h-20 w-20 opacity-[0.06] ${stat.iconClass}`} />
                <div className="relative flex items-center justify-between mb-6">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest border ${stat.tagClass}`}>
                    {stat.label}
                  </span>
                  <stat.icon className={`h-4 w-4 ${stat.iconClass}`} />
                </div>
                {stat.showBadges && (
                  <div className="relative flex -space-x-2 mb-2">
                    {certifications.slice(0, 4).map((cert) => (
                      <img
                        key={cert.title}
                        src={cert.imageUrl}
                        alt={cert.title}
                        title={cert.title}
                        className="h-8 w-8 rounded-full border-2 border-zinc-800 bg-zinc-900 object-contain"
                      />
                    ))}
                  </div>
                )}
                <div className="relative">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Skills &amp; Technical Expertise
        </h3>
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
        <p className="text-zinc-400 max-w-2xl mb-12">
          A breakdown of the cloud, data, and engineering competencies I bring to every project.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const accents = [
              {
                icon: Cpu,
                iconClass: "text-sky-400",
                iconWrap: "bg-sky-500/10 border-sky-500/40",
                tagClass: "border-sky-500/40 text-sky-300 bg-sky-500/10",
                cardClass: "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]",
              },
              {
                icon: Cloud,
                iconClass: "text-amber-400",
                iconWrap: "bg-amber-500/10 border-amber-500/40",
                tagClass: "border-amber-500/40 text-amber-300 bg-amber-500/10",
                cardClass: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.12)] hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
              },
              {
                icon: Database,
                iconClass: "text-emerald-400",
                iconWrap: "bg-emerald-500/10 border-emerald-500/40",
                tagClass: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
                cardClass: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
              },
              {
                icon: Code2,
                iconClass: "text-violet-400",
                iconWrap: "bg-violet-500/10 border-violet-500/40",
                tagClass: "border-violet-500/40 text-violet-300 bg-violet-500/10",
                cardClass: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.12)] hover:border-violet-400/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
              },
            ];
            const icons = [Cpu, Cloud, Database, Code2, Layers, GitBranch, Activity, BarChart3, Compass, FileText];
            const taglines: Record<string, string> = {
              "Technical Skills": "Cloud-native architecture & delivery",
              "AWS Cloud": "Core AWS services & platforms",
              "Data Engineering": "Pipelines, warehousing & streaming",
              "Programming & Scripting": "Languages & automation tooling",
              "Infrastructure as Code (IaC)": "Reproducible infra provisioning",
              "DevOps": "CI/CD & collaboration tooling",
              "Monitoring & Logging": "Observability & operational insight",
              "Visualization & BI": "Reporting & business intelligence",
              "Design, Cost Optimization & Architecture": "Cost-aware architecture design",
              "Project Management & Documentation": "Planning & knowledge management",
            };
            const accent = accents[idx % accents.length];
            const Icon = icons[idx % icons.length];
            const tagline = taglines[category.category] ?? "Core competency area";

            return (
              <div
                key={idx}
                className={`relative bg-zinc-800/60 border rounded-xl p-6 transition-all hover:z-10 hover:scale-[1.02] ${accent.cardClass}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`h-12 w-12 flex-none rounded-lg flex items-center justify-center border ${accent.iconWrap}`}>
                    <Icon className={`h-5 w-5 ${accent.iconClass}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{category.category}</h4>
                    <p className={`font-mono text-xs ${accent.iconClass}`}>&gt; {tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Hash className="h-3.5 w-3.5" /> {category.skills.length} skills
                  </span>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest border ${accent.tagClass}`}>
                    Core Stack
                  </span>
                </div>

                <div className="border-t border-zinc-700 pt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      className="bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-sm font-medium border border-transparent hover:border-zinc-500 hover:text-white transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (sIdx + 1) * 0.05 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="bg-zinc-900 border-t border-zinc-700 py-20">
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h3>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
          <p className="text-zinc-400 max-w-2xl">
            A decade-plus shipping cloud, data, and Gen-AI platforms across defense, sports, and enterprise programs.
          </p>
        </div>

        <div ref={experienceTrackRef} className="relative" style={{ height: `${sortedExperiences.length * 100}vh` }}>
          <div className="sticky top-16 h-[700px] overflow-hidden flex items-center max-w-[1320px] mx-auto">
            <motion.div
              className="flex items-stretch gap-6 pl-[calc(50%-190px)] pr-[calc(50%-190px)]"
              style={{ x: experienceX }}
            >
              {sortedExperiences.map((job, idx) => (
                <ExperienceCard
                  key={idx}
                  job={job}
                  idx={idx}
                  total={sortedExperiences.length}
                  progress={experienceScrollProgress}
                />
              ))}
            </motion.div>
          </div>
          <div className="sticky bottom-6 flex justify-center gap-2 pt-4">
            {sortedExperiences.map((_, idx) => (
              <div key={idx} className="h-1.5 w-6 rounded-full bg-zinc-700" />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="bg-zinc-900 border-t border-zinc-700 py-12 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Certifications</h3>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
          <p className="text-zinc-400 max-w-2xl">
            {certifications.length} verified AWS and HashiCorp credentials spanning architecture, data engineering, ML, and Gen-AI.
          </p>
        </div>

        <div className="relative w-full overflow-hidden group [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max gap-6 animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...certifications, ...certifications].map((cert, idx) => {
              const level = cert.title.includes('Professional')
                ? 'Professional'
                : cert.title.includes('Specialty')
                ? 'Specialty'
                : cert.title.includes('Associate')
                ? 'Associate'
                : cert.title.includes('Practitioner')
                ? 'Practitioner'
                : 'Certified';
              return (
                <a
                  key={`${cert.title}-${idx}`}
                  href={cert.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={cert.title}
                  className="relative flex flex-shrink-0 w-72 flex-col gap-3 bg-zinc-800/60 border border-amber-500/30 rounded-xl p-5 shadow-[0_0_25px_rgba(245,158,11,0.1)] transition-all hover:z-10 hover:scale-[1.05] hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]"
                >
                  <div className="flex items-start justify-between">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest border border-amber-500/40 text-amber-300 bg-amber-500/10">
                      {level}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white leading-snug">{cert.title}</p>
                  <div className="flex items-center justify-between border-t border-zinc-700 pt-3 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-700">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h3>
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
        <p className="text-zinc-400 max-w-2xl mb-12">
          The engineering foundation behind a career in cloud architecture and data systems.
        </p>
        <div className="flex justify-center">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              className="w-full md:w-2/3 lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                  <div className="text-sm text-zinc-500 mt-1">
                    <p>{edu.institution}, {edu.location}</p>
                    <p>{edu.period}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20 border-t border-zinc-700">
        <h3 className="text-3xl font-bold mb-2 text-white text-center">Get In Touch</h3>
        <div className="h-px w-12 bg-zinc-700 mx-auto mb-4" />
        <p className="text-zinc-400 text-center mb-12">
          Open to AWS Solutions Architect &amp; Data Engineering opportunities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href="dial:+919611724567"
            className="relative flex items-center gap-4 bg-zinc-800/60 border border-sky-500/30 rounded-xl p-5 shadow-[0_0_25px_rgba(56,189,248,0.1)] transition-all hover:z-10 hover:scale-[1.03] hover:border-sky-400/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]"
          >
            <span className="h-11 w-11 flex-none flex items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-400">
              <Phone className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-xs text-zinc-500 uppercase tracking-wide">Phone</span>
              <span className="block text-white font-medium">+91-9611724567</span>
            </span>
          </a>

          <a
            href="mailto:jerry231088@gmail.com"
            className="relative flex items-center gap-4 bg-zinc-800/60 border border-emerald-500/30 rounded-xl p-5 shadow-[0_0_25px_rgba(16,185,129,0.1)] transition-all hover:z-10 hover:scale-[1.03] hover:border-emerald-400/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
          >
            <span className="h-11 w-11 flex-none flex items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
              <Mail className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-xs text-zinc-500 uppercase tracking-wide">Email</span>
              <span className="block text-white font-medium">jerry231088@gmail.com</span>
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/neerajksingh231088/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-4 bg-zinc-800/60 border border-violet-500/30 rounded-xl p-5 shadow-[0_0_25px_rgba(139,92,246,0.1)] transition-all hover:z-10 hover:scale-[1.03] hover:border-violet-400/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
          >
            <span className="h-11 w-11 flex-none flex items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-400">
              <Linkedin className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-xs text-zinc-500 uppercase tracking-wide">LinkedIn</span>
              <span className="block text-white font-medium">neeraj-singh</span>
            </span>
          </a>
        </div>
      </section>

      <footer className="text-center py-6 border-t border-zinc-700 text-xs text-zinc-500 font-mono">
        Neeraj Kumar Singh - AWS Solutions Architect | Data Engineer | Gen AI Developer
      </footer>
    </div>
  );
};

export default Portfolio;

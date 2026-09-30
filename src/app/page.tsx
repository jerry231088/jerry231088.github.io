"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";
import { Phone, Mail, Linkedin, Youtube, Compass, Clock, Cloud, Award, Briefcase, Cpu, Database, Code2, Layers, GitBranch, Activity, BarChart3, FileText, Calendar, MapPin, Hash, CheckCircle2, ExternalLink, Menu, X } from 'lucide-react';
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
    tools?: string[];
    youtubeUrl?: string;
  }[];
};

// Breakpoints for the click-to-select coverflow so it never overflows small screens.
const EXPERIENCE_SIZES = {
  mobile: { width: 260, height: 520, gap: 12 },
  tablet: { width: 320, height: 580, gap: 20 },
  desktop: { width: 380, height: 620, gap: 24 },
};

function useExperienceCardSize() {
  const [size, setSize] = React.useState(EXPERIENCE_SIZES.desktop);

  React.useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) setSize(EXPERIENCE_SIZES.mobile);
      else if (w < 1024) setSize(EXPERIENCE_SIZES.tablet);
      else setSize(EXPERIENCE_SIZES.desktop);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

const EXPERIENCE_ACCENTS = [
  {
    card: "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    activeCard: "border-sky-400/70 shadow-[0_0_50px_rgba(56,189,248,0.35)]",
    activeBg: "bg-gradient-to-br from-sky-500/25 via-violet-500/10 to-transparent",
    text: "text-sky-400",
    tag: "border-sky-500/40 text-sky-300 bg-sky-500/10",
  },
  {
    card: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
    activeCard: "border-emerald-400/70 shadow-[0_0_50px_rgba(16,185,129,0.35)]",
    activeBg: "bg-gradient-to-br from-emerald-500/25 via-sky-500/10 to-transparent",
    text: "text-emerald-400",
    tag: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  },
  {
    card: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.12)] hover:border-violet-400/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
    activeCard: "border-violet-400/70 shadow-[0_0_50px_rgba(139,92,246,0.35)]",
    activeBg: "bg-gradient-to-br from-violet-500/25 via-rose-500/10 to-transparent",
    text: "text-violet-400",
    tag: "border-violet-500/40 text-violet-300 bg-violet-500/10",
  },
  {
    card: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.12)] hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
    activeCard: "border-amber-400/70 shadow-[0_0_50px_rgba(245,158,11,0.35)]",
    activeBg: "bg-gradient-to-br from-amber-500/25 via-emerald-500/10 to-transparent",
    text: "text-amber-400",
    tag: "border-amber-500/40 text-amber-300 bg-amber-500/10",
  },
];

const ExperienceCard: React.FC<{
  job: ExperienceJob;
  idx: number;
  isActive: boolean;
  onSelect: () => void;
  width: number;
  height: number;
}> = ({ job, idx, isActive, onSelect, width, height }) => {
  const accent = EXPERIENCE_ACCENTS[idx % EXPERIENCE_ACCENTS.length];

  return (
    <motion.div
      className="flex-shrink-0 cursor-pointer"
      style={{ width, zIndex: isActive ? 20 : 0 }}
      onClick={onSelect}
      animate={{ scale: isActive ? 1 : 0.88, opacity: isActive ? 1 : 0.6 }}
      whileHover={{ scale: isActive ? 1 : 0.94, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 3.6 + (idx % 3) * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: idx * 0.3,
        }}
      >
        <Card
          style={{ height }}
          className={`flex flex-col hover:scale-100 transition-colors ${isActive ? `${accent.activeCard} ${accent.activeBg}` : accent.card}`}
        >
          <CardContent className="p-6 space-y-5 overflow-y-auto flex-1">
          <div className="flex items-start gap-4">
            <div className={`h-12 w-12 flex-none rounded-lg bg-white flex items-center justify-center text-lg font-bold ${accent.text}`}>
              {job.company.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white leading-snug">{job.company}</h4>
              <p className={`font-mono text-xs ${accent.text}`}>&gt; {job.designation}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-rose-400" /> {job.period}
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
                {!!project.tools?.length && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-zinc-800">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mr-1">Tools:</span>
                    {project.tools.map((tool, tIdx) => (
                      <span key={tIdx} className="px-1.5 py-0.5 rounded bg-zinc-700/60 text-zinc-300 text-[9px]">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const experiences: ExperienceJob[] = [
    {
      designation: "Senior Consultant - Solutions Architect & Senior Data Engineer",
      company: "msg Global Solutions India Pvt Ltd",
      location: "Bengaluru",
      period: "Aug 2023 - Present",
      projects: [
      {
         name: "Smash: Israel-Germany Defence Platform",
         role: "AWS Solutions Architect | Senior Data Engineer | Backend Engineer (Python & FastAPI)",
         details: [
           "Architected and delivered a greenfield hybrid AWS + on-premises defence platform from scratch, fully shipped across two 3-week sprints - reducing time-to-production by ~60%.",
           "Built Python/FastAPI geospatial microservices for real-time target resolution, MGRS coordinate conversion, and proximity spatial analysis for mission-critical operations.",
           "Defined complete AWS infrastructure via Terraform (VPCs, private subnets, ECS/Fargate, API Gateway, SQS, Secrets Manager) with zero-trust IAM boundary policies; zero security findings in client penetration test."
         ],
         tools: ["Terraform", "ECS/Fargate", "API Gateway", "FastAPI", "Python"]
        },
        {
          name: "Web Intelligence Crawler (Threat Intel & Fraud Detector)",
          role: "Solutions Architect | Automation Engineer (Python, Playwright & Scrapling)",
          details: [
            "Designed and built a generic, configurable web crawler (Playwright + Scrapling) as a reusable presales capability, enabling rapid, stealth data extraction from JS-heavy, bot-protected sites without dependency on paid data-vendor APIs.",
            "Deployed the crawler to identify and flag fraudulent resale of Goethe-Institut German language certificates across online marketplaces, demonstrating a fraud-detection and compliance-monitoring use case for prospective clients.",
            "Extended the same framework to extract ISAR aerospace incident data from external sources, delivering structured open-source intelligence (OSINT) as an automated, repeatable alternative to manual research.",
            "Used the crawler in client-facing presales demos as a zero-license-cost, in-house alternative to commercial scraping tools, strengthening the rapid-prototyping narrative in sales cycles."
          ],
          tools: ["Playwright", "Scrapling", "Python"]
        },
        {
          name: "Semantic Bridge: GenAI & Document Processing",
          role: "AWS Solutions Architect | Gen-AI Developer",
          details: [
            "Led design and deployment of a GDPR-compliant GenAI document processing pipeline (Bedrock / Claude Opus) to extract and structure German medical insurance data (GOAE/GOZ) at scale, processing 10,000+ documents/month with structured JSON output.",
            "Architected a GenAI workflow (Bedrock / Claude Sonnet) to automate generation of BPMN 2.0 models for defence workflows, reducing manual modelling effort by ~70% per workflow.",
            "Established AI/ML infrastructure: a high-performance vLLM GPU platform and a secure CI/CD pipeline for distributing KMS-encrypted ECR images to third parties, cutting model deployment time from days to hours."
          ],
          tools: ["Amazon Bedrock", "Claude Opus", "Claude Sonnet", "vLLM", "CI/CD"]
        },
        {
          name: "ProfileMap",
          role: "AWS Solutions Architect | Senior Data Engineer",
          details: [
            "Designed a secure, governance-enforced AWS data platform (EventBridge, Batch, Glue, DynamoDB, S3, Cognito, Athena, Lake Formation) enabling Power BI self-serve reporting for multiple business units.",
            "Built serverless pipelines and automated reporting systems operating reliably under $10/month; received recognition from the Head of Product for innovative architecture.",
            "Applied Gremlin-Python to model and traverse complex graph relationships in Amazon Neptune, reducing relationship query time by ~40% versus relational alternatives."
          ],
          tools: ["EventBridge", "Glue", "Neptune", "Power BI"]
        }
      ]
    },
    {
      designation: "Senior Consultant - Data Engineer",
      company: "EXL Services (Inductis India Pvt Ltd)",
      location: "Gurugram",
      period: "May 2023 - Aug 2023",
      projects: [
        {
          name: "Mettis",
          role: "AWS Data Engineer",
          details: [
            "Built scalable batch ETL pipelines ingesting CSV/JSON data, transforming to Parquet, and partitioning in S3 for cost-efficient querying via Athena.",
            "Automated daily analytics processing with EventBridge scheduling, delivering reliable reporting dashboards for stakeholders."
            ]
        }
      ]
    },
    {
      designation: "Software Engineer III - Data Engineer",
      company: "Stats Perform",
      location: "Bengaluru, India",
      period: "Mar 2020 - May 2023",
      projects: [
        {
          name: "Gold Standard Data Platform",
          role: "AWS Data Engineer",
          details: [
            "Led a team of 4 to deliver the Gold Standard Data Platform, processing millions of real-time sports events via Kinesis and MSK (Kafka).",
            "Built ETL pipelines into S3, DynamoDB, and Redshift, powering analytics and BI reporting at scale.",
            "Promoted to SE III in the 2021-22 appraisal cycle; awarded the Global Recognition Award (Q1 2022) for exceptional data engineering impact."
          ]
        }
      ]
    },
     {
       designation: "Senior Software Engineer - Data Engineer",
       company: "Saggezza India Pvt Ltd (an Apexon Company)",
       location: "Bengaluru, India",
       period: "Apr 2019 - Mar 2020",
       projects: [
         {
           name: "CW w/ Goldman Sachs",
           role: "AWS Data Engineer",
           details: [
             "Delivered serverless, event-driven data pipelines (Lambda, S3, DynamoDB) for a Goldman Sachs engagement, with multi-language transformation logic (C#, SQL, Python)."
           ]
         }
       ]
     },
       {
         designation: "Software Developer",
         company: "Tradelab Technologies (formerly - Tradelab Software Pvt Ltd)",
         location: "Bengaluru, India",
         period: "Dec 2014 - Mar 2019",
         projects: [
           {
             name: "Stock Trading Dealer Application for OMS",
             role: "Software Developer",
             details: [
               "Owned the full product lifecycle of a financial trading platform - requirements through delivery - including real-time WebSocket market data streams and REST-based order management serving 10,000+ active users."
             ]
           },
           {
            name: "India's #1 Desktop Application - Zerodha PI",
            role: "Software Developer",
            youtubeUrl: "https://www.youtube.com/watch?v=BJZz0cwopTw",
            details: [
              "Contributed to Zerodha PI (India's #1 desktop trading app): engineered candlestick/OHLC charting, indicator overlays, and high-frequency rendering optimizations in C#/.NET."
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

  const experienceCardSize = useExperienceCardSize();
  const experienceStep = experienceCardSize.width + experienceCardSize.gap;
  const [activeExperienceIndex, setActiveExperienceIndex] = React.useState(0);
  const experienceX = -activeExperienceIndex * experienceStep;
  const [selectedAboutStat, setSelectedAboutStat] = React.useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = React.useState<number | null>(null);
  const [selectedCert, setSelectedCert] = React.useState<string | null>(null);
  const [educationSelected, setEducationSelected] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const skillCategories = [
    {
      category: "Technical Skills",
      skills: ["Cloud Architecture & Infrastructure", "Amazon Web Services (AWS)", "Serverless", "Microservice", "Infrastructure as Code (IaC)", "Infrastructure Automation", "Terraform", "Data Ingestion", "Data Management", "Data Security", "Data Transformation", "Data Storage", "Code Development", "Code Deployment", "CICD", "Gen-AI", "AI"]
    },
    {
      category: "AWS Cloud",
      skills: [ "Bedrock", "Lambda", "Batch", "Elastic Container Service", "Elastic Kubernetes Service", "Fargate", "API Gateway", "DynamoDB", "Neptune", "S3", "Lake Formation", "Athena", "EventBridge", "IAM", "Secrets Manager", "SSM Parameter Store", "SES", "ECR", "Route53", "SNS", "SQS", "Cognito", "Glue", "Kinesis Data Streams", "Amazon Data Firehose", "MSK/Kafka", "Redshift", "ALB", "RDS", "CodePipeline", "Route53", "CloudFront" ]
    },
    {
      category: "Data Engineering",
      skills: [ "Data Lake", "Extract, Transform, Load (ETL)", "Extract, Load, Transform (ELT)", "Databases", "SQL", "NoSQL", "Data Warehousing", "Batch",  "Real-time Streaming", "Gremlin-Python", "Spark", "RDS", "ElastiCache-Redis" ]
    },
    {
      category: "AI / Gen-AI",
      skills: [ "Amazon Bedrock",  "Anthropic Claude", "ChatGPT", "Prompt Engineering", "vLLM GPU Platforms", "RAG", "Intelligent Document Processing" ]
    },
    {
      category: "Programming & Scripting",
      skills: [ "Python", "Pandas", "SQL", "C#", "fastAPI" ]
    },
    {
      category: "Infrastructure as Code (IaC)",
      skills: [ "Terraform", "CloudFormation" ]
    },
    {
      category: "DevOps",
      skills: [ "GitHub", "Github Actions", "Bitbucket", "Gitea", "Jenkins", "Atlantis", "CI/CD" ]
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
        degree: "Bachelor of Technology in Electronics and Communication Engineering (First Class)",
        institution: "Shri Mata Vaishno Devi University",
        period: "2007 - 2011",
        location: "J&K, India",
      }
    ];

  // Condensed 6-group skills breakdown matching the resume's Core Skills format
  // (the live Skills section above uses the fuller `skillCategories` breakdown).
  const resumeSkillCategories = [
    {
      category: "Cloud & Architecture",
      skills: ["AWS (SA-Pro)", "Terraform/IaC", "Microservices", "Serverless", "ECS/Fargate/EKS", "Docker/Container", "VPC Design", "Security", "IAM", "Lake Formation", "Cost Optimization"]
    },
    {
      category: "Data Engineering",
      skills: ["Data Lakes", "ETL/ELT", "Orchestration", "Batch & Real-time Streaming", "Kinesis", "MSK/Kafka", "OpenSearch", "Glue", "Athena", "Redshift", "DynamoDB", "Neptune", "RDS", "ElastiCache-Redis"]
    },
    {
      category: "AI / GenAI",
      skills: ["Amazon Bedrock (Claude)", "Prompt Engineering", "vLLM GPU Platforms", "RAG", "Intelligent Document Processing"]
    },
    {
      category: "AWS Services",
      skills: ["Lambda", "Batch", "API Gateway", "S3", "EventBridge", "SQS", "SNS", "Cognito", "Secrets Manager", "KMS", "CloudWatch", "CloudTrail", "ECR", "Route53", "SSM Parameter Store", "CloudFront", "ELB", "WAF", "ECS/Fargate"]
    },
    {
      category: "Programming",
      skills: ["Python (Primary)", "SQL", "C#", "Pandas", "PySpark", "FastAPI", "Gremlin-Python", "Playwright", "Scrapling"]
    },
    {
      category: "DevOps & BI",
      skills: ["GitHub", "GitHub Actions", "Bitbucket", "Jenkins", "Atlantis", "CI/CD", "Power BI", "QuickSight", "JIRA", "Confluence"]
    },
  ];

  const portfolioData = {
    fullName: 'Neeraj Kumar Singh',
    titleLine: 'AWS Solutions Architect  ·  AWS Data Engineer  ·  AWS GenAI Specialist',
    phone: '+91 96117 24567',
    email: 'jerry231088@gmail.com',
    linkedin: 'https://www.linkedin.com/in/neerajksingh231088',
    location: 'Bengaluru, India',
    summary: [
      'Technical leader with ~12 years of software engineering experience, including ~8 years architecting and delivering large-scale AWS cloud and data platforms. Expert in designing modern data lakes, real-time streaming systems, and event-driven pipelines for analytics, AI/ML, and BI workloads. Hands-on with Generative AI solutions using Amazon Bedrock - from intelligent document processing to automated BPMN workflow generation.',
      `Track record of owning end-to-end AWS architectures (greenfield to production) across defence, fintech, and sports tech domains, with a strong command of IaC, security, and cost optimization. Recognized with global awards; holds ${certifications.length} professional certifications across AWS and HashiCorp Terraform.`,
    ],
    sortedExperiences,
    skillCategories: resumeSkillCategories,
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <a href="#top" className="font-mono text-sm font-bold tracking-widest text-white border border-zinc-700 rounded-md px-2 py-1 flex-none">
            NS
          </a>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm text-zinc-400">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ResumeDownloadButton data={portfolioData} />
            <CoverLetterDownloadLink />
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex-none h-9 w-9 flex items-center justify-center rounded-md border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-zinc-700 bg-zinc-900/95 px-4 sm:px-6 py-4 flex flex-col gap-3 text-sm text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                label: "Experience",
                icon: Clock,
                value: "~12 Yrs",
                caption: "Software Engineering",
                tagClass: "border-sky-500/40 text-sky-300 bg-sky-500/10",
                iconClass: "text-sky-400",
                cardClass: "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]",
                activeCard: "border-sky-400/70 shadow-[0_0_45px_rgba(56,189,248,0.35)]",
                activeBg: "bg-gradient-to-br from-sky-500/25 via-violet-500/10 to-transparent",
              },
              {
                label: "AWS Expertise",
                icon: Cloud,
                value: "~8 Yrs",
                caption: "Hands-on AWS",
                tagClass: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
                iconClass: "text-emerald-400",
                cardClass: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
                activeCard: "border-emerald-400/70 shadow-[0_0_45px_rgba(16,185,129,0.35)]",
                activeBg: "bg-gradient-to-br from-emerald-500/25 via-sky-500/10 to-transparent",
              },
              {
                label: "Credentials",
                icon: Award,
                value: `${certifications.length}`,
                caption: "AWS Certifications",
                tagClass: "border-amber-500/40 text-amber-300 bg-amber-500/10",
                iconClass: "text-amber-400",
                cardClass: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
                activeCard: "border-amber-400/70 shadow-[0_0_45px_rgba(245,158,11,0.35)]",
                activeBg: "bg-gradient-to-br from-amber-500/25 via-emerald-500/10 to-transparent",
              },
              {
                label: "Delivery",
                icon: Briefcase,
                value: `${sortedExperiences.length}`,
                caption: "Companies & Programs",
                tagClass: "border-violet-500/40 text-violet-300 bg-violet-500/10",
                iconClass: "text-violet-400",
                cardClass: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-violet-400/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
                activeCard: "border-violet-400/70 shadow-[0_0_45px_rgba(139,92,246,0.35)]",
                activeBg: "bg-gradient-to-br from-violet-500/25 via-rose-500/10 to-transparent",
              },
            ].map((stat, statIdx) => (
              <div
                key={stat.label}
                onClick={() => setSelectedAboutStat(statIdx === selectedAboutStat ? null : statIdx)}
                className={`relative overflow-hidden border rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:z-10 hover:scale-[1.05] ${statIdx === selectedAboutStat ? `z-10 scale-[1.05] ${stat.activeCard} ${stat.activeBg}` : `bg-zinc-800/60 ${stat.cardClass}`}`}
              >
                <stat.icon className={`absolute -right-3 -bottom-3 h-20 w-20 opacity-[0.06] ${stat.iconClass}`} />
                <div className="relative flex items-center justify-between mb-6">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest border ${stat.tagClass}`}>
                    {stat.label}
                  </span>
                  <stat.icon className={`h-4 w-4 ${stat.iconClass}`} />
                </div>
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
                activeCard: "border-sky-400/70 shadow-[0_0_45px_rgba(56,189,248,0.35)]",
                activeBg: "bg-gradient-to-br from-sky-500/25 via-violet-500/10 to-transparent",
              },
              {
                icon: Cloud,
                iconClass: "text-amber-400",
                iconWrap: "bg-amber-500/10 border-amber-500/40",
                tagClass: "border-amber-500/40 text-amber-300 bg-amber-500/10",
                cardClass: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.12)] hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
                activeCard: "border-amber-400/70 shadow-[0_0_45px_rgba(245,158,11,0.35)]",
                activeBg: "bg-gradient-to-br from-amber-500/25 via-emerald-500/10 to-transparent",
              },
              {
                icon: Database,
                iconClass: "text-emerald-400",
                iconWrap: "bg-emerald-500/10 border-emerald-500/40",
                tagClass: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
                cardClass: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
                activeCard: "border-emerald-400/70 shadow-[0_0_45px_rgba(16,185,129,0.35)]",
                activeBg: "bg-gradient-to-br from-emerald-500/25 via-sky-500/10 to-transparent",
              },
              {
                icon: Code2,
                iconClass: "text-violet-400",
                iconWrap: "bg-violet-500/10 border-violet-500/40",
                tagClass: "border-violet-500/40 text-violet-300 bg-violet-500/10",
                cardClass: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.12)] hover:border-violet-400/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
                activeCard: "border-violet-400/70 shadow-[0_0_45px_rgba(139,92,246,0.35)]",
                activeBg: "bg-gradient-to-br from-violet-500/25 via-rose-500/10 to-transparent",
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
              <motion.div
                key={idx}
                onClick={() => setSelectedSkill(idx === selectedSkill ? null : idx)}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3.6 + (idx % 3) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.3,
                }}
                className={`relative border rounded-xl p-6 cursor-pointer transition-all hover:z-10 hover:scale-[1.02] ${idx === selectedSkill ? `z-10 scale-[1.02] ${accent.activeCard} ${accent.activeBg}` : `bg-zinc-800/60 ${accent.cardClass}`}`}
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
              </motion.div>
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

        <div
          className="overflow-hidden flex items-center max-w-[1320px] mx-auto px-4"
          style={{ height: experienceCardSize.height + 80 }}
        >
          <motion.div
            className="flex items-stretch"
            style={{
              gap: experienceCardSize.gap,
              paddingLeft: `calc(50% - ${experienceCardSize.width / 2}px)`,
              paddingRight: `calc(50% - ${experienceCardSize.width / 2}px)`,
            }}
            animate={{ x: experienceX }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
          >
            {sortedExperiences.map((job, idx) => (
              <ExperienceCard
                key={idx}
                job={job}
                idx={idx}
                isActive={idx === activeExperienceIndex}
                onSelect={() => setActiveExperienceIndex(idx)}
                width={experienceCardSize.width}
                height={experienceCardSize.height}
              />
            ))}
          </motion.div>
        </div>
        <div className="flex justify-center gap-2 pt-6">
          {sortedExperiences.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Show experience ${idx + 1}`}
              onClick={() => setActiveExperienceIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === activeExperienceIndex ? "w-6 bg-white" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"}`}
            />
          ))}
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
              const isCertActive = selectedCert === cert.title;
              return (
                <a
                  key={`${cert.title}-${idx}`}
                  href={cert.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={cert.title}
                  onClick={() => setSelectedCert(isCertActive ? null : cert.title)}
                  className={`relative flex flex-shrink-0 w-72 flex-col gap-3 border rounded-xl p-5 transition-all hover:z-10 hover:scale-[1.05] ${isCertActive ? "z-10 scale-[1.05] border-amber-400/70 shadow-[0_0_35px_rgba(245,158,11,0.4)] bg-gradient-to-br from-amber-500/25 via-emerald-500/10 to-transparent" : "bg-zinc-800/60 border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.1)] hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]"}`}
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
              <Card
                onClick={() => setEducationSelected((prev) => !prev)}
                className={`cursor-pointer ${educationSelected ? "border-sky-400/70 shadow-[0_0_45px_rgba(56,189,248,0.35)] bg-gradient-to-br from-sky-500/25 via-violet-500/10 to-transparent" : "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]"}`}
              >
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
              <span className="block text-white font-medium">Neeraj Kumar Singh</span>
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

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";
import { Phone, Mail, Linkedin, Youtube, Compass, Clock, Cloud, Award, Briefcase, Cpu, Database, Code2, Layers, GitBranch, Activity, BarChart3, FileText, Calendar, MapPin, Hash, CheckCircle2, ExternalLink, Menu, X, ShieldCheck, type LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

import type { ResumeDownloadButtonProps } from '@/components/ResumeDownloadButton';
import { boldSegments } from '@/lib/boldSegments';

const renderBold = (text: string) =>
  boldSegments(text).map((seg, i) =>
    seg.bold ? <strong key={i} className="font-semibold text-zinc-200">{seg.text}</strong> : <React.Fragment key={i}>{seg.text}</React.Fragment>
  );

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
  // In the PDF resume, list each project under its own heading (otherwise bullets sit directly under the job).
  showProjectsInResume?: boolean;
  projects: {
    role: string;
    name: string;
    details: string[];
    tools?: string[];
    youtubeUrl?: string;
  }[];
};

type CardSize = { width: number; height: number; gap: number };
type CardSizes = { mobile: CardSize; tablet: CardSize; desktop: CardSize };

// Breakpoints for the ring carousels so cards never overflow small screens.
const EXPERIENCE_SIZES: CardSizes = {
  mobile: { width: 260, height: 520, gap: 12 },
  tablet: { width: 320, height: 580, gap: 20 },
  desktop: { width: 380, height: 620, gap: 24 },
};

const SKILL_SIZES: CardSizes = {
  mobile: { width: 260, height: 440, gap: 12 },
  tablet: { width: 320, height: 460, gap: 20 },
  desktop: { width: 380, height: 480, gap: 24 },
};

function useCardSize(sizes: CardSizes) {
  const [size, setSize] = React.useState(sizes.desktop);

  React.useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) setSize(sizes.mobile);
      else if (w < 1024) setSize(sizes.tablet);
      else setSize(sizes.desktop);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [sizes]);

  return size;
}

const EXPERIENCE_ACCENTS = [
  {
    card: "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    activeCard: "border-sky-400/70 shadow-[0_0_50px_rgba(56,189,248,0.35)]",
    activeBg: "bg-gradient-to-br from-sky-500/25 via-violet-500/10 to-transparent",
    text: "text-sky-400",
    tag: "border-sky-500/40 text-sky-300 bg-sky-500/10",
    glow: "from-sky-500/50 via-violet-500/30 to-rose-500/40",
  },
  {
    card: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
    activeCard: "border-emerald-400/70 shadow-[0_0_50px_rgba(16,185,129,0.35)]",
    activeBg: "bg-gradient-to-br from-emerald-500/25 via-sky-500/10 to-transparent",
    text: "text-emerald-400",
    tag: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    glow: "from-emerald-500/50 via-sky-500/30 to-violet-500/40",
  },
  {
    card: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.12)] hover:border-violet-400/60 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
    activeCard: "border-violet-400/70 shadow-[0_0_50px_rgba(139,92,246,0.35)]",
    activeBg: "bg-gradient-to-br from-violet-500/25 via-rose-500/10 to-transparent",
    text: "text-violet-400",
    tag: "border-violet-500/40 text-violet-300 bg-violet-500/10",
    glow: "from-violet-500/50 via-rose-500/30 to-sky-500/40",
  },
  {
    card: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.12)] hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
    activeCard: "border-amber-400/70 shadow-[0_0_50px_rgba(245,158,11,0.35)]",
    activeBg: "bg-gradient-to-br from-amber-500/25 via-emerald-500/10 to-transparent",
    text: "text-amber-400",
    tag: "border-amber-500/40 text-amber-300 bg-amber-500/10",
    glow: "from-amber-500/50 via-emerald-500/30 to-sky-500/40",
  },
];

const SKILL_ACCENTS = [
  {
    iconClass: "text-sky-400",
    iconWrap: "bg-sky-500/10 border-sky-500/40",
    tagClass: "border-sky-500/40 text-sky-300 bg-sky-500/10",
    cardClass: "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.12)]",
    activeCard: "border-sky-400/70 shadow-[0_0_45px_rgba(56,189,248,0.35)]",
    activeBg: "bg-gradient-to-br from-sky-500/25 via-violet-500/10 to-transparent",
    glow: "from-sky-500/50 via-violet-500/30 to-rose-500/40",
  },
  {
    iconClass: "text-amber-400",
    iconWrap: "bg-amber-500/10 border-amber-500/40",
    tagClass: "border-amber-500/40 text-amber-300 bg-amber-500/10",
    cardClass: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.12)]",
    activeCard: "border-amber-400/70 shadow-[0_0_45px_rgba(245,158,11,0.35)]",
    activeBg: "bg-gradient-to-br from-amber-500/25 via-emerald-500/10 to-transparent",
    glow: "from-amber-500/50 via-emerald-500/30 to-sky-500/40",
  },
  {
    iconClass: "text-emerald-400",
    iconWrap: "bg-emerald-500/10 border-emerald-500/40",
    tagClass: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    cardClass: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.12)]",
    activeCard: "border-emerald-400/70 shadow-[0_0_45px_rgba(16,185,129,0.35)]",
    activeBg: "bg-gradient-to-br from-emerald-500/25 via-sky-500/10 to-transparent",
    glow: "from-emerald-500/50 via-sky-500/30 to-violet-500/40",
  },
  {
    iconClass: "text-violet-400",
    iconWrap: "bg-violet-500/10 border-violet-500/40",
    tagClass: "border-violet-500/40 text-violet-300 bg-violet-500/10",
    cardClass: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.12)]",
    activeCard: "border-violet-400/70 shadow-[0_0_45px_rgba(139,92,246,0.35)]",
    activeBg: "bg-gradient-to-br from-violet-500/25 via-rose-500/10 to-transparent",
    glow: "from-violet-500/50 via-rose-500/30 to-sky-500/40",
  },
];

const SKILL_META: Record<string, { icon: LucideIcon; tagline: string }> = {
  "Data Engineering": { icon: Database, tagline: "Lakes, pipelines, warehousing & streaming" },
  "Solutions Architecture": { icon: Layers, tagline: "Cloud-native, cost-aware system design" },
  "Security & Governance": { icon: ShieldCheck, tagline: "Zero-trust access & privacy by design" },
  "AWS Services": { icon: Cloud, tagline: "Hands-on across the AWS platform" },
  "Programming & Scripting": { icon: Code2, tagline: "Languages & automation tooling" },
  "Infrastructure as Code & DevOps": { icon: GitBranch, tagline: "Reproducible infra & CI/CD" },
  "Analytics & BI": { icon: BarChart3, tagline: "Querying, reporting & self-serve BI" },
  "Monitoring & Observability": { icon: Activity, tagline: "Operational insight & auditing" },
  "Gen-AI for Data Platforms": { icon: Cpu, tagline: "LLMs applied to data workflows" },
  "Project Management & Documentation": { icon: FileText, tagline: "Planning & knowledge management" },
};

// Pulsing gradient halo behind a card; shown while active, or while hovering an ancestor marked `group/glow`.
const HoverGlow: React.FC<{ gradient: string; active?: boolean }> = ({ gradient, active }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute -inset-4 -z-10 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 group-hover/glow:opacity-100"}`}
  >
    <div className={`h-full w-full rounded-2xl bg-gradient-to-r ${gradient} blur-2xl animate-[glow-pulse_2.4s_ease-in-out_infinite]`} />
  </div>
);

// Signed shortest distance from the active card around the ring, e.g. for 5 cards: -2..2.
function circularOffset(i: number, active: number, n: number) {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

// Looping carousel: the selected card sits centred with a pulsing glow, the rest shrink and fade around it.
const RingCarousel: React.FC<{
  count: number;
  sizes: CardSizes;
  label: string;
  glowFor: (idx: number) => string;
  renderCard: (idx: number, isActive: boolean, height: number) => React.ReactNode;
}> = ({ count, sizes, label, glowFor, renderCard }) => {
  const { width, height, gap } = useCardSize(sizes);
  const step = width + gap;
  const [ring, setRing] = React.useState({ active: 0, prev: 0 });
  const [paused, setPaused] = React.useState(false);

  const goTo = React.useCallback(
    (target: (active: number) => number) =>
      setRing(({ active }) => ({ prev: active, active: ((target(active) % count) + count) % count })),
    [count]
  );

  React.useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo((a) => a + 1), 4500);
    return () => clearInterval(timer);
  }, [paused, goTo]);

  const moved = Math.abs(circularOffset(ring.active, ring.prev, count));

  return (
    <>
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ height: height + 100, touchAction: "pan-y" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPanEnd={(_, info) => {
          if (info.offset.x < -50) goTo((a) => a + 1);
          else if (info.offset.x > 50) goTo((a) => a - 1);
        }}
      >
        {Array.from({ length: count }, (_, idx) => {
          const offset = circularOffset(idx, ring.active, count);
          const dist = Math.abs(offset);
          const isActive = dist === 0;
          // A card wrapping from one end of the ring to the other jumps instead of sliding across the centre.
          const wrapped = moved > 0 && Math.abs(offset - circularOffset(idx, ring.prev, count)) !== moved;
          return (
            <motion.div
              key={idx}
              className="absolute top-1/2 left-1/2"
              style={{
                width,
                height,
                marginLeft: -width / 2,
                marginTop: -height / 2,
                zIndex: 10 - 2 * Math.min(dist, 4),
                cursor: isActive ? "default" : "pointer",
              }}
              onClick={() => !isActive && goTo(() => idx)}
              initial={false}
              animate={{
                x: offset * step,
                scale: isActive ? 1 : dist === 1 ? 0.88 : 0.78,
                opacity: isActive ? 1 : dist === 1 ? 0.55 : dist === 2 ? 0.2 : 0,
                filter: isActive ? "grayscale(0)" : "grayscale(0.8)",
              }}
              transition={wrapped ? { duration: 0 } : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {isActive && (
                <motion.div
                  className={`absolute -inset-4 rounded-2xl bg-gradient-to-r ${glowFor(idx)} blur-2xl -z-10`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {renderCard(idx, isActive, height)}
            </motion.div>
          );
        })}
      </motion.div>
      <div className="flex justify-center gap-2 pt-4">
        {Array.from({ length: count }, (_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show ${label} ${idx + 1}`}
            onClick={() => goTo(() => idx)}
            className={`h-1.5 rounded-full transition-all ${idx === ring.active ? "w-6 bg-white" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"}`}
          />
        ))}
      </div>
    </>
  );
};

const ExperienceCard: React.FC<{
  job: ExperienceJob;
  idx: number;
  isActive: boolean;
  height: number;
}> = ({ job, idx, isActive, height }) => {
  const accent = EXPERIENCE_ACCENTS[idx % EXPERIENCE_ACCENTS.length];

  return (
        <Card
          style={{ height }}
          className={`flex flex-col hover:scale-100 transition-colors duration-500 ${isActive ? `${accent.activeCard} ${accent.activeBg}` : accent.card}`}
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
                    <li key={i}>{renderBold(d)}</li>
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
  );
};

const Portfolio: React.FC = () => {
  // `**text**` marks key results; it renders bold on the site and in the PDF resume.
  const experiences: ExperienceJob[] = [
    {
      designation: "Senior Consultant - Solutions Architect & Senior Data Engineer",
      company: "msg Global Solutions India Pvt Ltd",
      location: "Bengaluru",
      period: "Aug 2023 - Present",
      showProjectsInResume: true,
      projects: [
        {
          name: "AI-Assisted Project-to-Model Conversion (German Military)",
          role: "Backend Engineer",
          details: [
            "Building the first phase of a RAG solution on Amazon Bedrock and OpenSearch to find the information needed for each part of a NATO/Bundeswehr-compliant project model. Later phases will generate the models automatically."
          ],
          tools: ["Amazon Bedrock", "OpenSearch", "RAG", "Python"]
        },
        {
          name: "Fraud Detector",
          role: "Solutions Architect | Backend Engineer",
          details: [
            "Designed **Fake-Certificate Detection for Goethe-Institut:** a scoring service that takes candidate links from another application, pulls page signals with a configurable Playwright + Scrapling crawler, and estimates how likely each site is to sell fake German-language certificates. Built on the Semantic Bridge platform. The crawler works on JS-heavy and bot-protected sites **without paid data-vendor APIs**."
          ],
          tools: ["Playwright", "Scrapling", "Python"]
        },
        {
          name: "ThreatIntel",
          role: "Solutions Architect | Backend Engineer",
          details: [
            "Designed **OSINT Monitoring for ISAR Aerospace:** source-discovery logic that detects links in crawled posts, checks whether they are known or new based on the site type (personal sites and news vs. social accounts) and sends new ones to a source-management workflow. New sources join the crawl pool automatically, while domain-specific sites are configured manually. Every post or article is stored as its own record, replacing manual research with **repeatable, structured OSINT**."
          ],
          tools: ["Playwright", "Scrapling", "Python"]
        },
        {
          name: "Smash Strike - German-Israel Defense Platform (Pre-sales)",
          role: "Solutions Architect | Backend Engineer",
          details: [
            "Designed and delivered a new hybrid AWS and on-premises demonstrator in two 3-week sprints, **reducing time-to-production by ~60%**. The human-in-the-loop service turns standardized target, context and mission data into prioritized courses of action within seconds and connects to mission-planning and C2 systems through open interfaces.",
            "Built Python/FastAPI geospatial microservices for real-time target resolution, MGRS coordinate conversion and proximity analysis.",
            "Defined the full infrastructure in Terraform (VPCs, private subnets, ECS/Fargate, API Gateway, SQS, Secrets Manager) with zero-trust IAM boundary policies. The client penetration test found **zero security findings**."
          ],
          tools: ["Terraform", "ECS/Fargate", "API Gateway", "FastAPI", "Python"]
        },
        {
          name: "Compin - Intelligent Document Processing for German Health Insurance",
          role: "Backend Engineer",
          details: [
            "Built a GDPR-compliant GenAI pipeline (Amazon Bedrock / Claude) on the Semantic Bridge platform that extracts structured JSON from insurance application documents (GOÄ/GOZ). It automates the manual first processing step at **10,000+ documents per month**."
          ],
          tools: ["Amazon Bedrock", "Claude", "Python"]
        },
        {
          name: "Semantic Bridge",
          role: "Solutions Architect | Data Engineer | Backend Engineer",
          details: [
            "Designed a cloud-native, event-driven, serverless, multi-tenant platform of Python microservices on AWS. It has REST APIs and hybrid (keyword + context-aware) search for AI-driven terminology mapping across enterprise systems, and is built to handle millions of transactions per day.",
            "Designed a Bedrock-based workflow that auto-generates BPMN 2.0 models for defense processes, **reducing manual modeling effort by ~70%** per workflow.",
            "Set up the AI infrastructure: a high-performance vLLM GPU platform and a secure CI/CD pipeline that ships KMS-encrypted ECR images to third parties, **cutting model deployment time from days to hours**."
          ],
          tools: ["Python", "Microservices", "Amazon Bedrock", "vLLM", "CI/CD"]
        },
        {
          name: "ProfileMap - CV Management & AI-Powered Search",
          role: "Backend & Data Engineer",
          details: [
            "Managed the AWS backend data for users and profiles (DynamoDB, Cognito) and an ontology in Amazon Neptune, and used Gremlin-Python to **cut relationship query time by ~40%** versus relational alternatives.",
            "Built the monthly and Power BI reporting pipelines from scratch in production (EventBridge, Batch, Glue, S3, Athena, Lake Formation) with enforced data governance. Business units now get self-service reporting at **under $10/month**. The Head of Product recognized the design."
          ],
          tools: ["EventBridge", "Glue", "Neptune", "Lake Formation", "Power BI"]
        }
      ]
    },
    {
      designation: "Senior Consultant - Data Engineer",
      company: "EXL Services (Inductis India Pvt Ltd)",
      location: "Gurugram, India",
      period: "May 2023 - Aug 2023",
      projects: [
        {
          name: "Mettis",
          role: "AWS Data Engineer",
          details: [
            "Built batch ETL pipelines that ingest CSV/JSON, convert it to Parquet and partition it in S3 for cheaper querying with Athena.",
            "Automated daily analytics processing with EventBridge scheduling, so stakeholders got reliable reporting dashboards."
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
            "Led a team of 4 to deliver the Gold Standard Data Platform, **processing millions of real-time sports events** through Kinesis and MSK (Kafka).",
            "Built ETL pipelines into S3, DynamoDB and Redshift for analytics and BI reporting.",
            "Promoted to SE III in the 2021-22 cycle and received the **Global Recognition Award (Q1 2022)** for data engineering impact."
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
            "Built serverless, event-driven data pipelines (Lambda, S3, DynamoDB) for a Goldman Sachs engagement, with transformation logic in C#, SQL and Python."
          ]
        }
      ]
    },
    {
      designation: "Software Developer",
      company: "Tradelab Technologies",
      location: "Bengaluru, India",
      period: "Dec 2014 - Mar 2019",
      projects: [
        {
          name: "Stock Trading Dealer Application for OMS",
          role: "Software Developer",
          details: [
            "Handled the full lifecycle of a financial trading platform, from requirements to delivery. Covered real-time WebSocket market-data streams and REST-based order management for **10,000+ active users**."
          ]
        },
        {
          name: "Zerodha Pi - Desktop Trading Application",
          role: "Software Developer",
          youtubeUrl: "https://www.youtube.com/watch?v=BJZz0cwopTw",
          details: [
            "Contributed to **Zerodha Pi**, India's leading desktop trading app. Built candlestick/OHLC charting, indicator overlays and rendering optimizations for high-frequency data in C#/.NET."
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

  const [selectedAboutStat, setSelectedAboutStat] = React.useState<number | null>(null);
  // Index into the doubled marquee list, so only the clicked copy of a certificate lights up.
  const [selectedCert, setSelectedCert] = React.useState<number | null>(null);
  const [educationSelected, setEducationSelected] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const skillCategories = [
    {
      category: "Data Engineering",
      skills: ["Data Lakes", "ETL / ELT", "Batch Processing", "Real-time Streaming", "Event-driven Pipelines", "Orchestration", "Step Functions", "Apache Spark / PySpark", "Kafka (Amazon MSK)", "Kinesis Data Streams", "Amazon Data Firehose", "AWS Glue", "Data Warehousing", "SQL", "NoSQL", "Graph Data (Neptune)", "OpenSearch", "ElastiCache-Redis"]
    },
    {
      category: "Solutions Architecture",
      skills: ["Amazon Web Services (AWS)", "AWS Certification", "Cloud Certification", "Cloud Architecture", "Greenfield-to-Production Delivery", "Serverless", "Microservices", "Event-driven Architecture", "Hybrid Cloud (AWS + On-premises)", "VPC Design", "Containers (ECS / Fargate / EKS)", "Cost Optimization", "AWS Pricing Calculator", "Cost Explorer", "Budgets", "Service Quotas", "Architecture Diagrams (draw.io)"]
    },
    {
      category: "Security & Governance",
      skills: ["Cloud Security", "Data Security", "Security Architecture", "Security Controls", "Security Management", "IAM", "Zero-Trust IAM & Permission Boundaries", "Private Networking", "KMS Encryption", "Secrets Manager", "SSM Parameter Store", "Lake Formation Governance", "Cognito", "WAF", "CloudTrail Auditing", "GDPR-Compliant Data Processing"]
    },
    {
      category: "AWS Services",
      skills: ["S3", "Glue", "Athena", "Redshift", "Lake Formation", "Kinesis Data Streams", "Amazon Data Firehose", "MSK", "DynamoDB", "Neptune", "RDS", "Lambda", "Step Functions", "Batch", "ECS", "EKS", "Fargate", "API Gateway", "EventBridge", "SQS", "SNS", "SES", "IAM", "KMS", "Secrets Manager", "Cognito", "ECR", "Route53", "CloudFront", "ALB", "CodePipeline", "Bedrock"]
    },
    {
      category: "Programming & Scripting",
      skills: ["Python", "SQL", "PySpark", "Pandas", "FastAPI", "REST APIs", "WebSockets", "Gremlin-Python", "C#/.NET", "Playwright"]
    },
    {
      category: "Infrastructure as Code & DevOps",
      skills: ["Terraform", "CloudFormation", "Atlantis", "CI/CD", "GitHub Actions", "Jenkins", "CodePipeline", "GitHub", "Bitbucket", "Gitea"]
    },
    {
      category: "Analytics & BI",
      skills: ["Athena", "Redshift", "Power BI", "QuickSight", "Self-serve Reporting"]
    },
    {
      category: "Monitoring & Observability",
      skills: ["CloudWatch", "CloudWatch Insights", "CloudTrail"]
    },
    {
      category: "Gen-AI for Data Platforms",
      skills: ["Amazon Bedrock", "Anthropic Claude", "Intelligent Document Processing", "RAG", "Prompt Engineering", "vLLM GPU Platforms"]
    },
    {
      category: "Project Management & Documentation",
      skills: ["JIRA", "Confluence"]
    }
  ];

  const certifications = [
    {
      title: 'AWS Certified Solutions Architect - Professional',
      publicUrl: 'https://www.credly.com/badges/f8d87ba7-3bd8-428d-ad6b-adfba07567fe/public_url',
      imageUrl: '/badges/aws-sa-pro.png'
    },
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
      title: 'AWS Certified Data Engineer - Associate',
      publicUrl: 'https://www.credly.com/badges/3f7dca14-df8b-4595-a754-76d05d16e7c2/public_url',
      imageUrl: '/badges/aws-data-engineer.png'
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
      title: 'AWS Certified Security - Specialty',
      publicUrl: 'https://www.credly.com/badges/1157d93a-d5dd-443b-a57f-bf8c19f3bf1a/public_url',
      imageUrl: '/badges/aws-certified-security-specialty.png'
    },
    {
      title: 'AWS Certified Database - Specialty',
      publicUrl: 'https://www.credly.com/badges/84bf4cdc-addf-4a68-ba4c-29e36837ff0f/public_url',
      imageUrl: '/badges/aws-db-specialty.png'
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
      title: 'HashiCorp Certified: Terraform Associate (003)',
      publicUrl: 'https://www.credly.com/badges/9b7afd54-eb04-4272-8496-3bd77928b42f/public_url',
      imageUrl: '/badges/hashicorp-tf-assoc.png'
    }
  ];

  // Early Adopter badges duplicate an exam already listed, so they don't count as separate certifications.
  const certificationCount = certifications.filter((c) => !c.title.includes('Early Adopter')).length;

  const education = [
      {
        degree: "Bachelor of Technology in Electronics and Communication Engineering (First Class)",
        institution: "Shri Mata Vaishno Devi University",
        period: "2007 - 2011",
        location: "J&K, India",
      }
    ];

  // Condensed skills breakdown for the PDF resume (the Skills section uses the fuller `skillCategories`).
  const resumeSkillCategories = [
    {
      category: "Data Engineering",
      skills: ["Data Lakes (S3, Glue, Athena, Lake Formation)", "Lambda", "Step Functions", "Redshift", "PySpark", "Pandas", "ETL/ELT", "Batch & Real-time Streaming (Kinesis, MSK/Kafka)", "EventBridge", "SQS/SNS", "DynamoDB", "RDS", "Neptune", "OpenSearch", "ElastiCache (Redis)", "SES"]
    },
    {
      category: "Cloud & Architecture",
      skills: ["AWS (Solutions Architect - Professional)", "Terraform / IaC", "Microservices", "Serverless", "ECS/Fargate", "EKS", "ECR", "Docker", "VPC Design", "CloudFront", "Route 53", "ALB", "SSM", "Cost Optimization"]
    },
    {
      category: "Security & Governance",
      skills: ["AWS Security - Specialty", "Cloud Security", "Data Security", "Security Architecture", "Security Controls", "Security Management", "Zero-Trust IAM", "KMS", "Secrets Manager", "WAF", "Lake Formation", "Cognito", "CloudTrail", "GDPR"]
    },
    {
      category: "Backend Engineering",
      skills: ["Python (primary)", "FastAPI", "REST APIs", "API Gateway", "SQL", "C#/.NET", "WebSockets", "Gremlin-Python"]
    },
    {
      category: "DevOps, Observability & BI",
      skills: ["GitHub", "Jenkins", "Bitbucket", "Atlantis", "CI/CD", "CloudWatch", "CloudTrail", "Power BI", "QuickSuite", "JIRA", "Confluence"]
    },
    {
      category: "GenAI / AI Platforms",
      skills: ["Amazon Bedrock (Claude)", "RAG", "Prompt Engineering", "Intelligent Document Processing", "vLLM GPU Platforms"]
    },
  ];

  const portfolioData = {
    fullName: 'Neeraj Kumar Singh',
    titleLine: 'Senior Data Engineer  ·  AWS Solutions Architect',
    phone: '+91 96117 24567',
    email: 'jerry231088@gmail.com',
    linkedin: 'https://www.linkedin.com/in/neerajksingh231088',
    location: 'Bengaluru, India · Open to relocation to the US',
    summary: [
      'Senior Data Engineer and AWS Solutions Architect with ~12 years of software engineering experience, including ~8 years designing and delivering production data platforms on AWS. Builds data lakes, real-time streaming pipelines, and governed analytics platforms - from millions of live sports events streamed through Kinesis and Kafka (MSK) to secure, self-serve BI on Lake Formation and Athena.',
      `Owns architecture end to end, from greenfield design to production: Terraform infrastructure as code, zero-trust security with privacy built in (GDPR-compliant pipelines; zero findings in a client penetration test), and cost-efficient serverless design. Applies Generative AI where it strengthens the data platform - for example, an Amazon Bedrock pipeline that turns 10,000+ documents a month into structured data. Holds ${certificationCount} professional certifications across AWS and HashiCorp Terraform, including Solutions Architect - Professional, Data Engineer - Associate, and Security - Specialty.`,
    ],
    sortedExperiences,
    recognition: [
      "**Global Recognition Award**, Stats Perform (Q1 2022)",
      "Recognized by the Head of Product, ProfileMap, for cost-efficient serverless architecture",
    ],
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Neeraj Kumar Singh
        </h1>
        <p className="text-lg md:text-2xl font-semibold text-zinc-200 mb-3">
          Senior Data Engineer &amp; AWS Solutions Architect
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-zinc-400 mb-8">
          <MapPin className="h-4 w-4 text-rose-400" /> Bengaluru, India
          <span className="text-zinc-600">·</span>
          <span className="text-emerald-400">Open to relocation to the US</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-sky-500/40 text-sky-300 bg-sky-500/10 shadow-[0_0_18px_rgba(56,189,248,0.35)]">
            AWS Certified Solutions Architect - Professional
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-emerald-500/40 text-emerald-300 bg-emerald-500/10 shadow-[0_0_18px_rgba(16,185,129,0.35)]">
            AWS Certified Data Engineer - Associate
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-violet-500/40 text-violet-300 bg-violet-500/10 shadow-[0_0_18px_rgba(139,92,246,0.35)]">
            AWS Certified Security - Specialty
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <a href="#experience" className="px-5 py-2 rounded-md bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-200 transition-colors">
            View Experience
          </a>
          <a href="#contact" className="px-5 py-2 rounded-md border border-zinc-600 text-zinc-200 text-sm font-semibold hover:border-zinc-400 hover:text-white transition-colors">
            Get in Touch
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Cloud Architecture meets Data Engineering
        </h3>
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
        <p className="text-zinc-400 max-w-2xl mb-12">
          Designing secure, scalable data platforms on AWS - from real-time streaming to governed, self-serve analytics.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="group/glow relative isolate hover:z-10">
          <HoverGlow gradient="from-sky-500/50 via-violet-500/30 to-rose-500/40" />
          <div className="relative h-full bg-zinc-800/60 border border-sky-500/30 rounded-xl p-8 shadow-[0_0_35px_rgba(56,189,248,0.12)] transition-all duration-500 hover:scale-[1.02] hover:bg-zinc-900 hover:bg-gradient-to-br hover:from-sky-500/25 hover:via-violet-500/10 hover:to-transparent hover:border-sky-400/70 hover:shadow-[0_0_45px_rgba(56,189,248,0.35)]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-4">
              <Compass className="h-4 w-4" /> Background &amp; Mission
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">
              ~12 years building scalable, secure data platforms and cloud architectures across defense, healthcare, fintech, and sports tech.
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
                cardClass: "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:bg-zinc-900 hover:bg-gradient-to-br hover:from-sky-500/25 hover:via-violet-500/10 hover:to-transparent hover:border-sky-400/70 hover:shadow-[0_0_45px_rgba(56,189,248,0.35)]",
                glow: "from-sky-500/50 via-violet-500/30 to-rose-500/40",
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
                cardClass: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:bg-zinc-900 hover:bg-gradient-to-br hover:from-emerald-500/25 hover:via-sky-500/10 hover:to-transparent hover:border-emerald-400/70 hover:shadow-[0_0_45px_rgba(16,185,129,0.35)]",
                glow: "from-emerald-500/50 via-sky-500/30 to-violet-500/40",
                activeCard: "border-emerald-400/70 shadow-[0_0_45px_rgba(16,185,129,0.35)]",
                activeBg: "bg-gradient-to-br from-emerald-500/25 via-sky-500/10 to-transparent",
              },
              {
                label: "Credentials",
                icon: Award,
                value: `${certificationCount}`,
                caption: "Professional Certifications",
                tagClass: "border-amber-500/40 text-amber-300 bg-amber-500/10",
                iconClass: "text-amber-400",
                cardClass: "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:bg-zinc-900 hover:bg-gradient-to-br hover:from-amber-500/25 hover:via-emerald-500/10 hover:to-transparent hover:border-amber-400/70 hover:shadow-[0_0_45px_rgba(245,158,11,0.35)]",
                glow: "from-amber-500/50 via-emerald-500/30 to-sky-500/40",
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
                cardClass: "border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:bg-zinc-900 hover:bg-gradient-to-br hover:from-violet-500/25 hover:via-rose-500/10 hover:to-transparent hover:border-violet-400/70 hover:shadow-[0_0_45px_rgba(139,92,246,0.35)]",
                glow: "from-violet-500/50 via-rose-500/30 to-sky-500/40",
                activeCard: "border-violet-400/70 shadow-[0_0_45px_rgba(139,92,246,0.35)]",
                activeBg: "bg-gradient-to-br from-violet-500/25 via-rose-500/10 to-transparent",
              },
            ].map((stat, statIdx) => (
              <div
                key={stat.label}
                className={`group/glow relative isolate ${statIdx === selectedAboutStat ? "z-10" : "hover:z-10"}`}
              >
              <HoverGlow gradient={stat.glow} active={statIdx === selectedAboutStat} />
              <div
                onClick={() => setSelectedAboutStat(statIdx === selectedAboutStat ? null : statIdx)}
                className={`relative h-full overflow-hidden border rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-500 hover:scale-[1.05] ${statIdx === selectedAboutStat ? `scale-[1.05] bg-zinc-900 ${stat.activeCard} ${stat.activeBg}` : `bg-zinc-800/60 ${stat.cardClass}`}`}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20">
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Skills &amp; Technical Expertise
          </h3>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
          <p className="text-zinc-400 max-w-2xl">
            A breakdown of the cloud, data, and engineering competencies I bring to every project.
          </p>
        </div>

        <RingCarousel
          count={skillCategories.length}
          sizes={SKILL_SIZES}
          label="skill category"
          glowFor={(idx) => SKILL_ACCENTS[idx % SKILL_ACCENTS.length].glow}
          renderCard={(idx, isActive, height) => {
            const category = skillCategories[idx];
            const accent = SKILL_ACCENTS[idx % SKILL_ACCENTS.length];
            const { icon: Icon, tagline } = SKILL_META[category.category] ?? { icon: Compass, tagline: "Core competency area" };

            return (
              <div
                style={{ height }}
                className={`relative flex flex-col border rounded-xl p-6 overflow-y-auto transition-colors duration-500 ${isActive ? `bg-zinc-900 ${accent.activeCard} ${accent.activeBg}` : `bg-zinc-800/60 ${accent.cardClass}`}`}
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
          }}
        />
      </section>

      {/* Experience */}
      <section id="experience" className="bg-zinc-900 border-t border-zinc-700 py-20">
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience</h3>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
          <p className="text-zinc-400 max-w-2xl">
            ~12 years shipping data platforms and cloud architectures across defense, healthcare, fintech, and sports tech.
          </p>
        </div>

        <RingCarousel
          count={sortedExperiences.length}
          sizes={EXPERIENCE_SIZES}
          label="experience"
          glowFor={(idx) => EXPERIENCE_ACCENTS[idx % EXPERIENCE_ACCENTS.length].glow}
          renderCard={(idx, isActive, height) => (
            <ExperienceCard job={sortedExperiences[idx]} idx={idx} isActive={isActive} height={height} />
          )}
        />
      </section>

      {/* Certifications */}
      <section id="certifications" className="bg-zinc-900 border-t border-zinc-700 py-12 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Certifications</h3>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 mb-4" />
          <p className="text-zinc-400 max-w-2xl">
            {certificationCount} verified AWS and HashiCorp credentials spanning architecture, data engineering, security, and ML.
          </p>
        </div>

        <div
          onClick={() => setSelectedCert(null)}
          className="relative w-full overflow-hidden group py-10 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        >
          <div
            className={`flex w-max gap-6 pr-6 animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused] ${selectedCert !== null ? "[animation-play-state:paused]" : ""}`}
          >
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
              const isCertActive = selectedCert === idx;
              const isDimmed = selectedCert !== null && !isCertActive;
              return (
                <motion.a
                  key={`${cert.title}-${idx}`}
                  href={cert.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={isCertActive ? `Open ${cert.title} on Credly` : cert.title}
                  onClick={(e) => {
                    e.stopPropagation();
                    // First click spotlights the card; clicking the spotlighted card opens Credly.
                    if (!isCertActive) {
                      e.preventDefault();
                      setSelectedCert(idx);
                    }
                  }}
                  initial={false}
                  animate={{
                    scale: isCertActive ? 1.06 : isDimmed ? 0.92 : 1,
                    opacity: isDimmed ? 0.55 : 1,
                    filter: isDimmed ? "grayscale(0.8)" : "grayscale(0)",
                  }}
                  whileHover={isCertActive ? undefined : { scale: isDimmed ? 0.96 : 1.05, opacity: 1, filter: "grayscale(0)" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`group/glow relative isolate block flex-shrink-0 w-72 ${isCertActive ? "z-10" : "hover:z-10"}`}
                >
                  <HoverGlow gradient="from-amber-500/50 via-emerald-500/30 to-sky-500/40" active={isCertActive} />
                  <div
                    className={`relative flex h-full flex-col gap-3 border rounded-xl p-5 transition-colors duration-500 ${isCertActive ? "border-amber-400/70 shadow-[0_0_35px_rgba(245,158,11,0.4)] bg-zinc-900 bg-gradient-to-br from-amber-500/25 via-emerald-500/10 to-transparent" : "bg-zinc-800/60 border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.1)] group-hover/glow:bg-zinc-900 group-hover/glow:bg-gradient-to-br group-hover/glow:from-amber-500/25 group-hover/glow:via-emerald-500/10 group-hover/glow:to-transparent group-hover/glow:border-amber-400/70 group-hover/glow:shadow-[0_0_35px_rgba(245,158,11,0.4)]"}`}
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
                    <ExternalLink className={`h-3.5 w-3.5 ${isCertActive ? "text-amber-300" : "text-zinc-500"}`} />
                  </div>
                  </div>
                </motion.a>
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
              className="group/glow relative isolate w-full md:w-2/3 lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HoverGlow gradient="from-sky-500/50 via-violet-500/30 to-rose-500/40" active={educationSelected} />
              <Card
                onClick={() => setEducationSelected((prev) => !prev)}
                className={`cursor-pointer hover:scale-[1.04] ${educationSelected ? "scale-[1.04] border-sky-400/70 shadow-[0_0_45px_rgba(56,189,248,0.35)] bg-zinc-900 bg-gradient-to-br from-sky-500/25 via-violet-500/10 to-transparent" : "border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:bg-zinc-900 hover:bg-gradient-to-br hover:from-sky-500/25 hover:via-violet-500/10 hover:to-transparent hover:border-sky-400/70 hover:shadow-[0_0_45px_rgba(56,189,248,0.35)]"}`}
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
          Open to Senior Data Engineer and Solutions Architect roles · Open to relocation to the US.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="group/glow relative isolate hover:z-10">
          <HoverGlow gradient="from-sky-500/50 via-violet-500/30 to-rose-500/40" />
          <a
            href="tel:+919611724567"
            className="relative flex h-full items-center gap-4 bg-zinc-800/60 border border-sky-500/30 rounded-xl p-5 shadow-[0_0_25px_rgba(56,189,248,0.1)] transition-all duration-500 group-hover/glow:scale-[1.05] group-hover/glow:bg-zinc-900 group-hover/glow:bg-gradient-to-br group-hover/glow:from-sky-500/25 group-hover/glow:via-violet-500/10 group-hover/glow:to-transparent group-hover/glow:border-sky-400/70 group-hover/glow:shadow-[0_0_45px_rgba(56,189,248,0.35)]"
          >
            <span className="h-11 w-11 flex-none flex items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-400">
              <Phone className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-xs text-zinc-500 uppercase tracking-wide">Phone</span>
              <span className="block text-white font-medium">+91-9611724567</span>
            </span>
          </a>
          </div>

          <div className="group/glow relative isolate hover:z-10">
          <HoverGlow gradient="from-emerald-500/50 via-sky-500/30 to-violet-500/40" />
          <a
            href="mailto:jerry231088@gmail.com"
            className="relative flex h-full items-center gap-4 bg-zinc-800/60 border border-emerald-500/30 rounded-xl p-5 shadow-[0_0_25px_rgba(16,185,129,0.1)] transition-all duration-500 group-hover/glow:scale-[1.05] group-hover/glow:bg-zinc-900 group-hover/glow:bg-gradient-to-br group-hover/glow:from-emerald-500/25 group-hover/glow:via-sky-500/10 group-hover/glow:to-transparent group-hover/glow:border-emerald-400/70 group-hover/glow:shadow-[0_0_45px_rgba(16,185,129,0.35)]"
          >
            <span className="h-11 w-11 flex-none flex items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
              <Mail className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-xs text-zinc-500 uppercase tracking-wide">Email</span>
              <span className="block text-white font-medium">jerry231088@gmail.com</span>
            </span>
          </a>
          </div>

          <div className="group/glow relative isolate hover:z-10">
          <HoverGlow gradient="from-violet-500/50 via-rose-500/30 to-sky-500/40" />
          <a
            href="https://www.linkedin.com/in/neerajksingh231088/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-full items-center gap-4 bg-zinc-800/60 border border-violet-500/30 rounded-xl p-5 shadow-[0_0_25px_rgba(139,92,246,0.1)] transition-all duration-500 group-hover/glow:scale-[1.05] group-hover/glow:bg-zinc-900 group-hover/glow:bg-gradient-to-br group-hover/glow:from-violet-500/25 group-hover/glow:via-rose-500/10 group-hover/glow:to-transparent group-hover/glow:border-violet-400/70 group-hover/glow:shadow-[0_0_45px_rgba(139,92,246,0.35)]"
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
        </div>
      </section>

      <footer className="text-center py-6 border-t border-zinc-700 text-xs text-zinc-500 font-mono">
        Neeraj Kumar Singh - Senior Data Engineer | AWS Solutions Architect
      </footer>
    </div>
  );
};

export default Portfolio;

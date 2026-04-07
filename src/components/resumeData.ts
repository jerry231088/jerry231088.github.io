import { ResumeData } from './ResumeDocument';

export const resumeData: ResumeData = {
  fullName: 'Neeraj Kumar Singh',
  titleLine: 'AWS Solutions Architect  ·  Senior Data Engineer  ·  GenAI Specialist',
  phone: '+91-9611724567',
  email: 'jerry231088@gmail.com',
  linkedin: 'linkedin.com/in/neeraj-singh',

  summary: [
    'Technical leader and AWS Data Engineer with 11+ years of experience and ~7 years of deep AWS expertise. Proven track record architecting highly available, secure, cost-optimized data platforms at scale.',
    'Expert in data lakes, real-time streaming, event-driven pipelines, and GenAI on Amazon Bedrock — enabling intelligent document processing and AI-driven automation. AWS Certified across 9 domains including Solutions Architect Professional and Generative AI Developer.',
    'Recognized for architectural ownership, technical leadership, and cross-functional collaboration. Strong advocate of automation, IaC, AWS best practices, and mentoring engineers to drive innovation.',
  ],

  skillCategories: [
    {
      category: 'Cloud & IaC',
      skills: [
        'AWS',
        'Bedrock',
        'Lambda',
        'ECS/Fargate',
        'Batch',
        'Glue',
        'Kinesis',
        'MSK/Kafka',
        'Redshift',
        'DynamoDB',
        'Neptune',
        'S3',
        'Athena',
        'Lake Formation',
        'EventBridge',
        'API Gateway',
        'IAM',
        'Cognito',
        'SNS/SQS',
        'Secrets Manager',
        'KMS',
        'Terraform',
      ],
    },
    {
      category: 'Data Engineering',
      skills: [
        'Data Lake',
        'ETL/ELT',
        'Real-time Streaming',
        'Batch Processing',
        'Spark',
        'Parquet',
        'SQL',
        'NoSQL',
        'Redshift',
        'DynamoDB',
        'Gremlin-Python',
      ],
    },
    {
      category: 'GenAI & ML',
      skills: [
        'Amazon Bedrock',
        'Claude Opus/Sonnet',
        'vLLM GPU',
        'Intelligent Document Processing',
        'BPMN Automation',
      ],
    },
    {
      category: 'Languages & Dev',
      skills: [
        'Python',
        'Pandas',
        'FastAPI',
        'SQL',
        'C#',
        'Docker',
        'GitHub',
        'Jenkins',
        'CI/CD',
        'Power BI',
        'QuickSight',
        'CloudWatch',
      ],
    },
  ],

  sortedExperiences: [
    {
      designation: 'Senior Consultant — AWS Solutions Architect & Data Engineer',
      company: 'msg Global Solutions India Pvt Ltd',
      location: 'Bengaluru, India',
      period: 'Aug 2023 – Present',
      projects: [
        {
          name: 'Smash — Israel–Germany Defense Platform',
          role: '',
          details: [
            'Architected a greenfield hybrid defense platform (AWS + on-prem) from scratch, shipping the full product across two 3-week sprints; designed geospatial microservices in Python/FastAPI for real-time target resolution and MGRS-to-coordinate conversion.',
            'Defined all AWS infrastructure in Terraform — VPCs, IAM boundary policies, ECS/Fargate, API Gateway, SQS, S3, Secrets Manager — collaborating directly with Israeli and German defense stakeholders.',
          ],
        },
        {
          name: 'Semantic Bridge — GDPR-Compliant GenAI Platform',
          role: '',
          details: [
            'Led production deployment of a GDPR-compliant GenAI Intelligent Document Processing app (AWS Bedrock / Claude Opus) to extract and structure German medical insurance data at scale.',
            'Architected GenAI workflow on Bedrock (Claude Sonnet) to automate BPMN 2.0 model generation; established vLLM GPU infrastructure and secure KMS-encrypted ECR CI/CD pipeline.',
          ],
        },
        {
          name: 'ProfileMap — Serverless AWS Data Platform',
          role: '',
          details: [
            'Designed a secure, event-driven AWS platform (EventBridge, Batch, Glue, DynamoDB, Athena, Lake Formation) powering Power BI reporting at $3–$10/month; recognized by Head of Product for innovative reporting architecture.',
          ],
        },
      ],
    },
    {
      designation: 'Senior Consultant — AWS Data Engineer',
      company: 'EXL Services (Inductis India Pvt Ltd)',
      location: 'Gurugram, India',
      period: 'May 2023 – Aug 2023',
      projects: [
        {
          name: '',
          role: '',
          details: [
            'Built scalable batch ETL pipeline (CSV/JSON → Parquet/S3) with EventBridge automation and Athena-powered analytics dashboards.',
          ],
        },
      ],
    },
    {
      designation: 'Software Engineer III — AWS Data Engineer',
      company: 'Stats Perform',
      location: 'Bengaluru, India',
      period: 'Mar 2020 – May 2023',
      projects: [
        {
          name: '',
          role: '',
          details: [
            'Built real-time streaming pipelines (Kinesis, MSK/Kafka) processing millions of sports events; developed ETL into S3, DynamoDB, and Redshift for BI reporting. Promoted to SE III; awarded Global Recognition Award Q1 2022.',
          ],
        },
      ],
    },
    {
      designation: 'Senior Software Engineer — AWS Data Engineer',
      company: 'Saggezza – an Apexon Company (Goldman Sachs)',
      location: 'Bengaluru, India',
      period: 'Apr 2019 – Mar 2020',
      projects: [
        {
          name: '',
          role: '',
          details: [
            'Built serverless event-driven pipelines (Lambda, S3, DynamoDB) and multi-language data transformation logic (C#, SQL, Python) ensuring high accuracy at scale.',
          ],
        },
      ],
    },
    {
      designation: 'Software Developer — Fintech Platforms',
      company: 'Tradelab Technologies Pvt Ltd',
      location: 'Bengaluru, India',
      period: 'Dec 2014 – Mar 2019',
      projects: [
        {
          name: '',
          role: '',
          details: [
            "Owned full lifecycle of a financial trading platform; engineered real-time market data pipelines (WebSocket/REST APIs) and advanced charting for Zerodha PI — India's #1 desktop trading app.",
          ],
        },
      ],
    },
  ],

  certifications: [
    { title: 'AWS Certified Generative AI Developer – Pro (Early Adopter)' },
    { title: 'AWS Certified Solutions Architect – Professional' },
    { title: 'AWS Certified Database – Specialty' },
    { title: 'AWS Certified Data Engineer – Associate' },
    { title: 'AWS Certified AI Practitioner (Early Adopter)' },
    { title: 'AWS Certified Solutions Architect – Associate' },
    { title: 'AWS Certified Developer – Associate' },
    { title: 'AWS Certified Cloud Practitioner' },
    { title: 'HashiCorp Certified: Terraform Associate' },
  ],

  education: [
    {
      degree: 'B.Tech — Electronics & Communication Engineering',
      institution: 'Shri Mata Vaishno Devi University  ·  India',
      period: '2007 – 2011',
    },
  ],
};
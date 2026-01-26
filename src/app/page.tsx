"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import { Phone, Mail, Linkedin, Youtube } from 'lucide-react';
import dynamic from 'next/dynamic';

const ResumeDownloadButton = dynamic(
  () => import('@/components/ResumeDownloadButton'),
  { ssr: false }
);

const CoverLetterDownloadLink = dynamic(
  () => import('@/components/CoverLetter').then((mod) => mod.CoverLetterDownloadLink),
  { ssr: false }
);

const Portfolio: React.FC = () => {
  const experiences: {
    role: string;
    company: string;
    location: string;
    period: string;
    projects: {
      name: string;
      details: string[];
      youtubeUrl?: string;
    }[];
  }[] = [
    {
      role: "Senior Data Engineer",
      company: "msg Global Solutions India Pvt Ltd",
      location: "Bengaluru, India",
      period: "Aug 2023 – Present",
      projects: [
        {
          name: "Semantic Bridge",
          details: [
            "Architected and deployed the product's initial AWS cloud infrastructure from the ground up using Terraform, establishing a scalable, modular, and 100% reproducible IaC.",
            "Engineered a GenAI workflow utilizing AWS Bedrock (Claude Sonnet 4) to automate the generation of complex BPMN 2.0 model notation for the German Military.",
            "Deployed foundational AI/ML infrastructure, including a high-performance vLLM server on AWS GPU (g6e/g5) instances for model validation and a secure CICD pipeline for sharing private KMS encrypted ECR images with third parties.",
            "Spearheaded an R&D initiative to develop a semantic search capability, prototyping the deployment of ML models on Amazon OpenSearch with SageMaker AI and S3."
          ]
        },
        {
          name: "ProfileMap",
          details: [
            "Designed and deployed a serverless user profile reminder system on AWS using Terraform, optimized for $3/month cost.",
            "Engineered automated daily reporting pipelines on AWS (Batch, Glue, S3, Athena), scaling reliably under $10/month.",
            "Developed a cost-effective candidate search request system via email on AWS with Terraform, enabling skill-based queries for under $5/month.",
            "Leveraged various AWS services such as EventBridge, Batch, ECR, Glue Crawler, DynamoDB, Cognito, S3 with Python and SQL; enforced security and compliance via IAM and Lake Formation; enabled reporting in Power BI through Athena ODBC.",
            "Applied Gremlin-Python to model and retrieve complex relationships in Amazon Neptune.",
            "Received recognition from Head of Product for innovation in reporting architecture and strategic use of AWS services.",
            "Praised by Data Scientists for delivering a POC on DynamoDB attribute-level item size calculation, enhancing data accuracy and performance."
          ]
        }
      ]
    },
    {
      role: "Senior Consultant",
      company: "EXL Services (Inductis India Pvt Ltd)",
      location: "Gurugram, India",
      period: "May 2023 – Aug 2023",
      projects: [
        {
          name: "Mettis",
          details: [
            "Designed and implemented an ETL batch pipeline to process batch datasets (CSV/JSON files).",
            "Performed data cleaning and transformations.",
            "Stored processed datasets in Amazon S3 (Parquet format, partitioned by year/month/day) for efficient querying.",
            "Automated batch jobs using AWS EventBridge, scheduled to run daily.",
            "Queried processed data via AWS Athena and created summary dashboards for reporting."
          ]
        }
      ]
    },
    {
      role: "Data Engineer (Team Lead)",
      company: "Stats Perform",
      location: "Bengaluru, India",
      period: "Mar 2020 – May 2023",
      projects: [
        {
          name: "Gold Standard Data Platform",
          details: [
            "Developed real-time streaming pipelines with Kinesis/MSK to handle millions of sports events.",
            "Built ETL pipelines into S3, DynamoDB, and Redshift to support analytics and reporting.",
            "Promoted to Software Engineer III (2021–2022 Appraisal Cycle) for outstanding data engineering contributions and successfully leading a small team to deliver high-impact results.",
            "Received Global Recognition Award (Q1 2022) for exceptional contributions in data engineering, driving measurable business value."
          ]
        }
      ]
    },
     {
       role: "Senior Software Engineer",
       company: "Saggezza - an Apexon Company (formerly: Saggezza India Pvt Ltd)",
       location: "Bengaluru, India",
       period: "Apr 2019 – Mar 2020",
       projects: [
         {
           name: "Contingent Worker w/ Goldman Sachs",
           details: [
             "Designed and built serverless, event-driven data pipelines utilizing AWS Lambda for compute and S3 & DynamoDB for scalable storage.",
             "Developed multi-language data transformation and validation logic (C#, SQL, Python) to ensure high data accuracy and consistency for the technical support business unit."
           ]
         }
       ]
     },
       {
         role: "Software Developer",
         company: "Tradelab Technologies (formerly: Tradelab Software Pvt Ltd)",
         location: "Bengaluru, India",
         period: "Dec 2014 – Mar 2019",
         projects: [
           {
             name: "Stock Trading Dealer Application for OMS",
             details: [
               "Independently managed product development, from gathering client requirements to feature implementation and bug fixes.",
               "Integrated WebSocket APIs and REST APIs for seamless real-time data exchange.",
               "Implemented JSON serialization/deserialization using Newtonsoft for optimized data processing."
             ]
           },
           {
            name: "India’s #1 Desktop Application - Zerodha PI",
            youtubeUrl: "https://www.youtube.com/watch?v=BJZz0cwopTw",
            details: [
              "Developed new features, performed bug fixes, wrote unit testing and developed various technical charting features, ensuring accuracy, performance, and reliability.",
            ]
          }
         ]
       }
  ];

  // THIS BLOCK AUTOMATICALLY SORT THE EXPERIENCES
  const sortedExperiences = [...experiences].sort((a, b) => {
    const getEndDate = (period: string): Date => {
      const endDateStr = period.split('–')[1].trim();
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

  const skillCategories = [
    {
      category: "Technical Skills",
      skills: ["Cloud Architecture", "Cloud Infrastructure", "Cloud Services", "Amazon Web Services (AWS)", "Cloud Computing", "Cloud Engineer", "Infrastructure as Code (IaC)", "Infrastructure Automation", "Terraform", "Data Ingestion", "Data Management", "Data Security", "Data Transformation", "Data Storage", "Code Development", "Code Deployment", "CICD", "GenAI", "AI"]
    },
    {
      category: "AWS Cloud",
      skills: [ "Lambda", "Batch", "ECS", "Fargate", "API Gateway", "DynamoDB", "Neptune", "S3", "Lake Formation", "Athena", "EventBridge", "IAM", "Secrets Manager", "SSM Parameter Store", "SES", "ECR", "Bedrock", "Route53", "SNS", "SQS", "Cognito", "Glue", "Kinesis Data Streams", "Amazon Data Firehose", "MSK/Kafka", "Redshift" ]
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
      skills: [ "Terraform" ]
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
      category: "Design & Cost",
      skills: [ "app.diagrams.net", "AWS Pricing Calculator", "Cost Explorer", "Budgets", "Service Quotas"]
    },
    {
      category: "Project Management & Documentation",
      skills: ["JIRA", "Confluence"]
    }
  ];

  const certifications = [
    {
      title: 'AWS Certified Solutions Architect – Professional',
      publicUrl: 'https://www.credly.com/badges/f8d87ba7-3bd8-428d-ad6b-adfba07567fe/public_url',
      imageUrl: '/badges/aws-sa-pro.png'
    },
    {
      title: 'AWS Certified Database – Specialty',
      publicUrl: 'https://www.credly.com/badges/84bf4cdc-addf-4a68-ba4c-29e36837ff0f/public_url',
      imageUrl: '/badges/aws-db-specialty.png'
    },
    {
      title: 'AWS Certified Data Engineer – Associate',
      publicUrl: 'https://www.credly.com/badges/3f7dca14-df8b-4595-a754-76d05d16e7c2/public_url',
      imageUrl: '/badges/aws-data-engineer.png'
    },
    {
      title: 'AWS Certified Solutions Architect – Associate',
      publicUrl: 'https://www.credly.com/badges/242d7b54-73d8-4f2f-a6ad-30ca997576ca/public_url',
      imageUrl: '/badges/aws-sa-assoc.png'
    },
    {
      title: 'AWS Certified Developer – Associate',
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
        period: "2007 – 2011",
        location: "J&K, India",
      }
    ];

  const portfolioData = {
      sortedExperiences,
      skillCategories,
      education,
      certifications
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-10 bg-gradient-to-r from-slate-700 via-slate-800 to-gray-900 text-white">
        <div className="flex justify-center items-center gap-4 md:gap-6 mb-8 flex-wrap px-4">
          {certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={cert.title}
              className="transition-transform duration-300 hover:scale-110"
            >
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="h-24 w-24 md:h-28 md:w-28"
              />
            </a>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          NEERAJ KUMAR SINGH
        </h1>
        <h2 className="text-xl md:text-2xl font-medium mb-6">
          AWS Certified Solutions Architect - Professional | AWS Certified Data Engineer
        </h2>

        <div className="flex justify-center mt-8 space-x-4">
          {/* --- Use the dynamically imported component here --- */}
          <ResumeDownloadButton data={portfolioData} />
          <CoverLetterDownloadLink />
        </div>
      </section>

      {/* Summary */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-12 text-center">Professional Summary</h3>
        <p className="text-lg leading-relaxed">
          Technical Leader & AWS Data Engineer with 11+ years of overall software engineering experience and ~7 years of hands-on experience on AWS. Strong background as an AWS Solutions Architect, leading end-to-end design and delivery of highly available, secure, and cost-optimized cloud data platforms.

          Expert in architecting modern data lakes, streaming systems, and event-driven pipelines supporting analytics, AI/ML, and BI workloads. Hands-on experience delivering Gen-AI solutions using Amazon Bedrock, enabling intelligent data processing, knowledge retrieval, and AI-driven insights.

          Recognized for architectural ownership, technical leadership, and cross-functional collaboration, with a track record of designing ground-up AWS architectures that improve data quality, scalability, and business outcomes. Strong advocate of automation, IaC, AWS best practices, and mentoring engineers to drive innovation.
        </p>
      </section>

      {/* Skills */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-12 text-center">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-indigo-700 mb-4">{category.category}</h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <motion.div
                    key={sIdx}
                    className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (sIdx + 1) * 0.05 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12 text-center">Experience</h3>
          <div className="md:columns-2 md:gap-8 space-y-8">
            {/* Mapped over the new `sortedExperiences` array */}
            {sortedExperiences.map((job, idx) => (
              <motion.div
                key={idx}
                // this class is to prevent cards from splitting across columns
                className="break-inside-avoid"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-lg">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold">{job.role}</h4>
                      <div className="text-sm text-gray-500">
                        <p>{job.company}, {job.location}</p>
                        <p>{job.period}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {job.projects.map((project, pIdx) => (
                        <div key={pIdx} className="border-t pt-4">
                          <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-indigo-700 mb-2">{project.name}</h5>
                            {project.youtubeUrl && (
                              <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" title="Watch PI Demo on YouTube" className="text-gray-500 hover:text-red-600 transition-colors">
                                <Youtube className="h-6 w-6" />
                              </a>
                            )}
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
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
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-12 text-center">Education</h3>
        <div className="flex justify-center">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              className="w-full md:w-2/3 lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold">{edu.degree}</h4>
                  <div className="text-sm text-gray-500 mt-1">
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
      <section className="text-center py-20 bg-gradient-to-r from-slate-700 via-slate-800 to-gray-900 text-white">
        <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
        <p className="mb-6">
          Email: jerry231088@gmail.com | Mobile: +91-9611724567
        </p>
        <div className="flex justify-center space-x-4">
            <Button asChild className="bg-slate-100 text-slate-900 hover:bg-slate-300">
              <a href="dial:+919611724567" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Call Me
              </a>
            </Button>

            <Button asChild className="bg-slate-100 text-slate-900 hover:bg-slate-300">
              <a href="mailto:jerry231088@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Email Me
              </a>
            </Button>

            <Button asChild className="bg-slate-100 text-slate-900 hover:bg-slate-300">
              <a
                href="https://www.linkedin.com/in/neerajksingh231088/"
                target="_blank"
                rel="noopener noreferrer"
              >
              <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
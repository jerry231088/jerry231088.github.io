"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import { Phone, Mail, Linkedin } from 'lucide-react';

const Portfolio: React.FC = () => {
  const experiences: {
    role: string;
    company: string;
    location: string;
    period: string;
    projects: {
      name: string;
      details: string[];
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
            "Engineered an automated workflow for building, encrypting, and sharing private ECR images with third-party organizations, integrating AWS KMS to enforce strict encryption key policies and ensuring secure, auditable access for external clients.",
            "Enabled advanced AI development by deploying a dedicated vLLM server on high-performance AWS GPU instances (g5/g6e), providing the Data Science team with the critical infrastructure to build and validate new business-focused language models.",
            "Engineered an innovative AI-driven workflow to automate the creation of complex business process models for the German Military. Leveraged AWS Bedrock with the Claude Sonnet 4 model to process inputs and generate BPMN 2.0 compliant XMI files, directly consumable by the client&rsquo;s Sparx Enterprise Architect tool.",
            "Architected and deployed the product&rsquo;s initial AWS cloud infrastructure from the ground up using Terraform. Established a scalable, and modular Infrastructure as Code (IaC) framework that ensured 100% reproducible environments and streamlined future enhancements.",
            "Spearheaded a research and development (R&amp;D) initiative to enhance the platform with intelligent search capabilities. Prototyped a solution for deploying machine learning models on Amazon OpenSearch Service via SageMaker and S3, successfully demonstrating the feasibility of semantic search across the generated process models."
          ]
        },
        {
          name: "ProfileMap",
          details: [
            "Designed and deployed a serverless user profile reminder system on AWS using Terraform, optimized for $3/month cost.",
            "Engineered automated daily reporting pipelines on AWS (Batch, Glue, S3, Athena), scaling reliably under $10/month.",
            "Developed a cost-effective candidate search request system via email on AWS with Terraform, enabling skill-based queries for under $5/month.",
            "Leveraged AWS services (EventBridge, Batch, ECR, Glue Crawler, DynamoDB, Cognito, S3) with Python &amp; SQL; enforced security &amp; compliance via IAM and Lake Formation; enabled reporting in Power BI through Athena ODBC.",
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
            "Implemented AWS Cognito authentication with DynamoDB storage, ensuring data integrity and compliance via Python/SQL validation."
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
            "Awarded Global Recognition (Q1 2022) for outstanding data engineering contributions."
          ]
        }
      ]
    },
     {
       role: "Senior Software Engineer",
       company: "Saggezza - an Apexon Company",
       location: "Bengaluru, India",
       period: "Apr 2019 – Mar 2020",
       projects: [
         {
           name: "Contingent Worker w/ Goldman Sachs",
           details: [
             "Built serverless &amp; event-driven data pipelines for the technical support business unit using Lambda, performing ETL and quality checks, with scalable storage in AWS S3 &amp; DynamoDB.",
             "Developed data transformation logic in C#, SQL &amp; Python, ensuring data accuracy and consistency."
           ]
         }
       ]
     },
       {
         role: "Software Developer",
         company: "Tradelab Technologies (Tradelab Software Pvt Ltd)",
         location: "Bengaluru, India",
         period: "Dec 2014 – Mar 2019",
         projects: [
           {
             name: "Stock Trading Dealer Application for OMS",
             details: [
               "Independently managed product development, from gathering client requirements to feature implementation &amp; bug fixes.",
               "Integrated WebSocket APIs &amp; REST APIs for seamless real-time data exchange.",
               "Implemented JSON serialization/deserialization using Newtonsoft for optimized data processing."
             ]
           },
           {
            name: "India’s #1 Desktop Application - Zerodha Pi",
            details: [
              "Developed new features, performed bug fixes, wrote unit testing and developed various technical charting features, ensuring accuracy, performance, and reliability."
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
      skills: [ "Lambda", "Batch", "ECS", "Fargate", "API Gateway", "Glue", "SNS", "SQS", "Kinesis", "MSK/Kafka", "DynamoDB", "Neptune", "S3", "Lake Formation", "Athena", "Redshift", "IAM", "Secrets Manager", "SSM Parameter Store", "SES", "ECR", "Bedrock" ]
    },
    {
      category: "Data Engineering",
      skills: [ "Data Lake", "Extract, Transform, Load (ETL)", "Extract, Load, Transform (ELT)", "Databases", "SQL", "NoSQL", "Data Warehousing", "Batch",  "Realtime Streaming", "Gremlin-Python", "Spark" ]
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
      skills: [ "GitHub", "Bitbucket", "Jenkins", "CI/CD" ]
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
      category: "Project Management and Documentation",
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
      publicUrl: 'https://www.credly.com/badges/dcacdf37-ade5-4fc8-8ba8-949545e4ce28/public_url',
      imageUrl: '/badges/aws-dev-assoc.png'
    },
    {
      title: 'AWS Certified AI Practitioner',
      publicUrl: 'https://www.credly.com/badges/11d055b9-485b-4300-90b4-4cd0f64fa713/public_url',
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-gray-900 to-slate-800 text-white">
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
      </section>

      {/* Summary */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-semibold mb-4">About Me</h3>
        <p className="text-lg leading-relaxed">
          Neeraj is an AWS Certified Solutions Architect - Professional | AWS Certified Data Engineer with over 6 years of hands-on experience in data engineering and a total of 10+ years in software development. He has a strong track record of designing, building, and maintaining robust data pipelines that support business intelligence, artificial intelligence (AI), and machine learning (ML) applications.
          <br /><br />
          He holds 8 professional certifications, including 7x AWS certifications and the HashiCorp Certified: Terraform Associate (HCTA0-003), and is highly proficient in Python programming & SQL.
          <br /><br />
          Neeraj&rsquo;s expertise spans a wide range of AWS services such as Lambda, SNS, SQS, Kinesis, S3, CloudWatch, API Gateway, DynamoDB, Neptune, MSK/Kafka, Athena, Redshift, Lake Formation, IAM, Cloudwatch, EventBridge, Cloudtrail, etc. He leverages these services to design and implement scalable, efficient, and secure data processing workflows.
          <br /><br />
          In previous roles, he has collaborated closely with cross-functional teams to translate business requirements into scalable ETL processes, while also ensuring data integrity and performance. He has used automation and observability tools such as CloudWatch and Kibana to monitor and maintain data quality and system reliability.
        </p>
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
                          <h5 className="font-semibold text-indigo-700 mb-2">{project.name}</h5>
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

      {/* Contact */}
      <section className="text-center py-16 bg-gradient-to-br from-gray-900 to-slate-800 text-white">
        <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
        <p className="mb-6">
          Email: jerry231088@gmail.com | Phone: +91-9611724567
        </p>
        <div className="flex justify-center space-x-4">
            <Button asChild className="bg-slate-100 text-slate-900 hover:bg-slate-300">
              <a href="tel:+919611724567" className="flex items-center">
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
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import CredlyBadge from '../components/ui/CredlyBadge';

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
         company: "Tradelab Technologies",
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

  const skills: string[] = [
    "AWS",
    "Terraform",
    "Python",
    "SQL",
    "PySpark",
    "DynamoDB",
    "Glue",
    "Athena",
    "Redshift",
    "Power BI",
  ];

  // At the top of your component, add the publicUrl to each object
  const certifications = [
    {
      name: 'AWS Certified Solutions Architect - Professional',
      badgeId: 'f8d87ba7-3bd8-428d-ad6b-adfba07567fe',
      publicUrl: 'https://www.credly.com/badges/f8d87ba7-3bd8-428d-ad6b-adfba07567fe/public_url'
    },
    {
      name: 'AWS Certified Database – Specialty',
      badgeId: '84bf4cdc-addf-4a68-ba4c-29e36837ff0f',
      publicUrl: 'https://www.credly.com/badges/84bf4cdc-addf-4a68-ba4c-29e36837ff0f/public_url'
    },
    {
      name: 'AWS Certified Data Engineer - Associate',
      badgeId: '3f7dca14-df8b-4595-a754-76d05d16e7c2',
      publicUrl: 'https://www.credly.com/badges/3f7dca14-df8b-4595-a754-76d05d16e7c2/public_url'
    },
    {
      name: 'AWS Certified Solutions Architect - Associate',
      badgeId: '242d7b54-73d8-4f2f-a6ad-30ca997576ca',
      publicUrl: 'https://www.credly.com/badges/242d7b54-73d8-4f2f-a6ad-30ca997576ca/public_url'
    },
    {
      name: 'AWS Certified Developer - Associate',
      badgeId: 'dcacdf37-ade5-4fc8-8ba8-949545e4ce28',
      publicUrl: 'https://www.credly.com/badges/dcacdf37-ade5-4fc8-8ba8-949545e4ce28/public_url'
    },
    {
      name: 'AWS Certified AI Practitioner',
      badgeId: '11d055b9-485b-4300-90b4-4cd0f64fa713',
      publicUrl: 'https://www.credly.com/badges/11d055b9-485b-4300-90b4-4cd0f64fa713/public_url'
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      badgeId: '32aacb39-113c-4bd1-b69f-3120776bafcf',
      publicUrl: 'https://www.credly.com/badges/32aacb39-113c-4bd1-b69f-3120776bafcf/public_url'
    },
    {
      name: 'HashiCorp Certified: Terraform Associate',
      badgeId: '9b7afd54-eb04-4272-8496-3bd77928b42f',
      publicUrl: 'https://www.credly.com/badges/9b7afd54-eb04-4272-8496-3bd77928b42f/public_url'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        {/* Certification Icons Container */}
        <div className="flex justify-center items-center gap-6 mb-8 flex-wrap">
          {certifications.map((cert) => (
            <CredlyBadge
              key={cert.name}
              badgeId={cert.badgeId}
              publicUrl={cert.publicUrl} // <-- Pass the new publicUrl prop here
            />
          ))}
        </div>
        <Script
          type="text/javascript"
          async
          src="//cdn.credly.com/assets/utilities/embed.js"
        />

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          NEERAJ KUMAR SINGH
        </h1>
        <h2 className="text-xl md:text-2xl font-medium mb-6">
          AWS Certified Solutions Architect - Professional | AWS Certified Data Engineer
        </h2>
        <div className="space-x-4">
          {/* This button will ONLY appear on mobile screens (screens smaller than the 'sm' breakpoint) */}
          <Button asChild className="sm:hidden">
            <a href="M:+911234567890">Call Me</a>
          </Button>

          <Button asChild variant="secondary">
            <a href="mailto:jerry231088@gmail.com">Contact Me</a>
          </Button>
          <Button asChild>
            <a
              href="https://www.linkedin.com/in/neerajksingh231088/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Button>
        </div>
      </section>
    </div>

      {/* Summary */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-semibold mb-4">About Me</h3>
        <p className="text-lg leading-relaxed">
          Neeraj is an AWS Certified Solutions Architect - Professional | AWS Certified Data Engineer with over 6 years of hands-on experience in data engineering and a total of 10+ years in software development. He has a strong track record of designing, building, and maintaining robust data pipelines that support business intelligence, artificial intelligence (AI), and machine learning (ML) applications.
          <br /><br />
          He holds 8 professional certifications, including 7x AWS certifications and the HashiCorp Certified: Terraform Associate (HCTA0-003), and is highly proficient in Python programming & SQL.
          <br /><br />
          Neeraj&rsquo;s expertise spans a wide range of AWS services such as Lambda, SNS, SQS, Kinesis, S3, CloudWatch, API Gateway, DynamoDB, Neptune, MSK/Kafka, Athena, Redshift, and Lake Formation. He leverages these tools to design and implement scalable, efficient, and secure data processing workflows.
          <br /><br />
          In previous roles, he has collaborated closely with cross-functional teams to translate business requirements into scalable ETL processes, while also ensuring data integrity and performance. He has used automation and observability tools such as CloudWatch and Kibana to monitor and maintain data quality and system reliability.
        </p>
      </section>

      {/* Experience */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-8">Experience</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((job, idx) => (
              <motion.div
                key={idx}
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
        <h3 className="text-2xl font-semibold mb-6">Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="p-3 bg-gray-100 rounded-xl shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-8">Certifications</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a
                href="https://www.credly.com/badges/f8d87ba7-3bd8-428d-ad6b-adfba07567fe/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                AWS Certified Solutions Architect – Professional
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/84bf4cdc-addf-4a68-ba4c-29e36837ff0f/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                AWS Certified Database Specialty
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/84bf4cdc-addf-4a68-ba4c-29e36837ff0f/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                AWS Certified Data Engineer – Associate
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/a50c17cd-0605-4b89-926d-c8bbe21d2e9f/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                AWS Certified Solutions Architect - Associate
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/dcacdf37-ade5-4fc8-8ba8-949545e4ce28/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                AWS Certified Developer - Associate
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/92ac89e4-fec2-48e8-aa15-0cde48106b56/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                AWS Certified Cloud Practitioner
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/11d055b9-485b-4300-90b4-4cd0f64fa713/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                AWS Certified AI Practitioner
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/92ac89e4-fec2-48e8-aa15-0cde48106b56/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                HashiCorp Certified: Terraform Associate
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
        <p className="mb-6">
          Email: jerry231088@gmail.com | Phone: +91-9611724567
        </p>
        <Button asChild variant="secondary">
          <a href="mailto:jerry231088@gmail.com">Email Me</a>
        </Button>
      </section>
    </div>
  );
};

export default Portfolio;

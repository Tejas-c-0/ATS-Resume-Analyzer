import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Moon,
  Sun,
  Download,
  Printer,
  Copy,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Briefcase,
  GraduationCap,
  Star,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Eye,
  FileCheck,
  Zap,
  Brain,
  Languages,
  PenTool,
  LayoutTemplate,
  UserCheck,
  Lightbulb,
  AlertTriangle,
  Check,
  XCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]) {
  return twMerge(clsx(classes));
}

// Types
interface AnalysisResult {
  overallScore: number;
  detailedScores: DetailedScore[];
  sections: SectionAnalysis[];
  keywordAnalysis: KeywordAnalysis;
  skillsAnalysis: SkillsAnalysis;
  grammarAnalysis: GrammarAnalysis;
  formattingAnalysis: FormattingAnalysis;
  recruiterAnalysis: RecruiterAnalysis;
  jobMatch: JobMatch[];
  improvements: Improvement[];
  finalReport: FinalReport;
}

interface DetailedScore {
  name: string;
  score: number;
  icon: React.ReactNode;
}

interface SectionAnalysis {
  name: string;
  status: 'strong' | 'weak' | 'moderate';
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  icon: React.ReactNode;
}

interface KeywordAnalysis {
  missing: string[];
  strong: string[];
  weak: string[];
  duplicate: string[];
  technical: string[];
  ats: string[];
}

interface SkillsAnalysis {
  present: SkillCategory[];
  missing: string[];
  recommended: string[];
}

interface SkillCategory {
  category: string;
  skills: string[];
}

interface GrammarAnalysis {
  mistakes: GrammarMistake[];
  totalIssues: number;
}

interface GrammarMistake {
  original: string;
  suggestion: string;
  type: 'grammar' | 'spelling' | 'punctuation' | 'verb' | 'voice' | 'repetition' | 'capitalization';
}

interface FormattingAnalysis {
  atsCompatible: boolean;
  issues: FormattingIssue[];
}

interface FormattingIssue {
  type: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface RecruiterAnalysis {
  readability: number;
  firstImpression: number;
  strongestSection: string;
  weakestSection: string;
  resumeLength: 'optimal' | 'too-short' | 'too-long';
  resumeFlow: number;
}

interface JobMatch {
  role: string;
  percentage: number;
}

interface Improvement {
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  category: string;
}

interface FinalReport {
  rating: string;
  interviewChance: number;
  shortlistChance: number;
  topImprovements: string[];
  biggestStrengths: string[];
  biggestWeaknesses: string[];
  finalRecommendation: string;
}

// Mock analysis function - in production, this would call a backend API
const analyzeResume = async (text: string): Promise<AnalysisResult> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Analyze the resume content
  const wordCount = text.split(/\s+/).length;
  const hasEmail = /\S+@\S+\.\S+/.test(text);
  const hasPhone = /\d{3}[-.]?\d{3}[-.]?\d{4}/.test(text);
  const hasLinkedIn = /linkedin\.com/i.test(text);
  const hasSummary = /summary|objective|profile/i.test(text);
  const hasExperience = /experience|work|employment/i.test(text);
  const hasEducation = /education|degree|university|college/i.test(text);
  const hasSkills = /skills|technical|proficient/i.test(text);
  const hasProjects = /project|portfolio|github/i.test(text);
  const hasCertifications = /certification|certificate|certified/i.test(text);

  // Calculate scores based on content analysis
  const contactScore = (hasEmail ? 25 : 0) + (hasPhone ? 25 : 0) + (hasLinkedIn ? 25 : 0) + 25;
  const sectionScore = ([hasSummary, hasExperience, hasEducation, hasSkills].filter(Boolean).length / 4) * 100;
  const lengthScore = Math.min(100, Math.max(50, 100 - Math.abs(wordCount - 500) / 10));
  
  const overallScore = Math.round((contactScore * 0.2 + sectionScore * 0.3 + lengthScore * 0.3 + 70 * 0.2));

  // Extract potential skills from text
  const technicalKeywords = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue',
    'Node.js', 'Express', 'Django', 'Flask', 'AWS', 'Azure', 'GCP', 'Docker',
    'Kubernetes', 'Git', 'CI/CD', 'SQL', 'MongoDB', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST API', 'Microservices', 'Agile', 'Scrum', 'TDD', 'Machine Learning',
    'TensorFlow', 'PyTorch', 'Data Analysis', 'Statistics', 'Linux', 'Bash'
  ];

  // Helper function to escape special regex characters
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const foundSkills = technicalKeywords.filter(skill => 
    new RegExp(escapeRegExp(skill), 'i').test(text)
  );

  const softSkills = [
    'Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Critical Thinking',
    'Time Management', 'Adaptability', 'Collaboration', 'Mentoring', 'Presentation'
  ];

  const foundSoftSkills = softSkills.filter(skill => 
    new RegExp(escapeRegExp(skill), 'i').test(text)
  );

  // Check for common grammar issues (simplified)
  const grammarIssues: GrammarMistake[] = [];
  const lines = text.split('\n');
  
  lines.forEach((line) => {
    // Check for passive voice indicators
    if (/\b(was|were|been|being)\s+\w+ed\b/i.test(line)) {
      grammarIssues.push({
        original: line.substring(0, 50) + '...',
        suggestion: 'Use active voice instead of passive voice',
        type: 'voice'
      });
    }
    // Check for weak verbs
    if (/\b(responsible for|helped|worked on|did)\b/i.test(line)) {
      grammarIssues.push({
        original: line.substring(0, 50) + '...',
        suggestion: 'Use stronger action verbs like "Developed", "Led", "Implemented"',
        type: 'verb'
      });
    }
  });

  // Generate job match scores
  const jobMatches: JobMatch[] = [
    { role: 'Software Engineer', percentage: Math.min(95, overallScore + Math.round(Math.random() * 10)) },
    { role: 'Full Stack Developer', percentage: Math.min(90, overallScore + Math.round(Math.random() * 5)) },
    { role: 'Backend Developer', percentage: Math.min(85, overallScore - Math.round(Math.random() * 5)) },
    { role: 'Frontend Developer', percentage: Math.min(88, overallScore - Math.round(Math.random() * 3)) },
    { role: 'AI Engineer', percentage: Math.min(75, overallScore - 15 + Math.round(Math.random() * 10)) },
    { role: 'Machine Learning Engineer', percentage: Math.min(70, overallScore - 20 + Math.round(Math.random() * 10)) },
    { role: 'Data Scientist', percentage: Math.min(72, overallScore - 18 + Math.round(Math.random() * 10)) },
    { role: 'Data Analyst', percentage: Math.min(80, overallScore - 10 + Math.round(Math.random() * 8)) },
    { role: 'DevOps Engineer', percentage: Math.min(78, overallScore - 12 + Math.round(Math.random() * 8)) }
  ].sort((a, b) => b.percentage - a.percentage);

  // Generate improvements
  const improvements: Improvement[] = [];
  
  if (!hasEmail) {
    improvements.push({
      priority: 'high',
      suggestion: 'Add your email address to the contact section',
      category: 'Contact Information'
    });
  }
  if (!hasLinkedIn) {
    improvements.push({
      priority: 'medium',
      suggestion: 'Include your LinkedIn profile URL',
      category: 'Contact Information'
    });
  }
  if (!hasSummary) {
    improvements.push({
      priority: 'high',
      suggestion: 'Add a professional summary highlighting your key qualifications',
      category: 'Professional Summary'
    });
  }
  if (foundSkills.length < 5) {
    improvements.push({
      priority: 'high',
      suggestion: 'Add more technical skills relevant to your target roles',
      category: 'Skills'
    });
  }
  if (!hasProjects) {
    improvements.push({
      priority: 'medium',
      suggestion: 'Include a projects section to showcase your work',
      category: 'Projects'
    });
  }
  if (grammarIssues.length > 3) {
    improvements.push({
      priority: 'high',
      suggestion: 'Review and fix grammar issues, especially passive voice and weak verbs',
      category: 'Grammar'
    });
  }
  if (wordCount < 400) {
    improvements.push({
      priority: 'medium',
      suggestion: 'Expand your resume content to at least 400-600 words',
      category: 'Content'
    });
  }
  if (wordCount > 800) {
    improvements.push({
      priority: 'low',
      suggestion: 'Consider condensing your resume to be more concise',
      category: 'Content'
    });
  }

  // Add default improvements if none found
  if (improvements.length === 0) {
    improvements.push(
      {
        priority: 'low',
        suggestion: 'Consider adding quantifiable achievements to your experience',
        category: 'Experience'
      },
      {
        priority: 'low',
        suggestion: 'Add relevant certifications if you have any',
        category: 'Certifications'
      },
      {
        priority: 'medium',
        suggestion: 'Tailor your resume for specific job applications',
        category: 'Customization'
      }
    );
  }

  return {
    overallScore,
    detailedScores: [
      { name: 'ATS Compatibility', score: Math.min(100, overallScore + 5), icon: <FileCheck className="w-5 h-5" /> },
      { name: 'Resume Quality', score: overallScore, icon: <Star className="w-5 h-5" /> },
      { name: 'Formatting', score: Math.min(100, overallScore + 10), icon: <LayoutTemplate className="w-5 h-5" /> },
      { name: 'Keyword Optimization', score: Math.min(100, foundSkills.length * 8), icon: <Target className="w-5 h-5" /> },
      { name: 'Technical Skills', score: Math.min(100, foundSkills.length * 10), icon: <Brain className="w-5 h-5" /> },
      { name: 'Soft Skills', score: Math.min(100, foundSoftSkills.length * 15), icon: <UserCheck className="w-5 h-5" /> },
      { name: 'Experience Quality', score: hasExperience ? Math.min(100, overallScore + 5) : 30, icon: <Briefcase className="w-5 h-5" /> },
      { name: 'Project Quality', score: hasProjects ? Math.min(100, overallScore) : 40, icon: <Zap className="w-5 h-5" /> },
      { name: 'Education', score: hasEducation ? 85 : 50, icon: <GraduationCap className="w-5 h-5" /> },
      { name: 'Grammar', score: Math.max(60, 100 - grammarIssues.length * 5), icon: <PenTool className="w-5 h-5" /> },
      { name: 'Spelling', score: 95, icon: <BookOpen className="w-5 h-5" /> },
      { name: 'Readability', score: Math.min(100, 70 + Math.floor(wordCount / 50)), icon: <Eye className="w-5 h-5" /> },
      { name: 'Recruiter Impression', score: Math.min(100, overallScore + 8), icon: <Award className="w-5 h-5" /> }
    ],
    sections: [
      {
        name: 'Contact Information',
        status: hasEmail && hasPhone ? 'strong' : 'weak',
        strengths: hasEmail ? ['Email address included'] : [],
        weaknesses: hasEmail ? [] : ['Missing email address'],
        suggestions: hasEmail ? [] : ['Add a professional email address'],
        icon: <UserCheck className="w-5 h-5" />
      },
      {
        name: 'Professional Summary',
        status: hasSummary ? 'strong' : 'weak',
        strengths: hasSummary ? ['Summary section present'] : [],
        weaknesses: hasSummary ? [] : ['No professional summary'],
        suggestions: hasSummary ? ['Consider adding metrics to your summary'] : ['Add a 2-3 sentence professional summary'],
        icon: <FileText className="w-5 h-5" />
      },
      {
        name: 'Skills',
        status: foundSkills.length >= 5 ? 'strong' : foundSkills.length >= 3 ? 'moderate' : 'weak',
        strengths: foundSkills.length > 0 ? [`${foundSkills.length} technical skills identified`] : [],
        weaknesses: foundSkills.length < 5 ? ['Limited technical skills listed'] : [],
        suggestions: ['Add more specific technologies and tools', 'Include proficiency levels'],
        icon: <Brain className="w-5 h-5" />
      },
      {
        name: 'Experience',
        status: hasExperience ? 'moderate' : 'weak',
        strengths: hasExperience ? ['Work experience section present'] : [],
        weaknesses: hasExperience ? [] : ['No work experience section'],
        suggestions: ['Use action verbs to start bullet points', 'Quantify achievements with numbers'],
        icon: <Briefcase className="w-5 h-5" />
      },
      {
        name: 'Projects',
        status: hasProjects ? 'strong' : 'weak',
        strengths: hasProjects ? ['Projects section included'] : [],
        weaknesses: hasProjects ? [] : ['No projects showcased'],
        suggestions: ['Add links to GitHub or live demos', 'Describe your role and technologies used'],
        icon: <Zap className="w-5 h-5" />
      },
      {
        name: 'Education',
        status: hasEducation ? 'strong' : 'weak',
        strengths: hasEducation ? ['Education section present'] : [],
        weaknesses: hasEducation ? [] : ['No education information'],
        suggestions: ['Include GPA if above 3.5', 'Add relevant coursework'],
        icon: <GraduationCap className="w-5 h-5" />
      },
      {
        name: 'Certifications',
        status: hasCertifications ? 'strong' : 'moderate',
        strengths: hasCertifications ? ['Certifications listed'] : [],
        weaknesses: hasCertifications ? [] : ['Consider adding relevant certifications'],
        suggestions: ['Include certification dates and issuing organizations'],
        icon: <Award className="w-5 h-5" />
      },
      {
        name: 'Achievements',
        status: 'moderate',
        strengths: [],
        weaknesses: ['No specific achievements highlighted'],
        suggestions: ['Add awards, recognition, or notable accomplishments'],
        icon: <Star className="w-5 h-5" />
      },
      {
        name: 'Languages',
        status: 'moderate',
        strengths: [],
        weaknesses: ['Language skills not mentioned'],
        suggestions: ['Add languages if you speak multiple'],
        icon: <Languages className="w-5 h-5" />
      }
    ],
    keywordAnalysis: {
      missing: ['Agile', 'Scrum', 'CI/CD', 'Microservices', 'Cloud Architecture'].filter(k => !text.toLowerCase().includes(k.toLowerCase())),
      strong: foundSkills.slice(0, 5),
      weak: foundSkills.slice(5, 8),
      duplicate: [],
      technical: foundSkills,
      ats: ['Software Development', 'Problem Solving', 'Team Collaboration', 'Code Review', 'Documentation']
    },
    skillsAnalysis: {
      present: [
        { category: 'Programming Languages', skills: foundSkills.filter(s => ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'].includes(s)) },
        { category: 'Frameworks & Libraries', skills: foundSkills.filter(s => ['React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask'].includes(s)) },
        { category: 'Cloud & DevOps', skills: foundSkills.filter(s => ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'].includes(s)) },
        { category: 'Databases', skills: foundSkills.filter(s => ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'].includes(s)) }
      ].filter(cat => cat.skills.length > 0),
      missing: ['Terraform', 'GraphQL', 'Redis', 'Elasticsearch', 'Kafka'].filter(s => !foundSkills.includes(s)),
      recommended: ['Docker', 'Kubernetes', 'AWS', 'TypeScript', 'GraphQL']
    },
    grammarAnalysis: {
      mistakes: grammarIssues.slice(0, 10),
      totalIssues: grammarIssues.length
    },
    formattingAnalysis: {
      atsCompatible: true,
      issues: [
        { type: 'Tables', description: 'Avoid using tables for layout', severity: 'low' },
        { type: 'Images', description: 'Minimize use of images and graphics', severity: 'low' }
      ]
    },
    recruiterAnalysis: {
      readability: Math.min(100, 75 + Math.floor(wordCount / 100)),
      firstImpression: Math.min(100, overallScore + 5),
      strongestSection: hasExperience ? 'Experience' : hasSkills ? 'Skills' : 'Education',
      weakestSection: !hasProjects ? 'Projects' : !hasCertifications ? 'Certifications' : 'Achievements',
      resumeLength: wordCount < 400 ? 'too-short' : wordCount > 800 ? 'too-long' : 'optimal',
      resumeFlow: Math.min(100, 80 + Math.floor(Math.random() * 20))
    },
    jobMatch: jobMatches,
    improvements: improvements.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }),
    finalReport: {
      rating: overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : overallScore >= 40 ? 'Fair' : 'Needs Improvement',
      interviewChance: Math.min(95, overallScore + 10),
      shortlistChance: Math.min(90, overallScore + 5),
      topImprovements: improvements.slice(0, 5).map(i => i.suggestion),
      biggestStrengths: [
        foundSkills.length > 5 ? 'Strong technical skill set' : 'Growing technical skills',
        hasExperience ? 'Relevant work experience' : 'Entry-level candidate',
        'Clean and readable format'
      ],
      biggestWeaknesses: [
        ...improvements.filter(i => i.priority === 'high').map(i => i.suggestion)
      ].slice(0, 3),
      finalRecommendation: overallScore >= 80 
        ? 'Your resume is well-optimized for ATS systems. Focus on tailoring it for specific roles.'
        : overallScore >= 60
        ? 'Your resume has a good foundation. Address the high-priority improvements to increase your chances.'
        : 'Your resume needs significant improvements. Start with the high-priority suggestions.'
    }
  };
};

// Circular Score Component
const CircularScore: React.FC<{ score: number; size?: number; label?: string }> = ({ 
  score, 
  size = 200, 
  label = 'ATS Score' 
}) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
          className="dark:stroke-gray-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold"
          style={{ color: getColor(score) }}
        >
          {score}
        </motion.span>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</span>
      </div>
    </div>
  );
};

// Score Card Component
const ScoreCard: React.FC<{ score: DetailedScore; delay?: number }> = ({ score, delay = 0 }) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border border-white/20 dark:border-gray-700/50"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-indigo-600 dark:text-indigo-400">{score.icon}</div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{score.name}</span>
      </div>
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score.score}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
          className={cn('h-full rounded-full', getColor(score.score))}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{score.score}/100</span>
    </motion.div>
  );
};

// Section Analysis Card
const SectionCard: React.FC<{ section: SectionAnalysis; isExpanded: boolean; onToggle: () => void }> = ({
  section,
  isExpanded,
  onToggle
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'moderate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/50"
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-indigo-600 dark:text-indigo-400">{section.icon}</div>
          <span className="font-semibold text-gray-800 dark:text-gray-200">{section.name}</span>
          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(section.status))}>
            {section.status.charAt(0).toUpperCase() + section.status.slice(1)}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4">
              {section.strengths.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Strengths
                  </h4>
                  <ul className="space-y-1">
                    {section.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {section.weaknesses.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Weaknesses
                  </h4>
                  <ul className="space-y-1">
                    {section.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {section.suggestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Suggestions
                  </h4>
                  <ul className="space-y-1">
                    {section.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Job Match Bar
const JobMatchBar: React.FC<{ match: JobMatch; delay?: number }> = ({ match, delay = 0 }) => {
  const getColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-gradient-to-r from-emerald-500 to-emerald-400';
    if (percentage >= 60) return 'bg-gradient-to-r from-amber-500 to-amber-400';
    return 'bg-gradient-to-r from-red-500 to-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="mb-3"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{match.role}</span>
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{match.percentage}%</span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${match.percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.6 }}
          className={cn('h-full rounded-full', getColor(match.percentage))}
        />
      </div>
    </motion.div>
  );
};

// Improvement Card
const ImprovementCard: React.FC<{ improvement: Improvement; delay?: number }> = ({ improvement, delay = 0 }) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/20';
      default: return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      default: return 'Low Priority';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={cn(
        'p-4 rounded-lg border-l-4 mb-3',
        getPriorityStyles(improvement.priority)
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {improvement.category}
          </span>
          <p className="text-gray-800 dark:text-gray-200 mt-1">{improvement.suggestion}</p>
        </div>
        <span className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          improvement.priority === 'high' ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200' :
          improvement.priority === 'medium' ? 'bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200' :
          'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
        )}>
          {getPriorityLabel(improvement.priority)}
        </span>
      </div>
    </motion.div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'keywords' | 'skills' | 'grammar' | 'formatting' | 'jobs' | 'report'>('overview');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const parsePDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          
          // Check if PDF.js is already loaded, if not load it
          const loadPDFjs = (): Promise<any> => {
            return new Promise((resolveLib) => {
              if ((window as any).pdfjsLib) {
                resolveLib((window as any).pdfjsLib);
                return;
              }
              
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
              script.onload = () => {
                setTimeout(() => resolveLib((window as any).pdfjsLib), 200);
              };
              script.onerror = () => {
                reject(new Error('Failed to load PDF library. Please check your internet connection.'));
              };
              document.head.appendChild(script);
            });
          };
          
          loadPDFjs().then((pdfjsLib) => {
            try {
              pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              
              const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
              loadingTask.promise.then((pdf: any) => {
                let text = '';
                const totalPages = pdf.numPages;
                
                const processPage = (pageNum: number) => {
                  if (pageNum > totalPages) {
                    resolve(text.trim());
                    return;
                  }
                  
                  pdf.getPage(pageNum).then((page: any) => {
                    page.getTextContent().then((textContent: any) => {
                      const pageText = textContent.items
                        .map((item: any) => item.str || '')
                        .filter(Boolean)
                        .join(' ');
                      text += pageText + '\n';
                      processPage(pageNum + 1);
                    }).catch(() => {
                      processPage(pageNum + 1);
                    });
                  }).catch(() => {
                    processPage(pageNum + 1);
                  });
                };
                
                processPage(1);
              }).catch(() => {
                reject(new Error('Failed to read PDF. The file may be corrupted or password-protected.'));
              });
            } catch (e: any) {
              reject(new Error('PDF processing error: ' + (e.message || 'Unknown error')));
            }
          }).catch(() => {
            reject(new Error('Failed to load PDF library. Please check your internet connection.'));
          });
        } catch (err: any) {
          reject(new Error('Error reading file: ' + (err.message || 'Unknown error')));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read the PDF file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setIsAnalyzing(true);
        try {
          const text = await parsePDF(droppedFile);
          const result = await analyzeResume(text);
          setAnalysis(result);
        } catch (error: any) {
          console.error('PDF processing error:', error);
          setError(error.message || 'Failed to process PDF. Please try again.');
          setFile(null);
        } finally {
          setIsAnalyzing(false);
        }
      } else {
        setError('Please upload a PDF file only.');
      }
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setIsAnalyzing(true);
        setError(null);
        try {
          const text = await parsePDF(selectedFile);
          const result = await analyzeResume(text);
          setAnalysis(result);
        } catch (error: any) {
          console.error('PDF processing error:', error);
          setError(error.message || 'Failed to process PDF. Please try again.');
          setFile(null);
        } finally {
          setIsAnalyzing(false);
        }
      } else {
        setError('Please upload a PDF file only.');
      }
    }
  }, []);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current || !analysis) return;
    
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('ATS-Resume-Analysis-Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    if (!analysis) return;
    
    const reportText = `
ATS Resume Analysis Report
==========================

Overall Score: ${analysis.overallScore}/100
Rating: ${analysis.finalReport.rating}
Interview Chance: ${analysis.finalReport.interviewChance}%
Shortlist Chance: ${analysis.finalReport.shortlistChance}%

Top Improvements:
${analysis.finalReport.topImprovements.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}

Biggest Strengths:
${analysis.finalReport.biggestStrengths.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

Final Recommendation:
${analysis.finalReport.finalRecommendation}
    `.trim();
    
    try {
      await navigator.clipboard.writeText(reportText);
      alert('Report copied to clipboard!');
    } catch (error) {
      alert('Error copying report.');
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysis(null);
    setExpandedSections({});
    setError(null);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'details', label: 'Details', icon: <FileText className="w-4 h-4" /> },
    { id: 'keywords', label: 'Keywords', icon: <Target className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Brain className="w-4 h-4" /> },
    { id: 'grammar', label: 'Grammar', icon: <PenTool className="w-4 h-4" /> },
    { id: 'formatting', label: 'Formatting', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'jobs', label: 'Job Match', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'report', label: 'Final Report', icon: <Award className="w-4 h-4" /> }
  ];

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-300',
      darkMode 
        ? 'dark bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100'
    )}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">ATS Resume Analyzer</h1>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Created by Tejas C</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {analysis && (
                <button
                  onClick={resetAnalysis}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  New Analysis
                </button>
              )}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!analysis ? (
            /* Upload Section */
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Analyze Your Resume
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload your PDF resume for comprehensive ATS analysis
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-800 dark:text-red-200 font-medium">Error</p>
                    <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-red-600 dark:hover:text-red-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                  'relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer',
                  dragActive
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-400 dark:hover:border-indigo-500'
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto relative">
                      <motion.div
                        className="absolute inset-0 border-4 border-indigo-200 dark:border-indigo-800 rounded-full"
                      />
                      <motion.div
                        className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Analyzing your resume...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                      <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Drop your resume here
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        or click to browse (PDF only)
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <FileText className="w-4 h-4" />
                      <span>Maximum file size: 10MB</span>
                    </div>
                  </div>
                )}
              </div>

              {file && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-between border border-white/20 dark:border-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </motion.div>
              )}

              {/* Features */}
                  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <FileCheck className="w-6 h-6" />, label: 'ATS Score' },
                  { icon: <Target className="w-6 h-6" />, label: 'Keyword Analysis' },
                  { icon: <Brain className="w-6 h-6" />, label: 'Skills Check' },
                  { icon: <PenTool className="w-6 h-6" />, label: 'Grammar Review' }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md text-center border border-white/20 dark:border-gray-700/50"
                  >
                    <div className="text-indigo-600 dark:text-indigo-400 mb-2 flex justify-center">
                      {feature.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Analysis Results */
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={reportRef}
            >
              {/* Tabs */}
              <div className="mb-6 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-white/20 dark:border-gray-700/50'
                      )}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Score Circle */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border border-white/30 dark:border-gray-700/50"
                  >
                    <CircularScore score={analysis.overallScore} size={220} />
                    <div className="mt-6 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {analysis.finalReport.rating}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Interview Chance: {analysis.finalReport.interviewChance}%
                      </p>
                    </div>
                  </motion.div>

                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Stats</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl">
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">ATS Compatibility</p>
                        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                          {analysis.detailedScores.find(s => s.name === 'ATS Compatibility')?.score}%
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Shortlist Chance</p>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                          {analysis.finalReport.shortlistChance}%
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Skills Found</p>
                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                          {analysis.skillsAnalysis.present.reduce((acc, cat) => acc + cat.skills.length, 0)}
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl">
                        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Grammar Issues</p>
                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                          {analysis.grammarAnalysis.totalIssues}
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl">
                        <p className="text-sm text-pink-600 dark:text-pink-400 font-medium">Top Job Match</p>
                        <p className="text-2xl font-bold text-pink-700 dark:text-pink-300">
                          {analysis.jobMatch[0]?.percentage}%
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl">
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Missing Keywords</p>
                        <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                          {analysis.keywordAnalysis.missing.length}
                        </p>
                      </div>
                    </div>

                    {/* Top Improvements Preview */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Top Priority Improvements</h4>
                      {analysis.improvements.filter(i => i.priority === 'high').slice(0, 3).map((improvement, i) => (
                        <ImprovementCard key={i} improvement={improvement} delay={i * 0.1} />
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Detailed Scores */}
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detailed Scores</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {analysis.detailedScores.map((score, i) => (
                        <ScoreCard key={score.name} score={score} delay={i * 0.05} />
                      ))}
                    </div>
                  </div>

                  {/* Sections Analysis */}
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Resume Sections</h3>
                    <div className="space-y-4">
                      {analysis.sections.map((section) => (
                        <SectionCard
                          key={section.name}
                          section={section}
                          isExpanded={expandedSections[section.name] || false}
                          onToggle={() => toggleSection(section.name)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'keywords' && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      Strong Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.strong.map((keyword, i) => (
                        <span key={i} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.missing.map((keyword, i) => (
                        <span key={i} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-indigo-500" />
                      Technical Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.technical.map((keyword, i) => (
                        <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-purple-500" />
                      ATS Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordAnalysis.ats.map((keyword, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Present Skills</h3>
                    <div className="space-y-4">
                      {analysis.skillsAnalysis.present.map((category, i) => (
                        <div key={i}>
                          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{category.category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, j) => (
                              <span key={j} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      {analysis.skillsAnalysis.present.length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400">No skills detected. Add more technical skills to your resume.</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Missing Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.skillsAnalysis.missing.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        Recommended Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.skillsAnalysis.recommended.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'grammar' && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Grammar & Spelling Analysis</h3>
                  {analysis.grammarAnalysis.mistakes.length > 0 ? (
                    <div className="space-y-4">
                      {analysis.grammarAnalysis.mistakes.map((mistake, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase">
                                {mistake.type}
                              </span>
                              <p className="text-gray-800 dark:text-gray-200 mt-1">
                                <span className="line-through text-red-500">{mistake.original}</span>
                              </p>
                              <p className="text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                {mistake.suggestion}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">No grammar issues found!</p>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">Your resume is grammatically correct.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'formatting' && (
                <div className="space-y-6">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Formatting Analysis</h3>
                    <div className={cn(
                      'p-4 rounded-xl mb-6',
                      analysis.formattingAnalysis.atsCompatible
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    )}>
                      <div className="flex items-center gap-3">
                        {analysis.formattingAnalysis.atsCompatible ? (
                          <CheckCircle className="w-8 h-8 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-8 h-8 text-red-500" />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {analysis.formattingAnalysis.atsCompatible ? 'ATS Compatible' : 'ATS Issues Detected'}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {analysis.formattingAnalysis.atsCompatible
                              ? 'Your resume formatting is compatible with most ATS systems.'
                              : 'Your resume has formatting issues that may cause problems with ATS systems.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {analysis.formattingAnalysis.issues.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Formatting Issues</h4>
                        <div className="space-y-3">
                          {analysis.formattingAnalysis.issues.map((issue, i) => (
                            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-start gap-3">
                              <AlertCircle className={cn(
                                'w-5 h-5 flex-shrink-0 mt-0.5',
                                issue.severity === 'high' ? 'text-red-500' :
                                issue.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
                              )} />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{issue.type}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{issue.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recruiter Analysis */}
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <UserCheck className="w-6 h-6 text-indigo-500" />
                      Recruiter Analysis
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Readability</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.recruiterAnalysis.readability}%</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400">First Impression</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.recruiterAnalysis.firstImpression}%</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Resume Flow</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.recruiterAnalysis.resumeFlow}%</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Resume Length</p>
                        <p className={cn(
                          'text-lg font-bold',
                          analysis.recruiterAnalysis.resumeLength === 'optimal' ? 'text-emerald-600' :
                          analysis.recruiterAnalysis.resumeLength === 'too-short' ? 'text-amber-600' : 'text-red-600'
                        )}>
                          {analysis.recruiterAnalysis.resumeLength === 'optimal' ? 'Optimal' :
                           analysis.recruiterAnalysis.resumeLength === 'too-short' ? 'Too Short' : 'Too Long'}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl sm:col-span-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Strongest Section</p>
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{analysis.recruiterAnalysis.strongestSection}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Job Match Analysis</h3>
                    {analysis.jobMatch.map((match, i) => (
                      <JobMatchBar key={match.role} match={match} delay={i * 0.1} />
                    ))}
                  </div>

                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Match Distribution</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analysis.jobMatch.slice(0, 6)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="role" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="percentage" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="space-y-6">
                  {/* Final Report Summary */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">Final Analysis Report</h2>
                        <p className="text-indigo-200 mt-1">Comprehensive resume evaluation</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleDownloadPDF}
                          className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handlePrint}
                          className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                          title="Print Report"
                        >
                          <Printer className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleCopy}
                          className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                          title="Copy Report"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-indigo-200 text-sm">Overall Rating</p>
                        <p className="text-3xl font-bold">{analysis.finalReport.rating}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-indigo-200 text-sm">Interview Chance</p>
                        <p className="text-3xl font-bold">{analysis.finalReport.interviewChance}%</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-indigo-200 text-sm">Shortlist Chance</p>
                        <p className="text-3xl font-bold">{analysis.finalReport.shortlistChance}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-amber-500" />
                      Biggest Strengths
                    </h3>
                    <div className="space-y-2">
                      {analysis.finalReport.biggestStrengths.map((strength, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-800 dark:text-gray-200">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  {analysis.finalReport.biggestWeaknesses.length > 0 && (
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        Biggest Weaknesses
                      </h3>
                      <div className="space-y-2">
                        {analysis.finalReport.biggestWeaknesses.map((weakness, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <span className="text-gray-800 dark:text-gray-200">{weakness}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Improvements */}
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-indigo-500" />
                      All Improvement Suggestions
                    </h3>
                    <div className="space-y-2">
                      {analysis.improvements.map((improvement, i) => (
                        <ImprovementCard key={i} improvement={improvement} delay={i * 0.05} />
                      ))}
                    </div>
                  </div>

                  {/* Final Recommendation */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl shadow-xl p-6 border border-indigo-200 dark:border-indigo-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-indigo-500" />
                      Final Recommendation
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      {analysis.finalReport.finalRecommendation}
                    </p>
                  </div>
                </div>
              )}

              {/* Export Actions */}
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-6 right-6 flex gap-3 z-40"
                >
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <Printer className="w-5 h-5" />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Created by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Tejas C</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

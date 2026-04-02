import React from 'react';

export function Minimal({ data }) {
  const { personal, objective, experience, education, skills, projects, certificates } = data;
  return (
    <div className="bg-white rounded shadow-sm w-full min-h-[500px] overflow-hidden flex flex-col font-serif text-gray-800 p-8">
      <div className="text-center border-b pb-6 mb-6">
        <h1 className="text-3xl font-light tracking-wide mb-2 uppercase">{personal.firstName} {personal.lastName}</h1>
        <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">{personal.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-4 text-[10px] text-gray-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
        </div>
        {objective && (
          <p className="text-xs text-gray-600 mt-6 max-w-lg mx-auto italic">"{objective}"</p>
        )}
      </div>

      {experience?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-gray-400 border-b pb-2">Experience</h4>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <div className="font-bold text-sm tracking-wide">{exp.title}</div>
                <div className="text-[10px] text-gray-400">{exp.startDate} — {exp.endDate}</div>
              </div>
              <div className="text-xs text-gray-600 italic mb-2">{exp.company}</div>
              {exp.description && (
                <div className="text-[10px] text-gray-700 leading-relaxed">
                  {exp.description.split('\n').filter(Boolean).map((line, i) => (
                    <p key={i} className="mb-1">• {line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {projects?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-gray-400 border-b pb-2">Projects</h4>
          {projects.map(proj => (
            <div key={proj.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <div className="font-bold text-sm tracking-wide">{proj.name}</div>
                {proj.link && <div className="text-[10px] text-blue-500">{proj.link}</div>}
              </div>
              {proj.description && (
                <div className="text-[10px] text-gray-700 leading-relaxed">{proj.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {skills?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-gray-400 border-b pb-2">Skills</h4>
          <div className="flex flex-wrap gap-2 text-[10px]">
            {skills.map(s => <span key={s.id} className="bg-gray-50 px-2 py-1 border border-gray-200 rounded text-gray-600 uppercase tracking-widest">{s.name}</span>)}
          </div>
        </div>
      )}
      
      {education?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-gray-400 border-b pb-2">Education</h4>
          {education.map(edu => (
            <div key={edu.id} className="mb-2 text-[10px]">
              <div className="flex justify-between mb-1"><span className="font-bold tracking-wider">{edu.degree}</span><span className="text-gray-500">{edu.date}</span></div>
              <div className="text-gray-600 italic">{edu.school}</div>
            </div>
          ))}
        </div>
      )}

      {certificates?.length > 0 && (
        <div>
          <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-gray-400 border-b pb-2">Certifications</h4>
          {certificates.map(cert => (
            <div key={cert.id} className="mb-2 text-[10px]">
              <div className="flex justify-between mb-1"><span className="font-bold tracking-wider">{cert.name}</span><span className="text-gray-500">{cert.date}</span></div>
              <div className="text-gray-600 italic">{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

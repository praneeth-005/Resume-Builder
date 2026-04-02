import React from 'react';

export function Creative({ data }) {
  const { personal, objective, experience, education, skills, projects, certificates } = data;
  return (
    <div className="bg-white rounded shadow-sm w-full min-h-[500px] overflow-hidden flex font-sans text-gray-800">
      <div className="w-1/3 bg-[#0a2540] text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-1 leading-tight">{personal.firstName}<br/><span className="text-blue-400">{personal.lastName}</span></h1>
        <p className="text-[10px] uppercase tracking-widest text-[#8ea8c3] mb-8 font-bold">{personal.jobTitle}</p>
        
        <div className="flex flex-col gap-3 text-[10px] text-gray-300 tracking-wide mb-8">
          {personal.email && <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>{personal.email}</span>}
          {personal.location && <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>{personal.location}</span>}
          {personal.linkedin && <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>{personal.linkedin}</span>}
        </div>

        {skills?.length > 0 && (
          <div className="mb-8">
            <h4 className="font-bold text-white mb-4 tracking-wider text-[10px] border-b border-white/20 pb-2">SKILLS</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <div key={skill.id} className="text-[10px] bg-white/10 text-blue-100 px-2 py-1 rounded-sm border border-white/10 font-medium">{skill.name}</div>
              ))}
            </div>
          </div>
        )}
        
        {education?.length > 0 && (
          <div className="mb-8">
            <h4 className="font-bold text-white mb-4 tracking-wider text-[10px] border-b border-white/20 pb-2">EDUCATION</h4>
            <div className="flex flex-col gap-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="font-bold text-[10px] text-white tracking-wide">{edu.degree}</div>
                  <div className="text-[#8ea8c3] text-[9px] mb-1">{edu.school}</div>
                  <div className="text-blue-400 text-[9px] font-bold bg-blue-900/30 inline-block px-1.5 py-0.5 rounded">{edu.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certificates?.length > 0 && (
          <div>
            <h4 className="font-bold text-white mb-4 tracking-wider text-[10px] border-b border-white/20 pb-2">CERTIFICATES</h4>
            <div className="flex flex-col gap-3">
              {certificates.map(cert => (
                <div key={cert.id}>
                  <div className="font-bold text-[10px] text-white tracking-wide">{cert.name}</div>
                  <div className="text-[#8ea8c3] text-[9px] mb-0.5">{cert.issuer}</div>
                  <div className="text-gray-400 text-[9px]">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3 p-6 bg-[#f8f9fa] flex flex-col gap-6">
        {objective && (
           <div className="bg-white p-4 rounded border-l-2 border-blue-500 shadow-sm text-[11px] text-gray-700 italic leading-relaxed">
             "{objective}"
           </div>
        )}

        {experience?.length > 0 && (
          <div>
            <h4 className="font-bold text-[#0a2540] mb-4 tracking-widest text-xs border-b-2 border-blue-200 pb-2">EXPERIENCE</h4>
            {experience.map(exp => (
              <div key={exp.id} className="mb-6 relative">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-sm text-[#0a2540]">{exp.title}</div>
                  <div className="text-blue-600 text-[9px] font-bold bg-blue-100 px-2 py-1 rounded-full">{exp.startDate} – {exp.endDate}</div>
                </div>
                <div className="text-gray-500 text-xs mb-3 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  {exp.company}
                </div>
                {exp.description && (
                  <div className="text-[10px] text-gray-600 leading-relaxed">
                    {exp.description.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="mb-1">— {line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {projects?.length > 0 && (
          <div>
            <h4 className="font-bold text-[#0a2540] mb-4 tracking-widest text-xs border-b-2 border-blue-200 pb-2">PROJECTS</h4>
            {projects.map(proj => (
              <div key={proj.id} className="mb-4 relative">
                <div className="font-bold text-sm text-[#0a2540] mb-1">{proj.name}</div>
                {proj.link && <a href={`https://${proj.link}`} className="text-blue-500 text-[10px] block mb-2 font-medium">{proj.link}</a>}
                {proj.description && (
                  <div className="text-[10px] text-gray-600 leading-relaxed bg-blue-50/50 p-2 rounded border border-blue-50">
                    {proj.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

import React from 'react';

export function Executive({ data }) {
  const { personal, objective, experience, education, skills, projects, certificates, languages } = data;
  
  return (
    <div className="bg-white rounded shadow-sm w-full min-h-[500px] overflow-hidden flex flex-col font-sans">
      <div className="bg-[#1a1625] text-white p-6">
        <h1 className="text-2xl font-bold mb-1">{personal.firstName} {personal.lastName}</h1>
        <p className="text-sm text-gray-300 mb-4">{personal.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-[10px] text-gray-400 mb-4">
          {personal.email && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> {personal.email}</span>}
          {personal.location && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> {personal.location}</span>}
          {personal.linkedin && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> {personal.linkedin}</span>}
        </div>
        {objective && (
          <p className="text-xs text-gray-300 leading-relaxed border-t border-gray-700 pt-4">{objective}</p>
        )}
      </div>

      <div className="flex flex-1 text-xs">
        <div className="w-1/3 border-r p-4 bg-gray-50 flex flex-col gap-6">
          {skills?.length > 0 && (
            <div>
              <h4 className="font-bold text-red-500 mb-3 tracking-widest text-[10px]">SKILLS</h4>
              <div className="flex flex-wrap gap-2 text-[10px]">
                {skills.map(skill => (
                  <div key={skill.id} className="bg-white border text-gray-700 px-2 py-1 rounded">{skill.name}</div>
                ))}
              </div>
            </div>
          )}

          {education?.length > 0 && (
            <div>
              <h4 className="font-bold text-red-500 mb-3 tracking-widest text-[10px]">EDUCATION</h4>
              <div className="flex flex-col gap-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold">{edu.degree}</div>
                    <div className="text-gray-500 text-[10px] leading-tight">{edu.school}</div>
                    <div className="text-gray-400 text-[9px]">{edu.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {certificates?.length > 0 && (
             <div>
               <h4 className="font-bold text-red-500 mb-3 tracking-widest text-[10px]">CERTIFICATES</h4>
               <div className="flex flex-col gap-3">
                 {certificates.map(cert => (
                   <div key={cert.id}>
                     <div className="font-bold text-[10px] leading-tight">{cert.name}</div>
                     <div className="text-gray-500 text-[9px]">{cert.issuer} {cert.date ? `(${cert.date})` : ''}</div>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {languages?.length > 0 && (
            <div>
              <h4 className="font-bold text-red-500 mb-3 tracking-widest text-[10px]">LANGUAGES</h4>
              <div className="flex flex-col gap-2 text-[10px]">
                {languages.map(lang => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span><span className="text-gray-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-2/3 p-4 flex flex-col gap-6">
          {experience?.length > 0 && (
            <div>
              <h4 className="font-bold text-red-500 mb-3 tracking-widest text-[10px]">EXPERIENCE</h4>
              {experience.map(exp => (
                <div key={exp.id} className="mb-4 relative border-l-2 border-red-100 pl-4 py-1">
                  <div className="absolute w-2 h-2 bg-red-500 rounded-full -left-[5px] top-2"></div>
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold leading-tight">{exp.title}</div>
                    <div className="text-gray-400 text-[9px] text-right whitespace-nowrap ml-2">{exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}</div>
                  </div>
                  <div className="text-gray-500 text-[10px] mb-1.5">{exp.company}</div>
                  {exp.description && (
                    <ul className="list-disc ml-3 text-gray-600 text-[10px] flex flex-col gap-1 leading-relaxed">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {projects?.length > 0 && (
            <div>
              <h4 className="font-bold text-red-500 mb-3 tracking-widest text-[10px]">PROJECTS</h4>
              {projects.map(proj => (
                <div key={proj.id} className="mb-4 relative border-l-2 border-red-100 pl-4 py-1">
                  <div className="absolute w-2 h-2 bg-red-500 rounded-full -left-[5px] top-2"></div>
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold leading-tight">{proj.name}</div>
                  </div>
                  {proj.link && <div className="text-blue-500 text-[9px] mb-1">{proj.link}</div>}
                  {proj.description && (
                    <div className="text-gray-600 text-[10px] leading-relaxed">
                      {proj.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

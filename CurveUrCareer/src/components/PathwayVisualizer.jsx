import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, TrendingUp, Award, CheckCircle2, Star, Target } from 'lucide-react';

const PathwayVisualizer = ({ careerPath }) => {
  if (!careerPath) return null;

  const roadmapStages = [
    {
      type: 'preparation',
      title: careerPath.preparation.step,
      icon: <Target className="w-6 h-6 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200',
      iconBg: 'bg-orange-100',
      content: (
        <ul className="space-y-2 mt-2">
          {careerPath.preparation.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
              {task}
            </li>
          ))}
        </ul>
      )
    },
    {
      type: 'education',
      title: careerPath.education.step,
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200',
      iconBg: 'bg-blue-100',
      content: (
        <div className="mt-2">
          <p className="font-bold text-slate-800">{careerPath.education.degree}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {careerPath.education.focus.map((f, i) => (
              <span key={i} className="px-2 py-1 bg-white border border-blue-100 rounded text-xs text-blue-600 font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>
      )
    },
    ...careerPath.progression.map((stage, index) => ({
      type: 'career',
      title: stage.level,
      icon: index === 0 ? <Briefcase className="w-6 h-6 text-green-500" /> : index === 3 ? <Star className="w-6 h-6 text-purple-500" /> : <TrendingUp className="w-6 h-6 text-indigo-500" />,
      color: 'bg-white border-slate-100',
      iconBg: 'bg-slate-50',
      content: (
        <div className="mt-2 space-y-2">
          <div className="flex flex-wrap gap-1">
            {stage.roles.map((role, i) => (
              <span key={i} className="text-sm font-semibold text-slate-700">
                {role}{i < stage.roles.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
            <span className="text-xs font-bold text-green-600">Est. Salary: {stage.salary}</span>
            <div className="flex gap-1">
              {stage.skills.slice(0, 2).map((s, i) => (
                <span key={i} className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    }))
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Success Roadmap</h2>
        <p className="text-slate-500">Your personalized path from Class 12 to Industry Leadership</p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-orange-400 via-blue-400 to-purple-400 opacity-20 hidden md:block" />

        <div className="space-y-12">
          {roadmapStages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Desktop Connector Dot */}
              <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full transform -translate-x-[11px] z-10 hidden md:block" />

              {/* Card Container */}
              <div className="flex-1 ml-12 md:ml-0">
                <div className={`glass-card p-6 border-l-4 ${stage.color} hover:shadow-lg transition-all`}>
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`w-12 h-12 ${stage.iconBg} rounded-xl flex items-center justify-center`}>
                      {stage.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step {index + 1}</span>
                      <h3 className="text-lg font-bold text-slate-800">{stage.title}</h3>
                    </div>
                  </div>
                  {stage.content}
                </div>
              </div>

              {/* Spacer for desktop layout */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>

        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Award className="w-32 h-32 rotate-12" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Your Career Peak</h3>
          <p className="text-blue-50 max-w-md mx-auto">
            Following this roadmap consistently can lead to leadership roles with an estimated salary of 40-50+ LPA.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PathwayVisualizer;


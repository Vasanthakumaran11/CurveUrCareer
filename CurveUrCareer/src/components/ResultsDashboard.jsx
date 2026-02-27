// Results Dashboard Component
import { useState } from 'react';
import { useFormData } from '../hooks/useFormData.jsx';
import { useRecommendations } from '../hooks/useRecommendations.jsx';
import RecommendationCard from './RecommendationCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Download, TrendingUp, Award, Building2, Map, Brain } from 'lucide-react';
import { downloadPDFReport } from '../utils/pdfGenerator';
import PathwayVisualizer from './PathwayVisualizer';
import MarketAnalysisCard from './MarketAnalysisCard';

const ResultsDashboard = () => {
  const { formData } = useFormData();
  const {
    topRecommendations,
    alternativeRecommendations,
    collegeRecommendations,
    interestProfile,
    skillsProfile,
    analysisSummary,
    loading,
    getCareerPathForCourse
  } = useRecommendations(formData);

  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your profile...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'courses', label: 'Courses', icon: Award },
    { id: 'colleges', label: 'Colleges', icon: Building2 },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'market', label: 'Market Insights', icon: TrendingUp }
  ];

  // Prepare chart data
  const interestChartData = interestProfile ? Object.entries(interestProfile).map(([key, value]) => ({
    category: key.charAt(0).toUpperCase() + key.slice(1),
    value
  })) : [];

  const skillsChartData = formData.assessmentResults?.isCompleted 
    ? Object.entries(formData.assessmentResults.skillProfile).map(([key, value]) => ({
        skill: key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase()),
        level: value
      }))
    : (skillsProfile ? Object.entries(skillsProfile).map(([key, value]) => ({
        skill: key.charAt(0).toUpperCase() + key.slice(1),
        level: value
      })) : []);

  const handleDownloadReport = () => {
    downloadPDFReport(formData, topRecommendations, analysisSummary);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Career Guidance Report</h1>
            <p className="text-gray-600">
              Based on your profile, we found {topRecommendations.length} recommended courses
            </p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        {/* Student Summary */}
        {analysisSummary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Stream</div>
              <div className="text-2xl font-bold text-blue-900">{analysisSummary.studentProfile.stream}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Percentage</div>
              <div className="text-2xl font-bold text-green-900">{analysisSummary.studentProfile.percentage}%</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">Pref. College</div>
              <div className="text-xl font-bold text-purple-900">{formData.constraints.collegePreference || 'Either'}</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-indigo-600 font-medium">Eligible Courses</div>
              <div className="text-2xl font-bold text-indigo-900">{analysisSummary.totalEligibleCourses}</div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interest Profile */}
            {interestChartData.length > 0 && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Interest Profile</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={interestChartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Interest" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Skills Profile */}
            {skillsChartData.length > 0 && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Skills Assessment</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="level" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* New Assessment Insights - Roadmap V1 */}
          {formData.assessmentResults?.isCompleted && (
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-8 bg-gradient-to-br from-blue-950 to-slate-900 border-blue-500/20 text-white shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Your Core Pattern</h3>
                    <p className="text-blue-400/60 text-xs font-bold uppercase tracking-widest">Psychometric Clarity Insight</p>
                  </div>
                </div>
                
                <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed mb-8 italic">
                  "{formData.assessmentResults.insight}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formData.assessmentResults.topTags.map((tagObj) => (
                    <div key={tagObj.tag} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                      <span className="font-bold text-white/80">{tagObj.tag}</span>
                      <span className="text-xs font-black bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md">{tagObj.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3 Direction Clusters */}
                <div className="glass-card rounded-xl p-8 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" /> Potential Growth Clusters
                  </h3>
                  <div className="space-y-4">
                    {formData.assessmentResults.clusters.map((cluster, idx) => (
                      <div key={idx} className={`p-5 rounded-2xl border ${cluster.isPrimary ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-black uppercase tracking-tight ${cluster.isPrimary ? 'text-blue-900' : 'text-slate-700'}`}>{cluster.id}. {cluster.environments}</span>
                          {cluster.matchStrength > 0 && (
                             <span className="text-[10px] font-black bg-white/50 px-2 py-0.5 rounded border border-black/5">
                               {Math.round(cluster.matchStrength * 100)}% Match
                             </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {cluster.domains.map(domain => (
                            <span key={domain} className="text-[10px] font-bold bg-white px-2 py-1 rounded shadow-sm text-slate-500">
                              {domain}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {cluster.reasoning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7-Day Exploration Plan */}
                <div className="glass-card rounded-xl p-8 border-slate-200 bg-slate-50/50">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Map className="w-5 h-5 text-emerald-600" /> 7-Day Exploration Plan
                  </h3>
                  <div className="space-y-3">
                    {formData.assessmentResults.explorationPlan.map((step) => (
                      <div key={step.day} className="flex gap-4 p-3 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:translate-x-1">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0">
                          D{step.day}
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed self-center">
                          {step.task}
                        </p>
                      </div>
                    ))}
                    <div className="mt-6 p-4 bg-emerald-600 text-white rounded-xl text-center shadow-lg shadow-emerald-600/20">
                       <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Final Outcome</p>
                       <p className="text-xs font-bold font-italic">"This is direction, not destiny."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Recommendation */}
          {topRecommendations.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top Recommendation</h3>
              <RecommendationCard recommendation={topRecommendations[0]} rank={1} />
            </div>
          )}
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Top Recommendations */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Courses</h3>
            <div className="space-y-4">
              {topRecommendations.map((rec, index) => (
                <RecommendationCard key={rec.course.id} recommendation={rec} rank={index + 1} />
              ))}
            </div>
          </div>

          {/* Alternative Recommendations */}
          {alternativeRecommendations.planB.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Plan B Options</h3>
              <div className="space-y-4">
                {alternativeRecommendations.planB.map((rec, index) => (
                  <RecommendationCard key={rec.course.id} recommendation={rec} rank={index + 6} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'colleges' && (
        <div className="space-y-6">
          {/* Government College High Recommendation */}
          {formData.academic?.stream === 'Science' && 
           formData.academic?.subjects.includes('Computer Science') && 
           (formData.constraints?.familyFinancialRange === 'Low' || formData.constraints?.familyFinancialRange === 'Medium') && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900">Highly Recommended: Government Engineering Colleges</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Based on your excellent 12th score and financial background, we strongly recommend prioritizing 
                  <strong> IITs, NITs, and IIITs</strong>. These institutions provide world-class education with 
                  minimal fees and extraordinary placement opportunities.
                </p>
              </div>
            </div>
          )}

          {/* Dream Colleges */}
          {collegeRecommendations.dream.length > 0 && (
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Dream Colleges (Tier 1)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collegeRecommendations.dream.map(college => (
                  <div key={college.id} className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                    <h4 className="font-bold text-gray-900">{college.name}</h4>
                    <p className="text-sm text-gray-600">{college.location}</p>
                    <p className="text-xs text-gray-500 mt-2">{college.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Realistic Colleges */}
          {collegeRecommendations.realistic.length > 0 && (
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Realistic Colleges (Tier 2)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collegeRecommendations.realistic.map(college => (
                  <div key={college.id} className="p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50">
                    <h4 className="font-bold text-gray-900">{college.name}</h4>
                    <p className="text-sm text-gray-600">{college.location}</p>
                    <p className="text-xs text-gray-500 mt-2">{college.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safe Colleges */}
          {collegeRecommendations.safe.length > 0 && (
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🛡️ Safe Colleges (Tier 3)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collegeRecommendations.safe.map(college => (
                  <div key={college.id} className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                    <h4 className="font-bold text-gray-900">{college.name}</h4>
                    <p className="text-sm text-gray-600">{college.location}</p>
                    <p className="text-xs text-gray-500 mt-2">{college.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          {topRecommendations.length > 0 && (
            <PathwayVisualizer 
              careerPath={getCareerPathForCourse(topRecommendations[0].course.name)} 
              studentProfile={formData.academic}
            />
          )}
        </div>
      )}

      {activeTab === 'market' && (
        <div className="space-y-6">
          {topRecommendations.length > 0 && (
            <MarketAnalysisCard 
              careerName={getCareerPathForCourse(topRecommendations[0].course.name)?.name || topRecommendations[0].course.name} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsDashboard;

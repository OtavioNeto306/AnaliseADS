
import React from 'react';
import type { Metric } from '../types';
import Accordion from './Accordion';

interface ScoreMetricProps {
  metric: Metric;
}

const ScoreMetric: React.FC<ScoreMetricProps> = ({ metric }) => {
  const getScoreColorClasses = (score: number) => {
    if (score < 5) return 'text-red-600 bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-red-100';
    if (score < 8) return 'text-yellow-600 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-yellow-100';
    return 'text-green-600 bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-green-100';
  };

  const getScoreIcon = (score: number) => {
    if (score < 5) return '⚠️';
    if (score < 8) return '⚡';
    return '🎯';
  };

  const colorClasses = getScoreColorClasses(metric.score);
  const scoreIcon = getScoreIcon(metric.score);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700 text-base font-bold">{metric.name}</p>
        <span className="text-xl">{scoreIcon}</span>
      </div>
      <div className={`inline-flex items-center px-6 py-3 rounded-xl border-2 ${colorClasses} shadow-lg`}>
        <span className="font-black text-4xl">{metric.score}</span>
        <span className="text-lg font-bold ml-1 opacity-70">/10</span>
      </div>
      <div className="mt-6 space-y-3">
         <Accordion title="📊 Diagnóstico" smallText={true}>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-gray-700 text-sm leading-relaxed">{metric.diagnostic}</p>
            </div>
         </Accordion>
         <Accordion title="🚀 Como Melhorar" smallText={true}>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-gray-700 text-sm leading-relaxed">{metric.improvement}</p>
            </div>
         </Accordion>
      </div>
    </div>
  );
};

export default ScoreMetric;

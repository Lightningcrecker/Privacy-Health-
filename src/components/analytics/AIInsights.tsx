import React, { useState } from 'react';
import { Brain, MessageSquare, Sparkles } from 'lucide-react';
import { useHealthAnalytics } from '../../hooks/useHealthAnalytics';

export const AIInsights: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const { analyzeUserInput, isInitialized } = useHealthAnalytics();

  const handleAnalyze = async () => {
    if (!userInput.trim()) return;
    
    const results = analyzeUserInput(userInput);
    setAnalysis(results);
  };

  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
      <div className="flex items-center mb-6">
        <Brain className="h-6 w-6 text-blue-400 mr-2" />
        <h3 className="text-xl font-semibold text-white">AI Health Insights</h3>
      </div>

      <div className="mb-6">
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Describe how you're feeling or any health concerns..."
            className="w-full pl-10 pr-4 py-2 h-32 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={!isInitialized || !userInput.trim()}
          className="mt-2 flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Analyze
        </button>
      </div>

      {analysis && (
        <div className="space-y-4">
          {/* Sentiment Analysis */}
          <div className="p-4 rounded-lg bg-white/5">
            <h4 className="text-lg font-medium text-white mb-2">Emotional State</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                {analysis.sentiment.sentiment === 'positive' ? '😊' : '😔'}{' '}
                {analysis.sentiment.sentiment.charAt(0).toUpperCase() + analysis.sentiment.sentiment.slice(1)}
              </span>
              <span className="text-blue-400">{analysis.sentiment.confidence.toFixed(1)}% confidence</span>
            </div>
          </div>

          {/* Health Insights */}
          <div className="p-4 rounded-lg bg-white/5">
            <h4 className="text-lg font-medium text-white mb-2">Health Insights</h4>
            <ul className="space-y-2">
              {analysis.insights.insights.map((insight: string, index: number) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="mr-2">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="p-4 rounded-lg bg-white/5">
            <h4 className="text-lg font-medium text-white mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {analysis.insights.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="mr-2">→</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {analysis.insights.riskFactors.length > 0 && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h4 className="text-lg font-medium text-white mb-2">Risk Factors</h4>
              <ul className="space-y-2">
                {analysis.insights.riskFactors.map((risk: string, index: number) => (
                  <li key={index} className="text-red-200 flex items-start">
                    <span className="mr-2">⚠️</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
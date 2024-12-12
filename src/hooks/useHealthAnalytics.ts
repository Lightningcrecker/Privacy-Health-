import { useState, useEffect } from 'react';
import { HealthPredictor } from '../services/ml/HealthPredictor';
import { HealthNLP } from '../services/nlp/HealthNLP';

export const useHealthAnalytics = () => {
  const [predictor] = useState(() => new HealthPredictor());
  const [nlp] = useState(() => new HealthNLP());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([
        predictor.initialize(),
        nlp.initialize()
      ]);
      setIsInitialized(true);
    };

    initialize();
  }, [predictor, nlp]);

  const analyzeHealthData = async (metrics: number[]) => {
    if (!isInitialized) throw new Error('Analytics not initialized');

    const healthScore = await predictor.predictHealthScore(metrics);
    const historicalData = [
      // Sample historical data structure
      [...metrics, healthScore],
      // Add more historical data points
    ];

    const trends = await predictor.analyzeTrends(historicalData);

    return {
      healthScore,
      trends
    };
  };

  const analyzeUserInput = (input: string) => {
    if (!isInitialized) throw new Error('Analytics not initialized');

    const sentiment = nlp.analyzeSentiment(input);
    const symptoms = nlp.classifySymptoms(input);
    const insights = nlp.generateHealthInsights(input);

    return {
      sentiment,
      symptoms,
      insights
    };
  };

  return {
    isInitialized,
    analyzeHealthData,
    analyzeUserInput
  };
};
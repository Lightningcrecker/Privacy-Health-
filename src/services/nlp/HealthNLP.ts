export class HealthNLP {
  private readonly sentimentPatterns = {
    positive: [
      'energetic', 'well-rested', 'great', 'better', 'good', 'happy',
      'improving', 'strong', 'focused', 'relaxed'
    ],
    negative: [
      'tired', 'fatigue', 'pain', 'weak', 'stressed', 'anxious',
      'worried', 'difficulty', 'trouble', 'poor'
    ]
  };

  private readonly symptomPatterns = {
    neurological: ['headache', 'dizziness', 'migraine', 'confusion'],
    cardiovascular: ['chest pain', 'palpitations', 'shortness of breath'],
    musculoskeletal: ['muscle', 'joint', 'back pain', 'stiffness'],
    psychological: ['anxiety', 'stress', 'depression', 'mood']
  };

  async initialize(): Promise<void> {
    // Browser-compatible initialization
    return Promise.resolve();
  }

  analyzeSentiment(text: string): {
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
  } {
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach(word => {
      if (this.sentimentPatterns.positive.some(pattern => word.includes(pattern))) {
        positiveCount++;
      }
      if (this.sentimentPatterns.negative.some(pattern => word.includes(pattern))) {
        negativeCount++;
      }
    });

    const total = positiveCount + negativeCount;
    if (total === 0) return { sentiment: 'neutral', confidence: 100 };

    const sentiment = positiveCount > negativeCount ? 'positive' : 
                     negativeCount > positiveCount ? 'negative' : 'neutral';
    
    const confidence = Math.round((Math.max(positiveCount, negativeCount) / total) * 100);

    return { sentiment, confidence };
  }

  classifySymptoms(description: string): {
    category: string;
    confidence: number;
    relatedSymptoms: string[];
  } {
    const text = description.toLowerCase();
    const matches = new Map<string, number>();
    const foundSymptoms: string[] = [];

    Object.entries(this.symptomPatterns).forEach(([category, patterns]) => {
      let categoryMatches = 0;
      patterns.forEach(pattern => {
        if (text.includes(pattern)) {
          categoryMatches++;
          foundSymptoms.push(pattern);
        }
      });
      matches.set(category, categoryMatches);
    });

    let maxCategory = 'unknown';
    let maxMatches = 0;

    matches.forEach((count, category) => {
      if (count > maxMatches) {
        maxMatches = count;
        maxCategory = category;
      }
    });

    const totalPatterns = this.symptomPatterns[maxCategory as keyof typeof this.symptomPatterns]?.length || 1;
    const confidence = Math.round((maxMatches / totalPatterns) * 100);

    return {
      category: maxCategory,
      confidence,
      relatedSymptoms: foundSymptoms.slice(0, 5)
    };
  }

  generateHealthInsights(userInput: string): {
    insights: string[];
    recommendations: string[];
    riskFactors: string[];
  } {
    const sentiment = this.analyzeSentiment(userInput);
    const symptoms = this.classifySymptoms(userInput);
    const insights: string[] = [];
    const recommendations: string[] = [];
    const riskFactors: string[] = [];

    // Generate insights based on sentiment
    if (sentiment.confidence > 70) {
      insights.push(`Your overall health sentiment appears ${sentiment.sentiment}`);
    }

    // Generate category-specific recommendations
    switch (symptoms.category) {
      case 'cardiovascular':
        recommendations.push('Consider regular cardiovascular exercises');
        recommendations.push('Monitor blood pressure regularly');
        break;
      case 'neurological':
        recommendations.push('Ensure proper hydration');
        recommendations.push('Maintain regular sleep schedule');
        break;
      case 'musculoskeletal':
        recommendations.push('Practice gentle stretching exercises');
        recommendations.push('Consider ergonomic improvements');
        break;
      case 'psychological':
        recommendations.push('Practice stress management techniques');
        recommendations.push('Consider mindfulness or meditation');
        break;
    }

    // Identify risk factors
    const riskWords = ['chronic', 'severe', 'recurring', 'persistent', 'intense'];
    riskWords.forEach(word => {
      if (userInput.toLowerCase().includes(word)) {
        riskFactors.push(`Detected ${word} condition pattern`);
      }
    });

    if (symptoms.confidence > 80) {
      riskFactors.push(`High confidence in ${symptoms.category} symptoms`);
    }

    return {
      insights,
      recommendations,
      riskFactors
    };
  }
}
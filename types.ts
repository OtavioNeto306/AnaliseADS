
export type AppState = 'initial' | 'loading' | 'result';

export interface Metric {
  name: string;
  score: number;
  diagnostic: string;
  improvement: string;
}

export interface AnalysisResult {
  overallScore: number;
  metrics: Metric[];
  aiSuggestion: string;
  suggestedTitle: string;
  suggestedSubtitle: string;
  suggestedCTA: string;
  finalObservations: string;
}

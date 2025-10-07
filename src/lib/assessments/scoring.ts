// Assessment Scoring Utilities
// Handles APEST scoring and other assessment calculations

import type {
  AssessmentQuestion,
  AssessmentResponseEntity,
} from '@/lib/contracts';

// APEST dimensions
export const APEST_DIMENSIONS = [
  'apostolic',
  'prophetic',
  'evangelistic',
  'shepherding',
  'teaching',
] as const;
export type ApestDimension = (typeof APEST_DIMENSIONS)[number];

// APEST scores interface
export type ApestScores = {
  apostolic: number;
  prophetic: number;
  evangelistic: number;
  shepherding: number;
  teaching: number;
};

// Assessment scoring result
export interface AssessmentScoreResult {
  rawScores: Record<string, number>;
  totalScore: number;
  maxPossibleScore: number;
  normalizedScores: Record<string, number>;
  apestScores?: ApestScores;
  primaryGift?: string;
  secondaryGift?: string;
  completionPercentage: number;
  responseConsistency?: number;
}

/**
 * Calculate APEST scores from responses
 */
export function calculateApestScores(
  questions: AssessmentQuestion[],
  responses: AssessmentResponseEntity[]
): ApestScores {
  const scores: ApestScores = {
    apostolic: 0,
    prophetic: 0,
    evangelistic: 0,
    shepherding: 0,
    teaching: 0,
  };

  const questionMap = new Map(questions.map(q => [q.id, q]));
  const responseMap = new Map(responses.map(r => [r.questionId, r]));

  // Calculate scores for each APEST dimension
  for (const dimension of APEST_DIMENSIONS) {
    const dimensionQuestions = questions.filter(
      q => q.apestDimension === dimension
    );
    let dimensionScore = 0;
    let totalWeight = 0;

    for (const question of dimensionQuestions) {
      const response = responseMap.get(question.id);
      if (
        !response ||
        response.skipped ||
        response.responseValue === undefined
      ) {
        continue;
      }

      let responseScore = response.responseValue;

      // Apply reverse scoring if needed
      if (question.reverseScored) {
        const maxValue = 5; // Assuming 5-point Likert scale
        responseScore = maxValue - responseScore + 1;
      }

      // Apply question weight
      const weightedScore = responseScore * (question.weight || 1);
      dimensionScore += weightedScore;
      totalWeight += question.weight || 1;
    }

    scores[dimension] = totalWeight > 0 ? dimensionScore / totalWeight : 0;
  }

  return scores;
}

/**
 * Determine primary and secondary gifts from APEST scores
 */
export function determineApestGifts(scores: ApestScores): {
  primaryGift: string;
  secondaryGift: string;
} {
  const sortedScores = APEST_DIMENSIONS.map(dimension => ({
    dimension,
    score: scores[dimension],
  }))
    .sort((a, b) => b.score - a.score)
    .map(({ dimension }) => dimension);

  return {
    primaryGift: sortedScores[0] || 'teaching',
    secondaryGift: sortedScores[1] || 'shepherding',
  };
}

/**
 * Calculate response consistency (standard deviation of responses)
 */
export function calculateResponseConsistency(
  responses: AssessmentResponseEntity[]
): number {
  const values = responses
    .filter(r => !r.skipped && r.responseValue !== undefined)
    .map(r => r.responseValue!);

  if (values.length < 2) return 1.0;

  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;
  const standardDeviation = Math.sqrt(variance);

  // Normalize to 0-1 scale (lower deviation = higher consistency)
  const maxDeviation = 2.0; // Assuming 5-point scale, max deviation is ~2
  return Math.max(0, 1 - standardDeviation / maxDeviation);
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(
  questions: AssessmentQuestion[],
  responses: AssessmentResponseEntity[]
): number {
  const totalQuestions = questions.filter(q => q.isRequired).length;
  const answeredQuestions = responses.filter(
    r => !r.skipped && r.responseValue !== undefined
  ).length;

  return totalQuestions > 0
    ? Math.round((answeredQuestions / totalQuestions) * 100)
    : 0;
}

/**
 * Normalize scores to 0-100 scale
 */
export function normalizeScores(
  rawScores: Record<string, number>,
  maxPossibleScores: Record<string, number>
): Record<string, number> {
  const normalized: Record<string, number> = {};

  for (const [dimension, score] of Object.entries(rawScores)) {
    const maxScore = maxPossibleScores[dimension] || 5;
    normalized[dimension] = Math.round((score / maxScore) * 100);
  }

  return normalized;
}

/**
 * Calculate maximum possible scores for each dimension
 */
export function calculateMaxPossibleScores(
  questions: AssessmentQuestion[]
): Record<string, number> {
  const maxScores: Record<string, number> = {};

  for (const question of questions) {
    const dimension = question.apestDimension || 'general';
    const maxValue = 5; // Assuming 5-point Likert scale
    const weight = question.weight || 1;

    maxScores[dimension] = (maxScores[dimension] || 0) + maxValue * weight;
  }

  return maxScores;
}

/**
 * Main scoring function for APEST assessments
 */
export function scoreApestAssessment(
  questions: AssessmentQuestion[],
  responses: AssessmentResponseEntity[]
): AssessmentScoreResult {
  // Calculate APEST scores
  const apestScores = calculateApestScores(questions, responses);

  // Calculate total score
  const totalScore = Object.values(apestScores).reduce(
    (sum, score) => sum + score,
    0
  );

  // Calculate max possible score
  const maxPossibleScores = calculateMaxPossibleScores(questions);
  const maxPossibleScore = Object.values(maxPossibleScores).reduce(
    (sum, score) => sum + score,
    0
  );

  // Normalize scores
  const normalizedScores = normalizeScores(apestScores, maxPossibleScores);

  // Determine gifts
  const gifts = determineApestGifts(apestScores);

  // Calculate completion percentage
  const completionPercentage = calculateCompletionPercentage(
    questions,
    responses
  );

  // Calculate response consistency
  const responseConsistency = calculateResponseConsistency(responses);

  return {
    rawScores: apestScores,
    totalScore: Math.round(totalScore),
    maxPossibleScore: Math.round(maxPossibleScore),
    normalizedScores,
    apestScores,
    primaryGift: gifts.primaryGift,
    secondaryGift: gifts.secondaryGift,
    completionPercentage,
    responseConsistency,
  };
}

/**
 * Generate AI insights for APEST results
 */
export function generateApestInsights(
  apestScores: ApestScores,
  primaryGift: string,
  secondaryGift: string
): string {
  const insights: string[] = [];

  // Primary gift insights
  const giftDescriptions = {
    apostolic:
      "Apostolic gifts focus on pioneering, vision-casting, and expanding God's kingdom into new territories. You are drawn to starting new things and reaching unreached people.",
    prophetic:
      "Prophetic gifts involve speaking truth, challenging the status quo, and calling people back to God's heart. You have a deep sense of what God is saying and aren't afraid to speak up.",
    evangelistic:
      "Evangelistic gifts center on sharing the gospel and connecting with people who don't yet know Christ. You naturally build bridges between the church and the world.",
    shepherding:
      "Shepherding gifts focus on caring for, nurturing, and protecting God's people. You have a heart for helping others grow and supporting them through difficult times.",
    teaching:
      "Teaching gifts involve helping people understand and apply God's Word. You have a passion for discipleship and helping others develop a solid biblical foundation.",
  };

  insights.push(
    giftDescriptions[primaryGift as keyof typeof giftDescriptions] || ''
  );

  // Secondary gift insights
  if (secondaryGift && secondaryGift !== primaryGift) {
    insights.push(
      `Your secondary gift of ${secondaryGift} complements your primary ${primaryGift} gift, creating a well-rounded ministry profile.`
    );
  }

  // Balance insights
  const sortedScores = APEST_DIMENSIONS.map(dimension => ({
    dimension,
    score: apestScores[dimension],
  })).sort((a, b) => b.score - a.score);
  const highestScore = sortedScores[0]?.score ?? 0;
  const lowestScore = sortedScores[sortedScores.length - 1]?.score ?? 0;

  if (highestScore - lowestScore > 20) {
    insights.push(
      'Your profile shows strong specialization in certain areas. Consider how you can work with others who have complementary gifts.'
    );
  } else {
    insights.push(
      'You have a relatively balanced profile across all APEST dimensions, making you versatile in ministry contexts.'
    );
  }

  return insights.join(' ');
}

/**
 * Generate personalized recommendations
 */
export function generatePersonalizedRecommendations(
  apestScores: ApestScores,
  primaryGift: string,
  _secondaryGift: string
) {
  const recommendations = {
    strengths: [] as string[],
    growthAreas: [] as string[],
    actionItems: [] as string[],
    contentRecommendations: [] as string[],
  };

  // Strength-based recommendations
  const strengthThreshold = 75;
  APEST_DIMENSIONS.forEach(dimension => {
    const score = apestScores[dimension];
    if (score >= strengthThreshold) {
      recommendations.strengths.push(
        `Strong ${dimension} gifts - leverage this in your ministry`
      );
    }
  });

  // Growth area recommendations
  const growthThreshold = 50;
  APEST_DIMENSIONS.forEach(dimension => {
    const score = apestScores[dimension];
    if (score < growthThreshold) {
      recommendations.growthAreas.push(
        `Develop your ${dimension} gifts through intentional practice`
      );
    }
  });

  // Action items based on primary gift
  const actionItemsByGift = {
    apostolic: [
      'Consider starting a new ministry or expanding existing work',
      'Connect with other apostolic leaders for mentoring',
      'Develop skills in vision-casting and team building',
    ],
    prophetic: [
      'Find opportunities to speak truth in your context',
      'Develop discernment through prayer and Scripture study',
      'Connect with prophetic communities for accountability',
    ],
    evangelistic: [
      'Practice sharing your faith story regularly',
      'Build relationships with people outside the church',
      'Develop cultural intelligence for different contexts',
    ],
    shepherding: [
      'Mentor someone in their spiritual journey',
      'Develop counseling and care skills',
      'Create safe spaces for vulnerable conversations',
    ],
    teaching: [
      'Develop a systematic approach to discipleship',
      'Study theology and biblical interpretation',
      'Practice explaining complex concepts simply',
    ],
  };

  recommendations.actionItems =
    actionItemsByGift[primaryGift as keyof typeof actionItemsByGift] || [];

  // Content recommendations based on gifts
  const contentByGift = {
    apostolic: [
      'Church Planting Resources',
      'Leadership Development',
      'Vision and Strategy',
    ],
    prophetic: [
      'Social Justice Resources',
      'Spiritual Formation',
      'Cultural Engagement',
    ],
    evangelistic: [
      'Evangelism Training',
      'Cross-Cultural Ministry',
      'Community Outreach',
    ],
    shepherding: [
      'Pastoral Care Resources',
      'Counseling Skills',
      'Small Group Leadership',
    ],
    teaching: [
      'Biblical Studies',
      'Theological Education',
      'Discipleship Resources',
    ],
  };

  recommendations.contentRecommendations =
    contentByGift[primaryGift as keyof typeof contentByGift] || [];

  return recommendations;
}

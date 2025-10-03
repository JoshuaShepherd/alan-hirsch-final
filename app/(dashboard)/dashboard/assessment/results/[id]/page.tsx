import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/server';

interface AssessmentResult {
  id: string;
  assessment: {
    name: string;
    assessmentType: string;
  };
  apestScores: {
    apostolic: number;
    prophetic: number;
    evangelistic: number;
    shepherding: number;
    teaching: number;
  };
  primaryGift: string;
  completedAt: string;
}

export default async function AssessmentResultsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  // Get the current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    notFound();
  }

  // Fetch assessment results
  const response = await fetch(`${process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000'}/api/user/assessments/${id}`, {
    headers: {
      'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
    }
  });

  if (!response.ok) {
    notFound();
  }

  const { data: result }: { data: AssessmentResult } = await response.json();

  const scores = result.apestScores;
  const maxScore = Math.max(...Object.values(scores));
  const primaryGift = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'unknown';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
          <p className="text-sm text-gray-600">
            Completed on {new Date(result.completedAt).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Primary Gift</h2>
              <div className="text-4xl font-bold text-blue-600 capitalize mb-4">
                {primaryGift}
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {getGiftDescription(primaryGift)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(scores).map(([gift, score]) => (
                <div key={gift} className="text-center">
                  <div className="text-sm font-medium capitalize mb-2">{gift}</div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(score / maxScore) * 100}%` }}
                    />
                  </div>
                  <div className="text-lg font-bold">{score}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">What This Means</h3>
              <p className="text-gray-700">
                Based on your responses, your primary ministry gift is <strong>{primaryGift}</strong>. 
                This suggests you are naturally inclined toward {getGiftDescription(primaryGift)}.
              </p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
              <ul className="text-blue-800 space-y-1">
                <li>• Explore content related to your primary gift</li>
                <li>• Connect with others who share similar gifts</li>
                <li>• Consider how to develop and use your gifts in ministry</li>
                <li>• Take the assessment again in 6 months to track growth</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getGiftDescription(gift: string): string {
  const descriptions = {
    apostolic: 'pioneering new ministries and expanding the kingdom',
    prophetic: 'speaking truth and calling people to repentance',
    evangelistic: 'sharing the gospel and leading people to Christ',
    shepherding: 'caring for and nurturing believers',
    teaching: 'explaining and applying God\'s word'
  };
  return descriptions[gift as keyof typeof descriptions] || 'serving in ministry';
}

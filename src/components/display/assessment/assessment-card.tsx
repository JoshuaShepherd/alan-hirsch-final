'use client';

import {
  AssessmentCardProps,
  assessmentCardPropsSchema,
  validateComponentProps,
} from '@/lib/types/component-props';
import { cn } from '@/lib/utils';
import { Badge } from '@/lib/ui/badge';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/lib/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/ui/dropdown-menu';
import {
  AlertCircle,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  Globe,
  MoreHorizontal,
  Target,
  Trash2,
} from 'lucide-react';

export function AssessmentCard({
  item: assessment,
  variant = 'default',
  showActions = true,
  showQuestionCount = true,
  showDuration = true,
  showValidityScores = false,
  showCulturalAdaptation = true,
  onSelect,
  onEdit,
  onDelete,
  onView,
  className,
}: AssessmentCardProps) {
  // Runtime validation
  const validatedProps = validateComponentProps(
    {
      item: assessment,
      variant,
      showActions,
      showQuestionCount,
      showDuration,
      showValidityScores,
      showCulturalAdaptation,
      className,
    },
    assessmentCardPropsSchema
  );

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'draft':
        return { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle };
      case 'archived':
        return { color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
      case 'under_review':
        return { color: 'bg-blue-100 text-blue-800', icon: AlertCircle };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    }
  };

  // Get assessment type color
  const getAssessmentTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      apest: 'bg-purple-100 text-purple-800',
      mdna: 'bg-blue-100 text-blue-800',
      cultural_intelligence: 'bg-green-100 text-green-800',
      leadership_style: 'bg-orange-100 text-orange-800',
      spiritual_gifts: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return typeColors[type.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Get cultural adaptation color
  const getCulturalAdaptationColor = (adaptation: string) => {
    const adaptationColors: Record<string, string> = {
      western: 'bg-blue-100 text-blue-800',
      eastern: 'bg-red-100 text-red-800',
      african: 'bg-green-100 text-green-800',
      latin_american: 'bg-orange-100 text-orange-800',
      middle_eastern: 'bg-purple-100 text-purple-800',
      oceanic: 'bg-cyan-100 text-cyan-800',
      universal: 'bg-gray-100 text-gray-800',
      global: 'bg-indigo-100 text-indigo-800',
    };
    return (
      adaptationColors[adaptation.toLowerCase()] || 'bg-gray-100 text-gray-800'
    );
  };

  // Get scoring method display
  const getScoringMethodDisplay = (method: string) => {
    const methodDisplays: Record<string, string> = {
      likert_5: '5-Point Scale',
      likert_7: '7-Point Scale',
      binary: 'Yes/No',
      ranking: 'Ranking',
      weighted: 'Weighted',
    };
    return methodDisplays[method.toLowerCase()] || method.replace('_', ' ');
  };

  const statusInfo = getStatusInfo(assessment.status);

  // Render compact variant
  if (variant === 'compact') {
    return (
      <Card className={cn('p-3', className)}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{assessment.name}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {assessment.assessmentType.replace('_', ' ')}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Badge
                className={cn(
                  'text-xs',
                  getAssessmentTypeColor(assessment.assessmentType)
                )}
              >
                {assessment.assessmentType.replace('_', ' ')}
              </Badge>
              <Badge className={cn('text-xs', statusInfo.color)}>
                {assessment.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onView && (
                  <DropdownMenuItem onClick={() => onView(assessment)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(assessment)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(assessment.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </Card>
    );
  }

  // Render minimal variant
  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'p-2 border rounded flex items-center justify-between',
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <Target className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{assessment.name}</span>
        </div>
        <Badge className={statusInfo.color}>
          {assessment.status.replace('_', ' ')}
        </Badge>
      </div>
    );
  }

  // Render default and detailed variants
  return (
    <Card className={cn('h-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Target className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold leading-tight">{assessment.name}</h3>
              <p className="text-sm text-muted-foreground">
                {assessment.assessmentType.replace('_', ' ')} Assessment
              </p>
              {variant === 'detailed' && assessment.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {assessment.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              className={cn(
                'text-xs',
                getAssessmentTypeColor(assessment.assessmentType)
              )}
            >
              {assessment.assessmentType.replace('_', ' ')}
            </Badge>
            <Badge className={cn('text-xs', statusInfo.color)}>
              <statusInfo.icon className="mr-1 h-3 w-3" />
              {assessment.status.replace('_', ' ')}
            </Badge>
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (
                    <DropdownMenuItem onClick={() => onView(assessment)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  )}
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(assessment)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(assessment.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Description */}
        {variant === 'default' && assessment.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {assessment.description}
          </p>
        )}

        {/* Stats */}
        {(showQuestionCount || showDuration) && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {showQuestionCount && (
              <div className="text-center">
                <div className="text-sm font-medium">
                  {assessment.questionsCount}
                </div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
            )}
            {showDuration && assessment.estimatedDuration && (
              <div className="text-center">
                <div className="text-sm font-medium">
                  {assessment.estimatedDuration}
                </div>
                <div className="text-xs text-muted-foreground">Minutes</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-sm font-medium">{assessment.version}</div>
              <div className="text-xs text-muted-foreground">Version</div>
            </div>
          </div>
        )}

        {/* Validity Scores */}
        {showValidityScores &&
          (assessment.validityScore || assessment.reliabilityScore) && (
            <div className="space-y-2 mb-3">
              {assessment.validityScore && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Validity Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${assessment.validityScore * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {(assessment.validityScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
              {assessment.reliabilityScore && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Reliability Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${assessment.reliabilityScore * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {(assessment.reliabilityScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Additional Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>{getScoringMethodDisplay(assessment.scoringMethod)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="h-3 w-3" />
              <span>{assessment.language}</span>
            </div>
          </div>

          {showCulturalAdaptation && (
            <div className="flex items-center space-x-2">
              <Badge
                className={cn(
                  'text-xs',
                  getCulturalAdaptationColor(assessment.culturalAdaptation)
                )}
              >
                {assessment.culturalAdaptation.replace('_', ' ')}
              </Badge>
              {assessment.researchBacked && (
                <Badge variant="outline" className="text-xs">
                  <Award className="mr-1 h-3 w-3" />
                  Research Backed
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Detailed Information */}
        {variant === 'detailed' && (
          <div className="space-y-2 mt-3">
            {assessment.passingScore && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Target className="mr-1 h-3 w-3" />
                Passing Score: {assessment.passingScore}
              </div>
            )}
            {assessment.instructions && (
              <div className="flex items-center text-xs text-muted-foreground">
                <BookOpen className="mr-1 h-3 w-3" />
                Instructions provided
              </div>
            )}
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              Created {new Date(assessment.createdAt).toLocaleDateString()}
            </div>
            {assessment.publishedAt && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Published{' '}
                {new Date(assessment.publishedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </CardContent>

      {variant === 'detailed' && (onView || onEdit) && (
        <CardFooter className="pt-3">
          <div className="flex space-x-2 w-full">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(assessment)}
                className="flex-1"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            )}
            {onEdit && (
              <Button
                size="sm"
                onClick={() => onEdit(assessment)}
                className="flex-1"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

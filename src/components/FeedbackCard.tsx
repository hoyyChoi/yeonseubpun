import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Target,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Star,
  Clock,
  SkipForward,
  RotateCcw,
  Home,
  Sparkles,
} from "lucide-react";

interface FeedbackCardProps {
  question: string;
  answer: string;
  category: string;
  difficulty: string;
  feedback: any;
  onComplete: () => void;
  onRetry: () => void;
  onNext?: () => void;
}

const FeedbackCard = ({
  question,
  answer,
  category,
  difficulty,
  feedback,
  onComplete,
  onRetry,
  onNext,
}: FeedbackCardProps) => {
  const feedbackData = feedback || {
    totalScore: 80, // 5점 단위로 수정
    starRating: 4,
    grade: "골efwefwef12ㄷ12ㄷ21ㄷ21ㄷ21ㄷwe드",
    gradeColor: "from-yellow-400 to-yellow-600",
    scores: {
      accuracy: 85,
      clarity: 80,
      completeness: 75,
      examples: 85,
    },
    improvements: [
      "구체적인 개념 설명이 훌륭합니다!",
      "실무 관점에서의 접근이 돋보입니다.",
    ],
    detailedExample:
      "개선 예시: '함수가 선언된 렉시컬 환경'이라고 하셨는데, 구체적으로 이렇게 설명하면 더 좋습니다: function outer() { let x = 1; return function inner() { return x; }; } - 여기서 inner 함수가 outer의 x에 접근하는 것이 클로저입니다.",
    followUpQuestion:
      "그렇다면 클로저를 사용할 때 메모리 누수를 방지하는 방법은 무엇인가요?",
    experienceGained: 25,
    timeSpent: 180,
    isAIPowered: false,
  };

  const gradeEmojis: { [key: string]: string } = {
    브론즈: "🥉",
    실버: "🥈",
    골드: "🥇",
    플래티넘: "💎",
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      <div className='container mx-auto px-6 py-8'>
        <div className='max-w-4xl mx-auto space-y-6'>
          {/* Congratulations Header */}
          <Card className='border-0 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 text-white'>
            <CardContent className='p-6 text-center'>
              <div className='flex justify-center mb-4'>
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center'>
                  <CheckCircle className='w-8 h-8' />
                </div>
              </div>
              <h1 className='text-2xl font-bold mb-2'>문제 완료! 🎉</h1>
              <p className='text-green-100 mb-2'>
                {feedbackData.isAIPowered
                  ? "Gemini AI가 당신의 답변을 분석했어요!"
                  : "AI가 당신의 답변을 분석했어요!"}
              </p>
              {feedbackData.isAIPowered && (
                <div className='flex items-center justify-center space-x-2 text-sm bg-white/10 rounded-full px-3 py-1 mt-2'>
                  <Sparkles className='w-4 h-4' />
                  <span>고급 AI 피드백 제공</span>
                </div>
              )}
              <div className='flex justify-center items-center mt-4 space-x-2 text-sm'>
                <Clock className='w-4 h-4' />
                <span>소요 시간: {formatTime(feedbackData.timeSpent)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Score Overview with Stars */}
          <Card className='border-0 shadow-lg'>
            <CardHeader>
              <CardTitle className='flex items-center justify-center text-2xl'>
                <Trophy className='w-6 h-6 mr-2 text-yellow-500' />
                별점 평가
              </CardTitle>
            </CardHeader>
            <CardContent className='text-center'>
              <div className='flex justify-center mb-4'>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 mx-1 ${
                      i < Math.floor(feedbackData.starRating)
                        ? "text-yellow-400 fill-current"
                        : i < feedbackData.starRating
                        ? "text-yellow-400 fill-current opacity-50"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div
                className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${feedbackData.gradeColor} text-white text-xl font-bold mb-4`}
              >
                <span className='mr-2'>{gradeEmojis[feedbackData.grade]}</span>
                {feedbackData.grade} 등급
              </div>
              <div className='text-3xl font-bold text-indigo-600 mb-2'>
                {feedbackData.totalScore}점
              </div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {feedbackData.scores.accuracy}
                  </div>
                  <div className='text-sm text-gray-500'>정확성</div>
                  <Progress
                    value={feedbackData.scores.accuracy}
                    className='mt-1 h-2'
                  />
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    {feedbackData.scores.clarity}
                  </div>
                  <div className='text-sm text-gray-500'>명확성</div>
                  <Progress
                    value={feedbackData.scores.clarity}
                    className='mt-1 h-2'
                  />
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-purple-600'>
                    {feedbackData.scores.completeness}
                  </div>
                  <div className='text-sm text-gray-500'>완성도</div>
                  <Progress
                    value={feedbackData.scores.completeness}
                    className='mt-1 h-2'
                  />
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {feedbackData.scores.examples}
                  </div>
                  <div className='text-sm text-gray-500'>예시 활용</div>
                  <Progress
                    value={feedbackData.scores.examples}
                    className='mt-1 h-2'
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Feedback with Examples */}
          <Card className='border-0 shadow-lg'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <MessageSquare className='w-5 h-5 mr-2 text-blue-600' />
                {feedbackData.isAIPowered ? "Gemini AI 피드백" : "AI 피드백"}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='bg-blue-50 border-l-4 border-blue-500 p-4'>
                <h4 className='font-medium text-blue-900 mb-2'>👍 잘한 점</h4>
                <ul className='space-y-1'>
                  {feedbackData.improvements
                    .slice(0, 2)
                    .map((improvement, index) => (
                      <li
                        key={index}
                        className='text-blue-800 text-sm flex items-start'
                      >
                        <CheckCircle className='w-4 h-4 mr-2 mt-0.5 text-green-500' />
                        {improvement}
                      </li>
                    ))}
                </ul>
              </div>

              <div className='bg-amber-50 border-l-4 border-amber-500 p-4'>
                <h4 className='font-medium text-amber-900 mb-2'>
                  💡 구체적 개선 예시
                </h4>
                <div className='text-amber-800 text-sm'>
                  <div className='flex items-start mb-2'>
                    <Lightbulb className='w-4 h-4 mr-2 mt-0.5 text-amber-600' />
                    <span>{feedbackData.detailedExample}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Question */}
          <Card className='border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50'>
            <CardHeader>
              <CardTitle className='flex items-center text-purple-900'>
                <Target className='w-5 h-5 mr-2' />
                꼬리 질문
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-purple-800 mb-4'>
                {feedbackData.followUpQuestion}
              </p>
              <Button
                variant='outline'
                className='border-purple-300 text-purple-700 hover:bg-purple-100'
              >
                이 질문도 풀어보기 <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </CardContent>
          </Card>

          {/* Experience Gained */}
          <Card className='border-0 shadow-lg'>
            <CardContent className='p-6 text-center'>
              <div className='flex items-center justify-center mb-4'>
                <Star className='w-8 h-8 text-yellow-500 mr-2' />
                <span className='text-2xl font-bold text-gray-900'>
                  +{feedbackData.experienceGained} EXP
                </span>
              </div>
              <p className='text-gray-600 mb-6'>
                오늘의 한 문제 완료! 꾸준한 학습으로 성장하고 있어요 🌱
              </p>

              {/* 개선된 버튼 레이아웃 */}
              <div className='flex flex-col sm:flex-row justify-center gap-3'>
                <Button
                  onClick={onComplete}
                  variant='outline'
                  className='flex items-center'
                >
                  <Home className='w-4 h-4 mr-2' />
                  홈으로 돌아가기
                </Button>
                <Button
                  onClick={onRetry}
                  variant='outline'
                  className='flex items-center'
                >
                  <RotateCcw className='w-4 h-4 mr-2' />
                  다시 풀어보기
                </Button>
                {onNext && (
                  <Button
                    onClick={onNext}
                    className='bg-indigo-600 hover:bg-indigo-700 flex items-center'
                  >
                    <SkipForward className='w-4 h-4 mr-2' />
                    다음 문제 풀기
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;

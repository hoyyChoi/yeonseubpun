
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
  Star
} from "lucide-react";

interface FeedbackCardProps {
  question: string;
  answer: string;
  category: string;
  difficulty: string;
  onComplete: () => void;
}

const FeedbackCard = ({ question, answer, category, difficulty, onComplete }: FeedbackCardProps) => {
  // AI 피드백 시뮬레이션 (실제로는 OpenAI API에서 받아올 데이터)
  const feedback = {
    totalScore: 87,
    grade: "골드",
    gradeColor: "from-yellow-400 to-yellow-600",
    scores: {
      accuracy: 90,
      clarity: 85,
      completeness: 82,
      examples: 88
    },
    improvements: [
      "구체적인 코드 예시가 훌륭합니다!",
      "실무 관점에서의 설명이 도움이 됩니다.",
      "브라우저 호환성에 대한 언급이 있으면 더 완벽했을 것 같아요."
    ],
    followUpQuestion: "그렇다면 let과 const가 도입되기 전 var만 있던 시절에는 개발자들이 어떤 방식으로 이런 문제들을 해결했을까요?",
    experienceGained: 25
  };

  const gradeEmojis: { [key: string]: string } = {
    "브론즈": "🥉",
    "실버": "🥈", 
    "골드": "🥇",
    "플래티넘": "💎"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Congratulations Header */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">문제 완료! 🎉</h1>
              <p className="text-green-100">
                AI가 당신의 답변을 분석했어요. 결과를 확인해보세요!
              </p>
            </CardContent>
          </Card>

          {/* Score Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-2xl">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                총 점수: {feedback.totalScore}점
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${feedback.gradeColor} text-white text-xl font-bold mb-4`}>
                <span className="mr-2">{gradeEmojis[feedback.grade]}</span>
                {feedback.grade} 등급
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{feedback.scores.accuracy}</div>
                  <div className="text-sm text-gray-500">정확성</div>
                  <Progress value={feedback.scores.accuracy} className="mt-1 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{feedback.scores.clarity}</div>
                  <div className="text-sm text-gray-500">명확성</div>
                  <Progress value={feedback.scores.clarity} className="mt-1 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{feedback.scores.completeness}</div>
                  <div className="text-sm text-gray-500">완성도</div>
                  <Progress value={feedback.scores.completeness} className="mt-1 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{feedback.scores.examples}</div>
                  <div className="text-sm text-gray-500">예시 활용</div>
                  <Progress value={feedback.scores.examples} className="mt-1 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Feedback */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                AI 피드백
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-medium text-blue-900 mb-2">👍 잘한 점</h4>
                <ul className="space-y-1">
                  {feedback.improvements.slice(0, 2).map((improvement, index) => (
                    <li key={index} className="text-blue-800 text-sm flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                <h4 className="font-medium text-amber-900 mb-2">💡 개선할 점</h4>
                <div className="text-amber-800 text-sm flex items-start">
                  <Lightbulb className="w-4 h-4 mr-2 mt-0.5 text-amber-600" />
                  {feedback.improvements[2]}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Question */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-900">
                <Target className="w-5 h-5 mr-2" />
                꼬리 질문
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 mb-4">{feedback.followUpQuestion}</p>
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                이 질문도 풀어보기 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Experience Gained */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">+{feedback.experienceGained} EXP</span>
              </div>
              <p className="text-gray-600 mb-6">오늘의 한 문제 완료! 잔디가 하나 더 심어졌어요 🌱</p>
              
              <div className="flex justify-center space-x-4">
                <Button onClick={onComplete} className="bg-blue-600 hover:bg-blue-700">
                  홈으로 돌아가기
                </Button>
                <Button variant="outline">
                  다른 문제 풀어보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;

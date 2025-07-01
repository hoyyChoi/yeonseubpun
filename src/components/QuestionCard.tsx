
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, CheckCircle } from "lucide-react";
import FeedbackCard from "./FeedbackCard";

interface QuestionCardProps {
  category: string;
  difficulty: string;
  onBack: () => void;
  onComplete: () => void;
}

const QuestionCard = ({ category, difficulty, onBack, onComplete }: QuestionCardProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 샘플 문제 (실제로는 API에서 가져올 것)
  const sampleQuestions: { [key: string]: { [key: string]: any } } = {
    javascript: {
      easy: {
        title: "JavaScript 변수 선언",
        question: "var, let, const의 차이점을 설명하고, 각각 언제 사용하는 것이 좋은지 예시와 함께 설명해주세요.",
        tags: ["변수", "스코프", "ES6"],
        expectedTime: "5-10분"
      },
      medium: {
        title: "JavaScript 클로저",
        question: "클로저(Closure)가 무엇인지 설명하고, 실제 개발에서 클로저를 어떻게 활용할 수 있는지 코드 예시와 함께 설명해주세요.",
        tags: ["클로저", "스코프", "함수"],
        expectedTime: "10-15분"
      },
      hard: {
        title: "JavaScript 이벤트 루프",
        question: "JavaScript의 이벤트 루프(Event Loop)에 대해 설명하고, 콜백 큐(Callback Queue)와 마이크로태스크 큐(Microtask Queue)의 차이점을 예시와 함께 설명해주세요.",
        tags: ["이벤트루프", "비동기", "콜백"],
        expectedTime: "15-20분"
      }
    }
  };

  const currentQuestion = sampleQuestions[category]?.[difficulty] || {
    title: "샘플 문제",
    question: "선택하신 카테고리와 난이도에 맞는 문제를 준비 중입니다.",
    tags: ["샘플"],
    expectedTime: "10분"
  };

  const categoryNames: { [key: string]: string } = {
    'javascript': 'JavaScript',
    'python': 'Python',
    'os': '운영체제',
    'network': '네트워크',
    'database': '데이터베이스',
    'algorithm': '알고리즘'
  };

  const difficultyNames: { [key: string]: string } = {
    'easy': '쉬움',
    'medium': '보통',
    'hard': '어려움'
  };

  const difficultyColors: { [key: string]: string } = {
    'easy': 'bg-green-100 text-green-700',
    'medium': 'bg-yellow-100 text-yellow-700',
    'hard': 'bg-red-100 text-red-700'
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsLoading(true);
    // AI 피드백을 위한 시뮬레이션 (실제로는 OpenAI API 호출)
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <FeedbackCard 
        question={currentQuestion.question}
        answer={answer}
        category={categoryNames[category]}
        difficulty={difficultyNames[difficulty]}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">{categoryNames[category]}</Badge>
              <Badge className={difficultyColors[difficulty]}>{difficultyNames[difficulty]}</Badge>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {currentQuestion.expectedTime}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Question Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">{currentQuestion.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {currentQuestion.question}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Answer Input */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  당신의 답변
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="여기에 답변을 작성해주세요. 구체적인 예시와 함께 설명하면 더 좋은 평가를 받을 수 있어요!"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="min-h-[200px] resize-none border-gray-200 focus:border-blue-500"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {answer.length} / 1000자
                  </p>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!answer.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        AI 분석 중...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        답변 제출하기
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-purple-900 mb-2">💡 좋은 답변을 위한 팁</h4>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• 핵심 개념을 먼저 간단히 정의해주세요</li>
                  <li>• 가능하면 실제 코드 예시나 실무 경험을 포함해주세요</li>
                  <li>• 장단점이나 주의사항도 함께 언급하면 좋아요</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

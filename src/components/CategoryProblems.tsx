
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle, Clock } from "lucide-react";

interface CategoryProblemsProps {
  category: string;
  onBack: () => void;
  onSelectProblem: (problemId: string) => void;
}

const CategoryProblems = ({ category, onBack, onSelectProblem }: CategoryProblemsProps) => {
  const problems = {
    javascript: [
      { id: '1', title: 'JavaScript 클로저란 무엇인가?', difficulty: '보통', solved: true, score: 92 },
      { id: '2', title: '호이스팅(Hoisting) 개념 설명', difficulty: '쉬움', solved: true, score: 87 },
      { id: '3', title: 'Promise와 async/await 차이점', difficulty: '어려움', solved: false, score: null },
      { id: '4', title: '이벤트 루프(Event Loop) 동작 원리', difficulty: '어려움', solved: false, score: null },
      { id: '5', title: 'this 키워드의 동작 방식', difficulty: '보통', solved: false, score: null },
    ],
    python: [
      { id: '6', title: 'Python 데코레이터 개념과 사용법', difficulty: '보통', solved: false, score: null },
      { id: '7', title: 'GIL(Global Interpreter Lock)이란?', difficulty: '어려움', solved: false, score: null },
      { id: '8', title: 'List Comprehension vs Generator', difficulty: '보통', solved: false, score: null },
    ],
    os: [
      { id: '9', title: '프로세스와 스레드의 차이점', difficulty: '보통', solved: true, score: 74 },
      { id: '10', title: '데드락(Deadlock) 발생 조건과 해결법', difficulty: '어려움', solved: false, score: null },
      { id: '11', title: '가상 메모리 시스템', difficulty: '어려움', solved: false, score: null },
    ],
    network: [
      { id: '12', title: 'HTTP와 HTTPS의 차이점', difficulty: '쉬움', solved: true, score: 87 },
      { id: '13', title: 'TCP/IP 4계층 모델', difficulty: '보통', solved: false, score: null },
      { id: '14', title: 'DNS 동작 원리', difficulty: '보통', solved: false, score: null },
    ]
  };

  const categoryNames = {
    javascript: 'JavaScript',
    python: 'Python',
    os: '운영체제',
    network: '네트워크',
    database: '데이터베이스',
    algorithm: '알고리즘'
  };

  const currentProblems = problems[category as keyof typeof problems] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '쉬움': return 'bg-green-100 text-green-700';
      case '보통': return 'bg-yellow-100 text-yellow-700';
      case '어려움': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {categoryNames[category as keyof typeof categoryNames]} 문제
              </h1>
              <p className="text-gray-600">총 {currentProblems.length}개의 문제가 있습니다</p>
            </div>
          </div>

          <div className="grid gap-4">
            {currentProblems.map((problem) => (
              <Card key={problem.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {problem.solved ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                        <h3 className="text-lg font-medium text-gray-900">{problem.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                        {problem.solved && problem.score && (
                          <Badge variant="outline" className="text-blue-600">
                            {problem.score}점
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => onSelectProblem(problem.id)}
                        className={problem.solved ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {problem.solved ? '다시 풀기' : '풀어보기'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProblems;

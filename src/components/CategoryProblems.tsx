
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Clock, Users, Target } from "lucide-react";

interface CategoryProblemsProps {
  category: string;
  onBack: () => void;
  onSelectProblem: (problemId: string) => void;
}

const CategoryProblems = ({ category, onBack, onSelectProblem }: CategoryProblemsProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("전체");

  // 샘플 문제 데이터
  const sampleProblems = {
    react: [
      {
        id: "react-001",
        title: "React Hook의 종류와 사용법",
        difficulty: "보통",
        estimatedTime: "15분",
        solvedCount: 1247,
        rating: 4.2,
        description: "useState, useEffect 등 주요 Hook들의 차이점과 올바른 사용법에 대해 설명하세요."
      },
      {
        id: "react-002", 
        title: "Virtual DOM의 동작 원리",
        difficulty: "어려움",
        estimatedTime: "20분",
        solvedCount: 892,
        rating: 4.5,
        description: "React의 Virtual DOM이 실제 DOM과 어떻게 다르고, 성능 최적화에 어떻게 기여하는지 설명하세요."
      },
      {
        id: "react-003",
        title: "컴포넌트 라이프사이클",
        difficulty: "쉬움",
        estimatedTime: "10분",
        solvedCount: 2156,
        rating: 4.0,
        description: "함수형 컴포넌트와 클래스 컴포넌트의 라이프사이클 차이점을 설명하세요."
      }
    ],
    javascript: [
      {
        id: "js-001",
        title: "JavaScript 클로저의 개념",
        difficulty: "보통",
        estimatedTime: "12분",
        solvedCount: 1856,
        rating: 4.3,
        description: "클로저가 무엇인지, 어떤 상황에서 사용되는지 예시와 함께 설명하세요."
      },
      {
        id: "js-002",
        title: "비동기 처리: Promise vs async/await",
        difficulty: "어려움",
        estimatedTime: "18분",
        solvedCount: 1124,
        rating: 4.4,
        description: "Promise와 async/await의 차이점과 각각의 장단점을 설명하세요."
      }
    ],
    frontend: [
      {
        id: "fe-001",
        title: "CSS Flexbox vs Grid",
        difficulty: "보통",
        estimatedTime: "15분",
        solvedCount: 1432,
        rating: 4.1,
        description: "Flexbox와 Grid 레이아웃의 차이점과 각각의 적절한 사용 시나리오를 설명하세요."
      },
      {
        id: "fe-002",
        title: "웹 접근성 기본 원칙",
        difficulty: "쉬움",
        estimatedTime: "10분",
        solvedCount: 987,
        rating: 4.0,
        description: "웹 접근성의 4가지 기본 원칙과 실무에서 고려해야 할 사항들을 설명하세요."
      }
    ],
    backend: [
      {
        id: "be-001",
        title: "REST API vs GraphQL",
        difficulty: "보통",
        estimatedTime: "16분",
        solvedCount: 1298,
        rating: 4.2,
        description: "REST API와 GraphQL의 차이점과 각각의 장단점을 비교 설명하세요."
      },
      {
        id: "be-002",
        title: "데이터베이스 인덱스의 원리",
        difficulty: "어려움",
        estimatedTime: "22분",
        solvedCount: 756,
        rating: 4.6,
        description: "데이터베이스 인덱스가 어떻게 동작하고, 성능에 미치는 영향을 설명하세요."
      }
    ]
  };

  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      react: "React",
      javascript: "JavaScript", 
      typescript: "TypeScript",
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps",
      mobile: "Mobile",
      ai: "AI/ML",
      blockchain: "Blockchain",
      security: "Security",
      database: "Database"
    };
    return categoryMap[category] || category;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움": return "bg-green-100 text-green-800";
      case "보통": return "bg-yellow-100 text-yellow-800";
      case "어려움": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const problems = sampleProblems[category as keyof typeof sampleProblems] || [];
  const filteredProblems = selectedDifficulty === "전체" 
    ? problems 
    : problems.filter(p => p.difficulty === selectedDifficulty);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getCategoryName(category)}</h1>
              <p className="text-gray-600 mt-1">{problems.length}개의 문제가 있습니다</p>
            </div>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-sm font-medium text-gray-700">난이도:</span>
          {["전체", "쉬움", "보통", "어려움"].map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="text-center py-12">
                <p className="text-gray-500">해당 난이도의 문제가 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            filteredProblems.map((problem) => (
              <Card key={problem.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
                        <Badge className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {problem.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>예상 시간: {problem.estimatedTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{problem.solvedCount.toLocaleString()}명 해결</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          <span>{problem.rating}/5.0</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6 flex flex-col space-y-2">
                      <Button 
                        onClick={() => onSelectProblem(problem.id)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        문제 풀기
                      </Button>
                      <Button variant="outline" size="sm">
                        다른 풀이 보기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProblems;

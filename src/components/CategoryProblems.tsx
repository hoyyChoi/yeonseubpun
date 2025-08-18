import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Star, Target } from "lucide-react";

interface CategoryProblemsProps {
  category: string;
  onBack: () => void;
  onSelectProblem: (problemId: string) => void;
}

const CategoryProblems = ({
  category,
  onBack,
  onSelectProblem,
}: CategoryProblemsProps) => {
  const categoryData = {
    react: {
      name: "React",
      icon: "⚛️",
      description:
        "Re111actㄱㄱㄱㄴ 프레임111워1111111ㅗㅗㅗ크eee 11111관련 문제들",
      problems: [
        {
          id: "react-001",
          title: "React Hook의 동작 원리",
          difficulty: "보통",
          avgTime: "15분",
          successRate: 75,
          participants: 234,
          tags: ["useState", "useEffect", "Hook"],
          description:
            "React Hook이 어떻게 동작하는지 설명하고, useState와 useEffect의 차이점을 서술하세요.",
        },
        {
          id: "react-002",
          title: "Virtual DOM과 Real DOM 비교",
          difficulty: "쉬움",
          avgTime: "10분",
          successRate: 85,
          participants: 456,
          tags: ["Virtual DOM", "Performance"],
          description:
            "Virtual DOM의 개념과 Real DOM과의 차이점, 성능상 이점을 설명하세요.",
        },
        {
          id: "react-003",
          title: "React Context API vs Redux",
          difficulty: "어려움",
          avgTime: "25분",
          successRate: 45,
          participants: 123,
          tags: ["Context API", "Redux", "상태관리"],
          description:
            "React Context API와 Redux의 차이점과 각각의 사용 시나리오를 비교 설명하세요.",
        },
      ],
    },
    typescript: {
      name: "TypeScript",
      icon: "📘",
      description: "TypeScript 언어 및 타입 시스템 문제들",
      problems: [
        {
          id: "ts-001",
          title: "TypeScript 제네릭 활용법",
          difficulty: "보통",
          avgTime: "20분",
          successRate: 68,
          participants: 189,
          tags: ["Generic", "Type", "Interface"],
          description:
            "TypeScript 제네릭의 개념과 실제 사용 예시를 들어 설명하세요.",
        },
        {
          id: "ts-002",
          title: "Union Type vs Intersection Type",
          difficulty: "어려움",
          avgTime: "18분",
          successRate: 52,
          participants: 267,
          tags: ["Union", "Intersection", "Type"],
          description:
            "Union Type과 Intersection Type의 차이점과 사용 사례를 설명하세요.",
        },
      ],
    },
    frontend: {
      name: "Frontend",
      icon: "🎨",
      description: "프론트엔드 개발 전반에 관한 문제들",
      problems: [
        {
          id: "fe-001",
          title: "CSS Flexbox vs Grid 차이점",
          difficulty: "쉬움",
          avgTime: "12분",
          successRate: 78,
          participants: 345,
          tags: ["CSS", "Layout", "Flexbox", "Grid"],
          description:
            "CSS Flexbox와 Grid의 차이점과 각각의 사용 시나리오를 설명하세요.",
        },
        {
          id: "fe-002",
          title: "브라우저 렌더링 과정",
          difficulty: "보통",
          avgTime: "22분",
          successRate: 61,
          participants: 278,
          tags: ["Browser", "Rendering", "Performance"],
          description:
            "웹 브라우저가 HTML을 화면에 렌더링하는 전체 과정을 단계별로 설명하세요.",
        },
        {
          id: "fe-003",
          title: "SPA vs MPA 비교",
          difficulty: "보통",
          avgTime: "16분",
          successRate: 72,
          participants: 412,
          tags: ["SPA", "MPA", "Architecture"],
          description:
            "Single Page Application과 Multi Page Application의 차이점과 장단점을 비교하세요.",
        },
      ],
    },
    backend: {
      name: "Backend",
      icon: "⚙️",
      description: "백엔드 개발 및 서버 관련 문제들",
      problems: [
        {
          id: "be-001",
          title: "RESTful API 설계 원칙",
          difficulty: "보통",
          avgTime: "18분",
          successRate: 65,
          participants: 298,
          tags: ["REST", "API", "HTTP"],
          description:
            "RESTful API의 설계 원칙과 HTTP 메서드별 사용법을 설명하세요.",
        },
        {
          id: "be-002",
          title: "데이터베이스 정규화",
          difficulty: "어려움",
          avgTime: "25분",
          successRate: 48,
          participants: 156,
          tags: ["Database", "Normalization", "SQL"],
          description:
            "데이터베이스 정규화의 개념과 1NF, 2NF, 3NF의 차이점을 설명하세요.",
        },
      ],
    },
    javascript: {
      name: "JavaScript",
      icon: "🟨",
      description: "JavaScript 언어 핵심 개념 문제들",
      problems: [
        {
          id: "js-001",
          title: "JavaScript 클로저 개념",
          difficulty: "보통",
          avgTime: "15분",
          successRate: 58,
          participants: 567,
          tags: ["Closure", "Scope", "Function"],
          description:
            "JavaScript 클로저의 개념과 실제 활용 예시를 들어 설명하세요.",
        },
        {
          id: "js-002",
          title: "Hoisting과 TDZ",
          difficulty: "어려움",
          avgTime: "20분",
          successRate: 42,
          participants: 234,
          tags: ["Hoisting", "TDZ", "var", "let", "const"],
          description:
            "JavaScript의 Hoisting 현상과 Temporal Dead Zone에 대해 설명하세요.",
        },
        {
          id: "js-003",
          title: "Promise와 async/await",
          difficulty: "보통",
          avgTime: "18분",
          successRate: 71,
          participants: 445,
          tags: ["Promise", "async", "await", "비동기"],
          description:
            "Promise와 async/await의 차이점과 에러 처리 방법을 설명하세요.",
        },
      ],
    },
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];

  if (!currentCategory) {
    return (
      <div className='container mx-auto px-4 sm:px-6 py-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <Button variant='ghost' onClick={onBack} className='mb-8'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            뒤로가기
          </Button>
          <div className='bg-gray-50 dark:bg-slate-800 rounded-lg p-8'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              준비 중입니다
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              해당 카테고리의 문제들을 준비하고 있어요. 조만간 공개됩니다!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "보통":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "어려움":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800'>
      <div className='container mx-auto px-4 sm:px-6 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-center mb-8'>
            <Button variant='ghost' onClick={onBack} className='mr-4'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              뒤로가기
            </Button>
            <div className='flex items-center space-x-4'>
              <div className='text-4xl'>{currentCategory.icon}</div>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                  {currentCategory.name} 문제
                </h1>
                <p className='text-gray-600 dark:text-gray-300'>
                  {currentCategory.description}
                </p>
              </div>
            </div>
          </div>

          <div className='grid gap-6'>
            {currentCategory.problems.map((problem) => (
              <Card
                key={problem.id}
                className='border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800'
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg mb-2 dark:text-white'>
                        {problem.title}
                      </CardTitle>
                      <p className='text-gray-600 dark:text-gray-300 text-sm mb-3'>
                        {problem.description}
                      </p>
                      <div className='flex flex-wrap items-center gap-2'>
                        <Badge
                          className={getDifficultyColor(problem.difficulty)}
                        >
                          {problem.difficulty}
                        </Badge>
                        {problem.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant='outline'
                            className='text-xs'
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => onSelectProblem(problem.id)}
                      className='ml-4'
                    >
                      <Target className='w-4 h-4 mr-2' />
                      풀어보기
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex items-center'>
                        <Clock className='w-4 h-4 mr-1' />
                        평균 {problem.avgTime}
                      </div>
                      <div className='flex items-center'>
                        <Users className='w-4 h-4 mr-1' />
                        {problem.participants}명 참여
                      </div>
                      <div className='flex items-center'>
                        <Star className='w-4 h-4 mr-1' />
                        성공률 {problem.successRate}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {currentCategory.problems.length === 0 && (
            <div className='text-center py-12'>
              <div className='bg-gray-50 dark:bg-slate-800 rounded-lg p-8'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  문제를 준비하고 있어요
                </h3>
                <p className='text-gray-600 dark:text-gray-300'>
                  곧 다양한 {currentCategory.name} 문제들을 만나보실 수
                  있습니다!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProblems;

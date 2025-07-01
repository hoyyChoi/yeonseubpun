
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Zap, Flame } from "lucide-react";

interface DifficultySelectorProps {
  category: string;
  onSelect: (difficulty: string) => void;
  onBack: () => void;
}

const DifficultySelector = ({ category, onSelect, onBack }: DifficultySelectorProps) => {
  const categoryNames: { [key: string]: string } = {
    'javascript': 'JavaScript',
    'python': 'Python',
    'os': '운영체제',
    'network': '네트워크',
    'database': '데이터베이스',
    'algorithm': '알고리즘'
  };

  const difficulties = [
    {
      id: 'easy',
      name: '쉬움',
      icon: Star,
      color: 'from-green-400 to-green-600',
      description: '기본 개념과 간단한 문제',
      points: '10-30점',
      timeEstimate: '5-10분',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      id: 'medium',
      name: '보통',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      description: '실무에서 자주 마주치는 문제',
      points: '40-70점',
      timeEstimate: '10-20분',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      id: 'hard',
      name: '어려움',
      icon: Flame,
      color: 'from-red-400 to-red-600',
      description: '깊이 있는 이해가 필요한 문제',
      points: '80-100점',
      timeEstimate: '20-30분',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">난이도 선택</h1>
              <p className="text-gray-600 mt-2">
                <Badge variant="outline" className="mr-2">{categoryNames[category]}</Badge>
                어느 정도 난이도로 도전해볼까요?
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {difficulties.map((difficulty) => {
              const IconComponent = difficulty.icon;
              return (
                <Card 
                  key={difficulty.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm hover:scale-102"
                  onClick={() => onSelect(difficulty.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${difficulty.color} flex items-center justify-center text-white`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{difficulty.name}</h3>
                          <p className="text-gray-600 mt-1">{difficulty.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full ${difficulty.bgColor} ${difficulty.textColor} text-sm font-medium mb-2`}>
                          {difficulty.points}
                        </div>
                        <p className="text-sm text-gray-500">예상 소요시간: {difficulty.timeEstimate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 추천</h4>
            <p className="text-blue-700 text-sm">
              처음이시라면 <strong>쉬움</strong>부터 시작해서 기초를 다지고, 
              꾸준히 연습하시면서 단계적으로 난이도를 올려보세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;

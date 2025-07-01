
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CategorySelectorProps {
  onSelect: (category: string) => void;
  onBack: () => void;
}

const CategorySelector = ({ onSelect, onBack }: CategorySelectorProps) => {
  const categories = [
    { 
      id: 'javascript', 
      name: 'JavaScript', 
      icon: '🟨', 
      description: 'ES6+, 비동기, DOM 조작',
      problems: 156 
    },
    { 
      id: 'python', 
      name: 'Python', 
      icon: '🐍', 
      description: '문법, 라이브러리, 데이터 처리',
      problems: 142 
    },
    { 
      id: 'os', 
      name: '운영체제', 
      icon: '💻', 
      description: '프로세스, 메모리, 파일 시스템',
      problems: 89 
    },
    { 
      id: 'network', 
      name: '네트워크', 
      icon: '🌐', 
      description: 'HTTP/HTTPS, TCP/IP, DNS',
      problems: 73 
    },
    { 
      id: 'database', 
      name: '데이터베이스', 
      icon: '🗄️', 
      description: 'SQL, NoSQL, 정규화',
      problems: 95 
    },
    { 
      id: 'algorithm', 
      name: '알고리즘', 
      icon: '🧮', 
      description: '시간복잡도, 자료구조',
      problems: 128 
    }
  ];

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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">카테고리 선택</h1>
              <p className="text-gray-600 mt-2">어떤 기술 분야를 연습하고 싶나요?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm hover:scale-105"
                onClick={() => onSelect(category.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{category.icon}</div>
                      <div>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{category.problems}</p>
                      <p className="text-xs text-gray-500">문제</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">쉬움 40%</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">보통 35%</span>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">어려움 25%</span>
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

export default CategorySelector;

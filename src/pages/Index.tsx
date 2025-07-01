
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, Trophy, Calendar, Target, Zap } from "lucide-react";
import CategorySelector from "@/components/CategorySelector";
import DifficultySelector from "@/components/DifficultySelector";
import QuestionCard from "@/components/QuestionCard";
import GrassChart from "@/components/GrassChart";
import UserStats from "@/components/UserStats";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'home' | 'category' | 'difficulty' | 'question'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

  const handleStartPractice = () => {
    setCurrentStep('category');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentStep('difficulty');
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setCurrentStep('question');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  if (currentStep === 'category') {
    return <CategorySelector onSelect={handleCategorySelect} onBack={handleBackToHome} />;
  }

  if (currentStep === 'difficulty') {
    return <DifficultySelector 
      category={selectedCategory} 
      onSelect={handleDifficultySelect} 
      onBack={() => setCurrentStep('category')} 
    />;
  }

  if (currentStep === 'question') {
    return <QuestionCard 
      category={selectedCategory}
      difficulty={selectedDifficulty}
      onBack={() => setCurrentStep('difficulty')}
      onComplete={handleBackToHome}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                연습푼
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                <Trophy className="w-3 h-3 mr-1" />
                실버
              </Badge>
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Challenge */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">오늘의 한 문제</CardTitle>
                    <CardDescription className="text-blue-100">
                      매일 꾸준히 성장하는 개발자가 되어보세요
                    </CardDescription>
                  </div>
                  <div className="text-4xl opacity-20">
                    <Target />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleStartPractice}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  문제 풀러 가기
                </Button>
              </CardContent>
            </Card>

            {/* Categories Grid */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">기술 카테고리</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'JavaScript', icon: '🟨', count: 156 },
                  { name: 'Python', icon: '🐍', count: 142 },
                  { name: 'OS', icon: '💻', count: 89 },
                  { name: '네트워크', icon: '🌐', count: 73 },
                  { name: 'Database', icon: '🗄️', count: 95 },
                  { name: 'Algorithm', icon: '🧮', count: 128 },
                  { name: 'System Design', icon: '🏗️', count: 64 },
                  { name: 'Security', icon: '🔐', count: 47 }
                ].map((category) => (
                  <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.count}문제</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  최근 활동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { question: "HTTP와 HTTPS의 차이점", category: "네트워크", score: 87, grade: "골드" },
                    { question: "JavaScript 클로저 개념", category: "JavaScript", score: 92, grade: "플래티넘" },
                    { question: "프로세스와 쓰레드 차이", category: "OS", score: 74, grade: "실버" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{activity.question}</p>
                        <p className="text-sm text-gray-500">{activity.category}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {activity.grade}
                        </Badge>
                        <p className="text-sm text-gray-600">{activity.score}점</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UserStats />
            <GrassChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

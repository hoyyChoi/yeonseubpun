
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Trophy, Calendar, Target, Zap, Users, Star, User, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import CategorySelector from "@/components/CategorySelector";
import DifficultySelector from "@/components/DifficultySelector";
import QuestionCard from "@/components/QuestionCard";
import GrassChart from "@/components/GrassChart";
import UserStats from "@/components/UserStats";
import OnboardingModal from "@/components/OnboardingModal";
import CommunityTab from "@/components/CommunityTab";
import MyPage from "@/components/MyPage";
import CategoryProblems from "@/components/CategoryProblems";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'home' | 'category' | 'difficulty' | 'question' | 'community' | 'mypage' | 'category-problems'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'home' | 'community'>('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is new (you can use localStorage or other state management)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

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
    setActiveTab('home');
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentStep('category-problems');
  };

  const handleSelectProblem = (problemId: string) => {
    setSelectedDifficulty('보통'); // 기본값
    setCurrentStep('question');
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

  if (currentStep === 'community') {
    return <CommunityTab onBack={handleBackToHome} searchQuery={searchQuery} />;
  }

  if (currentStep === 'mypage') {
    return <MyPage onBack={handleBackToHome} />;
  }

  if (currentStep === 'category-problems') {
    return <CategoryProblems 
      category={selectedCategory} 
      onBack={handleBackToHome}
      onSelectProblem={handleSelectProblem}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={handleBackToHome}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  연습푼
                </h1>
                <div className="text-xs text-gray-500">기술 테스트 마스터하기</div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="문제, 토론 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Navigation */}
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value as 'home' | 'community');
              if (value === 'community') {
                setCurrentStep('community');
              } else {
                setCurrentStep('home');
              }
            }} className="w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="home" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>홈</span>
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>커뮤니티</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowOnboarding(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                도움말
              </Button>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                <Trophy className="w-3 h-3 mr-1" />
                실버
              </Badge>
              <Avatar 
                className="w-8 h-8 cursor-pointer"
                onClick={() => setCurrentStep('mypage')}
              >
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-purple-600 text-white">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Challenge */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2 font-bold">오늘의 한 문제</CardTitle>
                    <CardDescription className="text-indigo-100">
                      매일 꾸준히 성장하는 개발자가 되어보세요 ✨
                    </CardDescription>
                  </div>
                  <div className="text-4xl opacity-20">
                    <Target />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={handleStartPractice}
                    size="lg" 
                    className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold shadow-lg"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    문제 풀러 가기
                  </Button>
                  <div className="text-white/80 text-sm">
                    <div className="font-medium">연속 학습 7일째 🔥</div>
                    <div className="text-xs">목표까지 3문제 남음</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories Grid */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                기술 카테고리
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'JavaScript', icon: '🟨', count: 156, popular: true, id: 'javascript' },
                  { name: 'Python', icon: '🐍', count: 142, popular: true, id: 'python' },
                  { name: 'OS', icon: '💻', count: 89, popular: false, id: 'os' },
                  { name: '네트워크', icon: '🌐', count: 73, popular: false, id: 'network' },
                  { name: 'Database', icon: '🗄️', count: 95, popular: false, id: 'database' },
                  { name: 'Algorithm', icon: '🧮', count: 128, popular: true, id: 'algorithm' },
                  { name: 'System Design', icon: '🏗️', count: 64, popular: false, id: 'system' },
                  { name: 'Security', icon: '🔐', count: 47, popular: false, id: 'security' }
                ].map((category) => (
                  <Card 
                    key={category.name} 
                    className="hover:shadow-md transition-all duration-200 cursor-pointer border-0 shadow-sm hover:scale-105 relative"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">인기</Badge>
                    )}
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
                    { question: "HTTP와 HTTPS의 차이점", category: "네트워크", score: 4.5, grade: "골드", time: "2시간 전" },
                    { question: "JavaScript 클로저 개념", category: "JavaScript", score: 5, grade: "플래티넘", time: "1일 전" },
                    { question: "프로세스와 쓰레드 차이", category: "OS", score: 3.5, grade: "실버", time: "2일 전" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{activity.question}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{activity.category}</Badge>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {activity.grade}
                        </Badge>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(activity.score)
                                  ? 'text-yellow-400 fill-current'
                                  : i < activity.score
                                  ? 'text-yellow-400 fill-current opacity-50'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
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

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onClose={handleCloseOnboarding} />
    </div>
  );
};

export default Index;

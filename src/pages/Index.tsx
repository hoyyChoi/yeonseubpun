
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Trophy, Target, Zap, Users, Star, User, Search, TrendingUp, Flame, Award, Settings, Menu, X, Moon, Sun } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import CategorySelector from "@/components/CategorySelector";
import DifficultySelector from "@/components/DifficultySelector";
import QuestionCard from "@/components/QuestionCard";
import GrassChart from "@/components/GrassChart";
import OnboardingModal from "@/components/OnboardingModal";
import CommunityTab from "@/components/CommunityTab";
import MyPage from "@/components/MyPage";
import CategoryProblems from "@/components/CategoryProblems";
import SettingsPage from "@/components/SettingsPage";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'home' | 'category' | 'difficulty' | 'question' | 'community' | 'mypage' | 'category-problems' | 'settings'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'home' | 'community'>('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const userStats = {
    currentGrade: "골드",
    gradeEmoji: "🥇",
    totalSolved: 23,
    avgScore: 80,
    streak: 7,
    weeklyGoal: 5,
    weeklyProgress: 3,
    experiencePoints: 1240
  };

  // 테마 초기화 및 적용
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && systemDark);
    
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 테마 토글 함수
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  // 검색 기능 구현
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // 목데이터 기반 검색
    const mockSearchResults = [
      {
        type: 'problem',
        title: 'JavaScript 클로저 개념',
        category: 'javascript',
        difficulty: '보통',
        description: 'JavaScript에서 클로저란 무엇이며...'
      },
      {
        type: 'discussion',
        title: 'React Hook 사용 팁',
        author: '김개발자',
        replies: 12,
        description: 'useEffect를 사용할 때 주의사항...'
      },
      {
        type: 'problem',
        title: 'TypeScript 제네릭 활용',
        category: 'typescript',
        difficulty: '어려움',
        description: 'TypeScript 제네릭의 고급 활용법...'
      }
    ].filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockSearchResults);
    setShowSearchResults(true);
  };

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
    setMobileMenuOpen(false);
    setShowSearchResults(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentStep('category-problems');
  };

  const handleSelectProblem = (problemId: string) => {
    setSelectedDifficulty('보통');
    setCurrentStep('question');
  };

  const handleSolveProblem = (category?: string, difficulty?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (difficulty) {
      setSelectedDifficulty(difficulty);
    }
    setCurrentStep('question');
    setShowSearchResults(false);
  };

  const renderMainContent = () => {
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
      return <CommunityTab onBack={handleBackToHome} searchQuery={searchQuery} onSolveProblem={handleSolveProblem} />;
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

    if (currentStep === 'settings') {
      return <SettingsPage onBack={handleBackToHome} />;
    }

    return (
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl mb-2 font-bold">오늘의 기술 감각 테스트</CardTitle>
                    <CardDescription className="text-indigo-100">
                      하루 한 문제로 실력 유지하고 성장하세요 ✨
                    </CardDescription>
                  </div>
                  <div className="text-2xl sm:text-4xl opacity-20">
                    <Target />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    onClick={handleStartPractice}
                    size="lg" 
                    className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold shadow-lg w-full sm:w-auto"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    지식 점검하러 가기
                  </Button>
                  <div className="text-white/80 text-sm">
                    <div className="font-medium flex items-center">
                      <Flame className="w-4 h-4 mr-1" />
                      연속 학습 {userStats.streak}일째 🔥
                    </div>
                    <div className="text-xs">목표까지 {userStats.weeklyGoal - userStats.weeklyProgress}문제 남음</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 검색 결과 표시 */}
            {showSearchResults && (
              <Card className="border-0 shadow-lg dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between dark:text-white">
                    <span>검색 결과</span>
                    <Button variant="ghost" size="sm" onClick={() => setShowSearchResults(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {searchResults.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>검색 결과가 없습니다.</p>
                      <p className="text-sm mt-2">다른 키워드로 검색해보세요.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 dark:border-slate-600">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {result.type === 'problem' ? '문제' : '토론'}
                                </Badge>
                                {result.category && (
                                  <Badge variant="secondary" className="text-xs">
                                    {result.category}
                                  </Badge>
                                )}
                                {result.difficulty && (
                                  <Badge variant="outline" className="text-xs">
                                    {result.difficulty}
                                  </Badge>
                                )}
                              </div>
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">{result.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{result.description}</p>
                              {result.author && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                  {result.author} • 댓글 {result.replies}개
                                </p>
                              )}
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => result.type === 'problem' ? handleSolveProblem(result.category, result.difficulty) : null}
                            >
                              {result.type === 'problem' ? '풀어보기' : '보기'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                이번 주 인기 기술
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'React', icon: '⚛️', trend: '+15%', popular: true, id: 'react' },
                  { name: 'TypeScript', icon: '📘', trend: '+12%', popular: true, id: 'typescript' },
                  { name: 'Next.js', icon: '▲', trend: '+8%', popular: false, id: 'nextjs' },
                  { name: 'Docker', icon: '🐳', trend: '+6%', popular: false, id: 'docker' }
                ].map((tech) => (
                  <Card 
                    key={tech.name} 
                    className="hover:shadow-md transition-all duration-200 cursor-pointer border-0 shadow-sm hover:scale-105 relative dark:bg-slate-800"
                    onClick={() => handleCategoryClick(tech.id)}
                  >
                    {tech.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">HOT</Badge>
                    )}
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{tech.icon}</div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{tech.name}</h3>
                      <p className="text-sm text-green-600 font-medium">{tech.trend}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                분야별 기술 테스트
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Frontend', icon: '🎨', count: 156, category: 'frontend' },
                  { name: 'Backend', icon: '⚙️', count: 142, category: 'backend' },
                  { name: 'DevOps', icon: '🚀', count: 89, category: 'devops' },
                  { name: 'Mobile', icon: '📱', count: 73, category: 'mobile' },
                  { name: 'AI/ML', icon: '🤖', count: 95, category: 'ai' },
                  { name: 'Blockchain', icon: '⛓️', count: 47, category: 'blockchain' },
                  { name: 'Security', icon: '🔐', count: 64, category: 'security' },
                  { name: 'Database', icon: '🗄️', count: 128, category: 'database' }
                ].map((category) => (
                  <Card 
                    key={category.name} 
                    className="hover:shadow-md transition-all duration-200 cursor-pointer border-0 shadow-sm hover:scale-105 dark:bg-slate-800"
                    onClick={() => handleCategoryClick(category.category)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{category.count}문제</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  내 현황
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">
                    <div className="text-3xl mb-2">{userStats.gradeEmoji}</div>
                    <div className="font-bold text-blue-900 dark:text-blue-100">{userStats.currentGrade}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-300">현재 등급</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userStats.totalSolved}</div>
                    <div className="text-xs text-green-600 dark:text-green-300">해결한 문제</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{userStats.avgScore}</div>
                    <div className="text-xs text-purple-600 dark:text-purple-300">평균 점수</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{userStats.experiencePoints}</div>
                    <div className="text-xs text-orange-600 dark:text-orange-300">경험치</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <GrassChart />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={handleBackToHome}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  연습푼
                </h1>
                <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">기술 감각 테스트 플랫폼</div>
              </div>
            </div>
            
            {/* Desktop Search */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="문제, 토론, 답변 검색..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
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

              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowOnboarding(true)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                도움말
              </Button>

              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleTheme}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentStep('settings')}
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 border-0">
                {userStats.gradeEmoji} {userStats.currentGrade}
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

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t dark:border-slate-700">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="문제, 토론, 답변 검색..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    variant={activeTab === 'home' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => {
                      setActiveTab('home');
                      setCurrentStep('home');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    홈
                  </Button>
                  <Button
                    variant={activeTab === 'community' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => {
                      setActiveTab('community');
                      setCurrentStep('community');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    커뮤니티
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      setCurrentStep('mypage');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    마이페이지
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      setCurrentStep('settings');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    설정
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={toggleTheme}
                  >
                    {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    {isDarkMode ? '라이트 모드' : '다크 모드'}
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      setShowOnboarding(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    도움말
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {renderMainContent()}

      <OnboardingModal isOpen={showOnboarding} onClose={handleCloseOnboarding} />
    </div>
  );
};

export default Index;

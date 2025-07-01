
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Star, Calendar, Target, Trophy } from "lucide-react";

const CommunityTab = () => {
  const wrongAnswers = [
    {
      question: "JavaScript 클로저란 무엇인가요?",
      category: "JavaScript",
      difficulty: "보통",
      wrongRate: 73,
      myScore: 45
    },
    {
      question: "프로세스와 스레드의 차이점",
      category: "운영체제",
      difficulty: "어려움",
      wrongRate: 68,
      myScore: null
    },
    {
      question: "HTTP와 HTTPS의 차이점",
      category: "네트워크",
      difficulty: "쉬움",
      wrongRate: 52,
      myScore: 87
    }
  ];

  const challenges = [
    {
      title: "7일 연속 JavaScript 마스터",
      description: "JavaScript 문제를 7일 연속 풀기",
      participants: 1247,
      daysLeft: 3,
      progress: 71,
      joined: true
    },
    {
      title: "운영체제 깊이 파기",
      description: "운영체제 어려운 문제 10개 도전",
      participants: 892,
      daysLeft: 10,
      progress: 0,
      joined: false
    },
    {
      title: "면접 준비 30일 챌린지",
      description: "매일 다른 카테고리 문제 풀기",
      participants: 2156,
      daysLeft: 15,
      progress: 0,
      joined: false
    }
  ];

  const recommendations = [
    {
      title: "당신을 위한 맞춤 문제",
      problems: [
        { question: "React Hook의 종류와 사용법", category: "JavaScript", difficulty: "보통" },
        { question: "데이터베이스 인덱스의 작동 원리", category: "Database", difficulty: "어려움" },
        { question: "RESTful API 설계 원칙", category: "네트워크", difficulty: "보통" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">커뮤니티</h1>
            <p className="text-gray-600">함께 성장하고, 서로 도우며 실력을 향상시켜요</p>
          </div>

          <Tabs defaultValue="challenges" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="challenges">챌린지</TabsTrigger>
              <TabsTrigger value="wrong-answers">틀린 문제</TabsTrigger>
              <TabsTrigger value="recommendations">추천</TabsTrigger>
              <TabsTrigger value="community">커뮤니티</TabsTrigger>
            </TabsList>

            <TabsContent value="challenges" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Target className="w-6 h-6 text-blue-500" />
                        <Badge variant={challenge.joined ? "default" : "outline"}>
                          {challenge.joined ? "참여중" : "참여하기"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {challenge.participants.toLocaleString()}명 참여
                        </span>
                        <span className="text-blue-600 font-medium">{challenge.daysLeft}일 남음</span>
                      </div>
                      
                      {challenge.joined && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>진행률</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        className={`w-full ${challenge.joined ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        variant={challenge.joined ? "default" : "outline"}
                      >
                        {challenge.joined ? "계속하기" : "참여하기"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wrong-answers" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
                    많이 틀린 문제들
                  </CardTitle>
                  <p className="text-sm text-gray-600">다른 사용자들이 어려워하는 문제를 미리 연습해보세요</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wrongAnswers.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.question}</h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <Badge variant="outline">{item.category}</Badge>
                            <Badge variant="outline">{item.difficulty}</Badge>
                            <span className="text-red-600 font-medium">오답률 {item.wrongRate}%</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {item.myScore ? (
                            <div>
                              <div className="text-lg font-bold text-blue-600">{item.myScore}점</div>
                              <div className="text-xs text-gray-500">내 점수</div>
                            </div>
                          ) : (
                            <Button size="sm">도전하기</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    맞춤 추천 문제
                  </CardTitle>
                  <p className="text-sm text-gray-600">당신의 학습 패턴을 분석한 개인화 추천입니다</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recommendations.map((section, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                        <div className="grid gap-4">
                          {section.problems.map((problem, pIndex) => (
                            <div key={pIndex} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">{problem.question}</h4>
                                <div className="flex space-x-2">
                                  <Badge variant="outline">{problem.category}</Badge>
                                  <Badge variant="outline">{problem.difficulty}</Badge>
                                </div>
                              </div>
                              <Button size="sm">풀어보기</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      이번 주 TOP 사용자
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { rank: 1, name: "개발자김씨", score: 2847, streak: 15 },
                        { rank: 2, name: "코딩마스터", score: 2691, streak: 12 },
                        { rank: 3, name: "알고리즘러버", score: 2534, streak: 8 }
                      ].map((user) => (
                        <div key={user.rank} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'
                            }`}>
                              {user.rank}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.streak}일 연속</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{user.score.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">점수</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-500" />
                      오늘의 활동
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">1,234</div>
                        <p className="text-sm text-gray-500">명이 오늘 문제를 풀었어요</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold text-blue-600">567</div>
                          <p className="text-xs text-gray-500">새로운 기록</p>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-purple-600">89</div>
                          <p className="text-xs text-gray-500">완벽한 점수</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;

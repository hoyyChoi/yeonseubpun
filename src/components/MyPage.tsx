
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Calendar, Target, Star, BookOpen, Award, Users, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MyPageProps {
  onBack: () => void;
}

const MyPage = ({ onBack }: MyPageProps) => {
  const userStats = {
    name: "김개발",
    email: "kim@example.com",
    level: "골드",
    totalScore: 1847,
    solvedProblems: 23,
    streak: 7,
    averageScore: 78,
    rank: 156
  };

  const myStudyGroups = [
    {
      id: '1',
      name: '프론트엔드 마스터즈',
      members: 12,
      myRank: 2,
      weeklyProgress: 4,
      weeklyGoal: 5,
      currentChallenge: '주간 React 문제 풀기',
      status: 'active',
      badge: '🥈'
    },
    {
      id: '2',
      name: 'JavaScript 깊이파기',
      members: 8,
      myRank: 1,
      weeklyProgress: 3,
      weeklyGoal: 3,
      currentChallenge: '클로저 마스터하기',
      status: 'completed',
      badge: '🥇'
    }
  ];

  const recentActivity = [
    { question: "JavaScript 클로저 개념", score: 92, date: "2024-01-15", category: "JavaScript" },
    { question: "HTTP와 HTTPS 차이점", score: 87, date: "2024-01-14", category: "네트워크" },
    { question: "프로세스와 스레드 차이", score: 74, date: "2024-01-13", category: "OS" }
  ];

  const categoryStats = [
    { category: "JavaScript", solved: 8, total: 20, percentage: 40 },
    { category: "Python", solved: 5, total: 15, percentage: 33 },
    { category: "네트워크", solved: 6, total: 12, percentage: 50 },
    { category: "OS", solved: 4, total: 18, percentage: 22 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로가기
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">마이페이지</h1>
              <p className="text-gray-600 dark:text-gray-300">나의 학습 현황과 성과를 확인해보세요</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 프로필 카드 */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg dark:bg-slate-800">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        김개
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl dark:text-white">{userStats.name}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{userStats.email}</p>
                  <Badge className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Trophy className="w-3 h-3 mr-1" />
                    {userStats.level}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{userStats.totalScore}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">총 점수</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{userStats.rank}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">순위</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{userStats.solvedProblems}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">해결한 문제</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{userStats.streak}일</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">연속 학습</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 성취 배지 */}
              <Card className="border-0 shadow-sm mt-6 dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center dark:text-white">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    성취 배지
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔥</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">연속 7일</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🏆</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">골드 달성</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">⭐</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">첫 만점</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 통계 및 활동 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 내 스터디 그룹 */}
              <Card className="border-0 shadow-sm dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Users className="w-5 h-5 mr-2 text-indigo-600" />
                    내 스터디 그룹
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myStudyGroups.map((group) => (
                      <div key={group.id} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{group.badge}</div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{group.name}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                <Users className="w-4 h-4" />
                                <span>{group.members}명</span>
                                <Crown className="w-4 h-4" />
                                <span>내 순위: #{group.myRank}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                            {group.status === 'active' ? '진행중' : '완료'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          현재 챌린지: {group.currentChallenge}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          주간 진행: {group.weeklyProgress}/{group.weeklyGoal} 완료
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 카테고리별 통계 */}
              <Card className="border-0 shadow-sm dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    카테고리별 진척도
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryStats.map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium dark:text-white">{stat.category}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {stat.solved}/{stat.total} ({stat.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${stat.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 최근 활동 */}
              <Card className="border-0 shadow-sm dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                    최근 활동
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{activity.question}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">{activity.category}</Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{activity.score}점</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 목표 설정 */}
              <Card className="border-0 shadow-sm dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    이번 주 목표
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="dark:text-white">일일 문제 풀이</span>
                      <span className="text-green-600 font-medium">7/7 달성</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="dark:text-white">평균 점수 80점 이상</span>
                      <span className="text-blue-600 font-medium">78점</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

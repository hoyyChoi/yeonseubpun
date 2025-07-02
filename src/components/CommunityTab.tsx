
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageCircle, Heart, Star, Trophy, Users, TrendingUp, Award, Target, Clock, User, Flame, Medal, Crown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface CommunityTabProps {
  onBack: () => void;
  searchQuery: string;
  onSolveProblem: (category?: string, difficulty?: string) => void;
}

const CommunityTab = ({ onBack, searchQuery, onSolveProblem }: CommunityTabProps) => {
  const [activeTab, setActiveTab] = useState("discussions");
  const { toast } = useToast();

  const showComingSoon = (feature: string) => {
    toast({
      title: "준비 중입니다",
      description: `${feature} 기능을 준비하고 있어요. 조만간 만나보실 수 있습니다!`,
    });
  };

  const handleSolveProblem = (category: string, difficulty: string) => {
    onSolveProblem(category, difficulty);
  };

  const handleLike = (itemId: string) => {
    toast({
      title: "좋아요!",
      description: "관심을 표현해주셔서 감사합니다.",
    });
  };

  const mockDiscussions = [
    {
      id: 1,
      title: "React Hook의 의존성 배열에 대한 질문",
      author: "김개발자",
      category: "react",
      difficulty: "보통",
      content: "useEffect의 의존성 배열을 빈 배열로 둘 때와 생략할 때의 차이점이 궁금합니다.",
      replies: 12,
      likes: 24,
      timeAgo: "2시간 전",
      solved: true
    },
    {
      id: 2,
      title: "TypeScript 제네릭 활용 팁",
      author: "박타입스크립트",
      category: "typescript",
      difficulty: "어려움",
      content: "제네릭을 활용해서 타입 안전성을 높이는 방법에 대해 논의해봐요.",
      replies: 8,
      likes: 19,
      timeAgo: "5시간 전",
      solved: false
    },
    {
      id: 3,
      title: "JavaScript 클로저 실무 활용",
      author: "이자바스크립트",
      category: "javascript",
      difficulty: "보통",
      content: "클로저를 실제 프로젝트에서 어떻게 활용하고 계신가요?",
      replies: 15,
      likes: 31,
      timeAgo: "1일 전",
      solved: true
    }
  ];

  const mockRankings = [
    { rank: 1, name: "김개발자", score: 2840, badge: "👑", problems: 127, streak: 45 },
    { rank: 2, name: "박타입스크립트", score: 2650, badge: "🥇", problems: 119, streak: 32 },
    { rank: 3, name: "이자바스크립트", score: 2480, badge: "🥈", problems: 105, streak: 28 },
    { rank: 4, name: "최리액트", score: 2320, badge: "🥉", problems: 98, streak: 21 },
    { rank: 5, name: "정노드", score: 2180, badge: "🏅", problems: 89, streak: 19 }
  ];

  const mockStudyGroups = [
    {
      id: 1,
      name: "Frontend Masters",
      members: 24,
      currentChallenge: "React 30일 챌린지",
      progress: 78,
      myRank: 3,
      badge: "🚀"
    },
    {
      id: 2,
      name: "알고리즘 정복단",
      members: 18,
      currentChallenge: "일일 코테 문제",
      progress: 65,
      myRank: 7,
      badge: "🧠"
    },
    {
      id: 3,
      name: "백엔드 개발자 모임",
      members: 31,
      currentChallenge: "API 설계 스터디",
      progress: 45,
      myRank: 12,
      badge: "⚙️"
    }
  ];

  const competitionData = [
    {
      title: "개인 랭킹",
      description: "전체 사용자 중 내 순위",
      data: mockRankings,
      type: "individual"
    },
    {
      title: "스터디 그룹 순위",
      description: "그룹별 평균 점수 및 활동도",
      data: mockStudyGroups,
      type: "group"
    }
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">커뮤니티</h1>
              <p className="text-gray-600 dark:text-gray-300">함께 성장하는 개발자 커뮤니티</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="discussions">토론</TabsTrigger>
              <TabsTrigger value="ranking">랭킹</TabsTrigger>
              <TabsTrigger value="study">스터디</TabsTrigger>
              <TabsTrigger value="competition">경쟁</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="space-y-6">
              <div className="grid gap-6">
                {mockDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {discussion.difficulty}
                            </Badge>
                            {discussion.solved && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                                해결됨
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg mb-2 dark:text-white">{discussion.title}</CardTitle>
                          <CardDescription className="dark:text-gray-300">{discussion.content}</CardDescription>
                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {discussion.author}
                            </span>
                            <span>{discussion.timeAgo}</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button 
                            size="sm"
                            onClick={() => handleSolveProblem(discussion.category, discussion.difficulty)}
                          >
                            <Target className="w-4 h-4 mr-2" />
                            풀어보기
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => showComingSoon('다른 사람 풀이 보기')}
                          >
                            다른 풀이 보기
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLike(discussion.id.toString())}
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {discussion.likes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => showComingSoon('댓글')}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {discussion.replies}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ranking" className="space-y-6">
              <Card className="border-0 shadow-lg dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    전체 랭킹
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    실력과 활동도를 기반으로 한 종합 순위
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRankings.map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold text-gray-500 dark:text-gray-400 w-8">
                            #{user.rank}
                          </div>
                          <div className="text-2xl">{user.badge}</div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.problems}문제 해결 • {user.streak}일 연속
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {user.score.toLocaleString()}점
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="study" className="space-y-6">
              <div className="grid gap-6">
                {mockStudyGroups.map((group) => (
                  <Card key={group.id} className="border-0 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{group.badge}</div>
                          <div>
                            <CardTitle className="text-lg dark:text-white">{group.name}</CardTitle>
                            <CardDescription className="dark:text-gray-300">
                              {group.members}명 참여 • 내 순위: {group.myRank}위
                            </CardDescription>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => showComingSoon('스터디 그룹 참여')}
                        >
                          참여하기
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              현재 챌린지: {group.currentChallenge}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {group.progress}% 완료
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${group.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="competition" className="space-y-6">
              {competitionData.map((competition, index) => (
                <Card key={index} className="border-0 shadow-lg dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center dark:text-white">
                      <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                      {competition.title}
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      {competition.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {competition.type === 'individual' ? (
                        mockRankings.slice(0, 3).map((user) => (
                          <div key={user.rank} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl">{user.badge}</div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  <Flame className="w-4 h-4 inline mr-1" />
                                  {user.streak}일 연속 • {user.problems}문제
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                {user.score.toLocaleString()}점
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                #{user.rank}위
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        mockStudyGroups.slice(0, 3).map((group, idx) => (
                          <div key={group.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl">{group.badge}</div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{group.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  <Users className="w-4 h-4 inline mr-1" />
                                  {group.members}명 • {group.progress}% 진행
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                #{idx + 1}위 그룹
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Users,
  Star,
  Target,
  Trophy,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
  Crown,
  Medal,
  Award,
  Plus,
  Calendar,
  BarChart3,
  Zap,
  Clock,
  Activity
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CommunityTabProps {
  onBack?: () => void;
  searchQuery?: string;
}

const CommunityTab = ({ onBack, searchQuery = "" }: CommunityTabProps) => {
  const [newComment, setNewComment] = useState("");
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  // 스터디 관련 데이터
  const myGroups = [
    {
      id: '1',
      name: '프론트엔드 마스터즈',
      members: 12,
      weeklyGoal: 5,
      myProgress: 4,
      groupProgress: 65,
      rank: 2,
      badge: '🥈',
      category: 'Frontend'
    },
    {
      id: '2', 
      name: 'JavaScript 깊이파기',
      members: 8,
      weeklyGoal: 3,
      myProgress: 3,
      groupProgress: 80,
      rank: 1,
      badge: '🥇',
      category: 'JavaScript'
    }
  ];

  const availableGroups = [
    {
      id: '3',
      name: 'React 실무진들',
      members: 25,
      weeklyGoal: 7,
      averageScore: 85,
      category: 'React',
      isPrivate: false
    },
    {
      id: '4',
      name: '백엔드 개발자 모임',
      members: 18,
      weeklyGoal: 5,
      averageScore: 78,
      category: 'Backend',
      isPrivate: true
    }
  ];

  // 실시간 경쟁 데이터
  const liveCompetition = [
    { name: '프론트엔드 마스터즈', score: 2840, members: 12, badge: '🥇', trend: '+120' },
    { name: 'JavaScript 깊이파기', score: 2650, members: 8, badge: '🥈', trend: '+85' },
    { name: '백엔드 개발자 모임', score: 2340, members: 15, badge: '🥉', trend: '+67' }
  ];

  const personalRanking = [
    { name: '김개발', score: 420, problems: 28, badge: '👑', rank: 1, level: '골드' },
    { name: '박코딩', score: 385, problems: 25, badge: '🥈', rank: 2, level: '실버' },
    { name: '이프론트', score: 350, problems: 23, badge: '🥉', rank: 3, level: '실버' },
    { name: '나', score: 320, problems: 21, badge: '', rank: 4, level: '브론즈' }
  ];

  // 토론 데이터
  const discussions = [
    {
      id: 1,
      question: "JavaScript 클로저의 동작 원리",
      content: "클로저가 메모리에 어떻게 저장되는지 궁금합니다. 실행 컨텍스트와의 관계는?",
      author: "개발자김씨",
      time: "2시간 전",
      likes: 12,
      dislikes: 2,
      category: "JavaScript",
      difficulty: "어려움",
      problemId: "js-closure-001",
      comments: [
        {
          author: "코딩마스터",
          content: "렉시컬 환경에서 외부 변수 참조가 유지되는 메커니즘이에요!",
          time: "1시간 전",
        }
      ],
    },
    {
      id: 2,
      question: "HTTP/HTTPS 보안 차이점",
      content: "SSL/TLS 인증서 동작 과정이 복잡해서 이해가 어려워요.",
      author: "신입개발자",
      time: "4시간 전",
      likes: 8,
      dislikes: 0,
      category: "네트워크",
      difficulty: "보통",
      problemId: "network-https-001",
      comments: [
        {
          author: "보안전문가",
          content: "대칭키와 비대칭키의 조합으로 동작합니다!",
          time: "3시간 전",
        }
      ],
    }
  ];

  const handleSolveProblem = (problemId: string) => {
    console.log(`문제 풀기: ${problemId}`);
  };

  const handleCommentSubmit = (discussionId: number) => {
    if (newComment.trim()) {
      console.log(`댓글 추가: ${newComment} to discussion ${discussionId}`);
      setNewComment("");
    }
  };

  const handleViewOtherSolutions = (problemId: string) => {
    console.log(`다른 풀이 보기: ${problemId}`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800'>
      <div className='container mx-auto px-4 sm:px-6 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2'>커뮤니티</h1>
            <p className='text-gray-600 dark:text-gray-300'>함께 성장하고, 서로 도우며 실력을 향상시켜요</p>
          </div>

          <Tabs defaultValue='discussions' className='w-full'>
            <TabsList className='grid w-full grid-cols-5 mb-8'>
              <TabsTrigger value='discussions'>토론</TabsTrigger>
              <TabsTrigger value='study'>스터디</TabsTrigger>
              <TabsTrigger value='live-competition'>실시간 경쟁</TabsTrigger>
              <TabsTrigger value='ranking'>전체 랭킹</TabsTrigger>
              <TabsTrigger value='wrong-answers'>틀린 문제</TabsTrigger>
            </TabsList>

            <TabsContent value='discussions' className='space-y-6'>
              <Card className='border-0 shadow-sm dark:bg-slate-800'>
                <CardHeader>
                  <CardTitle className='flex items-center dark:text-white'>
                    <MessageCircle className='w-5 h-5 mr-2 text-blue-500' />
                    문제 토론 ({discussions.length}개)
                  </CardTitle>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    어려운 문제에 대해 함께 이야기해보세요
                  </p>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    {discussions.map((discussion) => (
                      <div
                        key={discussion.id}
                        className='border border-gray-200 dark:border-slate-600 rounded-lg p-4'
                      >
                        <div className='flex items-start justify-between mb-3'>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                              <Badge variant="outline" className="text-xs">{discussion.difficulty}</Badge>
                            </div>
                            <h3 className='font-medium text-gray-900 dark:text-white mb-1'>
                              {discussion.question}
                            </h3>
                            <p className='text-sm text-gray-600 dark:text-gray-300'>
                              {discussion.content}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button 
                              size="sm"
                              onClick={() => handleSolveProblem(discussion.problemId)}
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              문제 풀기
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewOtherSolutions(discussion.problemId)}
                            >
                              다른 풀이 보기
                            </Button>
                          </div>
                        </div>

                        <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3'>
                          <span>
                            {discussion.author} • {discussion.time}
                          </span>
                          <div className='flex items-center space-x-4'>
                            <button className='flex items-center space-x-1 hover:text-green-600'>
                              <ThumbsUp className='w-4 h-4' />
                              <span>{discussion.likes}</span>
                            </button>
                            <button className='flex items-center space-x-1 hover:text-red-600'>
                              <ThumbsDown className='w-4 h-4' />
                              <span>{discussion.dislikes}</span>
                            </button>
                          </div>
                        </div>

                        <div className='space-y-3'>
                          {discussion.comments.map((comment, commentIndex) => (
                            <div
                              key={commentIndex}
                              className='bg-gray-50 dark:bg-slate-700 p-3 rounded-lg ml-4'
                            >
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                {comment.content}
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                                {comment.author} • {comment.time}
                              </p>
                            </div>
                          ))}

                          <div className='flex space-x-2 ml-4'>
                            <Input
                              placeholder='댓글을 입력하세요...'
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className='flex-1 text-sm'
                            />
                            <Button
                              size='sm'
                              onClick={() => handleCommentSubmit(discussion.id)}
                            >
                              <Send className='w-4 h-4' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='study' className='space-y-6'>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-semibold dark:text-white">스터디 그룹</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="w-4 h-4 mr-2" />
                      그룹 만들기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="dark:bg-slate-800">
                    <DialogHeader>
                      <DialogTitle className="dark:text-white">새 스터디 그룹 만들기</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="그룹 이름" />
                      <Input placeholder="주간 목표 (문제 수)" type="number" />
                      <Button className="w-full">그룹 생성</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center dark:text-white">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      내 스터디 그룹
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {myGroups.length > 0 ? myGroups.map((group) => (
                      <div key={group.id} className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{group.badge}</div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                <Users className="w-4 h-4" />
                                <span>{group.members}명</span>
                                <Badge variant="outline">{group.category}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-indigo-600">#{group.rank}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">내 순위</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="dark:text-gray-300">주간 진행률 ({group.myProgress}/{group.weeklyGoal})</span>
                            <span className="dark:text-gray-300">{Math.round((group.myProgress / group.weeklyGoal) * 100)}%</span>
                          </div>
                          <Progress value={(group.myProgress / group.weeklyGoal) * 100} className="h-2" />
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">참여 중인 스터디 그룹이 없습니다</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">새로운 그룹을 만들거나 기존 그룹에 참여해보세요</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">참여 가능한 그룹</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {availableGroups.map((group) => (
                      <div key={group.id} className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                              {group.isPrivate && <Badge variant="secondary">비공개</Badge>}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {group.members}명
                              </div>
                              <div className="flex items-center">
                                <Target className="w-4 h-4 mr-1" />
                                주간 {group.weeklyGoal}문제
                              </div>
                            </div>
                          </div>
                          <Button size="sm">
                            {group.isPrivate ? '신청하기' : '참여하기'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value='live-competition' className='space-y-6'>
              <Card className="border-0 shadow-lg dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Activity className="w-5 h-5 mr-2 text-red-500" />
                    실시간 스터디 그룹 경쟁
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300">지금 이 순간 가장 활발한 그룹들</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {liveCompetition.map((group, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{group.badge}</div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{group.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{group.members}명 활동 중</div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {group.trend}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-indigo-600">{group.score.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">실시간 점수</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='ranking' className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Card className='border-0 shadow-sm dark:bg-slate-800'>
                  <CardHeader>
                    <CardTitle className='flex items-center dark:text-white'>
                      <Trophy className='w-5 h-5 mr-2 text-yellow-500' />
                      이번 주 TOP 사용자
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {personalRanking.map((user) => (
                        <div
                          key={user.rank}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            user.name === '나' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-slate-700'
                          }`}
                        >
                          <div className='flex items-center space-x-3'>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                user.rank === 1
                                  ? "bg-yellow-500"
                                  : user.rank === 2
                                  ? "bg-gray-400"
                                  : "bg-amber-600"
                              }`}
                            >
                              {user.rank}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className='font-medium dark:text-white'>{user.name}</p>
                                <Badge variant="outline" className="text-xs">{user.level}</Badge>
                              </div>
                              <p className='text-sm text-gray-500 dark:text-gray-400'>
                                {user.problems}문제 해결
                              </p>
                            </div>
                          </div>
                          <div className='text-right'>
                            <p className='font-bold text-blue-600'>
                              {user.score.toLocaleString()}
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>점수</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-0 shadow-sm dark:bg-slate-800'>
                  <CardHeader>
                    <CardTitle className='flex items-center dark:text-white'>
                      <Calendar className='w-5 h-5 mr-2 text-green-500' />
                      오늘의 활동
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='text-center'>
                        <div className='text-3xl font-bold text-green-600'>
                          1,234
                        </div>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          명이 오늘 문제를 풀었어요
                        </p>
                      </div>
                      <div className='grid grid-cols-2 gap-4 text-center'>
                        <div>
                          <div className='text-xl font-bold text-blue-600'>
                            567
                          </div>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>새로운 기록</p>
                        </div>
                        <div>
                          <div className='text-xl font-bold text-purple-600'>
                            89
                          </div>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>완벽한 점수</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value='wrong-answers' className='space-y-6'>
              <Card className='border-0 shadow-sm dark:bg-slate-800'>
                <CardHeader>
                  <CardTitle className='flex items-center dark:text-white'>
                    <TrendingUp className='w-5 h-5 mr-2 text-red-500' />
                    많이 틀린 문제들
                  </CardTitle>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    다른 사용자들이 어려워하는 문제를 미리 연습해보세요
                  </p>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {[
                      {
                        question: "JavaScript 클로저란 무엇인가요?",
                        category: "JavaScript",
                        difficulty: "보통",
                        wrongRate: 73,
                        myScore: 2.5,
                      },
                      {
                        question: "프로세스와 스레드의 차이점",
                        category: "운영체제",
                        difficulty: "어려움",
                        wrongRate: 68,
                        myScore: null,
                      }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors'
                      >
                        <div className='flex-1'>
                          <h3 className='font-medium text-gray-900 dark:text-white mb-1'>
                            {item.question}
                          </h3>
                          <div className='flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400'>
                            <Badge variant='outline'>{item.category}</Badge>
                            <Badge variant='outline'>{item.difficulty}</Badge>
                            <span className='text-red-600 font-medium'>
                              오답률 {item.wrongRate}%
                            </span>
                          </div>
                        </div>
                        <div className='text-right ml-4'>
                          {item.myScore ? (
                            <div>
                              <div className="flex items-center justify-end mb-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(item.myScore)
                                        ? 'text-yellow-400 fill-current'
                                        : i < item.myScore
                                        ? 'text-yellow-400 fill-current opacity-50'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <div className='text-xs text-gray-500 dark:text-gray-400'>내 점수</div>
                            </div>
                          ) : (
                            <Button size='sm'>도전하기</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;

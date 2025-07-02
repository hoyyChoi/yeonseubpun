import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  TrendingUp,
  Users,
  Star,
  Calendar,
  Target,
  Trophy,
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
  Search,
  Filter,
} from "lucide-react";
import ChallengeModal from "./ChallengeModal";

interface CommunityTabProps {
  onBack?: () => void;
  searchQuery?: string;
}

const CommunityTab = ({ onBack, searchQuery = "" }: CommunityTabProps) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [filterCategory, setFilterCategory] = useState("all");

  const groupChallenges = [
    {
      title: "JavaScript 마스터 그룹 챌린지",
      description: "스터디 그룹별로 JavaScript 문제 해결 경쟁",
      participants: 1247,
      groups: 8,
      daysLeft: 3,
      progress: 71,
      joined: true,
      myGroup: "코딩 킹덤",
      groupRank: 2,
      topGroups: [
        { name: "알고리즘 마스터", score: 2840, members: 12 },
        { name: "코딩 킹덤", score: 2650, members: 8 },
        { name: "개발자 연합", score: 2340, members: 15 }
      ]
    },
    {
      title: "운영체제 깊이 파기",
      description: "운영체제 어려운 문제 10개 도전",
      participants: 892,
      daysLeft: 10,
      progress: 0,
      joined: false,
    },
    {
      title: "기술 테스트 30일 챌린지",
      description: "매일 다른 카테고리 문제 풀기",
      participants: 2156,
      daysLeft: 15,
      progress: 0,
      joined: false,
    },
  ];

  const discussions = [
    {
      id: 1,
      question: "JavaScript 클로저 문제",
      content: "이 문제 정말 어려워요. 클로저 개념이 헷갈려요. 어떻게 접근해야 할까요?",
      author: "개발자김씨",
      time: "2시간 전",
      likes: 12,
      dislikes: 2,
      category: "JavaScript",
      difficulty: "어려움",
      comments: [
        {
          author: "코딩마스터",
          content: "저도 처음에 어려웠는데, 실행 컨텍스트를 이해하면 도움이 돼요!",
          time: "1시간 전",
        },
        {
          author: "알고리즘러버",
          content: "MDN 문서 참고하시면 좋은 예제들이 많아요",
          time: "30분 전",
        },
      ],
    },
    {
      id: 2,
      question: "HTTP/HTTPS 차이점 문제",
      content: "보안 관련 부분이 너무 복잡해요. 좀 더 쉬운 설명 있을까요?",
      author: "신입개발자",
      time: "4시간 전",
      likes: 8,
      dislikes: 0,
      category: "네트워크",
      difficulty: "보통",
      comments: [
        {
          author: "보안전문가",
          content: "SSL/TLS 인증서 개념부터 차근차근 공부해보세요!",
          time: "3시간 전",
        },
      ],
    },
  ];

  const wrongAnswers = [
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
    },
    {
      question: "HTTP와 HTTPS의 차이점",
      category: "네트워크",
      difficulty: "쉬움",
      wrongRate: 52,
      myScore: 4.5,
    },
  ];

  const recommendations = [
    {
      title: "당신을 위한 맞춤 문제",
      problems: [
        {
          question: "React Hook의 종류와 사용법",
          category: "JavaScript",
          difficulty: "보통",
        },
        {
          question: "데이터베이스 인덱스의 작동 원리",
          category: "Database",
          difficulty: "어려움",
        },
        {
          question: "RESTful API 설계 원칙",
          category: "네트워크",
          difficulty: "보통",
        },
      ],
    },
  ];

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setShowChallengeModal(true);
  };

  const handleCommentSubmit = (discussionId) => {
    if (newComment.trim()) {
      console.log(`댓글 추가: ${newComment} to discussion ${discussionId}`);
      setNewComment("");
    }
  };

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = !localSearchQuery || 
      discussion.question.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(localSearchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || discussion.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      <div className='container mx-auto px-6 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>커뮤니티</h1>
              <p className='text-gray-600'>함께 성장하고, 서로 도우며 실력을 향상시켜요</p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="검색..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">전체 카테고리</option>
                <option value="JavaScript">JavaScript</option>
                <option value="네트워크">네트워크</option>
                <option value="운영체제">운영체제</option>
                <option value="Database">Database</option>
              </select>
            </div>
          </div>

          <Tabs defaultValue='challenges' className='w-full'>
            <TabsList className='grid w-full grid-cols-5 mb-8'>
              <TabsTrigger value='challenges'>그룹 챌린지</TabsTrigger>
              <TabsTrigger value='discussions'>토론</TabsTrigger>
              <TabsTrigger value='wrong-answers'>틀린 문제</TabsTrigger>
              <TabsTrigger value='recommendations'>추천</TabsTrigger>
              <TabsTrigger value='community'>커뮤니티</TabsTrigger>
            </TabsList>

            <TabsContent value='challenges' className='space-y-6'>
              {/* Group Challenge Feature */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    스터디 그룹 경쟁
                  </CardTitle>
                  <p className="text-indigo-100">그룹별로 경쟁하며 함께 성장해보세요!</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">8개</div>
                      <div className="text-sm text-indigo-200">참여 그룹</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">124명</div>
                      <div className="text-sm text-indigo-200">총 참여자</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">#2</div>
                      <div className="text-sm text-indigo-200">우리 그룹 순위</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {groupChallenges.map((challenge, index) => (
                  <Card
                    key={index}
                    className='border-0 shadow-sm hover:shadow-md transition-shadow'
                  >
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <Target className='w-6 h-6 text-blue-500' />
                        <Badge variant={challenge.joined ? "default" : "outline"}>
                          {challenge.joined ? "참여중" : "참여하기"}
                        </Badge>
                      </div>
                      <CardTitle className='text-lg'>{challenge.title}</CardTitle>
                      <p className='text-sm text-gray-600'>{challenge.description}</p>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='flex items-center text-gray-500'>
                          <Users className='w-4 h-4 mr-1' />
                          {challenge.participants?.toLocaleString()}명 참여
                        </span>
                        <span className='text-blue-600 font-medium'>
                          {challenge.daysLeft}일 남음
                        </span>
                      </div>

                      {challenge.joined && challenge.topGroups && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">그룹 순위</h4>
                          {challenge.topGroups.slice(0, 3).map((group, idx) => (
                            <div key={idx} className={`flex justify-between items-center text-xs p-2 rounded ${
                              group.name === challenge.myGroup ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                            }`}>
                              <span className="flex items-center">
                                <span className={`w-4 h-4 rounded-full text-white text-xs flex items-center justify-center mr-2 ${
                                  idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-amber-600'
                                }`}>
                                  {idx + 1}
                                </span>
                                {group.name}
                                {group.name === challenge.myGroup && <span className="ml-1 text-blue-600">(내 그룹)</span>}
                              </span>
                              <span className="font-bold">{group.score}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {challenge.joined && (
                        <div className='space-y-2'>
                          <div className='flex justify-between text-sm'>
                            <span>진행률</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <div className='w-full bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-blue-500 h-2 rounded-full'
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <Button
                        className={`w-full ${challenge.joined ? "bg-green-600 hover:bg-green-700" : ""}`}
                        variant={challenge.joined ? "default" : "outline"}
                        onClick={() => handleChallengeClick(challenge)}
                      >
                        {challenge.joined ? "계속하기" : "참여하기"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value='discussions' className='space-y-6'>
              <Card className='border-0 shadow-sm'>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <MessageCircle className='w-5 h-5 mr-2 text-blue-500' />
                    문제 토론 ({filteredDiscussions.length}개)
                  </CardTitle>
                  <p className='text-sm text-gray-600'>
                    어려운 문제에 대해 함께 이야기해보세요
                  </p>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    {filteredDiscussions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        검색 결과가 없습니다.
                      </div>
                    ) : (
                      filteredDiscussions.map((discussion) => (
                        <div
                          key={discussion.id}
                          className='border border-gray-200 rounded-lg p-4'
                        >
                          <div className='flex items-start justify-between mb-3'>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                                <Badge variant="outline" className="text-xs">{discussion.difficulty}</Badge>
                              </div>
                              <h3 className='font-medium text-gray-900 mb-1'>
                                {discussion.question}
                              </h3>
                              <p className='text-sm text-gray-600'>
                                {discussion.content}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center justify-between text-sm text-gray-500 mb-3'>
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
                                className='bg-gray-50 p-3 rounded-lg ml-4'
                              >
                                <p className='text-sm text-gray-800'>
                                  {comment.content}
                                </p>
                                <p className='text-xs text-gray-500 mt-1'>
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
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='wrong-answers' className='space-y-6'>
              <Card className='border-0 shadow-sm'>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <TrendingUp className='w-5 h-5 mr-2 text-red-500' />
                    많이 틀린 문제들
                  </CardTitle>
                  <p className='text-sm text-gray-600'>
                    다른 사용자들이 어려워하는 문제를 미리 연습해보세요
                  </p>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {wrongAnswers.map((item, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                      >
                        <div className='flex-1'>
                          <h3 className='font-medium text-gray-900 mb-1'>
                            {item.question}
                          </h3>
                          <div className='flex items-center space-x-3 text-sm text-gray-500'>
                            <Badge variant='outline'>{item.category}</Badge>
                            <Badge variant='outline'>{item.difficulty}</Badge>
                            <span className='text-red-600 font-medium'>
                              오답률 {item.wrongRate}%
                            </span>
                          </div>
                        </div>
                        <div className='text-right'>
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
                              <div className='text-xs text-gray-500'>내 점수</div>
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

            <TabsContent value='recommendations' className='space-y-6'>
              <Card className='border-0 shadow-sm'>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Star className='w-5 h-5 mr-2 text-yellow-500' />
                    맞춤 추천 문제
                  </CardTitle>
                  <p className='text-sm text-gray-600'>
                    당신의 학습 패턴을 분석한 개인화 추천입니다
                  </p>
                </CardHeader>
                <CardContent>
                  <div className='space-y-6'>
                    {recommendations.map((section, index) => (
                      <div key={index}>
                        <h3 className='font-semibold text-gray-900 mb-4'>
                          {section.title}
                        </h3>
                        <div className='grid gap-4'>
                          {section.problems.map((problem, pIndex) => (
                            <div
                              key={pIndex}
                              className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                            >
                              <div>
                                <h4 className='font-medium text-gray-900 mb-1'>
                                  {problem.question}
                                </h4>
                                <div className='flex space-x-2'>
                                  <Badge variant='outline'>
                                    {problem.category}
                                  </Badge>
                                  <Badge variant='outline'>
                                    {problem.difficulty}
                                  </Badge>
                                </div>
                              </div>
                              <Button size='sm'>풀어보기</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='community' className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Card className='border-0 shadow-sm'>
                  <CardHeader>
                    <CardTitle className='flex items-center'>
                      <Trophy className='w-5 h-5 mr-2 text-yellow-500' />
                      이번 주 TOP 사용자
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {[
                        {
                          rank: 1,
                          name: "개발자김씨",
                          score: 2847,
                          streak: 15,
                        },
                        {
                          rank: 2,
                          name: "코딩마스터",
                          score: 2691,
                          streak: 12,
                        },
                        {
                          rank: 3,
                          name: "알고리즘러버",
                          score: 2534,
                          streak: 8,
                        },
                      ].map((user) => (
                        <div
                          key={user.rank}
                          className='flex items-center justify-between'
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
                              <p className='font-medium'>{user.name}</p>
                              <p className='text-sm text-gray-500'>
                                {user.streak}일 연속
                              </p>
                            </div>
                          </div>
                          <div className='text-right'>
                            <p className='font-bold text-blue-600'>
                              {user.score.toLocaleString()}
                            </p>
                            <p className='text-xs text-gray-500'>점수</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-0 shadow-sm'>
                  <CardHeader>
                    <CardTitle className='flex items-center'>
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
                        <p className='text-sm text-gray-500'>
                          명이 오늘 문제를 풀었어요
                        </p>
                      </div>
                      <div className='grid grid-cols-2 gap-4 text-center'>
                        <div>
                          <div className='text-xl font-bold text-blue-600'>
                            567
                          </div>
                          <p className='text-xs text-gray-500'>새로운 기록</p>
                        </div>
                        <div>
                          <div className='text-xl font-bold text-purple-600'>
                            89
                          </div>
                          <p className='text-xs text-gray-500'>완벽한 점수</p>
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

      <ChallengeModal
        isOpen={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        challenge={selectedChallenge}
      />
    </div>
  );
};

export default CommunityTab;

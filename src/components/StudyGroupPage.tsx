import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Trophy,
  Target,
  Calendar,
  Crown,
  Medal,
  Award,
  Plus,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StudyGroupPageProps {
  onBack: () => void;
}

const StudyGroupPage = ({ onBack }: StudyGroupPageProps) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const myGroups = [
    {
      id: "1",
      name: "프론트엔ㄷㄷㄷ드 마스터즈ㅈㄷㄹㅈㄷㄹㅈㄷㄹㅈㄷㄹ",
      members: 12,
      weeklyGoal: 5,
      myProgress: 4,
      groupProgress: 65,
      rank: 2,
      badge: "🥈",
      category: "Frontend",
    },
    {
      id: "2",
      name: "JavaScript 깊이파기",
      members: 8,
      weeklyGoal: 3,
      myProgress: 3,
      groupProgress: 80,
      rank: 1,
      badge: "🥇",
      category: "JavaScript",
    },
  ];

  const availableGroups = [
    {
      id: "3",
      name: "React 실무진들",
      members: 25,
      weeklyGoal: 7,
      averageScore: 85,
      category: "React",
      isPrivate: false,
    },
    {
      id: "4",
      name: "백엔드 개발자 모임",
      members: 18,
      weeklyGoal: 5,
      averageScore: 78,
      category: "Backend",
      isPrivate: true,
    },
    {
      id: "5",
      name: "취준생 스터디",
      members: 45,
      weeklyGoal: 10,
      averageScore: 72,
      category: "All",
      isPrivate: false,
    },
  ];

  const leaderboard = [
    { name: "김개발", score: 420, problems: 28, badge: "👑", rank: 1 },
    { name: "박코딩", score: 385, problems: 25, badge: "🥈", rank: 2 },
    { name: "이프론트", score: 350, problems: 23, badge: "🥉", rank: 3 },
    { name: "나", score: 320, problems: 21, badge: "", rank: 4 },
    { name: "최백엔드", score: 285, problems: 19, badge: "", rank: 5 },
  ];

  return (
    <div className='container mx-auto px-6 py-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* 헤더 */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>스터디 그룹</h1>
            <p className='text-gray-600 mt-2'>
              함께 성장하는 개발자들과 경쟁하고 학습하세요
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-indigo-600 hover:bg-indigo-700'>
                <Plus className='w-4 h-4 mr-2' />
                그룹 만들기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 스터디 그룹 만들기</DialogTitle>
              </DialogHeader>
              <div className='space-y-4'>
                <Input placeholder='그룹 이름' />
                <Input placeholder='주간 목표 (문제 수)' type='number' />
                <Button className='w-full'>그룹 생성</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* 내 그룹들 */}
          <div className='lg:col-span-2 space-y-6'>
            <Card className='border-0 shadow-lg'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Trophy className='w-5 h-5 mr-2 text-yellow-500' />내 스터디
                  그룹
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {myGroups.map((group) => (
                  <div
                    key={group.id}
                    className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center space-x-3'>
                        <div className='text-2xl'>{group.badge}</div>
                        <div>
                          <h3 className='font-semibold text-gray-900'>
                            {group.name}
                          </h3>
                          <div className='flex items-center space-x-2 text-sm text-gray-500'>
                            <Users className='w-4 h-4' />
                            <span>{group.members}명</span>
                            <Badge variant='outline'>{group.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='text-lg font-bold text-indigo-600'>
                          #{group.rank}
                        </div>
                        <div className='text-xs text-gray-500'>내 순위</div>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex justify-between text-sm'>
                        <span>
                          주간 진행률 ({group.myProgress}/{group.weeklyGoal})
                        </span>
                        <span>
                          {Math.round(
                            (group.myProgress / group.weeklyGoal) * 100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(group.myProgress / group.weeklyGoal) * 100}
                        className='h-2'
                      />

                      <div className='flex justify-between text-sm'>
                        <span>그룹 전체 진행률</span>
                        <span>{group.groupProgress}%</span>
                      </div>
                      <Progress value={group.groupProgress} className='h-2' />
                    </div>

                    <Button
                      variant='outline'
                      size='sm'
                      className='mt-3'
                      onClick={() => setSelectedGroup(group.id)}
                    >
                      상세보기
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 참여 가능한 그룹들 */}
            <Card className='border-0 shadow-lg'>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Search className='w-5 h-5 mr-2 text-blue-500' />
                    참여 가능한 그룹
                  </div>
                  <Input
                    placeholder='그룹 검색...'
                    className='w-64'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {availableGroups.map((group) => (
                  <div
                    key={group.id}
                    className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='flex items-center space-x-2 mb-2'>
                          <h3 className='font-semibold text-gray-900'>
                            {group.name}
                          </h3>
                          {group.isPrivate && (
                            <Badge variant='secondary'>비공개</Badge>
                          )}
                        </div>
                        <div className='flex items-center space-x-4 text-sm text-gray-500'>
                          <div className='flex items-center'>
                            <Users className='w-4 h-4 mr-1' />
                            {group.members}명
                          </div>
                          <div className='flex items-center'>
                            <Target className='w-4 h-4 mr-1' />
                            주간 {group.weeklyGoal}문제
                          </div>
                          <div className='flex items-center'>
                            <Trophy className='w-4 h-4 mr-1' />
                            평균 {group.averageScore}점
                          </div>
                          <Badge variant='outline'>{group.category}</Badge>
                        </div>
                      </div>
                      <Button size='sm'>
                        {group.isPrivate ? "신청하기" : "참여하기"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 - 리더보드 */}
          <div className='space-y-6'>
            <Card className='border-0 shadow-lg'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Crown className='w-5 h-5 mr-2 text-yellow-500' />
                  이번 주 리더보드
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {leaderboard.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === "나"
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className='flex items-center space-x-3'>
                      <div className='text-lg'>
                        {user.badge || `#${user.rank}`}
                      </div>
                      <div>
                        <div className='font-medium text-gray-900'>
                          {user.name}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {user.problems}문제 해결
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='font-bold text-indigo-600'>
                        {user.score}
                      </div>
                      <div className='text-xs text-gray-500'>점수</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 그룹 보상 시스템 */}
            <Card className='border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50'>
              <CardHeader>
                <CardTitle className='flex items-center text-orange-900'>
                  <Award className='w-5 h-5 mr-2' />
                  이번 주 보상
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between p-2 bg-white/50 rounded'>
                  <span className='text-sm'>👑 MVP 뱃지</span>
                  <span className='text-xs text-gray-600'>1등</span>
                </div>
                <div className='flex items-center justify-between p-2 bg-white/50 rounded'>
                  <span className='text-sm'>🏆 풀이왕 뱃지</span>
                  <span className='text-xs text-gray-600'>최다 문제</span>
                </div>
                <div className='flex items-center justify-between p-2 bg-white/50 rounded'>
                  <span className='text-sm'>⚡ 꾸준왕 뱃지</span>
                  <span className='text-xs text-gray-600'>연속 7일</span>
                </div>
                <div className='flex items-center justify-between p-2 bg-white/50 rounded'>
                  <span className='text-sm'>💎 경험치 +100</span>
                  <span className='text-xs text-gray-600'>목표 달성</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupPage;

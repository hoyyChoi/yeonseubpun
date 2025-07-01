
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, Target, Calendar } from "lucide-react";

const UserStats = () => {
  const stats = {
    currentGrade: "실버",
    gradeProgress: 67,
    totalSolved: 23,
    avgScore: 78,
    streak: 7,
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const gradeEmojis: { [key: string]: string } = {
    "브론즈": "🥉",
    "실버": "🥈", 
    "골드": "🥇",
    "플래티넘": "💎"
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          나의 성장
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Grade */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-2xl mb-1">{gradeEmojis[stats.currentGrade]}</div>
          <div className="font-semibold text-gray-900">{stats.currentGrade} 등급</div>
          <div className="text-sm text-gray-600 mt-2">골드까지 {100 - stats.gradeProgress}% 남음</div>
          <Progress value={stats.gradeProgress} className="mt-2 h-2" />
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalSolved}</div>
            <div className="text-xs text-gray-500">해결한 문제</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.avgScore}</div>
            <div className="text-xs text-gray-500">평균 점수</div>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-orange-900">연속 학습</span>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            {stats.streak}일 🔥
          </Badge>
        </div>

        {/* Weekly Goal */}
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Target className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-900">주간 목표</span>
            </div>
            <span className="text-sm text-green-700">{stats.weeklyProgress}/{stats.weeklyGoal}</span>
          </div>
          <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-2" />
        </div>

        {/* Trending */}
        <div className="flex items-center justify-center text-sm text-gray-600">
          <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
          이번 주 평균 점수가 12% 상승했어요!
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;

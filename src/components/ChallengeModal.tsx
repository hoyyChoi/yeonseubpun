
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar, Target, Trophy } from "lucide-react";

interface Challenge {
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  progress: number;
  joined: boolean;
}

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge | null;
}

const ChallengeModal = ({ isOpen, onClose, challenge }: ChallengeModalProps) => {
  const [isJoining, setIsJoining] = useState(false);

  if (!challenge) return null;

  const handleJoin = () => {
    setIsJoining(true);
    setTimeout(() => {
      setIsJoining(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            {challenge.title}
          </DialogTitle>
          <DialogDescription>
            {challenge.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <div className="text-lg font-bold text-blue-600">{challenge.participants.toLocaleString()}</div>
              <div className="text-xs text-gray-500">참여자</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 mx-auto mb-1 text-green-600" />
              <div className="text-lg font-bold text-green-600">{challenge.daysLeft}일</div>
              <div className="text-xs text-gray-500">남음</div>
            </div>
          </div>

          {challenge.joined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>내 진행률</span>
                <span>{challenge.progress}%</span>
              </div>
              <Progress value={challenge.progress} className="h-2" />
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center">
              <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
              챌린지 보상
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 완주 시 특별 배지 획득</li>
              <li>• 경험치 +500 보너스</li>
              <li>• 리더보드 등록</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button 
              onClick={handleJoin} 
              className="flex-1"
              disabled={isJoining}
            >
              {isJoining ? "참여 중..." : challenge.joined ? "계속하기" : "참여하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeModal;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const YouthGrowthTracker = () => {
  const tasks = [
    { id: 1, title: 'Help elder with weekly shopping', tokens: 5, completed: true, category: 'Elder Care' },
    { id: 2, title: 'Tutor younger cousin in Mathematics', tokens: 8, completed: true, category: 'Education' },
    { id: 3, title: 'Attend clan meeting', tokens: 3, completed: false, category: 'Participation' },
    { id: 4, title: 'Assist with land documentation', tokens: 10, completed: false, category: 'Legal' },
  ];

  const achievements = [
    { title: 'Elder Supporter', description: '10 elder assistance tasks completed', icon: '🧓', unlocked: true },
    { title: 'Knowledge Sharer', description: '5 tutoring sessions completed', icon: '📚', unlocked: true },
    { title: 'Community Voice', description: 'Attend 5 clan meetings', icon: '🗣️', unlocked: false },
    { title: 'Heritage Keeper', description: 'Document 3 family stories', icon: '📜', unlocked: false },
  ];

  const totalTokens = 156;
  const currentLevel = Math.floor(totalTokens / 50) + 1;
  const progressToNext = (totalTokens % 50) / 50 * 100;

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🪴</span>
            <span>Youth Growth Tracker</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Track contributions, earn ClanTokens, and unlock opportunities
          </p>
        </CardHeader>
        <CardContent>
          {/* Growth Progress */}
          <Card className="mb-6 bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Growth Level {currentLevel}</h3>
                  <p className="text-sm text-muted-foreground">🪙 {totalTokens} ClanTokens earned</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse-ubuntu">
                    <span className="text-2xl">🌳</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {currentLevel + 1}</span>
                  <span>{Math.round(progressToNext)}%</span>
                </div>
                <Progress value={progressToNext} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Available Tasks */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">👣 Available Tasks</h3>
            <div className="space-y-3">
              {tasks.map(task => (
                <Card key={task.id} className={`transition-all hover:shadow-md ${
                  task.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white'
                }`}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{task.category}</Badge>
                          {task.completed && <span className="text-emerald-500">✓</span>}
                        </div>
                        <h4 className="font-medium mt-1">{task.title}</h4>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">+{task.tokens} 🪙</p>
                        {!task.completed && (
                          <Button size="sm" className="mt-2">Mark Complete</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-semibold mb-4">🏆 Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`transition-all ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}>
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="ml-auto bg-emerald-500">Unlocked!</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

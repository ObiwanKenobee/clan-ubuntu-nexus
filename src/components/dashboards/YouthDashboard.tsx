
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Star, BookOpen, Coins, Camera, Award } from 'lucide-react';

export const YouthDashboard = () => {
  const [todaysTasks] = useState([
    { id: 1, title: 'Help elder with weekly shopping', tokens: 5, completed: false, category: 'Elder Care' },
    { id: 2, title: 'Tutor younger cousin in Mathematics', tokens: 8, completed: true, category: 'Education' },
    { id: 3, title: 'Attend clan meeting', tokens: 3, completed: false, category: 'Participation' }
  ]);

  const [growthStats] = useState({
    totalTokens: 156,
    currentLevel: 3,
    progressToNext: 72,
    completedTasks: 23,
    trustScore: 85
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-background to-primary-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse-ubuntu">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Youth Growth Hub</h1>
              <p className="text-muted-foreground">Earn Trust • Grow Identity • Seek Opportunity</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-500">Task Achiever</Badge>
            <Badge variant="outline">Level {growthStats.currentLevel}</Badge>
            <Badge variant="outline">{growthStats.totalTokens} 🪙 ClanTokens</Badge>
          </div>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="tasks">Today's Tasks</TabsTrigger>
            <TabsTrigger value="growth">Growth Progress</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="memory">Add Memory</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            {/* Growth Progress Card */}
            <Card className="bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Growth Level {growthStats.currentLevel}</h3>
                    <p className="text-sm text-muted-foreground">🪙 {growthStats.totalTokens} ClanTokens earned</p>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse-ubuntu">
                      <span className="text-2xl">🌱</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {growthStats.currentLevel + 1}</span>
                    <span>{growthStats.progressToNext}%</span>
                  </div>
                  <Progress value={growthStats.progressToNext} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-emerald-500" />
                  <span>Today's Tasks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysTasks.map(task => (
                    <div key={task.id} className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                      task.completed ? 'bg-emerald-50 border-emerald-200 border' : 'bg-gray-50'
                    }`}>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{task.category}</Badge>
                          {task.completed && <span className="text-emerald-500">✓</span>}
                        </div>
                        <h4 className={`font-medium mt-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">+{task.tokens} 🪙</p>
                        {!task.completed && (
                          <Button size="sm" className="mt-2">Mark Complete</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{growthStats.totalTokens}</div>
                    <p className="text-sm text-muted-foreground">Total ClanTokens</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{growthStats.completedTasks}</div>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ochre-600">{growthStats.trustScore}%</div>
                    <p className="text-sm text-muted-foreground">Trust Score</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sienna-600">{growthStats.currentLevel}</div>
                    <p className="text-sm text-muted-foreground">Current Level</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl mb-2">🧓</div>
                    <p className="font-medium">Elder Helper</p>
                    <p className="text-xs text-muted-foreground">Unlocked</p>
                  </div>
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl mb-2">📚</div>
                    <p className="font-medium">Knowledge Sharer</p>
                    <p className="text-xs text-muted-foreground">Unlocked</p>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg opacity-60">
                    <div className="text-2xl mb-2">🗣️</div>
                    <p className="font-medium">Community Voice</p>
                    <p className="text-xs text-muted-foreground">2 meetings left</p>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg opacity-60">
                    <div className="text-2xl mb-2">📜</div>
                    <p className="font-medium">Heritage Keeper</p>
                    <p className="text-xs text-muted-foreground">1 story left</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Bursary & Education Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Secondary School Support</h4>
                        <p className="text-sm text-muted-foreground">Available for students with 80+ trust score</p>
                      </div>
                      <Badge className="bg-emerald-500">Eligible</Badge>
                    </div>
                    <Button className="mt-3" size="sm">Apply Now</Button>
                  </div>
                  <div className="p-4 border rounded-lg opacity-60">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">University Scholarship</h4>
                        <p className="text-sm text-muted-foreground">Requires 90+ trust score and elder recommendation</p>
                      </div>
                      <Badge variant="outline">Locked</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-sienna-500" />
                  <span>Add to Cultural Memory</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Camera className="w-6 h-6" />
                    <span>Record Memory Clip</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Award className="w-6 h-6" />
                    <span>Share Achievement</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

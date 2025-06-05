
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const CommunityPulseDashboard = () => {
  const metrics = [
    { icon: '🌡️', label: 'Health Status', value: '92%', detail: 'Immunization rate', color: 'emerald' },
    { icon: '🎓', label: 'Education', value: '18', detail: 'Students in school', color: 'blue' },
    { icon: '💼', label: 'Employment', value: '12', detail: 'Youth seeking jobs', color: 'orange' },
    { icon: '🏠', label: 'Migration', value: '5', detail: 'Recent returns', color: 'purple' },
  ];

  const alerts = [
    { type: 'health', message: 'Mama Grace requires check-up', urgency: 'high', time: '2 hours ago' },
    { type: 'legal', message: 'Land case hearing scheduled', urgency: 'medium', time: '1 day ago' },
    { type: 'success', message: 'Education fund goal reached!', urgency: 'low', time: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/60 backdrop-blur-sm border-ochre-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🧭</span>
            <span>Community Pulse</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Real-time insights into clan health, education, and community wellbeing
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center bg-white/80">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{metric.icon}</div>
                  <div className="text-2xl font-bold text-emerald-600">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🔔 Community Alerts</h3>
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.urgency === 'high' ? 'bg-red-50 border-red-500' :
                alert.urgency === 'medium' ? 'bg-orange-50 border-orange-500' :
                'bg-green-50 border-green-500'
              }`}>
                <div className="flex justify-between items-center">
                  <p className="font-medium">{alert.message}</p>
                  <span className="text-sm text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-6 bg-gradient-to-r from-emerald-50 to-blue-50">
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold mb-4">🌍 Diaspora Connection</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Members in Nairobi</p>
                </div>
                <div>
                  <p className="text-xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Members in USA</p>
                </div>
                <div>
                  <p className="text-xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Members in UK</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

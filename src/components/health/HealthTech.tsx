
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Activity, Thermometer, Calendar, Phone, AlertCircle } from 'lucide-react';
import { ResponsiveGrid, ResponsiveContainer } from '@/components/ui/responsive-layout';
import { useResponsive } from '@/hooks/use-responsive';

export const HealthTech: React.FC = () => {
  const { isMobile } = useResponsive();

  const healthMetrics = [
    { name: 'Heart Rate', value: '72 bpm', status: 'normal', icon: Heart, color: 'text-green-600' },
    { name: 'Blood Pressure', value: '120/80', status: 'normal', icon: Activity, color: 'text-green-600' },
    { name: 'Temperature', value: '98.6°F', status: 'normal', icon: Thermometer, color: 'text-green-600' },
    { name: 'Weight', value: '68 kg', status: 'stable', icon: Activity, color: 'text-blue-600' }
  ];

  const appointments = [
    {
      type: 'Telemedicine',
      doctor: 'Dr. Sarah Kimani',
      specialty: 'General Practice',
      date: 'Today, 2:00 PM',
      status: 'upcoming'
    },
    {
      type: 'Health Screening',
      doctor: 'Community Health Worker',
      specialty: 'Preventive Care',
      date: 'Tomorrow, 10:00 AM',
      status: 'scheduled'
    },
    {
      type: 'Traditional Healing',
      doctor: 'Elder Nyong\'o',
      specialty: 'Herbal Medicine',
      date: 'Friday, 4:00 PM',
      status: 'scheduled'
    }
  ];

  const communityHealth = [
    { metric: 'Vaccination Rate', value: '94%', trend: '+2%' },
    { metric: 'Maternal Health', value: '87%', trend: '+5%' },
    { metric: 'Water Quality', value: '98%', trend: '0%' },
    { metric: 'Nutrition Status', value: '76%', trend: '+8%' }
  ];

  return (
    <ResponsiveContainer maxWidth="full" className="py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Heart className="w-6 h-6 text-red-500" />
          <span>Community Health Tech</span>
        </h2>
        <p className="text-muted-foreground">
          Integrated healthcare combining modern medicine with traditional healing
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-6`}>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
          <TabsTrigger value="traditional">Traditional</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={6} className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="text-center p-3 border rounded-lg">
                      <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                      <div className="font-medium text-sm">{metric.name}</div>
                      <div className="text-lg font-bold">{metric.value}</div>
                      <Badge variant="outline" className="text-xs">
                        {metric.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Blood pressure check</div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                    <Badge variant="outline">Normal</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Weight measurement</div>
                      <div className="text-xs text-muted-foreground">Yesterday</div>
                    </div>
                    <Badge variant="outline">Stable</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Medication reminder</div>
                      <div className="text-xs text-muted-foreground">3 days ago</div>
                    </div>
                    <Badge variant="outline">Taken</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{appointment.type}</h4>
                      <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Provider: </span>
                        <span className="font-medium">{appointment.doctor}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Specialty: </span>
                        <span className="font-medium">{appointment.specialty}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Date: </span>
                        <span className="font-medium">{appointment.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      {appointment.status === 'upcoming' && (
                        <Button size="sm">
                          <Phone className="w-4 h-4 mr-1" />
                          Join Call
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Community Health Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityHealth.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">{item.value}</span>
                        <span className={`text-sm ${item.trend.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                          {item.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm text-yellow-800">Water Quality Alert</h4>
                        <p className="text-xs text-yellow-700">
                          Boil water before drinking in the Nyanza region
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Heart className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm text-green-800">Vaccination Campaign</h4>
                        <p className="text-xs text-green-700">
                          Free COVID-19 boosters available at the health center
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm text-blue-800">Health Screening</h4>
                        <p className="text-xs text-blue-700">
                          Free diabetes and hypertension screening next week
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>

        <TabsContent value="telemedicine">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Video Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dr. Sarah Kimani</h3>
                    <p className="text-sm text-muted-foreground">General Practitioner</p>
                  </div>
                  <Button className="w-full">
                    Start Video Call
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Appointment: Today at 2:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">Dr. James Mwangi</div>
                      <div className="text-xs text-muted-foreground">Cardiologist</div>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">Dr. Grace Wanjiku</div>
                      <div className="text-xs text-muted-foreground">Pediatrician</div>
                    </div>
                    <Badge variant="secondary">Busy</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">Dr. Mary Nyong'o</div>
                      <div className="text-xs text-muted-foreground">Gynecologist</div>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  Find More Doctors
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">
                      "I have a headache and feel tired. What should I do?"
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm">
                      Based on your symptoms, I recommend rest and hydration. 
                      If symptoms persist for more than 24 hours, consider consulting a doctor.
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Symptom Checker
                    </Button>
                    <Button size="sm" className="flex-1">
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>

        <TabsContent value="traditional">
          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Traditional Healers Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Elder Nyong'o</h4>
                      <Badge variant="default">Master Herbalist</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Specializes in digestive disorders and respiratory ailments using traditional herbs
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm">Book Session</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Mama Wanjiku</h4>
                      <Badge variant="default">Birth Attendant</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Traditional midwifery and women's health using ancestral knowledge
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm">Book Session</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Herbal Remedies Database</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Mukombero (Mondia whitei)</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Traditional treatment for digestive issues and general wellness
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Preparation: Tea infusion</span>
                      <Badge variant="outline">Verified</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Mubiru (Warburgia ugandensis)</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Used for respiratory conditions and fever reduction
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Preparation: Bark decoction</span>
                      <Badge variant="outline">Verified</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Mukebu (Dovyalis caffra)</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Traditional remedy for skin conditions and wounds
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Preparation: Leaf paste</span>
                      <Badge variant="outline">Verified</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  Browse All Remedies
                </Button>
              </CardContent>
            </Card>
          </ResponsiveGrid>
        </TabsContent>
      </Tabs>
    </ResponsiveContainer>
  );
};

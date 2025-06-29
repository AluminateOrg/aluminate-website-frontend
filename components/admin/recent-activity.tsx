import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Activity, 
  UserPlus, 
  Calendar, 
  MessageSquare, 
  DollarSign,
  Settings,
  Mail
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'member_joined',
    title: 'New member joined',
    description: 'Sarah Johnson (Class of 2018) joined the portal',
    time: '5 minutes ago',
    icon: UserPlus,
    color: 'text-green-600'
  },
  {
    id: 2,
    type: 'event_created',
    title: 'Event created',
    description: 'Annual Homecoming Gala 2024 was scheduled',
    time: '2 hours ago',
    icon: Calendar,
    color: 'text-blue-600'
  },
  {
    id: 3,
    type: 'donation_received',
    title: 'Donation received',
    description: '$500 donation from Michael Chen',
    time: '4 hours ago',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    id: 4,
    type: 'message_posted',
    title: 'New discussion',
    description: 'Career Opportunities group has 3 new messages',
    time: '6 hours ago',
    icon: MessageSquare,
    color: 'text-purple-600'
  },
  {
    id: 5,
    type: 'newsletter_sent',
    title: 'Newsletter sent',
    description: 'Monthly update sent to 2,847 members',
    time: '1 day ago',
    icon: Mail,
    color: 'text-orange-600'
  },
  {
    id: 6,
    type: 'settings_updated',
    title: 'Settings updated',
    description: 'Portal branding and theme customized',
    time: '2 days ago',
    icon: Settings,
    color: 'text-gray-600'
  }
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-accent" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>
          Latest updates and actions in your portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border text-center">
          <button className="text-sm text-accent hover:underline">
            View all activity
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  Calendar, 
  Mail, 
  FileText, 
  Settings, 
  BarChart3,
  Upload,
  MessageSquare
} from 'lucide-react';

const quickActions = [
  {
    title: 'Add Members',
    description: 'Bulk import or add individual alumni',
    icon: UserPlus,
    action: 'add-members'
  },
  {
    title: 'Create Event',
    description: 'Schedule a new alumni event',
    icon: Calendar,
    action: 'create-event'
  },
  {
    title: 'Send Newsletter',
    description: 'Compose and send email updates',
    icon: Mail,
    action: 'send-newsletter'
  },
  {
    title: 'View Reports',
    description: 'Analytics and engagement reports',
    icon: BarChart3,
    action: 'view-reports'
  },
  {
    title: 'Upload Content',
    description: 'Add photos, documents, or resources',
    icon: Upload,
    action: 'upload-content'
  },
  {
    title: 'Manage Groups',
    description: 'Create and moderate discussion groups',
    icon: MessageSquare,
    action: 'manage-groups'
  }
];

export function QuickActions() {
  const handleAction = (action: string) => {
    // TODO: Implement actual navigation/actions
    console.log('Action:', action);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-accent" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription>
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 justify-start text-left hover:bg-accent/5"
              onClick={() => handleAction(action.action)}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <action.icon className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
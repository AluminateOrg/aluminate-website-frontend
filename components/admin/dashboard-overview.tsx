import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, DollarSign, MessageSquare, TrendingUp, Activity } from 'lucide-react';

const stats = [
  {
    title: 'Total Alumni',
    value: '2,847',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'Active members in your portal'
  },
  {
    title: 'Monthly Events',
    value: '24',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Calendar,
    description: 'Events scheduled this month'
  },
  {
    title: 'Donations Raised',
    value: 'LKR 45,230',
    change: '+23%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: 'Total fundraising this quarter'
  },
  {
    title: 'Active Discussions',
    value: '156',
    change: '+5%',
    changeType: 'positive' as const,
    icon: MessageSquare,
    description: 'Ongoing group conversations'
  }
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your alumni community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <stat.icon className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      stat.changeType === 'positive' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
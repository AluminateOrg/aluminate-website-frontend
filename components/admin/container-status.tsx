import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Server, 
  Activity, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const containerMetrics = [
  {
    label: 'CPU Usage',
    value: 23,
    max: 100,
    unit: '%',
    status: 'good',
    icon: Cpu
  },
  {
    label: 'Memory Usage',
    value: 1.2,
    max: 4,
    unit: 'GB',
    status: 'good',
    icon: MemoryStick
  },
  {
    label: 'Storage Used',
    value: 8.5,
    max: 25,
    unit: 'GB',
    status: 'good',
    icon: HardDrive
  }
];

export function ContainerStatus() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-accent" />
              <span>Container Status</span>
            </CardTitle>
            <CardDescription>
              Your dedicated cloud instance performance and health
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Healthy
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Container Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Container ID</div>
            <div className="text-sm font-mono text-foreground">cnt-stanford-001</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Region</div>
            <div className="text-sm text-foreground">US-West-2</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Uptime</div>
            <div className="text-sm text-foreground">47 days</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Last Backup</div>
            <div className="text-sm text-foreground">2 hours ago</div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Resource Usage</h4>
          {containerMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <metric.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{metric.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {metric.value} / {metric.max} {metric.unit}
                </span>
              </div>
              <Progress 
                value={(metric.value / metric.max) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart Container
          </Button>
          <Button variant="outline" size="sm">
            <HardDrive className="w-4 h-4 mr-2" />
            Create Backup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
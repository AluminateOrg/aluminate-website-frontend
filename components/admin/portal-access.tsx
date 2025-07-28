import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ExternalLink, 
  Copy, 
  Globe, 
  Lock, 
  Settings,
  Eye,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

export function PortalAccess() {
  const portalData = {
    url: 'https://uoc-alumni.alumniportal.com',
    customDomain: 'alumni.uoc.edu',
    status: 'Active',
    sslStatus: 'Secured',
    lastAccessed: '2 minutes ago'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('URL copied to clipboard!');
  };

  const openPortal = () => {
    window.open(portalData.url, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-accent" />
          <span>Portal Access</span>
        </CardTitle>
        <CardDescription>
          Access and manage your alumni portal URL
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portal URL */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Portal URL</label>
            <div className="flex space-x-2">
              <Input 
                value={portalData.url} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(portalData.url)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Custom Domain */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Custom Domain</label>
            <div className="flex space-x-2">
              <Input 
                value={portalData.customDomain} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Custom domain is configured and active
            </p>
          </div>
        </div>

        {/* Status Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Status</div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {portalData.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">SSL Certificate</div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Lock className="w-3 h-3 mr-1" />
              {portalData.sslStatus}
            </Badge>
          </div>
          <div className="space-y-1 col-span-2">
            <div className="text-sm font-medium text-muted-foreground">Last Accessed</div>
            <div className="text-sm text-foreground">{portalData.lastAccessed}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={openPortal} className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Portal
          </Button>
          <Button variant="outline" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
          <Button variant="outline" className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>

        {/* Portal Stats */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Portal Statistics</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground">1,247</div>
              <div className="text-xs text-muted-foreground">Daily Visits</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">89%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">2.3s</div>
              <div className="text-xs text-muted-foreground">Load Time</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
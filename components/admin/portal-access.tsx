"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ExternalLink, Copy, Globe, Lock } from 'lucide-react';
import { toast } from 'sonner';
import axiosAdmin from '../axiosInstances/axiosAdmin';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

type PortalData = {
  url: string;
  status: string;
};

export function PortalAccess() {
  const [portalData, setPortalData] = useState<PortalData | null>(null);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user?.organization) {
      setPortalData({
        url: user.organization.portalUrl,
        status: user.organization.status,
      });
    }
  }, [user]);


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('URL copied to clipboard!');
  };

  const openPortal = () => {
    if (portalData?.url) window.open(portalData.url, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-accent" />
          <span>Portal Access</span>
        </CardTitle>
        <CardDescription>Access your organization portal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portal URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Portal URL</label>
          <div className="flex space-x-2">
            <Input
              value={portalData?.url ?? 'Loading...'}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => portalData?.url && copyToClipboard(portalData.url)}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button onClick={openPortal} variant="outline" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status Info */}
        <div className="grid grid-cols-1 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="space-y-1">
            <div className="text-sm font-medium text-muted-foreground">Status</div>
            <Badge
              className={
                portalData?.status === 'Active'
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }
            >
              {portalData?.status ?? 'Loading...'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

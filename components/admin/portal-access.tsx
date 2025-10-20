"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ExternalLink, Copy, Globe, Loader2 } from 'lucide-react';
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
    if (portalData?.url && portalData?.status === 'ACTIVE') {
      window.open(portalData.url, '_blank');
    }
  };

  const isBuilding = portalData?.status === 'BUILDING';
  const isActive = portalData?.status === 'ACTIVE';
  const isFailed = portalData?.status === 'BUILD_FAILED';

  return (
    <Card
      className={`${isBuilding ? 'opacity-60 blur-[1px] pointer-events-none select-none transition-all duration-300' : 'transition-all duration-300'}`}
    >
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
              disabled={!isActive}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              onClick={openPortal}
              variant="outline"
              size="sm"
              disabled={!isActive}
            >
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
                isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : isBuilding
                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  : isFailed
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
              }
            >
              <div className="flex items-center space-x-1">
                {isBuilding && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>{portalData?.status ?? 'Loading...'}</span>
              </div>
            </Badge>
          </div>

          {/* Error Message */}
          {isFailed && (
            <div className="text-sm text-red-600 dark:text-red-400 mt-2">
              ⚠️ Your organization portal couldn’t start properly. Please contact customer care for assistance.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

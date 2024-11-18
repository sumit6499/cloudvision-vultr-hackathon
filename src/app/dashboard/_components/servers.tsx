import { Server, Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServerItem } from "./types";
import { Button } from "@/components/ui/button";

export const renderServersContent = (isLoading: boolean, getServerItems: () => ServerItem[]) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {getServerItems().map((server,i) => (
        <Card key={server.name+i} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                {server.name}
              </CardTitle>
              <Badge variant={server.status === "Running" ? "default" : "destructive"}>
                {server.status}
              </Badge>
            </div>
            <CardDescription>Region: {server.region}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Instances:</span>
                <span className="font-medium">{server.instances}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">IP:</span>
                <span className="font-medium">{server.ip}</span>
              </div>
              <div className="flex flex-col items-between border p-2 rounded-md border-[#222222] bg-[#181818]">
                <span className="text-sm text-muted-foreground">Command:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium p-1 bg-black rounded-md text-sm">
                    ssh root@{server.ip}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(`ssh root@${server.ip}`);
                    }}
                    className="h-8 w-8 ml-auto"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy SSH command</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
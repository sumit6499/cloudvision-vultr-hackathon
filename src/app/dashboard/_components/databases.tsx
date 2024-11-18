import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, EyeOff, RefreshCw, Server } from "lucide-react";
import type { DatabaseItem } from "./types";

export function renderDatabaseContent({
  isLoading,
  getDatabaseItems,
}: {
  isLoading: boolean;
  getDatabaseItems: () => DatabaseItem[];
}) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );

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

  const togglePasswordVisibility = (dbName: string) => {
    setShowPasswords((prev) => ({ ...prev, [dbName]: !prev[dbName] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {getDatabaseItems().map((db) => (
        <Card
          key={db.name}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                {db.name}
              </CardTitle>
              <Badge
                variant={db.status === "Healthy" ? "default" : "destructive"}
              >
                {db.status}
              </Badge>
            </div>
            <CardDescription>Region: {db.region}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Replicas:</span>
                <span className="font-medium">{db.replicas}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Database Engine:
                </span>
                <span className="font-medium">{db.databaseEngine}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">User:</span>
                <span className="font-medium">{db.user}</span>
              </div>
              <div className="flex flex-col items-between border p-2 rounded-md border-[#222222] bg-[#181818]">
                <span className="text-sm text-muted-foreground">Password:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium p-1 bg-black rounded-md text-sm">
                    {showPasswords[db.name]
                      ? db.password
                      : db.password.split("").map(() => "•").join("")}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePasswordVisibility(db.name)}
                    className="h-8 w-8 ml-auto"
                  >
                    {showPasswords[db.name] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPasswords[db.name] ? "Hide" : "Show"} password
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

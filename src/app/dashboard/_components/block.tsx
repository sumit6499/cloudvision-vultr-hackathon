import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { HardDrive } from "lucide-react";
import { BlockStorageItem } from "./types";

export function renderBlockContent({
  isLoading,
  getBlockStorages,
}: {
  isLoading: boolean;
  getBlockStorages: () => BlockStorageItem[];
}) {
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
                {[...Array(3)].map((_, i) => (
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
      {getBlockStorages().map((block: BlockStorageItem, i: number) => (
        <Card
          key={block.id + i}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-primary" />
                {block.name}
              </CardTitle>
              <Badge
                variant={block.status === "active" ? "secondary" : "destructive"}
              >
                {block.status}
              </Badge>
            </div>
            <CardDescription>ID: {block.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Size:</span>
                <span className="font-medium">{block.size} GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Monthly Cost:
                </span>
                <span className="font-medium">${block.cost.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

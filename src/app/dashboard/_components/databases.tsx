import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { DatabaseItem } from "./types";
import { Badge } from "@/components/ui/badge";

export const renderDatabaseContent = (
  isLoading: boolean,
  getDatabaseItems: () => DatabaseItem[]
) => {
  if (isLoading) {
    return (
      <div className="text-center text-gray-500">Loading database data...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {getDatabaseItems().map((db, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{db.name}</CardTitle>
            <CardDescription>Region: {db.region}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Replicas:</span>
                <span className="font-medium">{db.replicas}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Availability Zones:</span>
                <span className="font-medium">
                  {db.availabilityZones.join(", ")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge
                  variant={db.status === "Healthy" ? "default" : "destructive"}
                >
                  {db.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

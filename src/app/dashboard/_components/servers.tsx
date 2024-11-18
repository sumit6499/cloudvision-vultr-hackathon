import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServerItem } from "./types";

export const renderServersContent = (isLoading: boolean, getServerItems: () => ServerItem[]) => {
  if (isLoading) {
    return (
        <div className="text-center text-gray-500">Loading server data...</div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getServerItems().map((server, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{server.name}</CardTitle>
              <CardDescription>Region: {server.region}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Instances:</span>
                  <span className="font-medium">{server.instances}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Availability Zones:</span>
                  <span className="font-medium">
                    {server.availabilityZones.join(", ")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge
                    variant={
                      server.status === "Running" ? "default" : "destructive"
                    }
                  >
                    {server.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
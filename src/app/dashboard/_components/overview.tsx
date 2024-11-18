import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Server } from "lucide-react";
import { InfrastructureData } from "./types";

type OverviewProps = {
  isLoading: boolean;
  infrastructureData: InfrastructureData | null;
};

export const Overview = ({ isLoading, infrastructureData }: OverviewProps) => {
  // Helper function to get total counts
  const getTotalCounts = () => ({
    storage: infrastructureData?.data.blockStorage.meta.total || 0,
    instances: infrastructureData?.data.instances.meta.total || 0,
    databases: infrastructureData?.data.db.meta.total || 0,
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">
        Loading infrastructure data...
      </div>
    );
  }

  const totals = getTotalCounts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-[#656565]">
            Block Storage
          </CardTitle>
          <Badge className="bg-blue-600/10 border border-blue-600 text-blue-600 hover:bg-blue-600/20">
            {totals.storage} blocks
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm text-[#656565] mb-2">
            <Database className="h-4 w-4 text-blue-500" />
            <span>Storage Resources</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-[#656565]">
            Instances
          </CardTitle>
          <Badge className="bg-green-600/10 border border-green-600 text-green-600 hover:bg-green-600/20">
            {totals.instances} instances
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm text-[#656565] mb-2">
            <Server className="h-4 w-4 text-green-500" />
            <span>Compute Resources</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-[#656565]">
            Databases
          </CardTitle>
          <Badge className="bg-purple-600/10 border border-purple-600 text-purple-600 hover:bg-purple-600/20">
            {totals.databases} databases
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm text-[#656565] mb-2">
            <Database className="h-4 w-4 text-purple-500" />
            <span>Database Resources</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

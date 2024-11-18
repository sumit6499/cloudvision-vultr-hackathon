import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const AIInsights = ({
  isAIDialogOpen,
  setIsAIDialogOpen,
}: {
  isAIDialogOpen: boolean;
  setIsAIDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>AI Insights and Suggestions</DialogTitle>
        <DialogDescription>
          Based on your current infrastructure and usage patterns, here are some
          insights and suggestions:
        </DialogDescription>
      </DialogHeader>
      <ul className="list-disc list-inside text-[#656565] space-y-2">
        <li>
          Consider scaling up the Web Server Cluster in us-west-2 to handle
          increased traffic.
        </li>
        <li>
          The Main Database in us-east-1 has consistent high usage. Evaluate if
          you need to upgrade to a larger instance type.
        </li>
        <li>
          Your Analytics Database in eu-central-1 has low utilization. Consider
          downsizing to reduce costs.
        </li>
        <li>
          Implement cross-region replication for the Main Database to improve
          global performance and disaster recovery capabilities.
        </li>
      </ul>
    </DialogContent>
  </Dialog>
);

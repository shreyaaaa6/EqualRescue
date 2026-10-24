export interface DecisionOption {
  id: string;
  label: string;
  description?: string;
  nextNodeId?: string;
  isEmergencyRedirect?: boolean;
  advice?: {
    title: string;
    description: string;
    actionBadge?: string;
    points: string[];
    isSafeState: boolean;
  };
}

export interface DecisionNode {
  id: string;
  title: string;
  question: string;
  hint: string;
  stepNumber: number;
  totalSteps: number;
  options: DecisionOption[];
}

export interface DecisionTreeData {
  initialNodeId: string;
  nodes: Record<string, DecisionNode>;
}

export interface HistoryStep {
  nodeId: string;
  selectedOptionId: string;
  selectedOptionLabel: string;
}

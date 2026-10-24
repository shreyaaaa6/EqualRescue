export interface DecisionAdvice {
  title: string;
  description: string;
  conditionType?: 'cardiac' | 'choking' | 'seizure' | 'stroke' | 'heart_attack' | 'fainting' | 'allergy' | 'recovery';
  actionBadge?: string;
  points: string[];
  donts?: string[];
  dispatcherScript?: string;
  isSafeState: boolean;
  requiresCprRedirect?: boolean;
}

export interface DecisionOption {
  id: string;
  label: string;
  description?: string;
  nextNodeId?: string;
  isEmergencyRedirect?: boolean;
  advice?: DecisionAdvice;
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

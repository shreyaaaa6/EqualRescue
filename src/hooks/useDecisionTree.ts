import { useState, useCallback, useMemo } from 'react';
import treeDataRaw from '../data/decision-tree.json';
import type { DecisionTreeData, DecisionNode, DecisionOption, HistoryStep } from '../types/decision';

const treeData = treeDataRaw as unknown as DecisionTreeData;

export function useDecisionTree() {
  const [currentNodeId, setCurrentNodeId] = useState<string>(treeData.initialNodeId);
  const [history, setHistory] = useState<HistoryStep[]>([]);
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);

  const currentNode: DecisionNode = useMemo(() => {
    return treeData.nodes[currentNodeId] || treeData.nodes[treeData.initialNodeId];
  }, [currentNodeId]);

  const selectOption = useCallback((option: DecisionOption) => {
    setSelectedOption(option);

    setHistory(prev => [
      ...prev,
      {
        nodeId: currentNode.id,
        selectedOptionId: option.id,
        selectedOptionLabel: option.label,
      },
    ]);

    if (option.nextNodeId && treeData.nodes[option.nextNodeId]) {
      setCurrentNodeId(option.nextNodeId);
      setSelectedOption(null);
    }
  }, [currentNode]);

  const goBack = useCallback(() => {
    if (selectedOption?.advice) {
      // Revert terminal advice back to current node options
      setSelectedOption(null);
      setHistory(prev => prev.slice(0, -1));
      return;
    }

    if (history.length > 0) {
      const prevStep = history[history.length - 1];
      setCurrentNodeId(prevStep.nodeId);
      setSelectedOption(null);
      setHistory(prev => prev.slice(0, -1));
    }
  }, [history, selectedOption]);

  const startOver = useCallback(() => {
    setCurrentNodeId(treeData.initialNodeId);
    setHistory([]);
    setSelectedOption(null);
  }, []);

  const isAtAdvice = Boolean(selectedOption?.advice);
  const isEmergencyRedirect = Boolean(selectedOption?.isEmergencyRedirect);

  return {
    currentNode,
    history,
    selectedOption,
    isAtAdvice,
    isEmergencyRedirect,
    canGoBack: history.length > 0 || isAtAdvice,
    selectOption,
    goBack,
    startOver,
  };
}

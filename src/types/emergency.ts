export interface MetronomeState {
  isPlaying: boolean;
  bpm: number;
  isMuted: boolean;
  beatCount: number;
}

export interface StopwatchState {
  elapsedMs: number;
  formattedTime: string;
  isRunning: boolean;
}

export interface CprInstructionStep {
  step: number;
  title: string;
  description: string;
  keyAction: string;
  illustrationKey: 'placement' | 'push' | 'recoil';
  detailPoints: string[];
}

export type CprTutorialMode = 'hands-only' | 'cycle-30-2';
export type CyclePhase = 'placement' | 'compressions' | 'breaths';


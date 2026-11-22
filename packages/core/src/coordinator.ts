import {
  type AnalysisRun,
  type Task,
  UIForgeError,
  ErrorCode,
  ErrorCategory,
} from '@uiforge/contracts';
import { ProjectAnalyzer } from '@uiforge/project-analyzer';
import { TaskStateMachine } from './state-machine.js';

export interface RunAnalysisOptions {
  rootPath: string;
  projectId?: string;
  sessionId?: string;
}

export interface AnalysisWorkflowResult {
  task: Task;
  analysis: AnalysisRun;
}

export class UIForgeCoordinator {
  public async executeAnalysis(options: RunAnalysisOptions): Promise<AnalysisWorkflowResult> {
    const sm = new TaskStateMachine('ANALYZE', options.sessionId);

    try {
      sm.transitionTo('INITIALIZING', 10);

      const analyzer = new ProjectAnalyzer({
        rootPath: options.rootPath,
        projectId: options.projectId,
      });

      sm.transitionTo('EXECUTING', 40);
      const analysis = await analyzer.scan();

      sm.transitionTo('COMPLETED', 100);

      return {
        task: sm.getSnapshot(),
        analysis,
      };
    } catch (error) {
      sm.transitionTo('FAILED');
      if (error instanceof UIForgeError) {
        throw error;
      }
      throw new UIForgeError({
        code: ErrorCode.ERR_ORCHESTRATION_TASK_FAILED,
        category: ErrorCategory.ORCHESTRATION,
        message: `Analysis workflow failed: ${(error as Error).message}`,
        cause: error,
      });
    }
  }
}

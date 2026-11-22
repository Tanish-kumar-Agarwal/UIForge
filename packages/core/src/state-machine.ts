import { randomUUID } from 'node:crypto';
import { type Task, TaskSchema, UIForgeError, ErrorCode, ErrorCategory } from '@uiforge/contracts';

export type TaskStatus = Task['status'];
export type TaskType = Task['type'];

export class TaskStateMachine {
  private task: Task;

  constructor(type: TaskType, sessionId?: string) {
    this.task = TaskSchema.parse({
      taskId: randomUUID(),
      sessionId,
      type,
      status: 'IDLE',
      progressPercentage: 0,
      createdAt: new Date().toISOString(),
    });
  }

  public getSnapshot(): Task {
    return { ...this.task };
  }

  public transitionTo(nextStatus: TaskStatus, progress?: number): void {
    const current = this.task.status;

    if (!this.isValidTransition(current, nextStatus)) {
      throw new UIForgeError({
        code: ErrorCode.ERR_ORCHESTRATION_TASK_FAILED,
        category: ErrorCategory.ORCHESTRATION,
        message: `Invalid state transition from ${current} to ${nextStatus}`,
      });
    }

    this.task.status = nextStatus;
    if (progress !== undefined) {
      this.task.progressPercentage = Math.min(100, Math.max(0, progress));
    }

    if (nextStatus === 'COMPLETED' || nextStatus === 'FAILED') {
      this.task.completedAt = new Date().toISOString();
      if (nextStatus === 'COMPLETED') {
        this.task.progressPercentage = 100;
      }
    }
  }

  private isValidTransition(from: TaskStatus, to: TaskStatus): boolean {
    if (from === to) return true;
    if (from === 'COMPLETED' || from === 'FAILED') return false; // terminal states

    switch (from) {
      case 'IDLE':
        return to === 'INITIALIZING' || to === 'FAILED';
      case 'INITIALIZING':
        return to === 'EXECUTING' || to === 'FAILED';
      case 'EXECUTING':
        return to === 'AWAITING_APPROVAL' || to === 'COMPLETED' || to === 'FAILED';
      case 'AWAITING_APPROVAL':
        return to === 'COMMITTING' || to === 'FAILED' || to === 'EXECUTING';
      case 'COMMITTING':
        return to === 'COMPLETED' || to === 'FAILED';
      default:
        return false;
    }
  }
}

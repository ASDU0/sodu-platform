export type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  details?: Record<string, string>;
};

export type ResponseStatus = 'idle' | 'loading' | 'fulfilled' | 'rejected';
export type ResponseError = {
  statusCode: number;
  message: string | string[];
  error?: string;
};

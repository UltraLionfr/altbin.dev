export interface Paste {
  id: string;
  title?: string | null;
  content: string;
  createdAt: string;
  views: number;
  protected?: boolean;
}
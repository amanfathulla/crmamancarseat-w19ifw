export interface MarketingTask {
  id: string;
  date: string;
  title: string;
  description: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'website';
  status: 'pending' | 'completed';
  time: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'website';
  time: string;
}
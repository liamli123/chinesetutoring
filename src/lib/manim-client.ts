import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_MANIM_API_URL || 'http://localhost:8000'; // Fallback to local dev

export interface ManimJob {
  job_id: string;
  status: 'queued' | 'running' | 'done' | 'error' | 'cancelled';
  prompt: string;
  video_url?: string;
  error?: string;
  estimated_seconds?: number;
  render_seconds?: number;
  created_at?: number;
}

export const manimClient = {
  /**
   * Start a new render job
   * @param prompt The natural language prompt for the animation
   * @returns The job ID
   */
  async startRender(prompt: string): Promise<string> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/render`, { prompt });
      return response.data.job_id;
    } catch (error) {
      console.error('Failed to start render:', error);
      throw error;
    }
  },

  /**
   * Get the status of a specific job
   * @param jobId The job ID to check
   * @returns Job details
   */
  async getJobStatus(jobId: string): Promise<ManimJob> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get status for job ${jobId}:`, error);
      throw error;
    }
  },

  /**
   * Cancel a running job
   * @param jobId The job ID to cancel
   */
  async cancelJob(jobId: string): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/api/jobs/${jobId}/cancel`);
    } catch (error) {
       console.error(`Failed to cancel job ${jobId}:`, error);
       // Don't throw, just log
    }
  },

  /**
   * Get the build logs for a job (useful for debugging)
   * @param jobId 
   */
  async getJobLog(jobId: string): Promise<string> {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs/${jobId}/log`);
        return response.data.log;
    } catch (error) {
        return "Log not available";
    }
  }
};

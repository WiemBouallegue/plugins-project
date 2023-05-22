import { DataRes } from '../types';

class ApiService {
  static async getData(): Promise<any | null> {
    try {
      const response = await fetch('http://localhost:3030/data', {
        method: 'GET',
        redirect: 'follow',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateData(data: any): Promise<DataRes> {
    try {
      const response = await fetch('http://localhost:3030/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const dataJson = await response.json();
      return dataJson;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
export default ApiService;

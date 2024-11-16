import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MarketingTask, TaskFormData } from '../types/marketing';

interface MarketingState {
  tasks: MarketingTask[];
  addTask: (date: string, task: TaskFormData) => void;
  updateTask: (id: string, status: 'pending' | 'completed') => void;
  editTask: (id: string, data: Partial<MarketingTask>) => void;
  deleteTask: (id: string) => void;
  getTasksByDate: (date: string) => MarketingTask[];
}

export const useMarketingStore = create<MarketingState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (date, taskData) => {
        const newTask: MarketingTask = {
          id: `task_${Date.now()}`,
          date,
          ...taskData,
          status: 'pending'
        };
        set(state => ({
          tasks: [...state.tasks, newTask]
        }));
      },

      updateTask: (id, status) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, status } : task
          )
        }));
      },

      editTask: (id, data) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...data } : task
          )
        }));
      },

      deleteTask: (id) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id)
        }));
      },

      getTasksByDate: (date) => {
        return get().tasks.filter(task => task.date === date);
      }
    }),
    {
      name: 'marketing-storage'
    }
  )
);
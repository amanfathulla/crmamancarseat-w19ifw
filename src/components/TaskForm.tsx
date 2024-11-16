import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useMarketingStore } from '../store/marketingStore';
import { TaskFormData } from '../types/marketing';

interface TaskFormProps {
  date: string;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ date, onClose }) => {
  const { addTask, getTasksByDate, updateTask, editTask, deleteTask } = useMarketingStore();
  const dateTasks = getTasksByDate(date);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    platform: 'facebook',
    time: '09:00'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateTasks.length >= 6) {
      alert('Maximum 6 tasks per day allowed');
      return;
    }
    addTask(date, formData);
    setFormData({
      title: '',
      description: '',
      platform: 'facebook',
      time: '09:00'
    });
  };

  const handleStatusToggle = (id: string, currentStatus: 'pending' | 'completed') => {
    updateTask(id, currentStatus === 'pending' ? 'completed' : 'pending');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Content Planning - {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-gray-200 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as TaskFormData['platform'] })}
                className="w-full rounded-lg border border-gray-200 p-2"
                required
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="website">Website</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-gray-200 p-2"
              rows={3}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="rounded-lg border border-gray-200 p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </form>

        {dateTasks.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4">Planned Tasks ({dateTasks.length}/6)</h3>
            <div className="space-y-4">
              {dateTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.status === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStatusToggle(task.id, task.status)}
                        className={`px-2 py-1 rounded text-sm ${
                          task.status === 'completed'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {task.status === 'completed' ? 'Completed' : 'Pending'}
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{task.platform}</span>
                    <span>{task.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
'use client';

import { useRouter } from 'next/navigation';
import TaskForm from '../components/TaskForm';

export default function CreateTaskPage() {
  const router = useRouter();

  const handleFinish = () => {
    router.push('/'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Task
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Add a new task to your dashboard
          </p>
        </div>
        
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-soft">
          <TaskForm onFinish={handleFinish} />
        </div>
      </div>
    </div>
  );
}

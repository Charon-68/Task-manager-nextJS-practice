'use client';

import React, { useRef, useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function ImportTasks() {
  const { dispatch } = useTasks();
  const fileInputRef = useRef(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      importTasks(file);
    }
  };

  const importTasks = async (file) => {
    if (!file.type.includes('json')) {
      alert('Please select a valid JSON file.');
      return;
    }

    setIsImporting(true);
    
    try {
      const fileContent = await readFileAsText(file);
      const importedTasks = JSON.parse(fileContent);
      
      if (!Array.isArray(importedTasks)) {
        throw new Error('JSON file must contain an array of tasks.');
      }
      
      const validatedTasks = importedTasks.map((task, index) => {
        if (!task.title) {
          throw new Error(`Task at position ${index + 1} is missing a title.`);
        }
        
        return {
          title: task.title || 'Untitled Task',
          description: task.description || '',
          dueDate: task.dueDate || '',
          priority: task.priority || 'Medium',
          status: task.status || 'To Do'
        };
      });

      dispatch({ type: 'IMPORT_TASKS', payload: validatedTasks });
      
      alert(`Successfully imported ${validatedTasks.length} task(s)!`);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Import error:', error);
      alert(`Failed to import tasks: ${error.message}`);
    } finally {
      setIsImporting(false);
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <button
        onClick={triggerFileInput}
        disabled={isImporting}
        className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        title="Import tasks from JSON file"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span>{isImporting ? 'Importing...' : 'Import'}</span>
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select JSON file to import"
      />
    </div>
  );
}

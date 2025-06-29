import { Inter } from 'next/font/google';
import './globals.css';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar'; 
import { Providers } from './providers'; 

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Task Manager',
  description: 'A modern and intuitive task management application built with Next.js',
  keywords: 'task manager, productivity, todo, project management',
  authors: [{ name: 'Task Manager Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300`}>
        <Providers> 
          <TaskProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </TaskProvider>
        </Providers> 
      </body>
    </html>
  );
}
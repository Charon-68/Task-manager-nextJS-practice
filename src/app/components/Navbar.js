'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import ExportTasks from './ExportTasks'; 
import ImportTasks from './ImportTasks'; 

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyles = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
    }`;

  const mobileLinkStyles = (path) =>
    `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
      pathname === path
        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span>Task Manager</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className={linkStyles('/')}>
              Dashboard
            </Link>
            <Link href="/create" className={linkStyles('/create')}>
              Create Task
            </Link>
            
            {pathname === '/' && (
              <>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                <ImportTasks />
                <ExportTasks />
              </>
            )}
            
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <ThemeSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className={mobileLinkStyles('/')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/create" 
                className={mobileLinkStyles('/create')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Task
              </Link>
              
              {pathname === '/' && (
                <>
                  <div className="px-4 py-2">
                    <div className="w-full h-px bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                  <div className="px-4 py-2 space-y-2">
                    <ImportTasks />
                    <ExportTasks />
                  </div>
                </>
              )}
              
              <div className="px-4 py-2">
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600"></div>
              </div>
              <div className="px-4 py-2">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Loader } from 'lucide-react';
import { useMarketingStore } from '../store/marketingStore';
import ContentForm from './ContentForm';
import { format } from 'date-fns';

const MarketingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { contents, isLoading, error, fetchContents, getContentsByDate } = useMarketingStore();

  useEffect(() => {
    fetchContents();
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return format(new Date(year, month, day), 'yyyy-MM-dd');
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.setMonth(
      currentDate.getMonth() + (direction === 'next' ? 1 : -1)
    )));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayContents = getContentsByDate(date);
      const isToday = date === formatDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-blue-50' : ''
          }`}
          onClick={() => {
            setSelectedDate(date);
            setShowForm(true);
          }}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>{day}</span>
            {dayContents.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                {dayContents.length}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1">
            {dayContents.slice(0, 2).map((content) => (
              <div
                key={content.id}
                className={`text-xs truncate ${
                  content.status === 'completed' ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                • {content.title}
              </div>
            ))}
            {dayContents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayContents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading marketing contents: {error}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Marketing Calendar</h1>
        <p className="text-gray-600">Plan and manage your content schedule</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedDate(formatDate(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
              ));
              setShowForm(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px mb-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center py-2 bg-gray-50 font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {renderCalendar()}
        </div>
      </div>

      {showForm && selectedDate && (
        <ContentForm
          date={selectedDate}
          onClose={() => {
            setShowForm(false);
            setSelectedDate(null);
          }}
        />
      )}
    </div>
  );
};

export default MarketingCalendar;
import React from 'react';
import { Activity, Brain, Heart, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { HealthSummary } from '../components/dashboard/HealthSummary';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { RecentMetrics } from '../components/dashboard/RecentMetrics';
import { useWearableData } from '../hooks/useWearableData';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { latestData } = useWearableData();

  return (
    <DashboardLayout>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome, {user?.name || 'Guest'}
          </h1>
          <p className="text-gray-400">
            Here's your real-time health metrics and activities
          </p>
        </header>

        {/* Rest of the dashboard content remains the same */}
      </div>
    </DashboardLayout>
  );
};
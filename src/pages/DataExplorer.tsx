
import React from 'react';
import { ClanSelector } from '@/components/ClanSelector';
import { DataPreview } from '@/components/DataPreview';
import { MockDataProvider } from '@/contexts/MockDataContext';

const DataExplorer = () => {
  return (
    <MockDataProvider>
      <div className="min-h-screen bg-gradient-to-br from-ochre-50 via-background to-emerald-50">
        <div className="container mx-auto p-6 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">ClanChain Data Explorer</h1>
            <p className="text-muted-foreground">
              Explore realistic African clan data showcasing the platform's capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ClanSelector />
            </div>
            <div className="lg:col-span-2">
              <DataPreview />
            </div>
          </div>
        </div>
      </div>
    </MockDataProvider>
  );
};

export default DataExplorer;

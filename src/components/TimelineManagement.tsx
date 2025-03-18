import React, { useState } from 'react';
import { ProjectTimeline } from '../lib/types';

const TimelineManagement: React.FC = () => {
  const [timelines, setTimelines] = useState<ProjectTimeline[]>([]);

  const addTimeline = () => {
    const newTimeline: ProjectTimeline = {
      id: '1',
      project_id: '1',
      title: 'New Timeline',
      description: null,
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      status: 'Pending',
      assigned_to: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTimelines([...timelines, newTimeline]);
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors">
      <h2 className="text-xl font-semibold mb-4">Timeline Management</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={addTimeline}>Add Timeline</button>
      <ul className="mt-4">
        {timelines.map((timeline) => (
          <li key={timeline.id} className="border-b border-gray-200 py-2">{timeline.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineManagement;
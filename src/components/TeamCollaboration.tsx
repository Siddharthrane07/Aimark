import React, { useState } from 'react';
import { TeamCollaboration } from '../lib/types';

const TeamCollaborationComponent: React.FC = () => {
  const [collaborations, setCollaborations] = useState<TeamCollaboration[]>([]);

  const addCollaboration = () => {
    const newCollaboration: TeamCollaboration = {
      id: '1',
      project_id: '1',
      user_id: '1',
      action_type: 'Comment',
      action_details: 'This is a comment',
      created_at: new Date().toISOString(),
    };
    setCollaborations([...collaborations, newCollaboration]);
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors">
      <h2 className="text-xl font-semibold mb-4">Team Collaboration</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={addCollaboration}>Add Collaboration</button>
      <ul className="mt-4">
        {collaborations.map((collaboration) => (
          <li key={collaboration.id} className="border-b border-gray-200 py-2">{collaboration.action_details}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamCollaborationComponent;
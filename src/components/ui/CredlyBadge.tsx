import React from 'react';

// Define the types for the props that our component will accept
interface CredlyBadgeProps {
  badgeId: string;
  publicUrl: string;
}

// Use React.FC (Functional Component) and the props interface
const CredlyBadge: React.FC<CredlyBadgeProps> = ({ badgeId, publicUrl }) => {
  return (
    // Wrap the div with an anchor tag (<a>)
    <a
      href={publicUrl}
      target="_blank" // This makes the link open in a new tab
      rel="noopener noreferrer" // Security best practice for new tabs
    >
      <div
        data-iframe-width="150"
        data-iframe-height="270"
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
      >
      </div>
    </a>
  );
};

export default CredlyBadge;
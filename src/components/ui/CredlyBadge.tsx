import React from 'react';

interface CredlyBadgeProps {
  badgeId: string;
  publicUrl: string;
}

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
import React from 'react';

/**
 * Marks a doc fragment as belonging to a rollout flag (`sdk`, `i18n`, …).
 * `plugins/remark-if-feature.js` removes the node at build time when the flag
 * is off, so this component is only a passthrough for enabled builds.
 */
export default function IfFeature({children}) {
  return <>{children}</>;
}

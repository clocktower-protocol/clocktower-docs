const siteFlags = require('../src/siteFlags');

const FEATURE_ELEMENTS = new Set(['mdxJsxFlowElement', 'mdxJsxTextElement']);

function attributeValue(node, name) {
  const attr = (node.attributes || []).find(
    (item) => item.type === 'mdxJsxAttribute' && item.name === name,
  );
  if (!attr) {
    return undefined;
  }
  return typeof attr.value === 'string' ? attr.value : undefined;
}

function stripDisabledFeatures(node) {
  if (!Array.isArray(node.children)) {
    return;
  }
  for (let i = node.children.length - 1; i >= 0; i -= 1) {
    const child = node.children[i];
    stripDisabledFeatures(child);
    if (!FEATURE_ELEMENTS.has(child.type) || child.name !== 'IfFeature') {
      continue;
    }
    const featureName = attributeValue(child, 'name');
    if (featureName && siteFlags[featureName] !== true) {
      node.children.splice(i, 1);
    }
  }
}

function remarkIfFeature() {
  return (tree) => {
    stripDisabledFeatures(tree);
  };
}

module.exports = remarkIfFeature;

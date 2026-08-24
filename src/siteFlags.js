/**
 * Build-time rollout flags for sections that should ship independently.
 *
 * Set on the Docusaurus build (Cloudflare Pages build env), not at request time:
 *   DOCUSAURUS_ENABLE_SDK=true
 *   DOCUSAURUS_ENABLE_I18N=true
 *
 * Explicit `true` / `false` always wins. Otherwise they default on in `docusaurus
 * start` and off in `docusaurus build`.
 */
function envFlag(name) {
  const value = process.env[name];
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return process.env.NODE_ENV !== 'production';
}

const siteFlags = {
  sdk: envFlag('DOCUSAURUS_ENABLE_SDK'),
  i18n: envFlag('DOCUSAURUS_ENABLE_I18N'),
};

module.exports = siteFlags;

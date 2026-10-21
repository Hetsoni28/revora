'use client';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/studio-config';

// Sanity UI passes some props (e.g. "intent", "params") through styled-components; styled-components v6
// no longer filters them, so only forward valid HTML attributes to DOM elements.
function shouldForwardProp(prop: string, target: unknown) {
  return typeof target === 'string' ? isPropValid(prop) : true;
}

export default function StudioPage() {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <NextStudio config={config} />
    </StyleSheetManager>
  );
}

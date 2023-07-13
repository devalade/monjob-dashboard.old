'use client';

import { getCurrentPageName } from './route';

export function PageTitle() {
  return <p>{getCurrentPageName()}</p>;
}

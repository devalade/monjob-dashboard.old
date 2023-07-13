import { LayoutDashboard, LucideIcon } from 'lucide-react';

export const routes = [
  { link: '/dashboard', name: 'Dashboard', Icon: LayoutDashboard },
  { link: '/offers', name: 'Offres', Icon: LayoutDashboard },
  { link: '/profiles', name: 'Profile', Icon: LayoutDashboard },
] as const;

export type RouteLink = (typeof routes)[number]['link'];
export type RouteName = (typeof routes)[number]['name'];

export function getLink(link: RouteLink) {
  return link;
}

export function getCurrentPageName(link?: RouteLink) {
  const linkHolder = link ?? location.pathname;
  const route = routes.filter((r) => r.link.includes(linkHolder));
  return route.at(0)?.name;
}

export function isActiveLink(link?: RouteLink) {
  const linkHolder = link ?? location.pathname;
  const route = routes.filter((r) => r.link.includes(linkHolder));
  return route.length == 1;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { sidebarNav, type NavNode, type NavSection } from "@/data/sidebarNav";
import { theme } from "@/lib/theme";

const Aside = styled.aside`
  padding: 40px 24px 60px 40px;
  border-right: 1px solid ${theme.colors.border};

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid ${theme.colors.border};
    padding: 28px 24px;
  }
`;

const Tree = styled.nav`
  margin-bottom: 34px;
`;

const SectionTitle = styled(Link)<{ $emphasized?: boolean; $current?: boolean }>`
  display: inline-block;
  font-weight: 700;
  font-size: 15px;
  margin: 0 0 6px 0;
  color: ${({ $emphasized }) =>
    $emphasized ? theme.colors.green : theme.colors.navy};
  text-decoration: ${({ $emphasized }) => ($emphasized ? "underline" : "none")};
  text-underline-offset: 4px;

  ${({ $current }) =>
    $current &&
    `
    color: ${theme.colors.blue};
  `}

  &:hover {
    text-decoration: ${({ $emphasized }) => ($emphasized ? "underline" : "none")};
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ChildList = styled.ul`
  list-style: none;
  margin: 0 0 0 9px;
  padding-left: 20px;
  border-left: 1.5px solid ${theme.colors.border};
`;

const NodeLink = styled(Link)<{ $current?: boolean; $activeParent?: boolean; $child?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 4px;
  font-size: ${({ $child }) => ($child ? "13.5px" : "14.5px")};
  color: ${({ $child }) => ($child ? theme.colors.textMuted : theme.colors.text)};
  cursor: pointer;
  border-radius: 6px;
  text-decoration: none;

  &:hover {
    background: ${theme.colors.blueLight};
    text-decoration: none;
  }

  ${({ $activeParent }) =>
    $activeParent &&
    `
    color: ${theme.colors.green};
  `}

  ${({ $current }) =>
    $current &&
    `
    color: ${theme.colors.blue};
    font-weight: 700;
    background: ${theme.colors.blueLight};
  `}
`;

const Chev = styled.span<{ $open?: boolean }>`
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $open }) => ($open ? theme.colors.green : theme.colors.textMuted)};
`;

function normalize(path: string) {
  if (path === "/" || path === "") return "/index";
  return path.replace(/\/$/, "");
}

function NavNodeItem({ node, pathname }: { node: NavNode; pathname: string }) {
  const current = normalize(pathname) === normalize(node.href);
  const hasChildren = !!node.children?.length;
  const activeParent =
    hasChildren && node.children!.some((c) => normalize(pathname) === normalize(c.href));

  return (
    <li>
      <NodeLink href={node.href} $current={current} $activeParent={activeParent}>
        <Chev $open={activeParent}>{hasChildren ? "⌄" : "›"}</Chev>
        {node.label}
      </NodeLink>
      {hasChildren && (
        <ChildList>
          {node.children!.map((child) => {
            const childCurrent = normalize(pathname) === normalize(child.href);
            return (
              <li key={child.href}>
                <NodeLink href={child.href} $current={childCurrent} $child>
                  <Chev>›</Chev>
                  {child.label}
                </NodeLink>
              </li>
            );
          })}
        </ChildList>
      )}
    </li>
  );
}

function NavSectionBlock({ section, pathname }: { section: NavSection; pathname: string }) {
  const current = normalize(pathname) === normalize(section.href);
  return (
    <Tree>
      <SectionTitle href={section.href} $emphasized={section.emphasized} $current={current}>
        {section.title}
      </SectionTitle>
      {section.items && (
        <List>
          {section.items.map((item) => (
            <NavNodeItem key={item.href} node={item} pathname={pathname} />
          ))}
        </List>
      )}
    </Tree>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <Aside id="sidebar-container">
      {sidebarNav.map((section) => (
        <NavSectionBlock key={section.href} section={section} pathname={pathname} />
      ))}
    </Aside>
  );
}

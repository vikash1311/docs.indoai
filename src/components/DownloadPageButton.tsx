"use client";

import styled from "styled-components";
import { theme } from "@/lib/theme";

const Bar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 18px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${theme.colors.blue};
  border: 1px solid ${theme.colors.blue};
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13.5px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: ${theme.colors.navy};
    border-color: ${theme.colors.navy};
  }
`;

export default function DownloadPageButton() {
  return (
    <Bar className="no-print">
      <Button type="button" onClick={() => window.print()}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 3v12" strokeLinecap="round" />
          <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 19h16" strokeLinecap="round" />
        </svg>
        Download PDF
      </Button>
    </Bar>
  );
}

"use client";

import { createGlobalStyle } from "styled-components";
import { theme } from "@/lib/theme";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    color: ${theme.colors.text};
    background: ${theme.colors.bg};
  }

  a {
    color: ${theme.colors.blue};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* ---- Doc content prose (ported 1:1 so extracted page bodies render correctly) ---- */

  .content h1 {
    font-size: 40px;
    font-weight: 800;
    margin: 0 0 18px 0;
  }

  .content h2 {
    font-size: 26px;
    font-weight: 800;
    margin: 44px 0 18px 0;
  }

  .print-icon {
    color: ${theme.colors.textMuted};
    margin-bottom: 18px;
  }

  hr.rule {
    border: none;
    border-top: 1px solid ${theme.colors.border};
    margin: 0 0 32px 0;
  }

  .content p {
    font-size: 16.5px;
    line-height: 1.85;
    margin: 0 0 22px 0;
  }

  .content p a {
    font-weight: 500;
  }

  .content ol,
  .content ul.steps {
    font-size: 16.5px;
    line-height: 1.85;
    padding-left: 22px;
    margin: 0 0 26px 0;
  }

  .content ol li,
  .content ul.steps li {
    margin-bottom: 10px;
  }

  .content strong {
    font-weight: 700;
  }

  .figure {
    border: 1px solid ${theme.colors.border};
    border-radius: 10px;
    padding: 22px;
    background: #fafbfc;
    margin: 0 0 26px 0;
  }

  .figure figcaption {
    font-size: 13px;
    color: ${theme.colors.textMuted};
    margin-top: 12px;
    text-align: center;
  }

  .app-window {
    border: 1px solid #d7dbe4;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 10px rgba(20, 25, 40, 0.06);
  }

  .app-panel {
    background: #fff;
    border: 1px solid ${theme.colors.border};
    border-radius: 8px;
    padding: 16px 18px;
    margin-bottom: 14px;
  }

  table.app-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
  }

  table.app-table th {
    text-align: left;
    background: #f2f3f6;
    padding: 8px 10px;
    font-weight: 700;
    color: ${theme.colors.textMuted};
  }

  table.app-table td {
    padding: 8px 10px;
    border-top: 1px solid ${theme.colors.border};
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border: 1px solid ${theme.colors.border};
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12.5px;
    color: ${theme.colors.text};
  }

  .btn.primary {
    background: ${theme.colors.blue};
    border-color: ${theme.colors.blue};
    color: #fff;
  }

  .btn.small {
    padding: 4px 10px;
    font-size: 11.5px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 12px 14px;
    align-items: center;
    font-size: 13px;
    margin-bottom: 8px;
  }

  .form-grid input,
  .form-grid select {
    padding: 7px 10px;
    border: 1px solid ${theme.colors.border};
    border-radius: 6px;
    font-size: 13px;
  }

  @media (max-width: 900px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }

  @media print {
    .topbar,
    #sidebar-container,
    .no-print {
      display: none !important;
    }

    .layout {
      display: block !important;
      max-width: none !important;
    }

    .content {
      padding: 0 !important;
    }
  }
`;

export default GlobalStyle;

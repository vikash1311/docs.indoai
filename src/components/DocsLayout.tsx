import styled from "styled-components";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import DownloadPageButton from "./DownloadPageButton";

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  max-width: 1500px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  padding: 40px 60px 100px 56px;

  @media (max-width: 900px) {
    padding: 32px 24px 80px;
  }
`;

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <LayoutGrid className="layout">
        <Sidebar />
        <Main className="content">
          <DownloadPageButton />
          {children}
        </Main>
      </LayoutGrid>
    </>
  );
}

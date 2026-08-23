import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import { theme } from "@/lib/theme";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  border-bottom: 1px solid ${theme.colors.border};
  gap: 32px;

  @media (max-width: 900px) {
    padding: 16px 20px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 22px;
  color: ${theme.colors.navy};
  white-space: nowrap;
`;

export default function Topbar() {
  return (
    <Header className="topbar">
      <Brand className="brand">
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/logo-indoai.webp"
            alt="Indo AI"
            className="logo"
            height={34}
            width={140}
            style={{ height: 34, width: "auto" }}
            priority
          />
        </Link>
      </Brand>
      <SearchBox />
    </Header>
  );
}

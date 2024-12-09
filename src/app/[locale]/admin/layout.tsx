import { Col } from "@/components/ui/common";
import { ReactNode } from "react";
import LightThemeProvider from "@/providers/LightThemeProvider";
import AdminSidebar from "@/app/[locale]/admin/AdminSidebar";
import AdminPageContextProvider from "@/providers/AdminPageContextProvider";
import { assertAdmin } from "@/resources/tokens/token.controller";
import { serverResponseHandler } from "@/handlers/serverResponseHandler";

export default async function Admin({ children }: {
  children: ReactNode;
}) {
  await assertAdmin().then(serverResponseHandler);
  return (
    <LightThemeProvider>
      <AdminPageContextProvider>
        <div className="flex w-full light bg-background text-primary">
          <div className="mx-auto max-w-[1200px] w-full flex">
            <Col className="w-[240px] border-r border-r-gray relative">
              <AdminSidebar/>
            </Col>
            <Col className="flex-1 bg-gray-light p-10">
              {children}
            </Col>
          </div>
        </div>
      </AdminPageContextProvider>
    </LightThemeProvider>
  );
}

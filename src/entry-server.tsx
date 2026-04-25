import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ThemeProvider } from "./Context/ThemeContext";
import { RouterContent } from "./Router/router";
import { getSsrDataForUrl } from "./Shared/routeData";
import { SsrDataProvider } from "./Shared/SsrDataContext";

export async function render(url: string) {
  const ssrData = await getSsrDataForUrl(url);
  const appHtml = renderToString(
    <ThemeProvider>
      <SsrDataProvider data={ssrData}>
        <StaticRouter location={url}>
          <RouterContent />
        </StaticRouter>
      </SsrDataProvider>
    </ThemeProvider>
  );

  return {
    appHtml,
    ssrData,
    statusCode: ssrData.statusCode || 200,
  };
}

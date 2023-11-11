// 1.  오프라인 상태일 때 보여줄 내용

const responseContent =
  "<html>" +
  "<head>" +
  "<meta charset='utf-8'>" + // 한글 인코딩 설정
  "<style>" +
  "body {text-align: center; background-color: #333; color: #eee;}" +
  "</style>" +
  "</head>" +
  "<body>" +
  "<h1>동감(Ditto)</h1>" +
  "<h3>SSAFY 부울경 9기 자율 프로젝트</h3>" +
  "<p>인터넷 연결을 확인해보세요</p>" +
  "</body>" +
  "</html>";

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response(responseContent, {
        headers: { "Content-Type": "text/html" },
      });
    })
  );
});
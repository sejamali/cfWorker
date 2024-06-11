(() =>
{
    // my-worker/worker.js
    addEventListener("fetch", (event) =>
    {
        event.respondWith(handleRequest(event.request));
    });
    async function handleRequest(request)
    {
        const url = new URL(request.url);
        const uuid = url.searchParams.get("UUID");
        if (!uuid)
        {
            return new Response("UUID parameter is missing or invalid", { status: 400 });
        }
        console.log("1");
        const proxy_path = "v9oH9ATXGAmdVy79xZYPQ816";
        const apiUrl = `https://proxified.gh6024.ir/${proxy_path}/${uuid}/api/v2/user/me/`;
        console.log(apiUrl);
        const response = await fetch(apiUrl);
        const responseObj = await response.json();
        if (responseObj.msg != void 0)
        {
            return new Response("UUID parameter is invalid, contact administrator.", { status: 404 });
        }

        console.log("2");
        const user_remaining_days = responseObj.profile_remaining_days;
        const user_remaining_usage = Math.trunc(responseObj.profile_usage_total - responseObj.profile_usage_current).toString();
        let status = "\u26A1\uFE0F";
        if (user_remaining_days < 3 || parseInt(user_remaining_usage) < 3)
        {
            status = "\u{1F4DB}\u{1F4DB}\u{1F4DB}";
        }
        let statusConfig = `vless://${uuid}@subscription.gh6024.ir:1?path=%1111111&security=tls&encryption=none&alpn=http/1.1&host=subscription.ir&fp=chrome&type=ws&sni=subscription.gh6024.ir#\u062D\u062C\u0645 : ${user_remaining_usage} GB ${status} \u0631\u0648\u0632 \u0628\u0627\u0642\u06CC\u0645\u0627\u0646\u062F\u0647 : ${user_remaining_days}`;
        let config = `vless://65343a3b-a476-4c9e-922b-49a246ad1d75@h3.teknolife.site:37030?type=tcp&host=telewebion.com&security=none&headerType=http&path=/#Germany - 1
  dmxlc3M6Ly8yZTcyOTliNy04MTgxLTRkMDktOTI5MC1mMzI3MTFiMTQyNTFAdHVuLmdoNjAyNC5pcjo0NDM/c2VjdXJpdHk9bm9uZSZ0eXBlPXRjcCNOZXRoZXJsYW5kLWVyZgo=`;
        const includesNoStatus = url.pathname.includes("/nostatus");
        if (includesNoStatus)
        {
            statusConfig = "";
        }
        const includesNoConfig = url.pathname.includes("/noconfig");
        if (!includesNoConfig)
        {
            statusConfig += "\n" + config;
        }
        console.log("3");
        console.log(atob(statusConfig).toString())
        return new Response(atob(statusConfig).toString(), {
            headers: { "content-type": "text/plain" }
        });
    }
})();
//# sourceMappingURL=worker.js.map

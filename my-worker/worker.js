addEventListener('fetch', event =>
{
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request)
{
    // Parse the URL to get the UUID parameter
    const url = new URL(request.url)
    const uuid = url.searchParams.get('UUID')

    // If UUID is not provided, return an error response
    if (!uuid)
    {
        return new Response('UUID parameter is missing or invalid', { status: 400 })
    }

    // Define the proxy path variable
    const proxy_path = 'v9oH9ATXGAmdVy79xZYPQ816' // Replace this with your actual proxy path value

    // Construct the API URL
    const apiUrl = `https://proxified.gh6024.ir/${proxy_path}/${uuid}/api/v2/user/me/`
    console.log(apiUrl)
    // Fetch data from the API
    const response = await fetch(apiUrl);
    const responseObj = await response.json();

    if (responseObj.msg != undefined)
    {
        return new Response('UUID parameter is invalid, contact administrator.', { status: 404 })
    }

    const user_remaining_days = responseObj.profile_remaining_days;
    const user_remaining_usage = (Math.trunc(responseObj.profile_usage_total - responseObj.profile_usage_current)).toString();

    let status = "⚡️";
    if (user_remaining_days < 3 || parseInt(user_remaining_usage) < 3)
    {
        status = "📛📛📛"
    }

    let statusConfig = `vless://${uuid}@subscription.gh6024.ir:1?path=%1111111&security=tls&encryption=none&alpn=http/1.1&host=subscription.ir&fp=chrome&type=ws&sni=subscription.gh6024.ir#حجم : ${user_remaining_usage} GB ${status} روز باقیمانده : ${user_remaining_days}`;
    let config = `vless://65343a3b-a476-4c9e-922b-49a246ad1d75@h3.teknolife.site:37030?type=tcp&host=telewebion.com&security=none&headerType=http&path=/#Germany - 1
  dmxlc3M6Ly8yZTcyOTliNy04MTgxLTRkMDktOTI5MC1mMzI3MTFiMTQyNTFAdHVuLmdoNjAyNC5pcjo0NDM/c2VjdXJpdHk9bm9uZSZ0eXBlPXRjcCNOZXRoZXJsYW5kLWVyZgo=`
    const includesNoStatus = url.pathname.includes('/nostatus')
    if (includesNoStatus)
    {
        statusConfig = "";
    }
    // Check if the path includes /noconfig
    const includesNoConfig = url.pathname.includes('/noconfig')
    if (!includesNoConfig)
    {
        statusConfig += "\n" + config;
    }

    // Return the fetched data as the response
    return new Response(btoa(statusConfig).toString(), {
        headers: { 'content-type': 'text/plain' },
    });
}
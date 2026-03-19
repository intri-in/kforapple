
export function addTrailingSlashtoURL(url:string)
{
    if(!url)return ""
    let lastChar = url.substr(-1);     
    if (lastChar != '/') {       
    url = url + '/';          
    }

    return url

}


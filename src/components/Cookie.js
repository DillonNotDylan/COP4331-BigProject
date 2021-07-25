export default class Cookie
{

	static setCookie(name, value, expireDateinMin)
	{
		var expireTime;
<<<<<<< HEAD
		if (expireDateinMin == 0)
=======
		if (expireDateinMin === 0)
>>>>>>> 90f0badb51fdc919c34c3d79ce4cb4831f5d9167
			expireTime = "";
		else 
		{
			var date = new Date();
			date.setTime(date.getTime() + expireDateinMin *(60 * 60 * 1000));
			expireTime = ";expire=" + date.toUTCString();
		}
			
		document.cookie = name + "=" + value +";" + expireTime + ";path = /";
	}

	static setJCookie(name, value, expireDateinMin)
	{
		var expireTime;
<<<<<<< HEAD
		if (expireDateinMin == 0)
=======
		if (expireDateinMin === 0)
>>>>>>> 90f0badb51fdc919c34c3d79ce4cb4831f5d9167
			expireTime = "";
		else 
		{
			var date = new Date();
			date.setTime(date.getTime() + expireDateinMin *(60 * 60 * 1000));
			expireTime = ";expire=" + date.toUTCString();
		}
			
		document.cookie = name + "=" + JSON.stringify(value) +";" + expireTime + ";path = /";
	}

	static getCookie(cookieName)
	{
<<<<<<< HEAD
		let name = cookieName+"=";
=======
>>>>>>> 90f0badb51fdc919c34c3d79ce4cb4831f5d9167
		// split by each pair. turn to array
		let cList = document.cookie.split(';');
		var l;
		for (let i = 0; i < cList.length; i++)
		{
			l = cList[i].indexOf(cookieName);
<<<<<<< HEAD
			if ( l == 1 || l == 0)
=======
			if ( l === 1 || l === 0)
>>>>>>> 90f0badb51fdc919c34c3d79ce4cb4831f5d9167
				return cList[i];
		}

		return null;	
	}

	static cookieVal(cookie)
	{
		if (cookie == null)
			return "";
		return cookie.split('=')[1];
	}

	static cToJson(cookie)
	{
		
		if (cookie == null)
			return null;
		var a = cookie.split('=')[1];
		return JSON.parse(a);
	}

	static delCookie(name)
<<<<<<< HEAD
	{
		var expireTime;
		var date = new Date();
		date.setTime(date.getTime() - 1000);
		expireTime = ";expire=" + date.toUTCString();
			
=======
	{	
>>>>>>> 90f0badb51fdc919c34c3d79ce4cb4831f5d9167
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	}
	
}
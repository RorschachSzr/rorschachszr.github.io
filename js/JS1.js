
window.onunload=function()
{
}
/*********************************网页元素整体居中*********************************/
window.onload=function()
{
	//浏览器宽度：screen.width   浏览器高度：screen.height);
	var div_margin_left=(screen.width-1000)/2;
	if (screen.width<1000)
	{
		div_margin_left=0;
	}
	document.getElementById("div1").style.marginLeft=div_margin_left+"px";
	document.getElementById("div2").style.marginLeft=div_margin_left+"px";
	document.getElementById("div3").style.marginLeft=div_margin_left+"px";
	document.getElementById("div4").style.marginLeft=(div_margin_left-7)+"px";
	document.getElementById("div7").style.marginLeft=div_margin_left+"px";
	document.getElementById("div2_1").style.marginLeft=div_margin_left+"px";
	document.getElementById("div2_underline").style.marginLeft=div_margin_left+"px";
	document.getElementById("div2_1").style.background='#06F';
	document.getElementById("div2_2").style.background='#FFF';
	document.getElementById("div2_3").style.background='#FFF';
	document.getElementById("div2_4").style.background='#FFF';
	document.getElementById("div2_5").style.background='#FFF';
	var div2_1=document.getElementById('div2_1');
	var div2_2=document.getElementById('div2_2');
	var div2_3=document.getElementById('div2_3');
	var div2_4=document.getElementById('div2_4');
	var div2_5=document.getElementById('div2_5');
	div2_1.onmouseover=div2_1over;
	div2_1.onmouseout=div2_1out;
	div2_2.onmouseover=div2_2over;
	div2_2.onmouseout=div2_2out;
	div2_3.onmouseover=div2_3over;
	div2_3.onmouseout=div2_3out;
	div2_4.onmouseover=div2_4over;
	div2_4.onmouseout=div2_4out;
	div2_5.onmouseover=div2_5over;
	div2_5.onmouseout=div2_5out;
}
/*********************************主网页浮动框架高度判断*********************************/
function cpages_height(obj)
{
	var cpages=obj;
	if (document.getElementById)
	{
		if (cpages && !window.opera)
		{
			if (cpages.contentDocument && cpages.contentDocument.body.offsetHeight)
			{
				cpages.height=cpages.contentDocument.body.offsetHeight;
			}
			else
			{
				if (cpages.Document && cpages.Document.body.scrollHeight)
			    {
					cpages.height=cpages.Document.body.scrollHeight;
			    }
				else
				{
					cpages.height="800px";
				}
			}
		}
	}
}
/*********************************主网页图片滚动区域*********************************/
//清空
function mainpage_img_roll_empty()
{
	document.getElementById("div2_1").style.background='#FFF';
	document.getElementById("div2_2").style.background='#FFF';
	document.getElementById("div2_3").style.background='#FFF';
	document.getElementById("div2_4").style.background='#FFF';
	document.getElementById("div2_5").style.background='#FFF';
}
//div2_1
function div2_1over()
{
	mainpage_img_roll_empty();
	document.getElementById("div2_1").style.background='#06F';
	imgnow=1;
	document.getElementById('mainpageroll').src="images/roll/"+imgnow+".jpg";
}
function div2_1out()
{
	mainpage_img_roll();
}
//div2_2
function div2_2over()
{
	mainpage_img_roll_empty();
	document.getElementById("div2_2").style.background='#06F';
	imgnow=2;
	document.getElementById('mainpageroll').src="images/roll/"+imgnow+".jpg";
}
function div2_2out()
{
	mainpage_img_roll();
}
//div2_3
function div2_3over()
{
	mainpage_img_roll_empty();
	document.getElementById("div2_3").style.background='#06F';
	imgnow=3;
	document.getElementById('mainpageroll').src="images/roll/"+imgnow+".jpg";
}
function div2_3out()
{
	mainpage_img_roll();
}
//div2_4
function div2_4over()
{
	mainpage_img_roll_empty();
	document.getElementById("div2_4").style.background='#06F';
	imgnow=4;
	document.getElementById('mainpageroll').src="images/roll/"+imgnow+".jpg";
}
function div2_4out()
{
	mainpage_img_roll();
}
//div2_5
function div2_5over()
{
	mainpage_img_roll_empty();
	document.getElementById("div2_5").style.background='#06F';
	imgnow=5;
	document.getElementById('mainpageroll').src="images/roll/"+imgnow+".jpg";
}
function div2_5out()
{
	mainpage_img_roll();
}

window.onunload=function()
{
}
window.onload=function()
{
	//ä¯ÀÀÆ÷¿í¶È£ºscreen.width   ä¯ÀÀÆ÷¸ß¶È£ºscreen.height);

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
/************************Í¼Æ¬¹ö¶¯ÇøÓò***************************************/
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
	document.getElementById("div2_1").style.background='#333333';
	document.getElementById("div2_1").style.color = '#FFFFFF';
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
	document.getElementById("div2_2").style.background='#333333';
	document.getElementById("div2_2").style.color = '#FFFFFF';
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
	document.getElementById("div2_3").style.background='#333333';
	document.getElementById("div2_3").style.color = '#FFFFFF';
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
	document.getElementById("div2_4").style.background='#333333';
		document.getElementById("div2_4").style.color = '#FFFFFF';
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
	document.getElementById("div2_5").style.background='#333333';
	imgnow=5;
	document.getElementById('mainpageroll').src="images/roll/"+imgnow+".jpg";
}
function div2_5out()
{
	mainpage_img_roll();
}

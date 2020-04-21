<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<xsl:output method="html"/>
	
	<xsl:variable name="done">
		<span style="color:green;">已完成</span>
	</xsl:variable>
	
	<xsl:variable name="doing">
		<span style="color:blue;">进行中</span>
	</xsl:variable>
	
	<xsl:variable name="todo">
		<span style="color:red;">未开始</span>
	</xsl:variable>
	
	<xsl:template match="/">
		<html>
			<head>
				<title>西米露</title>
			</head>
			<body>
				<div id="wrapper" style="height:100%;width:80%;margin:0 auto;">
					<img src="group_profile_resource/ximilu.jpg" alt="西米露" style="width:100%;height:60%;" usemap="repeat"/>
					<div>
						
						<object data="logo.svg"
								type="image/svg+xml"
								codebase="http://www.adobe.com/svg/viewer/install/" style="float:left;height:250px;width:320px;margin-left:10%;"/>
						<div style="margin-left:30%;">
							<h1 style="diplay:block;margin-left:20%;padding-top:20%;">西米露，专注XML20年</h1>
						</div>
						<div style="clear:both;"></div>
					</div>
					<div id="team_intro">
						<h2>团队简介</h2>
						<div id="intro_content">
							<div id="intro_imgs" style="width:50%;float:left;">
								<img src="group_profile_resource/seu.jpg" alt="seu" style="display:block;height:200px;"/>
								<img src="group_profile_resource/xml.png" alt="xml" style="display:block;height:130px;"/>
							</div>
							<div id="intro_text" style="width:50%;vertical-align:middle;padding-top:8%;font-size:20px;text-indent: 2em;float:left;">
							我们是来自东南大学软件学院17级2班的团队西米露，原指一种来自热带群岛的神奇作物，其外观如露珠晶莹剔透，口感如糯米般滑腻鲜甜，是消暑滋补的美味和居家旅行的必备。团队名称灵感来源其首字母缩写为XML，并寄托了我们可以像西米露那样为客户带来甘甜，消除内心炎热的美好愿望。
							</div>
							<div style="clear:both;"></div>
						</div>
					</div>
					<div id="team_members">
						<h2>成员概况</h2>
						<xsl:apply-templates select="team/team_members"/>
					</div>
					<div id="data_info">
						<h2>数据信息</h2>
						<ul style="margin-left:10%;font-size:20px;">
							<li>主题：历年奥斯卡金像奖最佳影片</li>
							<li>类型：电影</li>
							<li>记录数：31</li>
							<li>字段：
								名称，简介，评分，制片地区，导演，编剧，主演，时长，评级，流派，美国首映周票房，海报链接
							</li>
							<li>数据来源：<a href="https://www.imdb.com/oscars/" target="_blank">IMDb奥斯卡</a></li>
						</ul>
					</div>
					<div id="progress">
						<h2>任务进展</h2>
						<ul style="margin-left:10%;font-size:20px;">
							<li >信息模型的建立：<xsl:copy-of select="$done" /></li>
							<li>DTD设计：<xsl:copy-of select="$done" /></li>
							<li>Schema设计：<xsl:copy-of select="$done" /></li>
							<li>小组信息网站展示：<xsl:copy-of select="$done" /> (<a href="../1.7/Oscars_Best_Motion_Pics-v1.7.html" target="_blank">信息数据展示</a>)</li>
							<li>数据宣传广告设计：<xsl:copy-of select="$done" />(2/2) (<a href="../poster/poster.html" target="_blank">李泓烨</a>) (<a href="../ad_lyh/2008.html" target="_blank">柳沿河</a>)</li>
							<li>小组SVG图标设计：<xsl:copy-of select="$done" /></li>
							<li>XQuery查询实现：<xsl:copy-of select="$done" /></li>
							<li>DOM解析修改添加排序实现：<xsl:copy-of select="$done" /></li>
							<li>SAX解析查询实现：<xsl:copy-of select="$done" /></li>
						</ul>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
		
	<xsl:template name="team_members" match="team/team_members">
		<xsl:for-each select="team_member">
			<div class="team_member" style="margin-top:10%; clear:both;">
				<img style="width:250px;height:350px;margin-left:20%;display:inline-block;float:left;">
					<xsl:attribute name="src">
						<xsl:value-of select="pic"/>
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="name"/>
					</xsl:attribute>
				</img>
				<div style="display:inline-block;font-size:20px;margin-left:10%;">
					<p>姓名：
						<xsl:value-of select="name"/>
						(<xsl:value-of select="@duty"/>)
					</p>
					<p>年龄：<xsl:value-of select="age"/></p>
					<p>爱好：
						<xsl:for-each select="hobbies/hobby">
							<xsl:value-of select="."/>;
						</xsl:for-each>
					</p>
					<p>职业：<xsl:value-of select="job"/></p>
					<p>单位：<xsl:value-of select="company"/></p>
					<p>E-mail：<xsl:value-of select="contact/email"/></p>
					<p>Tel：<xsl:value-of select="contact/tel"/></p>
				</div>
			</div>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
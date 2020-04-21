<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/02/xpath-functions" xmlns:xdt="http://www.w3.org/2005/02/xpath-datatypes"
>
	<xsl:output method="html"/>
	
	<xsl:template match="/">
		<html>
			<head>
				<title></title>
			</head>
			<body style="background-color:black;">
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="catalog/movie">
		<div id="wrapper" style="overflow:hidden;margin-left:10%;width:80%;height:100%;background:url(oscars.jpg) no-repeat;border:5px solid rgba(251, 231, 162, 1);color:white;font-family: Times New Roman;">
			<div style="float:left;width:50%;">
				<p style="text-align:center;margin:10px 0 0 0;">
					<img src="gold_man.png" alt="icon" style="width:40px;height:40px;"/>
				</p>
				<h2 style="text-align:center;margin-top:0;">
					<span style="font-style:italic;color:rgba(209, 175, 137, 1);"><xsl:value-of select="name"/></span>
				</h2>
				<div style="text-align:center;">
					<img style="width:200px;height:300px;border:1px solid rgba(251, 231, 162, 1);">
						<xsl:attribute name="src"><xsl:value-of select="poster_url"/></xsl:attribute>
					</img>
				</div>
				<p style="color:rgba(206, 187, 137, 1);font-size:14px;text-indent:2em;width:85%;margin:10px auto;"><xsl:value-of select="intro"/></p>
				<div style="font-size:14px;color:rgba(206, 187, 137, 1);">
					<ul style="width:55%;list-style:none; float:left;margin-top:0;margin-bottom:0;">
						<li>Directors:<xsl:for-each select="directors/director"><span style="margin-left:0.5em;text-decoration:underline;"><xsl:value-of select="."/></span></xsl:for-each></li>
						<li>Writers:<xsl:for-each select="writers/writer"><span style="margin-left:0.5em;text-decoration:underline;"><xsl:value-of select="."/></span></xsl:for-each></li>
						<li>Stars:<xsl:for-each select="stars/star"><span style="margin-left:0.5em;text-decoration:underline;"><xsl:value-of select="."/></span></xsl:for-each></li>
						<li>Genres:<xsl:for-each select="genres/label"><span style="margin-left:0.5em;text-decoration:underline;"><xsl:value-of select="."/></span></xsl:for-each></li>
						<li>Country:<span style="margin-left:0.5em;"><xsl:value-of select="country"/></span></li>
					</ul>
					<ul style="width:25%;list-style:none; float:left;margin-top:0;margin-bottom:0;">
						<li><img src="rating.png" alt="Rating" style="height:12px;width:12px;"/><span style="margin-left:0.5em;"><xsl:value-of select="rating"/></span></li>
						<li><img src="duration.png" alt="Duration" style="height:12px;width:12px;"/><xsl:apply-templates select="duration"/></li>
						<li><img src="dollar.png" alt="Opening_Weekend_USA" style="height:14px;width:14px;"/><span style="margin-left:0.5em;"><xsl:value-of select="Opening_Weekend_USA"/></span></li>
						<li><img src="level.png" alt="level" style="height:12px;width:12px;"/><span style="margin-left:0.5em;"><xsl:value-of select="level"/></span></li>
					</ul>
				</div>
			</div>
			<div style="float:left;width:50%;height:100%;">
				<h1 style="margin-top:95%;color:rgba(209, 175, 137, 1);">Best Motion Picture of <span><xsl:value-of select="@year"/></span></h1>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="duration">
		<span style="margin-left:0.5em;">
		<xsl:value-of select="hours-from-duration(xs:dayTimeDuration(.))"/>h<xsl:value-of select="minutes-from-duration(xs:dayTimeDuration(.))"/>m
		</span>
	</xsl:template>
	
</xsl:stylesheet>

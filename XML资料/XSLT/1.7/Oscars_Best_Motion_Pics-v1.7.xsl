<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/02/xpath-functions" xmlns:xdt="http://www.w3.org/2005/02/xpath-datatypes">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html>
			<head>
				<style>
					/* unvisited link */
					a:link {
						color: #136CB2;
						text-decoration: none;
					}
					
					/* visited link */
					a:visited {
						text-decoration: none;
					}
					
					/* mouse over link */
					a:hover {
						color: hotpink;
						text-decoration: underline;
					}
					
					/* selected link */
					a:active {
						color: blue;
						text-decoration: underline;
					}
				</style>
			</head>
			<body>
				<h1 style="text-align:center">IMDb Oscar Awards</h1>
				<p style="font-size:15px">by Hongye Li, Yanhe Liu</p>
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="movie">
		<div style="width:85%; background-color:rgba(250,250,250,0.3);">
			<div style="clear:both; padding:10px 0 10px 0;">
				<img style="width:140px; height:230px; margin-right:1%; display:inline-block; float:left; vertical-align:middle;">
					<xsl:apply-templates select="poster_url"/>
				</img>
			</div>
			<div style="vertical-align:middle;">
				<div style="font-size:170%; font-weight:bold; padding:0 0 5px 0;">
					<a target="_blank">
						<xsl:apply-templates select="name"/>
					</a>
					<xsl:apply-templates select="@year"/>
				</div>
				<div style="font-size:85%; padding:0 0 5px 0; color: rgb(80,80,80);">
					<xsl:apply-templates select="level"/>
					<xsl:apply-templates select="duration"/>
					<xsl:apply-templates select="genres"/>
					<xsl:apply-templates select="country"/>
				</div>
				<div style="font-size:110%;">
					<xsl:apply-templates select="rating"/>				
				</div>
				<div style="width:75%; padding:8px 0 0 0;">
					<xsl:apply-templates select="intro"/>
				</div>
				<div style="width:75%; padding:12px 0 0 0;">
					<xsl:apply-templates select="directors"/>
					<xsl:apply-templates select="writers"/>
					<xsl:apply-templates select="stars"/>
					<xsl:apply-templates select="Opening_Weekend_USA"/>
				</div>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="poster_url">
		<xsl:attribute name="src">
			<xsl:value-of select="."/>
		</xsl:attribute>
		<xsl:attribute name="alt">
			<xsl:value-of select="../name"/>
		</xsl:attribute>
	</xsl:template>
	
	<xsl:template match="name">
		<xsl:attribute name="href">
			https://www.imdb.com/title/<xsl:value-of select="../@id"/>/?ref_=fn_al_tt_1
		</xsl:attribute>
		<xsl:value-of select="."/>
	</xsl:template>
	
	<xsl:template match="@year">
		<span>(<xsl:value-of select="."/>)</span>
	</xsl:template>
	
	<xsl:template match="level">
		<span><xsl:value-of select="."/> | </span>
	</xsl:template>
	
	<xsl:template match="duration">
		<span><xsl:value-of select="hours-from-duration(xs:dayTimeDuration(.)) * 60 + minutes-from-duration(xs:dayTimeDuration(.))"/>min | </span>
	</xsl:template>
	
	<xsl:template match="genres">
		<span>
			<xsl:for-each select="label">
				<xsl:value-of select="."/>
				<xsl:if test="position() != last()">, </xsl:if>
			</xsl:for-each>
			|
		</span>
	</xsl:template>
	
	<xsl:template match="country">
		<xsl:value-of select="."/>
	</xsl:template>
	
	<xsl:template match="rating">
		Rating
		<xsl:choose>
			<xsl:when test="xs:decimal(text()) &gt; 8">
				<span style="color:red;"><xsl:value-of select="."/></span>
			</xsl:when>
			<xsl:when test="xs:decimal(text()) &gt; 7.5">
				<span style="color:#ffa500;"><xsl:value-of select="."/></span>
			</xsl:when>
			<xsl:otherwise>
				<span style="color:green;"><xsl:value-of select="."/></span>
			</xsl:otherwise>
		</xsl:choose>
		<emsp />
	</xsl:template>
	
	<xsl:template match="intro">
		<span style="border-left:3px solid lightgrey; padding:0 0 0 5px; font-style:italic;">
			<xsl:value-of select="."/>
		</span>
		<br />
	</xsl:template>
	
	<xsl:template match="directors">
		<span>
			<xsl:choose>
				<xsl:when test="count(director) = 1">Director: </xsl:when>
				<xsl:otherwise>Directors: </xsl:otherwise>
			</xsl:choose>
			<xsl:for-each select="director">
				<xsl:value-of select="."/>
				<xsl:if test="position() != last()">, </xsl:if>
			</xsl:for-each>
		</span>
		<br/>
	</xsl:template>
	
	<xsl:template match="writers">
		<span>
			<xsl:choose>
				<xsl:when test="count(writer) = 1">Writer: </xsl:when>
				<xsl:otherwise>Writers: </xsl:otherwise>
			</xsl:choose>
			<xsl:for-each select="writer">
				<xsl:value-of select="."/>
				<xsl:if test="position() != last()">, </xsl:if>
			</xsl:for-each>
		</span>
		<br/>
	</xsl:template>
	
	<xsl:template match="stars">
		<span>
			<xsl:choose>
				<xsl:when test="count(star) = 1">Star: </xsl:when>
				<xsl:otherwise>Stars: </xsl:otherwise>
			</xsl:choose>
			<xsl:for-each select="star">
				<xsl:value-of select="."/>
				<xsl:if test="position() != last()">, </xsl:if>
			</xsl:for-each>
		</span>
		<br/>
	</xsl:template>
	
	<xsl:template match="Opening_Weekend_USA">
		<span>Opening Weekend USA: $<xsl:value-of select="."/></span>
	</xsl:template>
	
	
</xsl:stylesheet>

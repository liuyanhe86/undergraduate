<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="catalog">
        <html>
            <head>
                <style>
                    /* unvisited link */
                    a:link {
                    color: white;
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
            <body style="background-color:black">
                <div align="center">
                    <div>
                        <img style="width:120px; height:55px;" src="https://pmcvariety.files.wordpress.com/2017/02/imdb1.png?w=600"/>                        
                        <h1 style="display:inline-block; font:36px Arial,sans-serif;color:#fff;text-decoration-color:#fff;">OSCARS <xsl:value-of select="movie/@year"/></h1>
                    </div>
                </div>
                <xsl:apply-templates select="movie"/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="movie">
        <div style="padding:10px 0 0 70px;">
            <div style="padding-right:25px; width:40%; float:left;">
                <img style="width:100%; height:100%;">
                    <xsl:apply-templates select="poster_url"/>
                </img>
            </div>
            <div style="padding:0 120px 0 0;">
                <div style="padding:0 50px 0 0; display:inline-block;">
                    <a style="font-size:190%; font-weight:bold;" target="_blank">
                        <xsl:apply-templates select="name"/>
                    </a>
                </div>
                <div style="display:inline-block;">
                    <img style="width:60px; height:55px;" src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX24301027.jpg"/>
                    <xsl:apply-templates select="rating"/>
                </div>
                <div style="font-size:130%; padding:30px 0 0 0; color:silver;">
                    <xsl:apply-templates select="level"/>
                    <xsl:apply-templates select="duration"/>
                    <xsl:apply-templates select="genres"/>
                    <xsl:apply-templates select="country"/>
                </div>
                <div style="padding:60px 0 0 0;">
                    <xsl:apply-templates select="intro"/>
                </div>
                <div style="font-size:150%; padding:80px 0 0 0; color:white;">
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
    
    <xsl:template match="intro">
        <span style="color:white; border-left:3px solid lightgrey; font-size:130%; padding:0 0 0 5px; font-style:italic;">
            <xsl:value-of select="."/>
        </span>
        <br />
    </xsl:template>
    
    <xsl:template match="rating">
        <span style="color:white;font-size:130%; padding:0 0 0 5px;">
            <xsl:value-of select="."/>  / 10
        </span>
        <br />
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
    
    <xsl:template match="directors">
        <span>
            <xsl:choose>
                <xsl:when test="count(director) = 1">
                    <span style="color:white">
                        Director: 
                    </span>
                </xsl:when>
                <xsl:otherwise>
                    <span style="color:white">
                        Directors: 
                    </span>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="director">
                <xsl:value-of select="."/>
                <xsl:if test="position() != last()">, </xsl:if>
            </xsl:for-each>
        </span>
        <br/>
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
        <br/>
    </xsl:template>
    
    <xsl:template match="Opening_Weekend_USA">
        <span>Opening Weekend USA: $<xsl:value-of select="."/></span>
    </xsl:template>
    
</xsl:stylesheet>
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <title>
        RSS Feed | <xsl:value-of select="/atom:feed/atom:title"/>
      </title>
      <link rel="stylesheet" href="/css/mark-3.css"/>
    </head>
    <body>
      <p>
        This is an RSS feed. Visit
        <a href="https://aboutfeeds.com">About Feeds</a>
        to learn more and get started!
      </p>
      <h1>Recent blog posts</h1>
      <xsl:for-each select="/atom:feed/atom:entry">
      <p>
        <a>
          <xsl:attribute name="href">
            <xsl:value-of select="atom:link/@href"/>
          </xsl:attribute>
          <xsl:value-of select="atom:title"/>
        </a>
        <xsl:value-of select="atom:summary"/>
        Last updated:
        <xsl:value-of select="substring(atom:updated, 0, 11)" />
        </p>
      </xsl:for-each>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
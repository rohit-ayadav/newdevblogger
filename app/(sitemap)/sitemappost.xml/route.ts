import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Blog from "@/models/blogs.models";
import { BlogPostType } from "@/types/blogs-types";

const BASE_URL = "https://www.devblogger.in";

export async function GET() {
    try {
        await connectDB();

        // Only include publicly viewable posts (approved status)
        const publicPosts = await Blog.find({
            status: "approved"
        }).lean() as unknown as BlogPostType[];

        // Generate the main sitemap with approved posts
        const sitemap = generateSitemap(publicPosts);

        return new NextResponse(sitemap, {
            status: 200,
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=86400" // Cache for 24 hours
            },
        });
    } catch (error) {
        console.error("Sitemap generation error:", error);
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
}

// Function to generate sitemap XML
function generateSitemap(posts: BlogPostType[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Homepage -->
    <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- Blog index page -->
    <url>
        <loc>${BASE_URL}/blogs</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    
    <!-- Individual blog posts Total of ${posts.length} blogs -->
    ${posts.map(post => `
    <url>
        <loc>${BASE_URL}/blogs/${post.slug}</loc>
        <lastmod>${post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`).join('')}
</urlset>`;
}

// For dynamic sitemap generation based on categories
export async function generateCategorySitemap() {
    try {
        await connectDB();

        // Get all unique category tags from approved posts
        const categories = await Blog.distinct("tags", { category: "approved" });

        const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${BASE_URL}/sitemap.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    ${categories.map(category => `
    <sitemap>
        <loc>${BASE_URL}/sitemaps/category-${encodeURIComponent(category)}.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>`).join('')}
</sitemapindex>`;

        return sitemapIndex;
    } catch (error) {
        console.error("Category sitemap generation error:", error);
        throw error;
    }
}
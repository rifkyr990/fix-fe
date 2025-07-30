"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/app/lib/api";

const slugify = (str) =>
  str && str.toString().toLowerCase().replace(/\s+/g, "-");

export default function NewsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/articles?page=1&limit=4");
        setBlogs(res.data.data || []);
      } catch (err) {
        setError("Gagal memuat berita terbaru.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#f5f5f7] via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Berita & Artikel Terbaru
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-400"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#f5f5f7] via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[#f5f5f7] via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Berita & Artikel Terbaru
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan informasi terkini seputar properti, tips hunian, dan berita terbaru dari Graha Gloria Group
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {blogs.map((blog) => {
              const slug = slugify(blog.title || blog.id);
              const imageUrl =
                blog.thumbnail ||
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
              const tanggal = new Date(blog.createdAt).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              );

              return (
                <Link
                  key={blog.id}
                  href={`/blog/${slug}`}
                  className="group block rounded-xl overflow-hidden shadow-lg border border-green-200 bg-white hover:scale-105 hover:shadow-xl hover:border-yellow-400 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      {tanggal}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-green-900 group-hover:text-yellow-600 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-green-700 text-sm mb-3 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.content }}>
                    </p>
                    <span className="text-xs text-green-600">
                      Oleh{" "}
                      <span className="font-semibold text-yellow-600">
                        {blog.author?.name || "Admin"}
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            Belum ada artikel tersedia.
          </div>
        )}

        {/* View All Button */}
        {blogs.length > 0 && (
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Lihat Semua Artikel
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
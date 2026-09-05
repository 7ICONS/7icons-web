import { supabase } from "@/lib/supabase";

export default async function SupabaseTestPage() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        category,
        cover_image,
        featured,
        status,
        published_at
      `,
    )
    .order("published_at", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-[#f8f7ff] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold text-violet-600">
          Supabase Connection Test
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Published Articles
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Temporary page used to verify the connection between
          7icons-web and the 7icons-platform Supabase project.
        </p>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6">
            <p className="font-semibold text-red-700">
              Unable to load articles
            </p>

            <p className="mt-2 text-sm text-red-600">
              {error.message}
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Articles received from Supabase
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {articles?.length ?? 0}
              </p>
            </div>

            {articles?.map((article) => (
              <article
                key={article.id}
                className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm"
              >
                {article.cover_image && (
                  <div
                    className="aspect-video w-full bg-slate-100 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${article.cover_image}")`,
                    }}
                  />
                )}

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                      {article.category}
                    </span>

                    {article.featured && (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        Featured
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    {article.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {article.excerpt}
                  </p>

                  <p className="mt-4 text-xs text-slate-400">
                    /blog/{article.slug}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
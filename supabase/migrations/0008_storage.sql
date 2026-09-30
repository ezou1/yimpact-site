-- Storage for the blog images.
-- A blog image is not a secret. Never put a resource secret in a bucket.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

-- RLS is on for storage.objects already, and supabase_storage_admin owns the
-- table. Do not enable it again here.

create policy "anyone reads a blog image" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'blog-images');

create policy "publisher adds a blog image" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'blog-images'
    and (storage.foldername(name))[1] = 'posts'
    and (select app.is_publisher())
  );

create policy "publisher changes a blog image" on storage.objects
  for update to authenticated
  using (bucket_id = 'blog-images' and (select app.is_publisher()))
  with check (bucket_id = 'blog-images' and (select app.is_publisher()));

create policy "publisher removes a blog image" on storage.objects
  for delete to authenticated
  using (bucket_id = 'blog-images' and (select app.is_publisher()));

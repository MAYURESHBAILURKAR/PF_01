import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { blogApi } from '@/lib/api'
import { useAuthStore } from '@/store'
import { formatDate, slugify } from '@/lib/utils'
import MarkdownRenderer from '../../components/animations/MarkdownRenderer'


const EMPTY_FORM = { title: '', slug: '', content: '', tags: '', image: '' }

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [view, setView] = useState('list') // list | create | edit | preview
  const [editingPost, setEditingPost] = useState(null)
  const [previewContent, setPreviewContent] = useState('')
  const [message, setMessage] = useState('')
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const { register, handleSubmit, reset, watch, setValue } = useForm({ defaultValues: EMPTY_FORM })
  const titleValue = watch('title')
  const contentValue = watch('content')

  // Auto-slug from title
  useEffect(() => {
    if (!editingPost && titleValue) {
      setValue('slug', slugify(titleValue))
    }
  }, [titleValue, editingPost, setValue])

  const fetchPosts = () => {
    blogApi.getAll().then((res) => setPosts(res.data.blogs)).catch(() => setPosts([]))
  }

  useEffect(() => { fetchPosts() }, [])

  const onSubmit = async (data) => {
    const payload = { ...data, tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean) }
    try {
      if (editingPost) {
        await blogApi.update(editingPost._id, payload)
        setMessage('✓ Post updated successfully')
      } else {
        await blogApi.create(payload)
        setMessage('✓ Post published successfully')
      }
      reset(EMPTY_FORM)
      setEditingPost(null)
      setView('list')
      fetchPosts()
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('✕ Something went wrong')
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    reset({ ...post, tags: post.tags.join(', ') })
    setView('edit')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    await blogApi.delete(id)
    fetchPosts()
  }

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const inputStyle = {
    width: '100%',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    padding: '12px 14px',
    color: 'var(--fg)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    borderRadius: '2px',
    transition: 'border-color 0.3s',
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: '80px' }}>
      {/* Admin Navbar */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-[72px] border-b"
        style={{
          padding: '0 clamp(20px,4vw,60px)',
          background: 'var(--bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="font-display font-extrabold text-lg">
          MB<span style={{ color: 'var(--accent)' }}>.</span>{' '}
          <span className="font-mono text-xs tracking-widest uppercase font-normal ml-2" style={{ color: 'var(--fg-muted)' }}>
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-wider hidden sm:block" style={{ color: 'var(--fg-muted)' }}>
            {user?.username}
          </span>
          <Link to="/" className="font-mono text-xs tracking-wider uppercase" style={{ color: 'var(--fg-muted)' }}>
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="font-mono text-xs tracking-wider uppercase px-4 py-2 border rounded transition-all duration-300"
            style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff6b6b'; e.currentTarget.style.color = '#ff6b6b' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--fg-muted)' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '40px clamp(20px,4vw,60px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', letterSpacing: '-0.02em' }}>
            {view === 'list' ? 'Blog Posts' : view === 'create' ? 'New Post' : 'Edit Post'}
          </h1>
          <div className="flex gap-3">
            {view !== 'list' && (
              <button
                onClick={() => { setView('list'); setEditingPost(null); reset(EMPTY_FORM) }}
                className="font-mono text-xs tracking-wider uppercase px-4 py-2 border rounded transition-all duration-300"
                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
              >
                ← Back
              </button>
            )}
            {view === 'list' && (
              <button
                onClick={() => { setView('create'); reset(EMPTY_FORM); setEditingPost(null) }}
                className="font-mono text-xs tracking-wider uppercase px-4 py-2 rounded font-bold transition-all duration-300"
                style={{ background: 'var(--accent)', color: '#111' }}
              >
                + New Post
              </button>
            )}
            {(view === 'create' || view === 'edit') && (
              <button
                onClick={() => { setPreviewContent(contentValue); setView('preview') }}
                className="font-mono text-xs tracking-wider uppercase px-4 py-2 border rounded transition-all duration-300"
                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
              >
                Preview
              </button>
            )}
          </div>
        </div>

        {message && (
          <div
            className="mb-6 font-mono text-xs tracking-wider"
            style={{ color: message.startsWith('✓') ? 'var(--accent)' : '#ff6b6b' }}
          >
            {message}
          </div>
        )}

        {/* List view */}
        {view === 'list' && (
          <div>
            {posts.length === 0 ? (
              <p style={{ color: 'var(--fg-muted)' }}>No blog posts yet. Create your first one!</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                    {['Title', 'Date', 'Tags', 'Actions'].map((h) => (
                      <th key={h} className="text-left pb-3 font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--fg-muted)', paddingRight: '20px' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id} className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-4 font-medium pr-6" style={{ paddingRight: '20px' }}>{post.title}</td>
                      <td className="py-4 font-mono text-xs pr-6" style={{ color: 'var(--fg-muted)', paddingRight: '20px', whiteSpace: 'nowrap' }}>{formatDate(post.date)}</td>
                      <td className="py-4 pr-6">
                        <div className="flex gap-1 flex-wrap">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border rounded-full" style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-3">
                          <button onClick={() => handleEdit(post)} className="font-mono text-xs tracking-wider uppercase transition-colors duration-300" style={{ color: 'var(--fg-muted)' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}>Edit</button>
                          <button onClick={() => handleDelete(post._id)} className="font-mono text-xs tracking-wider uppercase transition-colors duration-300" style={{ color: 'var(--fg-muted)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ff6b6b' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-muted)' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Create/Edit form */}
        {(view === 'create' || view === 'edit') && (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>Title *</label>
                <input {...register('title', { required: true })} placeholder="Post title" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)' }} />
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>Slug *</label>
                <input {...register('slug', { required: true })} placeholder="post-slug" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)' }} />
              </div>
            </div>

            <div className="mb-5">
              <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>Tags (comma-separated)</label>
              <input {...register('tags')} placeholder="React, Node.js, Performance" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)' }} />
            </div>

            <div className="mb-5">
              <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>Featured Image URL</label>
              <input {...register('image')} placeholder="https://..." style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)' }} />
            </div>

            <div className="mb-8">
              <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--fg-muted)' }}>Content (Markdown) *</label>
              <textarea
                {...register('content', { required: true })}
                rows={20}
                placeholder="# Your post title&#10;&#10;Start writing your post in Markdown..."
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', resize: 'vertical', lineHeight: 1.7 }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)' }}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded font-bold text-sm tracking-wider uppercase transition-all duration-200"
                style={{ padding: '14px 28px', background: 'var(--accent)', color: '#111' }}
              >
                {editingPost ? 'Update Post' : 'Publish Post'} ↗
              </button>
            </div>
          </form>
        )}

        {/* Preview */}
        {view === 'preview' && (
          <div className="max-w-3xl">
            <div className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--fg-muted)' }}>
              Markdown Preview
            </div>
            <div className="border p-8 rounded" style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}>

              {/* Look how clean this is now! */}
              <MarkdownRenderer content={previewContent} />

            </div>
            <button
              onClick={() => setView(editingPost ? 'edit' : 'create')}
              className="mt-6 font-mono text-xs tracking-wider uppercase px-4 py-2 border rounded transition-all duration-300"
              style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
            >
              ← Back to Editor
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

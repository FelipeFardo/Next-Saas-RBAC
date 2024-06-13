'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignURL = new URL('login/oauth/authorize', 'https://github.com')

  githubSignURL.searchParams.set('client_id', 'Ov23ctzYQMzWpRI6N89W')
  githubSignURL.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback',
  )
  githubSignURL.searchParams.set('scope', 'user')

  redirect(githubSignURL.toString())
}

import { auth, signIn, signOut } from '@/auth/auth-config';

export default async function AuthControls() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="auth-controls">
        <span>Signed in as {session.user.name || session.user.email}</span>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/books' });
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <div className="auth-controls">
      <span>Sign in to add or delete books.</span>
      <form
        action={async () => {
          'use server';
          await signIn('github', { redirectTo: '/books' });
        }}
      >
        <button type="submit">Sign in with GitHub</button>
      </form>
    </div>
  );
}

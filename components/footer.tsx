import { getProfile } from "@/lib/content";

export function Footer() {
  const profile = getProfile();

  return (
    <footer className="border-t border-[rgba(35,31,28,0.08)] bg-[rgba(248,245,241,0.72)]">
      <div className="shell flex flex-col gap-4 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <p className="font-display text-xl font-semibold text-[var(--pixel-dark)]">
            {profile.name}
          </p>
          <p className="mt-1 text-[15px] leading-7">{profile.title}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a className="link-chip" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a
            className="link-chip"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          {profile.twitter ? (
            <a
              className="link-chip"
              href={profile.twitter}
              target="_blank"
              rel="noreferrer"
            >
              X / Twitter
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

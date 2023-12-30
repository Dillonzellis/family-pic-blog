import Link from "next/link";

interface BreadCrumbsProps {
  userName?: string;
  userNameUrl?: string;
  albumTitle?: string;
  albumTitleUrl?: string;
  uploadTitle?: string;
  uploadUrl?: string;
}

const BreadCrumbs = ({
  userName,
  userNameUrl,
  albumTitle,
  albumTitleUrl,
  uploadTitle,
  uploadUrl,
}: BreadCrumbsProps) => {
  let breadcrumbs = [{ id: 1, name: "All Albums", href: "/all-albums" }];

  if (userName && userNameUrl) {
    breadcrumbs.push({ id: 2, name: userName, href: userNameUrl });
  }

  if (albumTitle && albumTitleUrl) {
    breadcrumbs.push({ id: 3, name: albumTitle, href: albumTitleUrl });
  }

  if (uploadTitle && uploadUrl) {
    breadcrumbs.push({ id: 4, name: uploadTitle, href: uploadUrl });
  }

  return (
    <ol className="flex items-center space-x-1 pt-6">
      {breadcrumbs.map((breadcrumb, i) => (
        <li key={breadcrumb.href}>
          <div className="flex items-center text-sm">
            <Link
              href={breadcrumb.href}
              className="text-sm font-medium text-muted-foreground hover:text-gray-900"
            >
              {breadcrumb.name}
            </Link>
            {i !== breadcrumbs.length - 1 ? (
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="ml-2 h-5 w-5 flex-shrink-0 text-zinc-300"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default BreadCrumbs;

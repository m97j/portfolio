export default function Footer() {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
      © {startYear}-{currentYear} Minjae. All rights reserved.
    </footer>
  );
}

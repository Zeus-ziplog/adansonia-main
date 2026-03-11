import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: Props) {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };
  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={shareOnFacebook} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
        <Facebook size={18} className="text-blue-600" />
      </button>
      <button onClick={shareOnTwitter} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors">
        <Twitter size={18} className="text-sky-500" />
      </button>
      <button onClick={shareOnLinkedIn} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
        <Linkedin size={18} className="text-blue-700" />
      </button>
      <button onClick={copyLink} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        <Link2 size={18} className="text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
}
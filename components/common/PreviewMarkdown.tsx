// PreviewModal.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdownText: string;
}

const PreviewMarkdown: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  markdownText,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700"
          aria-label="Close"
        >
          X
        </button>
        <ReactMarkdown
          children={markdownText}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            table: ({ node, ...props }) => (
              <table
                className="table-auto border-collapse border border-gray-300 w-full"
                {...props}
              />
            ),
            th: ({ node, ...props }) => (
              <th
                className="border border-gray-300 p-2 bg-gray-100"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td className="border border-gray-300 p-2" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre
                className="bg-gray-800 text-white p-4 rounded overflow-x-auto"
                {...props}
              />
            ),
            code: ({ node, ...props }) => (
              <code className="bg-gray-800 text-white p-1 rounded" {...props} />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default PreviewMarkdown;
